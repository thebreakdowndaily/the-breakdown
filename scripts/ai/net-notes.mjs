/**
 * THE BREAKDOWN OS — UGC NET Notes Engine
 *
 * Analyzes UGC NET exam patterns and generates study materials:
 *   - PYQ frequency analysis
 *   - Scholar frequency
 *   - Theory weighting
 *   - War Notes / Emergency Revision
 *   - Predicted questions
 *
 * Usage:
 *   node scripts/ai/net-notes.mjs --subject "Political Science"
 *   node scripts/ai/net-notes.mjs --subject "Education" --mode "war-notes"
 *   node scripts/ai/net-notes.mjs --subject "Economics" --mode "prediction"
 *
 * Requires OPENAI_API_KEY in .env at project root.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');

import { callOpenAI, requireApiKey, loadAgent, writeText, ask } from './lib.mjs';

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

  let subject = args.subject || args.s;
  if (!subject) {
    subject = await ask('Subject (e.g. Political Science, Education, Economics): ');
    if (!subject) { console.error('Subject required.'); process.exit(1); }
  }

  const mode = args.mode || args.m || 'analysis';
  console.log(`\n=== UGC NET Notes Engine ===\n`);
  console.log(`  Subject: ${subject}`);
  console.log(`  Mode:    ${mode}\n`);

  const agent = loadAgent('net-notes');
  const userPrompt = `Subject: ${subject}
Mode: ${mode}

Generate UGC NET study materials for this subject in ${mode} mode.

${mode === 'analysis' ? 'Analyze PYQ frequency, scholar frequency, theory weighting, and topic predictions.' : ''}
${mode === 'war-notes' ? 'Generate rapid revision war notes with key points, scholars, and memory tricks.' : ''}
${mode === 'prediction' ? 'Predict likely questions for upcoming exams based on past patterns.' : ''}`;

  console.log('Generating...\n');
  const result = await callOpenAI(agent, userPrompt, 8192);

  const outDir = join(PROJECT_ROOT, 'content', 'net-notes');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const slug = subject.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const fileName = `${slug}-${mode}.md`;
  writeText(join(outDir, fileName), `# UGC NET — ${subject} (${mode})\n\n${result}`);
  console.log(`  ✓ content/net-notes/${fileName}`);
  console.log('\nDone.\n');
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
