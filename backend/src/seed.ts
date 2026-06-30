/**
 * Seed script: imports all 30 existing stories into the database.
 * Supports both .md files (with frontmatter) and .html files (with <title> tags).
 *
 * Usage: npm run seed
 *
 * Reads stories from ../stories/{slug}/ and imports into SQLite.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { initDb, getDb, execute, queryAll, queryOne } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const STORIES_DIR = path.join(__dirname, '..', '..', 'stories')

interface StoryFrontmatter {
  slug?: string
  title?: string
  summary?: string
  category?: string
  tags?: string[]
  hero?: string
  caption?: string
  author?: string
  publishedAt?: string
  readTime?: number
  [key: string]: unknown
}

/** Extract <title> from an HTML file */
function extractTitleFromHtml(filePath: string): string | null {
  try {
    const html = fs.readFileSync(filePath, 'utf-8')
    const match = html.match(/<title>([^<]+?)<\/title>/)
    if (match) {
      // Remove " | The Breakdown" suffix if present
      return match[1]
        .replace(/\s*\|\s*The Breakdown\s*$/i, '')
        .replace(/\s*[—–-]\s*The Breakdown\s*$/i, '')
        .trim()
    }
    return null
  } catch {
    return null
  }
}

/** Extract first <h1> from an HTML file */
function extractH1FromHtml(filePath: string): string | null {
  try {
    const html = fs.readFileSync(filePath, 'utf-8')
    const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
    if (match) {
      return match[1].replace(/<[^>]+>/g, '').trim()
    }
    return null
  } catch {
    return null
  }
}

/** Convert kebab-case-slug to Title Case */
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

async function seed(): Promise<void> {
  console.log('🌱 Seeding database from existing stories...\n')

  await initDb()
  const db = getDb()

  // Find all story directories
  const storyDirs = fs.readdirSync(STORIES_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => path.join(STORIES_DIR, e.name))
    .sort()

  let imported = 0
  let skipped = 0
  let errors = 0

  for (const dir of storyDirs) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      const mdFiles = entries.filter(e => e.isFile() && e.name.endsWith('.md') && !e.name.includes('audit'))
      const htmlFiles = entries.filter(e => e.isFile() && e.name.endsWith('.html'))

      // ---- FIND THE ACTUAL STORY CONTENT ----
      let storyMdFile: string | null = null
      let storyHtmlFile: string | null = null

      // Try .md files first — look for one with frontmatter
      for (const mdFile of mdFiles) {
        const raw = fs.readFileSync(path.join(dir, mdFile.name), 'utf-8')
        try {
          const parsed = matter(raw)
          if (parsed.data && Object.keys(parsed.data).length > 1) {
            storyMdFile = path.join(dir, mdFile.name)
            break // Found the story .md
          }
        } catch {
          continue
        }
      }

      // Always try .html files as fallback for title/content
      if (htmlFiles.length > 0) {
        const dirName = path.basename(dir)
        const matching = htmlFiles.find(f => f.name.includes(dirName) || f.name.includes(dirName.replace(/-2026$/, '')))
        storyHtmlFile = matching ? path.join(dir, matching.name) : path.join(dir, htmlFiles[0].name)
      }

      if (!storyMdFile && !storyHtmlFile) {
        console.warn(`  ⚠ ${path.basename(dir)} — no story content found`)
        skipped++
        continue
      }

      // ---- EXTRACT METADATA ----
      let slug: string
      let title: string
      let summary = ''
      let body = ''
      let category = 'Uncategorised'
      let tags: string[] = []
      let hero = ''
      let caption = ''
      let author = ''
      let publishedAt: string | null = null
      let readTime = 5

      const dirName = path.basename(dir)

      if (storyMdFile) {
        const raw = fs.readFileSync(storyMdFile, 'utf-8')
        const parsed = matter(raw)
        const data = (parsed.data || {}) as StoryFrontmatter

        slug = data.slug || dirName
        title = data.title || ''
        summary = data.summary || ''
        body = parsed.content
        category = data.category || 'Uncategorised'
        tags = data.tags || []
        hero = data.hero || ''
        caption = data.caption || ''
        author = data.author || ''
        publishedAt = data.publishedAt || null
        readTime = data.readTime || 5

        // If no title in frontmatter, try HTML
        if (!title && storyHtmlFile) {
          title = extractTitleFromHtml(storyHtmlFile) || extractH1FromHtml(storyHtmlFile) || slugToTitle(slug)
        } else if (!title) {
          title = slugToTitle(slug)
        }
      } else if (storyHtmlFile) {
        slug = dirName
        title = extractTitleFromHtml(storyHtmlFile) || extractH1FromHtml(storyHtmlFile) || slugToTitle(dirName)
        body = fs.readFileSync(storyHtmlFile, 'utf-8')
      } else {
        slug = dirName
        title = slugToTitle(dirName)
      }

      // ---- INSERT INTO DATABASE ----
      const now = publishedAt || new Date().toISOString()

      execute(db, `
        INSERT OR REPLACE INTO stories
          (slug, title, summary, body, category, tags, hero, caption, author, read_time, published_at, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?)
      `, [
        slug,
        title || slugToTitle(slug),
        summary,
        body,
        category,
        JSON.stringify(tags),
        hero,
        caption,
        author || 'The Breakdown Desk',
        readTime,
        publishedAt || null,
        now,
        now,
      ])

      console.log(`  ✓ ${slug} — "${(title || slugToTitle(slug)).substring(0, 70)}"`)
      imported++
    } catch (err: any) {
      console.error(`  ✗ ${path.basename(dir)} — ${err.message}`)
      errors++
    }
  }

  // Verify count
  const count = queryOne(db, 'SELECT COUNT(*) as c FROM stories')
  console.log(`\n📊 Summary:`)
  console.log(`  Imported: ${imported}`)
  console.log(`  Skipped:  ${skipped}`)
  console.log(`  Errors:   ${errors}`)
  console.log(`  Database: ${count?.c || 0} total stories`)

  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
