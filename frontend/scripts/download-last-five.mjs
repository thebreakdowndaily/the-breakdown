/**
 * Download the final 5 missing story images using working Unsplash URLs
 * Run: node scripts/download-last-five.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const STORIES_DIR = path.resolve(ROOT, '..', 'stories')
const storiesImgDir = path.resolve(ROOT, 'public', 'images', 'stories')
fs.mkdirSync(storiesImgDir, { recursive: true })

async function download(url, dest) {
  if (fs.existsSync(dest)) return 'exists'
  try {
    const r = await fetch(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheBreakdown/1.0)' },
      signal: AbortSignal.timeout(30000)
    })
    if (!r.ok) return `HTTP ${r.status}`
    fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()))
    return 'ok'
  } catch(e) {
    return e.message
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// Working Unsplash URLs for the 5 missing stories
const TO_DOWNLOAD = {
  'anthropic-mythos-ai-2026': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop',
  'china-lineshine-supercomputer-top500-2026': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop',
  'modi-cabinet-reshuffle-2026': 'https://images.unsplash.com/photo-1625044969531-351c7aa70a48?w=1200&h=630&fit=crop',
  'us-iran-80b-pentagon-war-cost': 'https://images.unsplash.com/photo-1589890312394-e3c0d2bdf6fe?w=1200&h=630&fit=crop',
  'venezuela-earthquakes-2026': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=630&fit=crop',
}

async function main() {
  let ok = 0, fail = 0

  for (const [slug, url] of Object.entries(TO_DOWNLOAD)) {
    const ext = url.match(/\.(jpe?g|png|webp)/i)?.[1]?.toLowerCase() || 'jpg'
    const dest = path.join(storiesImgDir, `${slug}.${ext}`)
    
    process.stdout.write(`  ${slug} ... `)
    const result = await download(url, dest)
    
    if (result === 'ok') { process.stdout.write('✓\n'); ok++ }
    else if (result === 'exists') { process.stdout.write('• (exists)\n'); ok++ }
    else { process.stdout.write(`✗ ${result}\n`); fail++ }
    
    await sleep(1000)
  }

  console.log(`\n  Downloaded: ${ok}, Failed: ${fail}`)

  // Update the registry JSON to include these
  const registryPath = path.resolve(ROOT, 'src', 'lib', 'content', 'image-registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  
  for (const [slug, url] of Object.entries(TO_DOWNLOAD)) {
    const ext = url.match(/\.(jpe?g|png|webp)/i)?.[1]?.toLowerCase() || 'jpg'
    const dest = path.join(storiesImgDir, `${slug}.${ext}`)
    if (fs.existsSync(dest) && !registry.stories[slug]) {
      // Read caption from story frontmatter
      const mdDir = path.join(STORIES_DIR, slug)
      if (fs.existsSync(mdDir)) {
        const mdFiles = fs.readdirSync(mdDir).filter(f => f.endsWith('.md') && !['references.md','seo.md','images.md','charts.md','timeline.md','videos.md','audit.md','research-dossier.md','supabase-insert.md'].includes(f))
        if (mdFiles.length > 0) {
          const { data } = matter(fs.readFileSync(path.join(mdDir, mdFiles[0]), 'utf-8'))
          registry.stories[slug] = {
            path: `/images/stories/${slug}.${ext}`,
            caption: data.caption || '',
          }
        }
      }
    }
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2))
  console.log(`  Registry updated`)
}

main().catch(console.error)
