/**
 * THE BREAKDOWN OS — Trending / Breaking News Discovery
 *
 * Identifies trending stories across news, Google Trends, and social media.
 *
 * Usage:
 *   node scripts/ai/trending.mjs                    # discover trending
 *   node scripts/ai/trending.mjs --topics "t1, t2"  # score specific topics
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

import { callOpenAI, requireApiKey, loadAgent, writeJSON, ask } from './lib.mjs';

async function discoverTrending() {
  const agent = loadAgent('trending');
  const sysPrompt = `${agent}\n\nOutput as JSON array of trending topics.`;
  const userPrompt = `Search for the top trending stories right now. Focus on India, business, technology, policy, and geopolitics.

For each story provide:
- title
- category
- trendingSince (approximate date)
- whyItMatters (one sentence)
- score (1-100)
- recommendation: "Publish Now" / "Monitor" / "Ignore"`;
  return callOpenAI(sysPrompt, userPrompt, 4096);
}

async function scoreTopics(topics) {
  const agent = loadAgent('breaking');
  return callOpenAI(agent,
    `Score these topics by public impact:\n${topics.map((t, i) => `${i + 1}. ${t}`).join('\n')}`,
    4096
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
  console.log('\n=== Trending / Breaking News Discovery ===\n');

  let result;

  if (args.topics) {
    const topics = args.topics.split(',').map(t => t.trim()).filter(Boolean);
    console.log(`Scoring ${topics.length} topics...\n`);
    result = await scoreTopics(topics);
  } else {
    console.log('Discovering trending stories...\n');
    result = await discoverTrending();
  }

  // Try to parse as JSON
  let data;
  try { data = JSON.parse(result); } catch { data = null; }

  if (data && Array.isArray(data)) {
    console.log('=== TRENDING STORIES ===\n');
    for (const item of data) {
      const score = item.score || 0;
      const bar = '█'.repeat(Math.round(score / 5));
      const label = item.recommendation || (score >= 70 ? 'PUBLISH NOW' : score >= 40 ? 'Monitor' : 'Ignore');
      console.log(`  ${bar} ${score}/100 [${label}]`);
      console.log(`  ${item.title}`);
      console.log(`  ${item.category} | ${item.whyItMatters || ''}`);
      console.log('');
    }
  } else {
    console.log(result);
  }

  const outDir = join(PROJECT_ROOT, 'research');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = writeJSON(join(outDir, `trending-${Date.now()}.json`), data || result);
  console.log(`  Saved: ${outPath}`);
  console.log('');
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
