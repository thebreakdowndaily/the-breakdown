/**
 * Image Download Pipeline — The Breakdown v3
 * 
 * Downloads all story hero & knowledge entity images to local storage.
 * Handles Wikimedia Commons thumbnail URL conversion.
 * Falls back to working alternatives for failed downloads.
 * 
 * Run: node scripts/download-images.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const STORIES_DIR = path.resolve(ROOT, '..', 'stories')
const PUBLIC_IMG = path.resolve(ROOT, 'public', 'images')

// ── Helpers ──────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

/**
 * Convert Wikimedia thumb URL to original file URL.
 * Thumb: .../commons/thumb/a/ab/Filename.jpg/1200px-Filename.jpg
 * Orig:  .../commons/a/ab/Filename.jpg
 */
function wikimediaOriginalUrl(thumbUrl) {
  const match = thumbUrl.match(/^(https?:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/)thumb\/(.+?)\/(?:.+)$/)
  if (match) {
    return match[1] + match[2]
  }
  return thumbUrl
}

function getExt(url) {
  const clean = url.split('?')[0].split('#')[0]
  const match = clean.match(/\.(jpeg|jpg|png|gif|webp|svg)(?:\?|$)/i)
  return match ? match[1].toLowerCase() : 'jpg'
}

async function download(url, destPath) {
  if (fs.existsSync(destPath)) return 'exists'

  // Try original URL for Wikimedia thumbnails
  const tryUrl = url.includes('upload.wikimedia.org/wikipedia/commons/thumb/')
    ? wikimediaOriginalUrl(url)
    : url

  try {
    const res = await fetch(tryUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TheBreakdown-ImagePipeline/1.0)',
        'Accept': 'image/avif,image/webp,image/jpeg,image/png,image/svg+xml,*/*',
      },
      signal: AbortSignal.timeout(30000),
    })

    if (!res.ok) {
      return `HTTP ${res.status}`
    }

    const buffer = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(destPath, buffer)
    return 'ok'
  } catch (err) {
    return err.message
  }
}

// ── Alternative URLs for stories that failed ─────────────────────
// These use original Wikimedia Commons URLs (not thumb) or reliable Unsplash

const FALLBACK_IMAGES = {
  'anthropic-mythos-ai-2026': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Hacker_-_AJ_covers.jpg',
  'bangladesh-china-tarique-rahman-beijing-2026': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg',
  'canada-social-media-ban-under-16': 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg',
  'china-lineshine-supercomputer-top500-2026': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Pleiades_supercomputer.jpg',
  'doval-wang-india-china-lac-normalisation-june-2026': 'https://upload.wikimedia.org/wikipedia/commons/8/81/Flag_of_the_People%27s_Republic_of_China.svg',
  'kunal-shah-meta-story-2026': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Meta_Platforms_Inc._logo.svg',
  'meta-ai-mode-2-billion-no-opt-out': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Meta_Platforms_logo.svg',
  'modi-cabinet-reshuffle-2026': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Sansad_Bhavan%2C_Delhi%2C_BNK.jpg',
  'tmc-implosion-2026': 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Trinamool_Congress_flag.svg',
  'us-iran-80b-pentagon-war-cost': 'https://upload.wikimedia.org/wikipedia/commons/2/29/The_Pentagon%2C_Washington%2C_D.C.%2C_USA.jpg',
  'venezuela-earthquakes-2026': 'https://upload.wikimedia.org/wikipedia/commons/4/49/2010_Chile_earthquake_-_Building_destroyed_in_Concepci%C3%B3n.jpg',
}

const FALLBACK_PEOPLE = {
  'narendra-modi': 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Narendra_Modi_2023.jpg',
  '5g-bharat': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop&crop=center',
  'ayodhya-ram-mandir': 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop&crop=center',
}

// ── Scan story frontmatter ─────────────────────────────────────

function scanStoryFrontmatter() {
  const storyDirs = fs.readdirSync(STORIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  const entries = []

  for (const dir of storyDirs) {
    const mdFiles = fs.readdirSync(path.join(STORIES_DIR, dir))
      .filter(f => f.endsWith('.md') && !['references.md','seo.md','images.md','charts.md','timeline.md','videos.md','audit.md','research-dossier.md','supabase-insert.md'].includes(f))
    
    if (mdFiles.length === 0) continue
    
    const mdPath = path.join(STORIES_DIR, dir, mdFiles[0])
    const content = fs.readFileSync(mdPath, 'utf-8')
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (!fmMatch) continue
    
    const fm = fmMatch[1]
    const heroMatch = fm.match(/^hero:\s*["']?(.+?)["']?\s*$/m)
    const captionMatch = fm.match(/^caption:\s*["']?(.+?)["']?\s*$/m)
    
    let heroUrl = heroMatch ? heroMatch[1].trim() : null
    if (!heroUrl) {
      const fciMatch = fm.match(/^fact_check_image:\s*["']?(.+?)["']?\s*$/m)
      heroUrl = fciMatch ? fciMatch[1].trim() : null
    }
    
    entries.push({
      slug: dir,
      heroUrl,
      caption: captionMatch ? captionMatch[1].trim() : '',
    })
  }

  return entries
}

// ── Main ────────────────────────────────────────────────────────

async function main() {
  ensureDir(PUBLIC_IMG)
  const storiesDir = path.resolve(PUBLIC_IMG, 'stories')
  const peopleDir = path.resolve(PUBLIC_IMG, 'people')
  ensureDir(storiesDir)
  ensureDir(peopleDir)

  const registry = { stories: {}, people: {} }
  
  // 1. Download story images from frontmatter URLs
  console.log('📖 Downloading story images from frontmatter...\n')
  const storyEntries = scanStoryFrontmatter()
  let sOk = 0, sFail = 0, sExists = 0

  for (const entry of storyEntries) {
    if (!entry.heroUrl) {
      console.log(`  ${entry.slug}: No hero image, checking fallback...`)
      // Try fallback
      if (FALLBACK_IMAGES[entry.slug]) {
        const ext = getExt(FALLBACK_IMAGES[entry.slug])
        const destFile = path.join(storiesDir, `${entry.slug}.${ext}`)
        process.stdout.write(`  ${entry.slug} (fallback) ... `)
        const result = await download(FALLBACK_IMAGES[entry.slug], destFile)
        if (result === 'ok' || result === 'exists') {
          process.stdout.write(result === 'ok' ? '✓\n' : '• (exists)\n')
          sOk += result === 'ok' ? 1 : 0
          sExists += result === 'exists' ? 1 : 0
          registry.stories[entry.slug] = {
            path: `/images/stories/${entry.slug}.${ext}`,
            caption: entry.caption,
          }
        } else {
          process.stdout.write(`✗ ${result}\n`)
          sFail++
        }
      } else {
        console.log(`  ${entry.slug}: No fallback available`)
        sFail++
      }
      continue
    }

    const ext = getExt(entry.heroUrl)
    const destFile = path.join(storiesDir, `${entry.slug}.${ext}`)
    process.stdout.write(`  ${entry.slug} ... `)
    const result = await download(entry.heroUrl, destFile)

    if (result === 'ok') {
      process.stdout.write('✓\n')
      sOk++
      registry.stories[entry.slug] = {
        path: `/images/stories/${entry.slug}.${ext}`,
        caption: entry.caption,
      }
    } else if (result === 'exists') {
      process.stdout.write('• (exists)\n')
      sExists++
      registry.stories[entry.slug] = {
        path: `/images/stories/${entry.slug}.${ext}`,
        caption: entry.caption,
      }
    } else {
      // Try fallback
      if (FALLBACK_IMAGES[entry.slug]) {
        const fbExt = getExt(FALLBACK_IMAGES[entry.slug])
        const fbDest = path.join(storiesDir, `${entry.slug}.${fbExt}`)
        process.stdout.write(`✗ ${result}, trying fallback ... `)
        const fbResult = await download(FALLBACK_IMAGES[entry.slug], fbDest)
        if (fbResult === 'ok' || fbResult === 'exists') {
          process.stdout.write(fbResult === 'ok' ? '✓\n' : '• (exists)\n')
          sOk += fbResult === 'ok' ? 1 : 0
          sExists += fbResult === 'exists' ? 1 : 0
          registry.stories[entry.slug] = {
            path: `/images/stories/${entry.slug}.${fbExt}`,
            caption: entry.caption,
          }
        } else {
          process.stdout.write(`✗ ${fbResult}\n`)
          sFail++
        }
      } else {
        process.stdout.write(`✗ ${result}\n`)
        sFail++
      }
    }
  }

  // 2. Download person images
  console.log('\n👤 Downloading person/entity images...\n')
  
  const knowledgePath = path.resolve(ROOT, 'src', 'lib', 'content', 'knowledge.ts')
  const kc = fs.readFileSync(knowledgePath, 'utf-8')
  const entityRegex = /id:\s*['"](.+?)['"'][\s\S]*?image:\s*['"](.+?)['"]/g
  let pOk = 0, pFail = 0, pExists = 0
  let match

  while ((match = entityRegex.exec(kc)) !== null) {
    const id = match[1]
    const imgUrl = match[2].trim()
    
    const ext = getExt(imgUrl)
    const destFile = path.join(peopleDir, `${id}.${ext}`)
    process.stdout.write(`  ${id} ... `)
    const result = await download(imgUrl, destFile)

    if (result === 'ok') {
      process.stdout.write('✓\n')
      pOk++
      registry.people[id] = { path: `/images/people/${id}.${ext}` }
    } else if (result === 'exists') {
      process.stdout.write('• (exists)\n')
      pExists++
      registry.people[id] = { path: `/images/people/${id}.${ext}` }
    } else {
      // Try fallback
      if (FALLBACK_PEOPLE[id]) {
        const fbExt = getExt(FALLBACK_PEOPLE[id])
        const fbDest = path.join(peopleDir, `${id}.${fbExt}`)
        process.stdout.write(`✗ ${result}, trying fallback ... `)
        const fbResult = await download(FALLBACK_PEOPLE[id], fbDest)
        if (fbResult === 'ok' || fbResult === 'exists') {
          process.stdout.write(fbResult === 'ok' ? '✓\n' : '• (exists)\n')
          pOk += fbResult === 'ok' ? 1 : 0
          pExists += fbResult === 'exists' ? 1 : 0
          registry.people[id] = { path: `/images/people/${id}.${fbExt}` }
        } else {
          process.stdout.write(`✗ ${fbResult}\n`)
          pFail++
        }
      } else {
        process.stdout.write(`✗ ${result}\n`)
        pFail++
      }
    }
  }

  // Write registry
  const registryPath = path.resolve(ROOT, 'src', 'lib', 'content', 'image-registry.json')
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2))
  
  // Summary
  console.log(`\n════════════════════════════════════════`)
  console.log(`  Stories: ${sOk} new, ${sExists} existed, ${sFail} failed`)
  console.log(`  People:  ${pOk} new, ${pExists} existed, ${pFail} failed`)
  console.log(`  Total:   ${sOk + pOk} new downloads  |  ${sFail + pFail} failed`)
  console.log(`  Registry: ${registryPath}`)
  console.log(`════════════════════════════════════════\n`)
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
