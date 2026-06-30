/**
 * Phase 2 — Fact Check Engine
 *
 * Classifies every claim in a statement/article into:
 *   Verified Facts | Official Statements | Independent Verification
 *   Expert Opinions | Political Claims | Corporate Claims
 *   Allegations | Rumours | Unknown
 *
 * Usage:
 *   node scripts/ai/fact-check.mjs --claim "text"
 *   node scripts/ai/fact-check.mjs --file path/to/article.md
 *   node scripts/ai/fact-check.mjs --url https://example.com/article
 *
 * Requires OPENAI_API_KEY in .env at project root.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { stdin, stdout, env } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');

const MODEL = 'gpt-4o-mini';
const TEMPERATURE = 0.3;

const CATEGORIES = [
  'Verified Fact',
  'Official Statement',
  'Independent Verification',
  'Expert Opinion',
  'Political Claim',
  'Corporate Claim',
  'Allegation',
  'Rumour',
  'Unknown'
];

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

function ask(question) {
  return new Promise(resolve => {
    const rl = createInterface({ input: stdin, output: stdout });
    rl.question(question, answer => { rl.close(); resolve(answer); });
  });
}

async function factCheck(text, source) {
  const editorialEngine = readFileSync(join(__dirname, 'editorial-engine.md'), 'utf-8');

  const sysPrompt = `${editorialEngine}

You are the Fact Checking Team. Your ONLY job is Phase 2 — FACT CHECK.

Classify each distinct claim in the input into EXACTLY ONE category:
${CATEGORIES.map((c, i) => `  ${i + 1}. ${c}`).join('\n')}

Output format — valid JSON array (ONLY output the JSON, no other text):
[
  {
    "claim": "exact quoted claim text",
    "category": "Verified Fact | Official Statement | ...",
    "confidence": 0-100,
    "source_suggestion": "where to verify this",
    "reasoning": "why this classification"
  }
]

Rules:
- Break the input into individual claims (each sentence/assertion is separate)
- Every claim MUST be classified — never skip one
- "Verified Fact" only if widely accepted with clear official/primary source
- "Official Statement" for direct quotes from government/corporate spokespeople
- "Independent Verification" when third-party orgs have confirmed
- "Expert Opinion" for attributed analysis by subject-matter experts
- "Political Claim" for statements by politicians or partisan sources
- "Corporate Claim" for company announcements, PR, marketing
- "Allegation" for accusations without proven evidence
- "Rumour" for unverified claims circulating without clear source
- "Unknown" when insufficient information to classify
- Never mix categories for a single claim`;

  const userPrompt = `Fact-check the following text:

Source: ${source || 'User-provided statement'}
Text:
${text}

Classify every distinct claim. Output ONLY the JSON array.`;

  return callOpenAI(sysPrompt, userPrompt, 8192);
}

async function main() {
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

  console.log('\n=== Phase 2 — Fact Check Engine ===\n');

  if (!getApiKey()) {
    console.error('ERROR: OPENAI_API_KEY not found.');
    console.error('Set it in .env at project root or as an environment variable.');
    process.exit(1);
  }

  let text = args.claim || args.text;

  if (args.file) {
    const filePath = join(PROJECT_ROOT, args.file);
    if (!existsSync(filePath)) {
      console.error(`File not found: ${args.file}`);
      process.exit(1);
    }
    text = readFileSync(filePath, 'utf-8');
    console.log(`Input: ${args.file} (${text.length} chars)`);
  }

  if (args.url) {
    console.log(`URL: ${args.url}`);
    console.log('Note: URL content not auto-fetched. Pipe or paste the article text.');
    text = text || args.url;
  }

  if (!text) {
    console.log('Paste the text to fact-check (Ctrl+Z then Enter when done):');
    text = await ask('');
    if (!text) {
      console.error('No text provided.');
      process.exit(1);
    }
  }

  const source = args.source || args.url || 'User-provided statement';
  console.log(`Source: ${source}`);
  console.log(`Claims to classify: ~${Math.ceil(text.split(/[.!?]+/).length)} sentences\n`);
  console.log('Running fact check...\n');

  const result = await factCheck(text, source);

  let claims;
  try {
    claims = JSON.parse(result);
  } catch {
    console.log('Raw output (JSON parse failed):\n');
    console.log(result);
    const filePath = join(PROJECT_ROOT, 'research', `fact-check-${Date.now()}.json`);
    writeFileSync(filePath, result, 'utf-8');
    console.log(`\nRaw output saved to: ${filePath}`);
    return;
  }

  const summary = {};
  for (const c of CATEGORIES) summary[c] = 0;
  for (const c of claims) {
    const cat = c.category;
    if (summary[cat] !== undefined) summary[cat]++;
    else summary['Unknown']++;
  }

  console.log('=== FACT CHECK REPORT ===\n');
  console.log(`Total claims: ${claims.length}\n`);

  console.log('--- Breakdown ---');
  for (const [cat, count] of Object.entries(summary)) {
    if (count > 0) {
      const pct = ((count / claims.length) * 100).toFixed(0);
      const bar = '█'.repeat(Math.round(count / claims.length * 30));
      console.log(`  ${cat.padEnd(28)} ${String(count).padStart(3)} (${pct}%) ${bar}`);
    }
  }

  console.log('\n--- Detailed Claims ---');
  for (const c of claims) {
    console.log(`\n  [${c.category}] (conf: ${c.confidence}%)`);
    console.log(`  Claim: ${c.claim}`);
    console.log(`  Source: ${c.source_suggestion || 'N/A'}`);
  }

  const filePath = join(PROJECT_ROOT, 'research', `fact-check-${Date.now()}.json`);
  writeFileSync(filePath, JSON.stringify(claims, null, 2), 'utf-8');
  console.log(`\nFull report saved to: ${filePath}`);
  console.log('\n=== Done ===\n');
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
