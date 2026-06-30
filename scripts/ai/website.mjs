/**
 * THE BREAKDOWN OS — Phase 6: Production HTML Generator
 *
 * Generates a complete, production-ready story page HTML file
 * with inline SVGs, structured data, and responsive design.
 *
 * Usage:
 *   node scripts/ai/website.mjs --slug <slug>
 *   node scripts/ai/website.mjs --topic "..." --content "article text"
 *
 * Requires OPENAI_API_KEY in .env at project root.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');

import { callOpenAI, requireApiKey, loadAgent, slugify, ask } from './lib.mjs';

async function main() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const val = process.argv[i + 1];
      if (val && !val.startsWith('--')) { args[key] = val; i++; }
      else { args[key] = true; }
    }
  }

  requireApiKey();
  console.log('\n=== Phase 6 — Production HTML Generator ===\n');

  let slug = args.slug || args.s;
  let topic = args.topic || args.t;
  let content = args.content;

  if (!slug && !topic) {
    topic = await ask('Story topic: ');
    slug = slugify(topic);
  }

  if (!slug) slug = slugify(topic || 'untitled');

  // Load existing content
  const storyDir = join(PROJECT_ROOT, 'stories', slug);
  const htmlPath = join(storyDir, `${slug}.html`);
  const mdPath = join(storyDir, `${slug}.md`);

  if (!content) {
    if (existsSync(htmlPath)) {
      content = readFileSync(htmlPath, 'utf-8');
      console.log(`  Loaded: stories/${slug}/${slug}.html`);
    } else if (existsSync(mdPath)) {
      content = readFileSync(mdPath, 'utf-8');
      console.log(`  Loaded: stories/${slug}/${slug}.md`);
    }
  }

  if (!content) {
    content = await ask('Paste article content: ');
    if (!content) { console.error('No content.'); process.exit(1); }
  }

  // Get topic from content if not provided
  if (!topic) {
    const titleMatch = content.match(/title:\s*"([^"]+)"/) || content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    topic = titleMatch?.[1] || slug;
  }

  console.log(`  Topic:  ${topic}`);
  console.log(`  Slug:   ${slug}`);
  console.log(`  Content: ${content.length} chars\n`);

  console.log('Generating production HTML...\n');

  const agent = loadAgent('website');
  const result = await callOpenAI(agent,
    `Story topic: ${topic}\nSlug: ${slug}\n\nArticle content:\n${content}`,
    12288
  );

  if (!existsSync(storyDir)) mkdirSync(storyDir, { recursive: true });
  writeFileSync(join(storyDir, 'index.html'), result, 'utf-8');
  console.log(`  ✓ stories/${slug}/index.html`);

  // Also update the main HTML if it exists
  if (existsSync(htmlPath)) {
    writeFileSync(join(storyDir, `${slug}.html`), result, 'utf-8');
    console.log(`  ✓ stories/${slug}/${slug}.html (updated)`);
  }

  console.log('\n  Next: node scripts/ai/publish.mjs --slug ' + slug + '\n');
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
