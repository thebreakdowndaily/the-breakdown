/**
 * THE BREAKDOWN OS — Homepage Generator
 *
 * Generates or updates the homepage with dynamic sections
 * based on current stories in the stories/ directory.
 *
 * Usage:
 *   node scripts/ai/homepage.mjs                     # auto-detect stories
 *   node scripts/ai/homepage.mjs --featured <slug>
 *
 * Requires OPENAI_API_KEY in .env at project root.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');

import { callOpenAI, requireApiKey, loadAgent } from './lib.mjs';

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
  console.log('\n=== Homepage Generator ===\n');

  // Discover all stories
  const storiesDir = join(PROJECT_ROOT, 'stories');
  let storySlugs = [];
  try {
    storySlugs = readdirSync(storiesDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
  } catch {
    storySlugs = [];
  }

  // Read each story's metadata
  const stories = [];
  for (const slug of storySlugs) {
    const mdPath = join(storiesDir, slug, `${slug}.md`);
    if (!existsSync(mdPath)) continue;
    const md = readFileSync(mdPath, 'utf-8');
    const title = md.match(/title:\s*"([^"]+)"/)?.[1] || slug;
    const summary = md.match(/summary:\s*"([^"]+)"/)?.[1] || '';
    const category = md.match(/category:\s*"([^"]+)"/)?.[1] || 'General';
    const date = md.match(/published_at:\s*"([^"]+)"/)?.[1] || '';
    stories.push({ slug, title, summary, category, date });
  }

  console.log(`  Found ${stories.length} stories\n`);

  const featured = args.featured || (stories.length > 0 ? stories[0].slug : '');
  const featuredStory = stories.find(s => s.slug === featured) || stories[0];

  const agent = loadAgent('homepage');
  const storyList = stories.map(s =>
    `- ${s.slug}: "${s.title}" [${s.category}]`
  ).join('\n');

  const result = await callOpenAI(agent,
    `Featured story: ${featuredStory?.title || 'N/A'}
Slug: ${featured}

All stories:
${storyList || 'No stories yet.'}

Generate a complete homepage.`,
    12288
  );

  const outPath = join(PROJECT_ROOT, 'public', 'index.html');
  writeFileSync(outPath, result, 'utf-8');
  console.log(`  ✓ public/index.html`);

  // Also update the CMS template if it exists
  const cmsTemplate = join(PROJECT_ROOT, 'fact-check-cms', 'public', 'index.html');
  if (existsSync(cmsTemplate)) {
    writeFileSync(cmsTemplate, result, 'utf-8');
    console.log(`  ✓ fact-check-cms/public/index.html`);
  }

  console.log('\n  Deploy: .\\scripts\\deploy.ps1 -PushCMS\n');
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
