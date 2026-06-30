/**
 * Content Pipeline — The Breakdown OS v2
 * 
 * Reads story markdown files from ../stories/ and JSON configs from ../content/
 * Generates IntelligenceReport-compatible data modules for the frontend.
 * 
 * Run: node scripts/build-content.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { marked } from 'marked'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const STORIES_DIR = path.resolve(ROOT, '..', 'stories')
const CONTENT_DIR = path.resolve(ROOT, '..', 'content')
const OUTPUT_DIR = path.resolve(ROOT, 'src', 'lib', 'content', 'generated')

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// ============================================================
// 1. Site config
// ============================================================
function parseConfigJsons() {
  const configs = {}
  const configFiles = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'))
  
  for (const file of configFiles) {
    const raw = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8'))
    const data = {}
    for (const field of raw.fields || []) {
      data[field.key] = field.value
    }
    configs[raw.section] = data
  }
  
  return configs
}

// ============================================================
// 2. Category mapping
// ============================================================
const CATEGORY_MAP = {
  'incredible-india': 'Explained',
  'india': 'India',
  'science': 'Explained',
  'energy': 'Policy Lab',
  'technology': 'AI & Technology',
  'ai': 'AI & Technology',
  'policy': 'Policy Lab',
  'economy': 'Data Lab',
  'geopolitics': 'Intelligence',
  'world': 'World',
  'security': 'Intelligence',
  'health': 'Explained',
  'environment': 'Explained',
  'infrastructure': 'The Fix',
  'accountability': 'Accountability',
}

function extractCategory(tags, frontmatterCategory) {
  if (frontmatterCategory) return frontmatterCategory
  for (const tag of tags) {
    const mapped = CATEGORY_MAP[tag.toLowerCase()]
    if (mapped) return mapped
  }
  return 'Explained'
}

// ============================================================
// 3. Parse sources from bottom of markdown
// ============================================================
function parseSources(markdown) {
  const sources = []
  // Collect all content between source-related headings
  const sourceMatch = markdown.match(/^#{1,2}\s+(Sources|References|Footnotes)\b[^\n]*\n([\s\S]*?)(?=\n#{1,2}\s|$)/im)
  const altMatch = !sourceMatch ? markdown.match(/^#{1,2}\s+(Official Sources|News Reports|Academic Papers|Primary Documents|Data Sources|Background|Strategic Analysis)\b[^\n]*\n([\s\S]*?)(?=\n#{1,2}\s|$)/im) : null
  let block = sourceMatch ? sourceMatch[2] : (altMatch ? altMatch[2] : '')
  
  // For references.md files, collect content from all sub-sections
  if (!sourceMatch && !altMatch) {
    const allSections = [...markdown.matchAll(/^#{1,2}\s+(.+)\s*\n([\s\S]*?)(?=\n#{1,2}\s|$)/gm)]
    for (const sec of allSections) {
      block += sec[2] + '\n'
    }
    // If we still have nothing, try the entire content
    if (!block.trim()) block = markdown
  }

  if (block) {
    const lines = block.split('\n')
    let lastItemName = ''
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      // Check if this is a numbered or bullet item
      const itemMatch = trimmed.match(/^[\d]+[\.\)]\s*(.+)/)
      if (itemMatch) {
        lastItemName = itemMatch[1].replace(/\*\*/g, '').trim()
      }

      // Look for URLs on this line
      const urlMatch = trimmed.match(/(https?:\/\/[^\s\)]+)/)
      if (urlMatch) {
        // Use the item name if we have one, otherwise use the line text minus URL
        const name = lastItemName || trimmed.replace(urlMatch[0], '').replace(/^[-–—]\s*/, '').trim() || urlMatch[0]
        sources.push({
          name: name.substring(0, 120),
          url: urlMatch[1],
          type: guessSourceType(urlMatch[1]),
        })
        lastItemName = '' // Reset after consuming
      }
    }
  }
  return sources
}

/**
 * Parse sources from references.md — handles unstructured format:
 * 1. **Title** 
 *    - https://url.com
 * 2. **Another Source**
 *    - https://other.com
 */
function parseReferencesFile(markdown) {
  const sources = []
  const lines = markdown.split('\n')
  let lastItemName = ''

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    // Check if this is a numbered item (the name)
    const itemMatch = trimmed.match(/^[\d]+[\.\)]\s*(.+)/)
    if (itemMatch) {
      lastItemName = itemMatch[1].replace(/\*\*/g, '').replace(/[\u201C\u201D\u201E]/g, '').trim()
    }

    // Look for URLs on this line
    const urlMatch = trimmed.match(/(https?:\/\/[^\s\)]+)/)
    if (urlMatch) {
      const name = lastItemName || trimmed.replace(urlMatch[0], '').replace(/^[-–—]\s*/, '').trim() || urlMatch[0]
      sources.push({
        name: name.substring(0, 120),
        url: urlMatch[1],
        type: guessSourceType(urlMatch[1]),
      })
      lastItemName = '' // Reset after consuming so next URL without item gets its own name
    }
  }

  return sources
}

function guessSourceType(url) {
  if (url.includes('pib.gov') || url.includes('gov.in') || url.includes('defense.gov')) return 'official'
  if (url.includes('doi.org') || url.includes('scholar')) return 'academic'
  if (url.includes('wikipedia')) return 'primary'
  return 'news'
}

// ============================================================
// 4. Parse timeline from markdown
// ============================================================
function parseTimeline(markdown, frontmatter) {
  const events = []
  // Try to find a timeline section
  const timelineMatch = markdown.match(/^##\s+(Timeline|Key Dates|History)\s*\n([\s\S]*?)(?=\n##\s|$)/im)
  if (timelineMatch) {
    const block = timelineMatch[2]
    const lines = block.split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      // Match "**YYYY-MM-DD** — Description" or "**YYYY** — Description" or "- YYYY: Description"
      const dateMatch = trimmed.match(/^\**?\s*(\d{4}(?:-\d{2}(?:-\d{2})?)?)\**?\s*[—–:-]\s*(.+)/)
      if (dateMatch) {
        events.push({
          date: dateMatch[1],
          title: dateMatch[2].substring(0, 60),
          description: dateMatch[2],
        })
      }
    }
  }
  return events
}

// ============================================================
// 5. Markdown → sections
// ============================================================
const SECTION_TYPE_MAP = {
  // Executive Summary
  'executive': 'executive-summary',
  'executive-summary': 'executive-summary',
  'summary': 'executive-summary',
  'key takeaways': 'executive-summary',
  'overview': 'executive-summary',
  'context': 'executive-summary',
  'cold open': 'executive-summary',
  'key outcomes': 'executive-summary',
  'key findings': 'executive-summary',
  'the lede': 'executive-summary',
  // Quick Facts
  'quick facts': 'quick-facts',
  'key data points': 'quick-facts',
  'key data': 'quick-facts',
  // Key Numbers
  'key numbers': 'key-numbers',
  'by the numbers': 'key-numbers',
  'the numbers': 'key-numbers',
  'the numbers behind the story': 'key-numbers',
  'the numbers in context': 'key-numbers',
  'technical specifications': 'key-numbers',
  'record temperatures': 'key-numbers',
  'tariff reductions': 'key-numbers',
  'key appointments': 'key-numbers',
  'growth outlook': 'key-numbers',
  'inflation outlook': 'key-numbers',
  'the scale of the crisis': 'key-numbers',
  'data journalism': 'key-numbers',
  // Timeline / History
  'timeline': 'timeline',
  'history': 'timeline',
  'key dates': 'timeline',
  'background': 'timeline',
  'the journey': 'timeline',
  'the timeline': 'timeline',
  'timeline of impacts': 'timeline',
  'how we got here': 'timeline',
  'a building with a history': 'timeline',
  // Evidence / Fact Check
  'evidence': 'evidence',
  'fact check': 'evidence',
  'verification': 'evidence',
  'the recognition': 'evidence',
  'what the headlines missed': 'evidence',
  'the economic toll': 'evidence',
  'the evidence': 'evidence',
  'the team behind the innovation': 'evidence',
  'the earth prize 2026': 'evidence',
  'the fake supreme court website': 'evidence',
  'lessons from the anti-maoist campaign': 'evidence',
  'human and economic toll': 'evidence',
  'impact on industry': 'evidence',
  'the financial reality': 'evidence',
  'the human cost': 'evidence',
  'the master plan connection': 'evidence',
  'the pre-warnings: bjp knew': 'evidence',
  'india\'s trust decline': 'evidence',
  'impact on iphone production': 'evidence',
  // Root Cause
  'root cause': 'root-cause',
  'causes': 'root-cause',
  'why it matters': 'root-cause',
  'the problem': 'root-cause',
  'the climate context': 'root-cause',
  'who\'s at risk': 'root-cause',
  'the context': 'root-cause',
  'what\'s at stake': 'root-cause',
  'analysis': 'root-cause',
  'the problem with microplastics': 'root-cause',
  'the 15-metre loophole': 'root-cause',
  'the pattern': 'root-cause',
  'what went wrong: a systems failure': 'root-cause',
  'why technology isn\'t the answer': 'root-cause',
  'the real problem: governance': 'root-cause',
  'why this story matters': 'root-cause',
  'the drone threat': 'root-cause',
  // System Map
  'system map': 'system-map',
  'key players': 'system-map',
  'the players': 'system-map',
  'the family network': 'system-map',
  // Debate
  'the debate': 'debate',
  'debate': 'debate',
  'pros and cons': 'debate',
  'the response': 'debate',
  'what both sides are missing': 'debate',
  'the privacy question': 'debate',
  'global response': 'debate',
  'enforcement and oversight': 'debate',
  'geopolitical implications': 'debate',
  'the data sovereignty question': 'debate',
  'the whatsapp challenge': 'debate',
  'winners and losers': 'debate',
  'political significance': 'debate',
  'the defense: real estate "since 2010"': 'debate',
  'the counter-argument: a pattern too precise to ignore': 'debate',
  'accountability and citizens': 'debate',
  'implications': 'debate',
  'regional reactions': 'debate',
  'strategic implications': 'debate',
  // The Fix / Solutions
  'the fix': 'the-fix',
  'solutions': 'the-fix',
  'what can be done': 'the-fix',
  'implementation approach': 'the-fix',
  'implementation': 'the-fix',
  'adaptation and response': 'the-fix',
  'what will actually fix them': 'the-fix',
  'policy response': 'the-fix',
  'response and recovery': 'the-fix',
  // Global Comparison
  'global comparison': 'global-comparison',
  'international': 'global-comparison',
  'the competitive landscape': 'global-comparison',
  'global context': 'global-comparison',
  'international dimension': 'global-comparison',
  'global supercomputing race': 'global-comparison',
  'comparison with other nations': 'global-comparison',
  'ransomware landscape': 'global-comparison',
  // What's Next / Outlook
  "what's next": 'whats-next',
  'next steps': 'whats-next',
  'outlook': 'whats-next',
  'the impact': 'whats-next',
  'the bigger picture': 'whats-next',
  'the road ahead': 'whats-next',
  'the bottom line': 'whats-next',
  'what to watch': 'whats-next',
  'the forecast': 'whats-next',
  'what actually changed': 'whats-next',
  'what it means': 'whats-next',
  'what comes next': 'whats-next',
  'what happens next': 'whats-next',
  'challenges ahead': 'whats-next',
  'final analysis': 'whats-next',
  'the verdict': 'whats-next',
  'final takeaway': 'whats-next',
  'implementation challenges': 'whats-next',
  // Sources
  'sources': 'sources',
  'references': 'sources',
  'footnotes': 'sources',
  // Knowledge / Related
  'related': 'knowledge',
  'knowledge graph': 'knowledge',
  // Explained (general content sections)
  'the discovery': 'explained',
  'the science': 'explained',
  'how it works': 'explained',
  'the meeting': 'explained',
  'the ban': 'explained',
  'five issues on the table': 'explained',
  'what changed': 'explained',
  'what\'s happening': 'explained',
  'what happened': 'explained',
  'the details': 'explained',
  'the deal': 'explained',
  'the model': 'explained',
  'technical capabilities': 'explained',
  'safety concerns': 'explained',
  'industry response': 'explained',
  'regulatory implications': 'explained',
  'the story': 'explained',
  'the teesta gambit': 'explained',
  'mongla port: the prize china always wanted': 'explained',
  'the china-myanmar-bangladesh economic corridor': 'explained',
  'military and diplomatic alignment': 'explained',
  'the domestic context': 'explained',
  'the economic calculus': 'explained',
  'the regional picture': 'explained',
  'the outlook': 'explained',
  'the bill\'s key provisions': 'explained',
  'the raid': 'explained',
  'modus operandi': 'explained',
  'the lineshine supercomputer': 'explained',
  'lac status': 'explained',
  'the intelligence reset': 'explained',
  'how plas-stick works': 'explained',
  'the science behind it': 'explained',
  'the guidelines': 'explained',
  'seven sutras framework': 'explained',
  'dpdp act rules': 'explained',
  'it rules amendments': 'explained',
  'crypto regulation': 'explained',
  'the deal structure': 'explained',
  'defence and tech cooperation': 'explained',
  'the moment everything went wrong': 'explained',
  'the reshuffle': 'explained',
  'portfolio changes': 'explained',
  'a city transformed — and a family that got there first': 'explained',
  'where the land is — and why it matters': 'explained',
  'the attack': 'explained',
  'key provisions': 'explained',
  // Full-story specific headings (hydrogen story)
  'the world\'s first nuclear-powered hydrogen plant is in india. here\'s why that matters.': 'executive-summary',
  'the problem: hydrogen\'s dirty secret': 'root-cause',
  'the discovery: a chemical loop driven by nuclear heat': 'explained',
  'the journey: four decades to a world first': 'timeline',
  'the science: how it works': 'explained',
  'the recognition: a global first for indian nuclear technology': 'evidence',
  'the impact: beyond the laboratory': 'whats-next',
  'what\'s next: from demonstrator to scale': 'whats-next',
  'the bigger picture: bhabha\'s blueprint, 75 years on': 'whats-next',
  // AI Governance specific
  'the framework: seven sutras': 'explained',
  'the institutions': 'explained',
  'the manav vision': 'explained',
  // Border tensions specific
  'historical context (1950–1980s)': 'timeline',
  'escalation era (1990s–2010s)': 'timeline',
  'current dynamics (2020–2026)': 'timeline',
  // Prefix-based matching helpers
  'the sticker price vs. the real price': 'evidence',
  'where the money goes': 'explained',
  'the strategic petroleum reserve: emptying america\'s insurance policy': 'evidence',
  'the congressional reckoning': 'debate',
  'economic fallout: the consumer\'s share': 'evidence',
}

// Headings to EXCLUDE from section rendering (shown only in body)
const EXCLUDED_HEADINGS = new Set([
  'fact-check summary',
  'sources',
  'references',
  'footnotes',
  'related stories',
  'related reading',
])

// Prefix-based matching for headings that follow common patterns
// but may have unique suffixes (e.g., "The Problem: Microplastics" → root-cause)
const PREFIX_MAP = [
  ['the problem', 'root-cause'],
  ['the science', 'explained'],
  ['the discovery', 'explained'],
  ['the journey', 'timeline'],
  ['the impact', 'whats-next'],
  ['the big picture', 'whats-next'],
  ['the recognition', 'evidence'],
  ['the bottom line', 'whats-next'],
  ['the research', 'evidence'],
  ['the data', 'key-numbers'],
  ['the numbers', 'key-numbers'],
  ['the timeline', 'timeline'],
  ['the context', 'root-cause'],
  ['the background', 'timeline'],
  ['key findings', 'executive-summary'],
  ['key outcomes', 'executive-summary'],
  ['quick facts', 'quick-facts'],
  ['key data', 'quick-facts'],
  ['global context', 'global-comparison'],
  ['global response', 'debate'],
  ['the economic', 'evidence'],
  ['the human', 'evidence'],
  ['what\'s next', 'whats-next'],
  ['what comes next', 'whats-next'],
  ['what happens next', 'whats-next'],
  ['challenges ahead', 'whats-next'],
  ['final', 'whats-next'],
  ['the future', 'whats-next'],
  ['the outlook', 'whats-next'],
  ['the forecast', 'whats-next'],
  ['the debate', 'debate'],
  ['the argument', 'debate'],
  ['counter', 'debate'],
  ['criticism', 'debate'],
  ['the fix', 'the-fix'],
  ['solutions', 'the-fix'],
  ['what can be done', 'the-fix'],
  ['how it works', 'explained'],
  ['what happened', 'explained'],
  ['what changed', 'explained'],
  ['the story', 'explained'],
  ['the details', 'explained'],
  ['the deal', 'explained'],
  ['the model', 'explained'],
  ['technical', 'explained'],
  ['the framework', 'explained'],
  ['the guidelines', 'explained'],
  ['the timeline:', 'timeline'],
  ['the problem:', 'root-cause'],
  ['the discovery:', 'explained'],
  ['the science:', 'explained'],
  ['the bigger picture:', 'whats-next'],
  ['the recognition:', 'evidence'],
  ['the impact:', 'whats-next'],
  ['context:', 'root-cause'],
  ['evidence:', 'evidence'],
]

function markdownToSections(markdown) {
  const sections = []
  const lines = markdown.split('\n')
  let currentSection = null
  let currentBody = []
  let skippedHeadingNames = []

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)/)
    if (h2Match) {
      // Save previous section
      if (currentSection) {
        sections.push({ ...currentSection, body: currentBody.join('\n').trim() })
      }
      
      currentBody = []
      const heading = h2Match[1].toLowerCase().trim()
      const headingTitle = h2Match[1].trim()
      
      // Skip excluded headings — their content goes into the body
      if (EXCLUDED_HEADINGS.has(heading)) {
        currentSection = null
        continue
      }
      
      let type = SECTION_TYPE_MAP[heading]
      
      // If no exact match, try prefix-based matching
      if (!type) {
        for (const [prefix, sectionType] of PREFIX_MAP) {
          if (heading.startsWith(prefix)) {
            type = sectionType
            break
          }
        }
      }
      
      currentSection = {
        type: type || 'explained',  // Default to 'explained' for any unmapped heading
        title: headingTitle,
        body: '',
      }
    } else {
      currentBody.push(line)
    }
  }
  
  if (currentSection) {
    sections.push({ ...currentSection, body: currentBody.join('\n').trim() })
  }
  
  return sections
}

// ============================================================
// 6. Parse a story
// ============================================================
function parseStory(dir) {
  const slug = dir.name
  const storyDir = path.join(STORIES_DIR, slug)
  const files = fs.readdirSync(storyDir)
  
  // Prioritise exact slug match, then any main content .md file
  const mdFile = files.find(f => f === `${slug}.md`) || files.find(f => f.endsWith('.md') && !['charts','references','seo','images','timeline','videos','audit','research','dossier'].some(s => f.includes(s)))
  const htmlFile = files.find(f => f === `${slug}.html`)
  
  let raw = ''
  let isHtml = false
  
  if (mdFile) {
    raw = fs.readFileSync(path.join(storyDir, mdFile), 'utf-8')
  } else if (htmlFile) {
    raw = fs.readFileSync(path.join(storyDir, htmlFile), 'utf-8')
    isHtml = true
  } else {
    // Try any md file
    const anyMd = files.find(f => f.endsWith('.md'))
    if (anyMd) {
      raw = fs.readFileSync(path.join(storyDir, anyMd), 'utf-8')
    } else {
      return null
    }
  }
  
  let data = {}
  let content = raw
  let frontmatter = {}
  
  if (!isHtml) {
    try {
      const parsed = matter(raw)
      frontmatter = parsed.data
      content = parsed.content
      // If frontmatter exists but has no title, extract from first h1
      if (!frontmatter.title) {
        const titleMatch = content.match(/^#\s+(.+)$/m)
        if (titleMatch) frontmatter.title = titleMatch[1].trim()
      }
    } catch {
      // No frontmatter - extract title from first h1
      const titleMatch = raw.match(/^#\s+(.+)$/m)
      if (titleMatch) frontmatter.title = titleMatch[1].trim()
      content = raw
    }
  }
  
  // Read extras
  const extras = {}
  for (const file of files) {
    const fname = file.toLowerCase()
    if (fname === mdFile || fname === htmlFile) continue
    if (fname.endsWith('.md') || fname.endsWith('.html') || fname.endsWith('.json')) {
      try {
        extras[path.basename(file, path.extname(file))] = fs.readFileSync(path.join(storyDir, file), 'utf-8')
      } catch {}
    }
  }
  
  // Build content
  const tags = (frontmatter.tags || []).map(t => String(t).toLowerCase())
  const title = frontmatter.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const summary = frontmatter.summary || ''
  const category = extractCategory(tags, frontmatter.category)
  const date = frontmatter.published_at || frontmatter.date || frontmatter.publishedAt || frontmatter.story?.published_at || frontmatter.story?.date || frontmatter.story?.publishedAt || (extras.meta ? (JSON.parse(extras.meta).publishedAt || '') : '') || ''
  const author = frontmatter.author || 'The Breakdown Desk'
  const readingTime = frontmatter.reading_time || frontmatter.read_time || frontmatter.readTime || Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
  const hero = frontmatter.hero || frontmatter.image || frontmatter.fact_check_image || ''
  const caption = frontmatter.caption || ''
  
  // Convert markdown to HTML
  let htmlBody = ''
  try {
    if (isHtml) {
      htmlBody = content
    } else {
      htmlBody = marked.parse(content)
    }
  } catch {
    htmlBody = `<p>${content.substring(0, 500)}...</p>`
  }
  
  // Parse sections from markdown content (not HTML)
  const sections = isHtml ? [] : markdownToSections(content)
  
  // Parse sources from main content and from extras (references.md)
  let sources = parseSources(content)
  if (extras.references) {
    const refSources = parseReferencesFile(extras.references)
    sources = [...sources, ...refSources]
  }
  // Deduplicate sources by URL
  const seen = new Set()
  sources = sources.filter(s => {
    if (seen.has(s.url)) return false
    seen.add(s.url)
    return true
  })
  // If we have sources, ensure a 'sources' section exists in content
  if (sources.length > 0 && !sections.some(s => s.type === 'sources')) {
    sections.push({
      type: 'sources',
      title: 'Primary Sources',
      body: '',
    })
  }
  const timeline = parseTimeline(content, frontmatter)
  
  // Key numbers from frontmatter
  let keyNumbers = []
  if (frontmatter.keyNumbers) {
    keyNumbers = frontmatter.keyNumbers
  }
  
  return {
    slug,
    title,
    summary,
    category,
    tags,
    publishedAt: date,
    readTime: readingTime,
    hero,
    caption,
    author,
    content: sections,
    metadata: {
      keyNumbers,
      timeline,
      sources,
    },
    body: htmlBody,
  }
}

// ============================================================
// 7. Generate output
// ============================================================
function generateOutput(siteConfig, stories) {
  // stories.ts
  let code = `// Auto-generated by build-content.mjs — do not edit directly
import type { IntelligenceReport, Category } from '@/types'

export const ALL_STORIES: (IntelligenceReport & { body?: string })[] = ${JSON.stringify(stories, null, 2)}
`
  fs.writeFileSync(path.join(OUTPUT_DIR, 'stories.ts'), code)
  
  // site-config.ts
  const configCode = `// Auto-generated by build-content.mjs
export const SITE_CONFIG = ${JSON.stringify(siteConfig, null, 2)}

export const HERO = {
  title: ${JSON.stringify(siteConfig.hero?.['hero-title'] || 'THE BREAKDOWN')},
  tagline: ${JSON.stringify(siteConfig.hero?.['hero-tagline'] || 'Complex stories. Clear analysis.')},
}

export const FEATURED = {
  title: ${JSON.stringify(siteConfig.featured?.['featured-title'] || 'Latest Stories')},
}

export const TICKER_HEADLINES = ${JSON.stringify(siteConfig.ticker?.headlines || [])}

export const STATS = ${JSON.stringify(siteConfig.stats?.stats || [])}

export const ABOUT = {
  heading: ${JSON.stringify(siteConfig.about?.['about-heading'] || 'Complex Stories. Clear Analysis.')},
  p1: ${JSON.stringify(siteConfig.about?.['about-p1'] || '')},
  p2: ${JSON.stringify(siteConfig.about?.['about-p2'] || '')},
  p3: ${JSON.stringify(siteConfig.about?.['about-p3'] || '')},
  pillars: ${JSON.stringify(siteConfig.about?.pillars || [])},
}
`
  fs.writeFileSync(path.join(OUTPUT_DIR, 'site-config.ts'), configCode)
  
  // barrel export
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), 
    `export { ALL_STORIES } from './stories'\nexport { SITE_CONFIG, HERO, FEATURED, TICKER_HEADLINES, STATS, ABOUT } from './site-config'\n`)
  
  console.log(`\nGenerated:`)
  console.log(`  - ${stories.length} stories → src/lib/content/generated/stories.ts`)
  console.log(`  - Site config → src/lib/content/generated/site-config.ts`)
}

// ============================================================
// Main
// ============================================================
console.log('\n📦 The Breakdown OS — Content Pipeline v2\n')

const siteConfig = parseConfigJsons()
console.log(`✓ Parsed site config: ${Object.keys(siteConfig).length} sections (${Object.keys(siteConfig).join(', ')})`)

const storyDirs = fs.readdirSync(STORIES_DIR, { withFileTypes: true }).filter(d => d.isDirectory())
const stories = []
for (const dir of storyDirs) {
  const story = parseStory(dir)
  if (story) stories.push(story)
}

stories.sort((a, b) => {
  const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
  const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
  return db - da
})

console.log(`✓ Parsed ${stories.length} stories`)

generateOutput(siteConfig, stories)
