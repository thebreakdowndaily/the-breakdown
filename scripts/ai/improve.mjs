/**
 * THE BREAKDOWN OS — Story Improver
 *
 * Audits and improves existing story HTML files.
 *
 * Usage:
 *   node scripts/ai/improve.mjs --slug <slug>
 *   node scripts/ai/improve.mjs --slug <slug> --mode audit    # only audit
 *   node scripts/ai/improve.mjs --slug <slug> --mode rewrite  # only rewrite
 *
 * Requires OPENAI_API_KEY in .env at project root.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');

import { callOpenAI, requireApiKey, loadAgent, loadEditorialEngine, ask } from './lib.mjs';

async function audit(slug, content) {
  const agent = loadAgent('audit');
  return callOpenAI(agent, `Audit this story:\nSlug: ${slug}\n\nContent:\n${content}`, 4096);
}

async function rewrite(slug, content, auditReport) {
  const editor = loadEditorialEngine();
  const improveAgent = loadAgent('improve');
  const sysPrompt = `${editor}\n\n${improveAgent}`;
  return callOpenAI(sysPrompt,
    `Rewrite this story to improve quality:\nSlug: ${slug}\n\nAudit findings:\n${auditReport || 'General improvement'}\n\nCurrent content:\n${content}`,
    12288
  );
}

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

  let slug = args.slug || args.s;
  if (!slug) {
    slug = await ask('Story slug: ');
    if (!slug) { console.error('Slug required.'); process.exit(1); }
  }

  const mode = args.mode || 'full';
  console.log(`\n=== Story Improver ===\n`);
  console.log(`  Slug: ${slug}`);
  console.log(`  Mode: ${mode}\n`);

  const htmlPath = join(PROJECT_ROOT, 'stories', slug, `${slug}.html`);
  const indexPath = join(PROJECT_ROOT, 'stories', slug, 'index.html');
  const contentPath = existsSync(htmlPath) ? htmlPath : (existsSync(indexPath) ? indexPath : null);

  if (!contentPath) {
    console.error(`Story not found: stories/${slug}/`);
    process.exit(1);
  }

  const content = readFileSync(contentPath, 'utf-8');
  console.log(`  Reading: ${contentPath.replace(PROJECT_ROOT, '')} (${content.length} chars)\n`);

  let auditReport = null;

  if (mode === 'audit' || mode === 'full') {
    console.log('  Running quality audit...\n');
    auditReport = await audit(slug, content);
    console.log('  Audit Results:\n');
    console.log(auditReport);
    console.log('');
  }

  if (mode === 'rewrite' || mode === 'full') {
    console.log('  Rewriting with improvements...\n');
    const improved = await rewrite(slug, content, auditReport);
    writeFileSync(contentPath, improved, 'utf-8');
    console.log(`  ✓ Updated: ${contentPath.replace(PROJECT_ROOT, '')}`);
    console.log(`  ${improved.length} chars written\n`);
  }

  console.log('Done.\n');
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
