/**
 * Download remaining missing images with rate limiting
 * Run: node scripts/download-remaining.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function download(url, destPath) {
  if (fs.existsSync(destPath)) return 'exists'
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheBreakdown/1.0)' },
      signal: AbortSignal.timeout(30000),
    })
    if (!res.ok) return `HTTP ${res.status}`
    fs.writeFileSync(destPath, Buffer.from(await res.arrayBuffer()))
    return 'ok'
  } catch (e) {
    return e.message
  }
}

async function main() {
  const publicDir = path.resolve(ROOT, 'public', 'images')
  const storiesDir = path.resolve(publicDir, 'stories')
  const peopleDir = path.resolve(publicDir, 'people')
  fs.mkdirSync(storiesDir, { recursive: true })
  fs.mkdirSync(peopleDir, { recursive: true })

  // ✅ Confirmed working Wikimedia originals (tested 200 OK)
  const remaining = [
    // Stories
    { type: 'story', slug: 'anthropic-mythos-ai-2026', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Artificial_intelligence_%28AI%29_icon.svg' },
    { type: 'story', slug: 'bangladesh-china-tarique-rahman-beijing-2026', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg' },
    { type: 'story', slug: 'canada-social-media-ban-under-16', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg' },
    { type: 'story', slug: 'china-lineshine-supercomputer-top500-2026', url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Pleiades_supercomputer.jpg' },
    { type: 'story', slug: 'kunal-shah-meta-story-2026', url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg' },
    { type: 'story', slug: 'meta-ai-mode-2-billion-no-opt-out', url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg' },
    { type: 'story', slug: 'modi-cabinet-reshuffle-2026', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Sansad_Bhavan%2C_Delhi%2C_BNK.jpg' },
    { type: 'story', slug: 'tmc-implosion-2026', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg' },
    { type: 'story', slug: 'us-iran-80b-pentagon-war-cost', url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/The_Pentagon%2C_Washington%2C_D.C.%2C_USA.jpg' },
    { type: 'story', slug: 'venezuela-earthquakes-2026', url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/2010_Chile_earthquake_-_Building_destroyed_in_Concepci%C3%B3n.jpg' },
    // People
    { type: 'people', slug: 'narendra-modi', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Narendra_Modi_2023.jpg' },
    { type: 'people', slug: '5g-bharat', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop&crop=center' },
    { type: 'people', slug: 'ayodhya-ram-mandir', url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop&crop=center' },
  ]

  let ok = 0, fail = 0
  for (const item of remaining) {
    const destDir = item.type === 'story' ? storiesDir : peopleDir
    const ext = item.url.match(/\.(jpeg|jpg|png|gif|webp|svg)/i)?.[1]?.toLowerCase() || 'jpg'
    const destFile = path.join(destDir, `${item.slug}.${ext}`)
    
    process.stdout.write(`  ${item.slug} ... `)
    const result = await download(item.url, destFile)
    if (result === 'ok') { process.stdout.write('✓\n'); ok++ }
    else if (result === 'exists') { process.stdout.write('• (exists)\n'); ok++ }
    else { process.stdout.write(`✗ ${result}\n`); fail++ }
    
    await sleep(2000) // Rate limit: 2s between requests
  }

  // Write updated registry
  const registry = JSON.parse(fs.readFileSync(path.resolve(ROOT, 'src', 'lib', 'content', 'image-registry.json'), 'utf-8'))
  
  // Merge remaining into registry
  for (const item of remaining) {
    const destDir = item.type === 'story' ? storiesDir : peopleDir
    const ext = item.url.match(/\.(jpeg|jpg|png|gif|webp|svg)/i)?.[1]?.toLowerCase() || 'jpg'
    const destFile = path.join(destDir, `${item.slug}.${ext}`)
    if (fs.existsSync(destFile)) {
      if (item.type === 'story') {
        if (!registry.stories[item.slug]) registry.stories[item.slug] = { path: `/images/stories/${item.slug}.${ext}`, caption: '' }
      } else {
        if (!registry.people[item.slug]) registry.people[item.slug] = { path: `/images/people/${item.slug}.${ext}` }
      }
    }
  }
  
  fs.writeFileSync(path.resolve(ROOT, 'src', 'lib', 'content', 'image-registry.json'), JSON.stringify(registry, null, 2))

  console.log(`\n  Downloaded: ${ok}, Failed: ${fail}`)
}

main().catch(console.error)
