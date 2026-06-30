/**
 * THE BREAKDOWN OS — Autonomous Newsroom Pipeline
 *
 * Full story pipeline: research → verify → discover → write → visuals → website → publish
 *
 * Usage:
 *   node scripts/pipeline.mjs --topic "India GDP Growth Q4 2026"
 *   node scripts/pipeline.mjs --topic "..." --sources "url1, url2" --publish
 *   node scripts/pipeline.mjs --topic "..." --phase research    # run single phase
 *
 * Phases:
 *   research   Phase 1 — Build intelligence dossier
 *   verify     Phase 2 — Fact-check all claims
 *   discover   Phase 3 — Discover story angles
 *   write      Phase 4 — Generate article + HTML
 *   visuals    Phase 5 — Generate visual assets
 *   website    Phase 6 — Generate production HTML
 *   publish    Phase 7 — Prepare production package
 *
 * Requires OPENAI_API_KEY in .env at project root.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
import { createInterface } from 'node:readline';
import { stdin, stdout, env } from 'node:process';

// ---- Minimal local utils (no circular dependency on lib.mjs) ----
function getApiKey() {
  if (env.OPENAI_API_KEY) return env.OPENAI_API_KEY;
  try {
    const envPath = join(__dirname, '..', '.env');
    const lines = readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const match = line.match(/^OPENAI_API_KEY=(.+)$/);
      if (match) return match[1].trim().replace(/^["']|["']$/g, '');
    }
  } catch {}
  return null;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').substring(0, 80);
}

async function ask(question) {
  const rl = createInterface({ input: stdin, output: stdout });
  return new Promise(resolve => {
    rl.question(question, answer => { rl.close(); resolve(answer); });
  });
}

function log(phase, msg) {
  const icon = { research: '🔍', verify: '✅', discover: '💡', write: '✍️', visuals: '🎨', website: '🌐', publish: '📦' }[phase] || '•';
  console.log(`  ${icon} [${phase.padEnd(9)}] ${msg}`);
}

// ---- Phase Runners ----
function phaseDir(topic) {
  const slug = slugify(topic);
  const dir = join(__dirname, '..', 'content', slug);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

async function runResearch(topic, sources) {
  log('research', `Building intelligence dossier...`);
  const { callOpenAI, loadAgent } = await import('./ai/lib.mjs');
  const agent = loadAgent('research');
  const result = await callOpenAI(agent, `Topic: ${topic}${sources ? `\nSources: ${sources}` : ''}\n\nBuild a complete intelligence dossier.`, 8192);
  const dir = phaseDir(topic);
  writeFileSync(join(dir, 'research.md'), result, 'utf-8');
  log('research', `Dossier saved to content/${slugify(topic)}/research.md`);
  return result;
}

async function runVerify(topic, dossier) {
  log('verify', 'Fact-checking all claims...');
  const { callOpenAI, loadAgent } = await import('./ai/lib.mjs');
  const agent = loadAgent('verify');
  const result = await callOpenAI(agent, `Fact-check this dossier:\n\n${dossier}`, 4096);
  const dir = phaseDir(topic);
  let json;
  try { json = JSON.parse(result); } catch { json = result; }
  writeFileSync(join(dir, 'fact-check.json'), typeof json === 'string' ? result : JSON.stringify(json, null, 2), 'utf-8');
  const count = Array.isArray(json) ? json.length : '?';
  log('verify', `Fact-check complete: ${count} claims classified`);
  return result;
}

async function runDiscover(topic, dossier, factCheck) {
  log('discover', 'Finding story angles...');
  const { callOpenAI, loadEditorialEngine } = await import('./ai/lib.mjs');
  const engine = loadEditorialEngine();
  const sysPrompt = `${engine}\n\nYou are the Investigative Journalist. Phase 3 — DISCOVER THE STORY. Answer all questions.`;
  const userPrompt = `Topic: ${topic}\n\nDossier:\n${dossier}\n\nFact-check:\n${factCheck}\n\nFind the story.`;
  const result = await callOpenAI(sysPrompt, userPrompt, 4096);
  const dir = phaseDir(topic);
  writeFileSync(join(dir, 'discovery.json'), result, 'utf-8');
  log('discover', 'Story angles identified');
  return result;
}

async function runWrite(topic, sources, slug) {
  log('write', 'Generating article and HTML...');
  const { execSync } = await import('node:child_process');
  const script = join(__dirname, 'ai', 'generate-story.mjs');
  const cmd = `node "${script}" --topic "${topic}" --slug "${slug}"${sources ? ` --sources "${sources}"` : ''}`;
  execSync(cmd, { stdio: 'inherit', cwd: join(__dirname, '..') });
  log('write', `Article saved to stories/${slug}/`);
}

async function runVisuals(topic, slug) {
  log('visuals', 'Generating visual asset specs...');
  const { callOpenAI, loadAgent } = await import('./ai/lib.mjs');
  const agent = loadAgent('visuals');
  const result = await callOpenAI(agent, `Generate visual assets for: ${topic}`, 4096);
  writeFileSync(join(__dirname, '..', 'stories', slug, 'visuals.md'), result, 'utf-8');
  log('visuals', 'Visual specs saved');
  return result;
}

async function runWebsite(topic, slug) {
  log('website', 'Generating production HTML...');
  const { callOpenAI, loadAgent } = await import('./ai/lib.mjs');
  const agent = loadAgent('website');
  const storyHtml = join(__dirname, '..', 'stories', slug, `${slug}.html`);
  const htmlContent = existsSync(storyHtml) ? readFileSync(storyHtml, 'utf-8') : 'No HTML yet';
  const result = await callOpenAI(agent, `Generate complete story page for "${topic}". Current HTML body:\n\n${htmlContent}`, 8192);
  writeFileSync(join(__dirname, '..', 'stories', slug, 'index.html'), result, 'utf-8');
  log('website', 'Production HTML generated');
  return result;
}

async function runPublish(topic, slug) {
  log('publish', 'Preparing production package...');
  const storyDir = join(__dirname, '..', 'stories', slug);
  const outDir = join(__dirname, '..', 'public', 'stories', slug);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const files = ['index.html', `${slug}.html`, `${slug}.md`, 'images.md', 'charts.md', 'visuals.md', 'seo.md', 'references.md'];
  for (const f of files) {
    const src = join(storyDir, f);
    if (existsSync(src)) {
      writeFileSync(join(outDir, f), readFileSync(src, 'utf-8'), 'utf-8');
    }
  }

  log('publish', `Package ready: public/stories/${slug}/`);
  log('publish', 'Run: node scripts/ai/publish.mjs to deploy to Supabase + Cloudflare');
}

// ---- Main ----
async function main() {
  console.log(`
╔══════════════════════════════════════════╗
║     THE BREAKDOWN OS — Newsroom Pipeline ║
║     Complex Stories. Clear Analysis.      ║
╚══════════════════════════════════════════╝
`);

  if (!getApiKey()) {
    console.error('ERROR: OPENAI_API_KEY not found. Set it in .env');
    process.exit(1);
  }

  // Parse args
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

  let topic = args.topic || args.t;
  if (!topic) {
    topic = await ask('Story topic: ');
    if (!topic) { console.error('Topic required.'); process.exit(1); }
  }

  const sources = args.sources || args.s;
  const singlePhase = args.phase || args.p;
  const slug = slugify(topic);

  console.log(`  Topic:     ${topic}`);
  console.log(`  Slug:      ${slug}`);
  if (sources) console.log(`  Sources:   ${sources}`);
  if (singlePhase) console.log(`  Phase:     ${singlePhase}`);
  console.log('');

  const phases = ['research', 'verify', 'discover', 'write', 'visuals', 'website', 'publish'];
  const startAt = singlePhase ? phases.indexOf(singlePhase) : 0;
  if (startAt === -1) { console.error(`Unknown phase: ${singlePhase}. Valid: ${phases.join(', ')}`); process.exit(1); }
  const endAt = singlePhase ? startAt : phases.length - 1;

  let dossier = '';
  let factCheck = '';

  for (let i = startAt; i <= endAt; i++) {
    const phase = phases[i];
    console.log(`\n  ── Phase ${i + 1}: ${phase.charAt(0).toUpperCase() + phase.slice(1)} ──\n`);

    switch (phase) {
      case 'research':
        dossier = await runResearch(topic, sources);
        break;
      case 'verify':
        if (!dossier) {
          const dPath = join(__dirname, '..', 'content', slug, 'research.md');
          dossier = existsSync(dPath) ? readFileSync(dPath, 'utf-8') : '';
        }
        factCheck = await runVerify(topic, dossier || topic);
        break;
      case 'discover':
        if (!dossier) {
          const dPath = join(__dirname, '..', 'content', slug, 'research.md');
          dossier = existsSync(dPath) ? readFileSync(dPath, 'utf-8') : topic;
        }
        if (!factCheck) {
          const fPath = join(__dirname, '..', 'content', slug, 'fact-check.json');
          factCheck = existsSync(fPath) ? readFileSync(fPath, 'utf-8') : 'No fact-check available';
        }
        await runDiscover(topic, dossier, factCheck);
        break;
      case 'write':
        await runWrite(topic, sources, slug);
        break;
      case 'visuals':
        await runVisuals(topic, slug);
        break;
      case 'website':
        await runWebsite(topic, slug);
        break;
      case 'publish':
        await runPublish(topic, slug);
        break;
    }
  }

  console.log(`\n  ── Pipeline Complete ──\n`);
  console.log(`  Story:      ${topic}`);
  console.log(`  Slug:       ${slug}`);
  console.log(`  Research:   content/${slug}/research.md`);
  console.log(`  Fact-check: content/${slug}/fact-check.json`);
  console.log(`  Discovery:  content/${slug}/discovery.json`);
  console.log(`  Story:      stories/${slug}/`);
  console.log(`  Package:    public/stories/${slug}/`);
  console.log(`\n  Next: node fact-check-cms/scripts/publish-all-beats.js`);
  console.log(`        .\\scripts\\deploy.ps1 -PushCMS\n`);
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
