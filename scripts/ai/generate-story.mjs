/**
 * AI Story Generator for The Breakdown
 *
 * Generates a complete story package (6 markdown files + HTML + Supabase entry)
 * from a topic and optional source URLs using OpenAI.
 *
 * Usage:
 *   node scripts/ai/generate-story.js --topic "..." --sources "url1, url2" [--publish]
 *
 *   --topic     Required. Story topic / headline.
 *   --sources   Optional. Comma-separated source URLs.
 *   --category  Optional. Override auto-detected category.
 *   --publish   Optional. Also update publish-all-beats.js with this story.
 *
 * Requires OPENAI_API_KEY env var or in .env at project root.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { stdin, stdout, env } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');

// ---- Config ----
const MODEL = 'gpt-4o-mini';
const TEMPERATURE = 0.7;

const VALID_CATEGORIES = [
  'Government', 'Education', 'Technology', 'Economy', 'Geopolitics',
  'Policy', 'Media', 'National Security', 'Tech & Innovation'
];

// ---- API key resolution ----
function getApiKey() {
  if (env.OPENAI_API_KEY) return env.OPENAI_API_KEY;
  try {
    const envPath = join(PROJECT_ROOT, '.env');
    if (existsSync(envPath)) {
      const lines = readFileSync(envPath, 'utf-8').split('\n');
      for (const line of lines) {
        const match = line.match(/^OPENAI_API_KEY=(.+)$/);
        if (match) return match[1].trim().replace(/^["']|["']$/g, '');
      }
    }
  } catch { /* ignore */ }
  return null;
}

// ---- OpenAI helper ----
async function callOpenAI(systemPrompt, userPrompt, maxTokens = 4096) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('OPENAI_API_KEY not found. Set it in .env or as an environment variable.');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: TEMPERATURE,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

// ---- Slug generation ----
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

// ---- Readline prompt ----
function ask(question) {
  return new Promise(resolve => {
    const rl = createInterface({ input: stdin, output: stdout });
    rl.question(question, answer => { rl.close(); resolve(answer); });
  });
}

// ---- Category prompt ----
async function detectCategory(topic, sources) {
  const prompt = `Given this news topic, choose the SINGLE best category from: ${VALID_CATEGORIES.join(', ')}
Respond with ONLY the category name, nothing else.

Topic: ${topic}${sources ? `\nSources: ${sources}` : ''}`;
  const result = await callOpenAI(
    'You are a news editor categorizing stories. Respond with exactly one category name.',
    prompt, 50
  );
  const clean = result.trim();
  return VALID_CATEGORIES.includes(clean) ? clean : 'Technology';
}

// ---- Generate story slug ----
async function generateSlug(topic) {
  const prompt = `Generate a URL-friendly slug (50-80 chars, lowercase, hyphens) for this story topic.
Respond with ONLY the slug, nothing else.

Topic: ${topic}`;
  const result = await callOpenAI(
    'You generate URL slugs for news articles. Respond with only the slug.',
    prompt, 50
  );
  return slugify(result.trim()).substring(0, 80);
}

// ---- File generators ----
async function generateFrontmatter(topic, slug, category, summary) {
  const prompt = `Generate YAML frontmatter for a story with the following details. Use the EXACT format below and fill in realistic values:

---
layout: story
story:
  title: "${topic}"
  slug: "${slug}"
  category: "${category}"
  summary: "${summary}"
  meta_title: "${topic} | The Breakdown"
  meta_description: "${summary}"
  author: "The Breakdown Team"
  read_time: ${Math.floor(Math.random() * 8) + 8}
  tags:
    - "tag1"
    - "tag2"
  published_at: "${new Date().toISOString()}"
  updated_at: "${new Date().toISOString()}"
  status: "published"
  og_image: "https://thebreakdown.in/og-image.png"
---

Return ONLY the complete frontmatter block (between --- markers) with populated values. Use realistic tags (3-8 tags). read_time should be 8-15 minutes based on topic complexity.`;

  return callOpenAI(
    'You generate YAML frontmatter for news articles. Output ONLY the frontmatter block.',
    prompt, 500
  );
}

async function generateMainMarkdown(topic, slug, category, sources) {
  const editorialEngine = readFileSync(join(__dirname, 'editorial-engine.md'), 'utf-8');

  const sysPrompt = `${editorialEngine}

Output a complete news article in markdown.

Format:
- Start with YAML frontmatter (layout, title, slug, category, summary, meta_title, meta_description, tags, author, read_time, published_at, updated_at, status, og_image)
- Use ## headings for sections matching the 10-part structure
- Include data points, statistics, dates, sourced quotes
- Write 1500-2500 words
- British Indian English spelling`;

  const userPrompt = `Write a complete news article about: ${topic}
${sources ? `\nReference these sources: ${sources}` : ''}
Category: ${category}
Slug: ${slug}

Follow the Story Architecture Engine above. Include YAML frontmatter.`;

  return callOpenAI(sysPrompt, userPrompt, 8192);
}

async function generateImages(topic, sources) {
  const sysPrompt = `You generate image asset specifications for news articles in markdown format.

Use this EXACT format:

# Images for: {Title}

## Hero Image
**File:** \`filename.jpg\`
**Source:** Attribution source
**Caption:** Description...
**Why:** Why this image...

### Image {N} — Title
...repeat...

Generate 4-7 images including:
- Hero image (required)
- Supporting images with useful explanatory visuals
- If charts are referenced, note them as "Type: Generated SVG data visualization (see charts.md)"`;

  return callOpenAI(sysPrompt,
    `Generate image specifications for this story: ${topic}${sources ? `\nSources: ${sources}` : ''}`,
    2048);
}

async function generateCharts(topic, sources) {
  const sysPrompt = `You generate chart specifications for news articles in markdown format.

Use this EXACT format:

# Charts & Data Visualizations for: {Title}

## Chart 1 — Title
**Type:** Grouped bar chart / Line chart / Table / Stat card
**Alt text:** Description for screen readers...
**Data points:** | Header1 | Header2 |
|---|---|
| Value | Value |
**Source:** Source attribution

Generate 3-6 charts with realistic data tables. Include the data points as markdown tables.
Types: grouped bar chart, line chart, stat card, comparison table, horizontal bar chart, timeline.`;

  return callOpenAI(sysPrompt,
    `Generate chart specifications for this story: ${topic}${sources ? `\nSources: ${sources}` : ''}`,
    3072);
}

async function generateVideos(topic) {
  const sysPrompt = `You generate video embed recommendations for news articles in markdown format.

Use this EXACT format:

# Videos for: {Title}

## Video 1 — Title
**URL:** SEARCH_KEYWORD_DESCRIPTION
**Source:** YouTube — Channel Name
**Duration:** ~N min
**Relevance:** Why this video matters
**Embed:** Yes / Link only

Generate 3-5 relevant video suggestions. Use SEARCH_KEYWORD placeholders for actual URLs.
For each video, indicate if it should be embedded (Yes) or linked only (Link only).`;

  return callOpenAI(sysPrompt,
    `Recommend relevant videos for this story: ${topic}`,
    2048);
}

async function generateSEO(topic, slug, category, summary) {
  const sysPrompt = `You are an SEO specialist for a news publication. Generate complete SEO metadata in markdown format.

Use this EXACT format:

# SEO Metadata: {Title}

## Title Tag
Title tag here (under 60 chars)

## Meta Description
Meta description here (under 160 chars)

## Open Graph Tags
- og:title: ...
- og:description: ...
- og:type: article
- og:url: https://thebreakdown.in/story/{slug}
- og:image: https://thebreakdown.in/og-image.png
- article:published_time: ISO date
- article:author: The Breakdown

## Twitter Card
- twitter:card: summary_large_image
- twitter:site: @thebreakdowndaily

## Schema.org Markup
\`\`\`json
...
\`\`\`

## Focus Keywords
- keyword1
- keyword2

## Canonical URL
https://thebreakdown.in/story/{slug}

## Robots
index, follow

Generate complete metadata matching the topic.`;

  return callOpenAI(sysPrompt,
    `Generate SEO metadata for:
Title: ${topic}
Slug: ${slug}
Category: ${category}
Summary: ${summary}`,
    2048);
}

async function generateReferences(topic, sources) {
  const sysPrompt = `You generate reference/source lists for news articles in markdown format.

Use this EXACT format:

# References: {Title}

1. **Article Title** — Publisher (Month Day, Year)
   https://example.com/article

Generate 10-20 realistic-sounding references with proper publisher names and plausible URLs. Include:
- Primary sources / official announcements
- News reports from major outlets
- Expert analyses
- Data sources

Use real publishers (Reuters, BBC, Indian Express, Economic Times, Bloomberg, etc.).
Add dates that are recent (within the past 60 days).`;

  return callOpenAI(sysPrompt,
    `Generate references for this story: ${topic}${sources ? `\nUser-provided sources to incorporate: ${sources}` : ''}`,
    3072);
}

async function generateBodyHTML(topic, slug, category, sources) {
  const editorialEngine = readFileSync(join(__dirname, 'editorial-engine.md'), 'utf-8');

  const sysPrompt = `${editorialEngine}

Generate a complete HTML body for a news article. Output ONLY valid HTML for inside a <div class="story-body">.

Rules:
- Use semantic HTML: <h2>, <h3>, <p>, <blockquote>, <figure>, <figcaption>
- Embed SVG charts inline as <svg> elements with viewBox
- Use <figure class="chart-figure"> for data visualizations
- Use <blockquote class="pull-quote"> for key quotes
- Image placeholders: <img src="/og-image.png" alt="..." loading="lazy" style="width:100%;max-width:800px;height:auto;border-radius:8px;margin:1.5rem 0;">
- British Indian English spelling
- 1500-2500 words
- End with a strong conclusion

Output ONLY the HTML.`;

  return callOpenAI(sysPrompt,
    `Write the full HTML body for this news article:
Topic: ${topic}
Category: ${category}
Slug: ${slug}${sources ? `\nSources to reference: ${sources}` : ''}

Include 3-4 inline SVG data visualizations with realistic data.
Include 2-3 pull-quote blockquotes.
Include proper attribution and sourced data points.`,
    12288);
}

// ---- Update publish-all-beats.js ----
function addToPublishScript(slug, title, category, summary, readTime, tags, metaTitle, metaDescription, contentFile) {
  const scriptPath = join(PROJECT_ROOT, 'fact-check-cms', 'scripts', 'publish-all-beats.js');
  let content = readFileSync(scriptPath, 'utf-8');

  const tagArray = tags.map(t => `'${t.replace(/'/g, "\\'")}'`).join(',\n    ');

  const newEntry = `  {
    title: '${title.replace(/'/g, "\\'")}',
    slug: '${slug}',
    category: '${category}',
    summary: '${summary.replace(/'/g, "\\'")}',
    read_time: ${readTime},
    tags: [${tagArray}],
    meta_title: '${metaTitle.replace(/'/g, "\\'")}',
    meta_description: '${summary.replace(/'/g, "\\'")}',
    article_section: '${category}',
    content_file: '${contentFile}',
    story_dir: '${slug}',
    fact_check_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop'
  }`;

  // Insert before the closing bracket of the stories array
  const insertPos = content.lastIndexOf('];');
  if (insertPos === -1) throw new Error('Could not find end of stories array');

  const before = content.substring(0, insertPos).trimEnd();
  const after = content.substring(insertPos);
  content = before + ',\n' + newEntry + '\n' + after;

  writeFileSync(scriptPath, content, 'utf-8');
  return scriptPath;
}

// ---- Main ----
async function main() {
  // Parse CLI args
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const val = process.argv[i + 1];
      if (val && !val.startsWith('--')) {
        args[key] = val;
        i++;
      } else {
        args[key] = true;
      }
    }
  }

  // Welcome
  console.log('\n=== AI Story Generator ===\n');

  // Validate API key
  if (!getApiKey()) {
    console.error('ERROR: OPENAI_API_KEY not found.');
    console.error('Set it in .env at project root or as an environment variable.');
    console.error('');
    console.error('  echo "OPENAI_API_KEY=sk-..." > .env');
    process.exit(1);
  }

  // Get topic
  let topic = args.topic;
  if (!topic) {
    topic = await ask('Story topic: ');
    if (!topic) { console.error('Topic required.'); process.exit(1); }
  }
  console.log(`\nTopic: ${topic}`);

  // Get sources
  let sources = args.sources;
  if (!sources) {
    sources = await ask('Sources (comma-separated URLs, optional): ');
  }
  if (sources) console.log(`Sources: ${sources}`);

  // Get or detect category
  let category = args.category;
  if (!category) {
    console.log('\nDetecting category...');
    category = await detectCategory(topic, sources);
  }
  console.log(`Category: ${category}`);

  // Generate slug
  let slug = args.slug;
  if (!slug) {
    console.log('\nGenerating slug...');
    slug = await generateSlug(topic);
  }
  console.log(`Slug: ${slug}`);

  // Create story directory
  const storyDir = join(PROJECT_ROOT, 'stories', slug);
  if (existsSync(storyDir)) {
    const overwrite = await ask(`Directory ${slug} already exists. Overwrite? (y/N): `);
    if (overwrite.toLowerCase() !== 'y') { console.log('Aborted.'); process.exit(0); }
  }
  mkdirSync(storyDir, { recursive: true });
  console.log(`\nDirectory: stories/${slug}/`);

  // --- Generate files ---
  const contentFile = `${slug}.html`;
  const mdFiles = [
    { name: `${slug}.md`, label: 'Article (markdown)', gen: () => generateMainMarkdown(topic, slug, category, sources) },
    { name: 'images.md', label: 'Images', gen: () => generateImages(topic, sources) },
    { name: 'charts.md', label: 'Charts', gen: () => generateCharts(topic, sources) },
    { name: 'videos.md', label: 'Videos', gen: () => generateVideos(topic) },
    { name: 'seo.md', label: 'SEO metadata', gen: () => generateSEO(topic, slug, category, topic) },
    { name: 'references.md', label: 'References', gen: () => generateReferences(topic, sources) },
    { name: contentFile, label: 'HTML body', gen: () => generateBodyHTML(topic, slug, category, sources) }
  ];

  let tags = [];
  let readTime = 10;
  let metaTitle = `${topic} | The Breakdown`;

  for (const file of mdFiles) {
    console.log(`\n--- Generating ${file.label}...`);
    try {
      const content = await file.gen();

      // Parse metadata from frontmatter if this is the main markdown
      if (file.name === `${slug}.md`) {
        const tagMatch = content.match(/tags:\s*\n((?:\s+-\s+"[^"]*"\n?)+)/);
        if (tagMatch) {
          tags = [...tagMatch[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
        }
        const rtMatch = content.match(/read_time:\s*(\d+)/);
        if (rtMatch) readTime = parseInt(rtMatch[1]);
        const mtMatch = content.match(/meta_title:\s*"([^"]+)"/);
        if (mtMatch) metaTitle = mtMatch[1];
      }

      writeFileSync(join(storyDir, file.name), content, 'utf-8');
      console.log(`  Saved: stories/${slug}/${file.name}`);
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
      console.log('  Continuing with remaining files...');
    }
  }

  // --- Update publish script ---
  if (args.publish) {
    console.log('\n--- Updating publish-all-beats.js...');
    try {
      const scriptPath = addToPublishScript(
        slug, topic, category, topic, readTime,
        tags.length > 0 ? tags : [category],
        metaTitle, topic, contentFile
      );
      console.log(`  Updated: fact-check-cms/scripts/publish-all-beats.js`);
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
    }
  }

  // --- Summary ---
  console.log('\n=== Done ===');
  console.log(`  Topic:    ${topic}`);
  console.log(`  Slug:     ${slug}`);
  console.log(`  Category: ${category}`);
  console.log(`  Directory: stories/${slug}/`);
  console.log(`  Files:    ${mdFiles.length} created`);
  if (args.publish) console.log(`  Publish:  Added to publish-all-beats.js`);
  console.log('\nNext steps:');
  console.log(`  1. Review/edit files in stories/${slug}/`);
  console.log(`  2. Run: node scripts/ai/generate-story-html.js stories/${slug}/${slug}.md`);
  console.log('  3. Or manually write the HTML and run publish-all-beats.js');
  console.log('');
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
