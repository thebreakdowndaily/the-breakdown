/**
 * Update story frontmatter + knowledge.ts to use LOCAL image paths
 * Run: node scripts/update-image-paths.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const STORIES_DIR = path.resolve(ROOT, '..', 'stories')
const imagesDir = path.resolve(ROOT, 'public', 'images')

// ── Build lookups from disk ───────────────────────────────
function buildLookup(subdir) {
  const dir = path.resolve(imagesDir, subdir)
  const map = new Map()
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir)) {
      map.set(path.parse(f).name, `/images/${subdir}/${f}`)
    }
  }
  return map
}

const storyLookup = buildLookup('stories')
const peopleLookup = buildLookup('people')

function quote(v) {
  return v.includes(' ') ? `"${v}"` : v
}

// ── Update story frontmatter ──────────────────────────────
function updateStories() {
  const storyDirs = fs.readdirSync(STORIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory()).map(d => d.name)

  let updated = 0, skipped = 0

  for (const dir of storyDirs) {
    const mdFiles = fs.readdirSync(path.join(STORIES_DIR, dir))
      .filter(f => f.endsWith('.md') && !['references.md','seo.md','images.md','charts.md','timeline.md','videos.md','audit.md','research-dossier.md','supabase-insert.md'].includes(f))
    if (!mdFiles.length) continue

    const mdPath = path.join(STORIES_DIR, dir, mdFiles[0])
    let content = fs.readFileSync(mdPath, 'utf-8')

    // Find slug from frontmatter
    const slugM = content.match(/^slug:\s*["']?(.+?)["']?\s*$/m)
    const slug = slugM ? slugM[1].trim() : dir

    const localPath = storyLookup.get(slug) || storyLookup.get(dir)
    if (!localPath) { skipped++; continue }

    const q = quote(localPath)
    let c = content

    if (c.match(/^hero:\s*.+$/m)) c = c.replace(/^hero:\s*.+$/m, `hero: ${q}`)
    if (c.match(/^fact_check_image:\s*.+$/m)) c = c.replace(/^fact_check_image:\s*.+$/m, `fact_check_image: ${q}`)

    if (c !== content) {
      fs.writeFileSync(mdPath, c)
      process.stdout.write(`  ✓ ${dir}\n`)
      updated++
    } else {
      skipped++
    }
  }
  return { updated, skipped }
}

// ── Update knowledge.ts ───────────────────────────────────
function updateKnowledge() {
  const kp = path.resolve(ROOT, 'src', 'lib', 'content', 'knowledge.ts')
  let content = fs.readFileSync(kp, 'utf-8')
  const lines = content.split('\n')
  const newLines = [...lines]
  let updated = 0

  // Find each entity's image line and replace it
  for (const [id, localPath] of peopleLookup) {
    let found = false
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trimEnd()
      if (line === `id: '${id}'` || line === `id: '${id}',`) {
        // Found the entity — look for image: line within next 15 lines
        for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
          const imgLine = lines[j].trim()
          if (imgLine.startsWith('image:')) {
            // Make sure we're still in the same entity (not past a closing })
            const block = lines.slice(i, j + 1).join('\n')
            if (!block.includes('\n  }')) {
              // Check the existing URL to avoid double-updating
              if (!lines[j].includes(localPath)) {
                newLines[j] = lines[j].replace(/image:\s*'[^']*'/, `image: '${localPath}'`)
                found = true
                updated++
                process.stdout.write(`  ✓ ${id}: → ${localPath}\n`)
              }
              break
            }
          }
        }
        if (found) break
      }
    }
  }

  if (updated > 0) {
    fs.writeFileSync(kp, newLines.join('\n'))
  }
  return updated
}

// ── Main ──────────────────────────────────────────────────
console.log('📝 Updating story frontmatter to use local images...\n')
const s = updateStories()

console.log('\n👤 Updating knowledge.ts images...\n')
const p = updateKnowledge()

console.log(`\n════════════════════════════════════════`)
console.log(`  Stories: ${s.updated} updated, ${s.skipped} skipped`)
console.log(`  People:  ${p.updated} updated`)
console.log(`════════════════════════════════════════\n`)
