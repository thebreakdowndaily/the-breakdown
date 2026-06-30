/**
 * Phase 3 — Discover the Story
 *
 * After Phase 1 (research) and Phase 2 (fact-check), find the actual story:
 *   What happened? Why now? Who benefits? Who loses?
 *   What changed? What are people missing? What is the hidden story?
 *   Why does this matter? Why should someone care?
 *
 * Usage:
 *   node scripts/ai/discover-story.mjs --topic "..." --dossier path/to/research.md
 *   node scripts/ai/discover-story.mjs --topic "..." --fact-check path/to/fact-check.json
 *   node scripts/ai/discover-story.mjs --topic "..."   # interactive paste
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
const TEMPERATURE = 0.5;

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

async function discoverStory(topic, dossier, factCheck) {
  const editorialEngine = readFileSync(join(__dirname, 'editorial-engine.md'), 'utf-8');

  const sysPrompt = `${editorialEngine}

You are the Investigative Journalist and Senior Research Analyst. Your ONLY job is Phase 3 — DISCOVER THE STORY.

You have a research dossier and a fact-check report. Find the story hidden inside them.

Answer every question with evidence from the dossier. Do NOT write the article. Only find the story angles.

Output format — valid JSON (ONLY output the JSON, no other text):
{
  "hook": {
    "cold_open": "most surprising fact or contradiction to open with",
    "why_now": "what makes this timely",
    "stakes": "what is at risk and for whom",
    "question": "the core question the story answers"
  },
  "protagonists": [
    { "who": "...", "stake": "...", "position": "proponent/opponent/neutral" }
  ],
  "antagonists": [
    { "who": "...", "stake": "...", "position": "..." }
  ],
  "what_changed": "what happened that triggered this story",
  "what_people_are_missing": "the overlooked angle or misconception",
  "hidden_story": "what is beneath the surface narrative",
  "story_angles": [
    {
      "angle": "...",
      "evidence": ["...", "..."],
      "why_newsworthy": "...",
      "difficulty": "easy/medium/hard"
    }
  ],
  "narrative_arc": {
    "beginning": "what readers need to understand first",
    "middle": "the tension or conflict to build",
    "end": "the resolution or open question"
  },
  "why_it_matters": "one paragraph explaining why someone should care",
  "recommended_approach": "the strongest angle to pursue"
}`;

  const userPrompt = `Find the story in this topic.

Topic: ${topic}

${dossier ? `Research Dossier:\n${dossier}` : ''}
${factCheck ? `\nFact-Check Report:\n${JSON.stringify(factCheck, null, 2)}` : ''}

Answer all Phase 3 questions. Output ONLY the JSON.`;

  return callOpenAI(sysPrompt, userPrompt, 4096);
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

  console.log('\n=== Phase 3 — Discover the Story ===\n');

  if (!getApiKey()) {
    console.error('ERROR: OPENAI_API_KEY not found.');
    process.exit(1);
  }

  let topic = args.topic;
  if (!topic) {
    const rl = createInterface({ input: stdin, output: stdout });
    topic = await new Promise(resolve => {
      rl.question('Topic: ', answer => { rl.close(); resolve(answer); });
    });
    if (!topic) { console.error('Topic required.'); process.exit(1); }
  }
  console.log(`Topic: ${topic}\n`);

  let dossier = null;
  if (args.dossier) {
    const path = join(PROJECT_ROOT, args.dossier);
    if (!existsSync(path)) {
      console.error(`Dossier not found: ${args.dossier}`);
      process.exit(1);
    }
    dossier = readFileSync(path, 'utf-8');
    console.log(`Dossier: ${args.dossier} (${dossier.length} chars)`);
  }

  let factCheck = null;
  if (args['fact-check']) {
    const path = join(PROJECT_ROOT, args['fact-check']);
    if (!existsSync(path)) {
      console.error(`Fact-check not found: ${args['fact-check']}`);
      process.exit(1);
    }
    factCheck = JSON.parse(readFileSync(path, 'utf-8'));
    console.log(`Fact-check: ${args['fact-check']} (${factCheck.length} claims)`);
  }

  if (!dossier && !factCheck) {
    console.log('Paste research notes / dossier text (Ctrl+Z then Enter when done):');
    const rl = createInterface({ input: stdin, output: stdout });
    dossier = await new Promise(resolve => {
      rl.question('', answer => { rl.close(); resolve(answer); });
    });
    if (dossier) console.log(`Received ${dossier.length} chars of input\n`);
  }

  console.log('Discovering story angles...\n');
  const result = await discoverStory(topic, dossier, factCheck);

  let discovery;
  try {
    discovery = JSON.parse(result);
  } catch {
    console.log('Raw output (JSON parse failed):\n');
    console.log(result);
    const outPath = join(PROJECT_ROOT, 'research', `discovery-${Date.now()}.json`);
    writeFileSync(outPath, result, 'utf-8');
    console.log(`\nSaved to: ${outPath}`);
    return;
  }

  console.log('=== STORY DISCOVERY BRIEF ===\n');

  console.log('── Hook ──');
  console.log(`  Cold open: ${discovery.hook?.cold_open || 'N/A'}`);
  console.log(`  Why now:   ${discovery.hook?.why_now || 'N/A'}`);
  console.log(`  Stakes:    ${discovery.hook?.stakes || 'N/A'}`);
  console.log(`  Question:  ${discovery.hook?.question || 'N/A'}`);

  console.log('\n── What Changed ──');
  console.log(`  ${discovery.what_changed || 'N/A'}`);

  console.log('\n── What People Are Missing ──');
  console.log(`  ${discovery.what_people_are_missing || 'N/A'}`);

  console.log('\n── Hidden Story ──');
  console.log(`  ${discovery.hidden_story || 'N/A'}`);

  if (discovery.story_angles?.length) {
    console.log('\n── Story Angles ──');
    for (const a of discovery.story_angles) {
      console.log(`  [${a.difficulty}] ${a.angle}`);
      console.log(`         ${a.why_newsworthy}`);
    }
  }

  console.log('\n── Narrative Arc ──');
  console.log(`  Beginning: ${discovery.narrative_arc?.beginning || 'N/A'}`);
  console.log(`  Middle:    ${discovery.narrative_arc?.middle || 'N/A'}`);
  console.log(`  End:       ${discovery.narrative_arc?.end || 'N/A'}`);

  console.log('\n── Why It Matters ──');
  console.log(`  ${discovery.why_it_matters || 'N/A'}`);

  console.log(`\n── Recommended Approach ──`);
  console.log(`  ${discovery.recommended_approach || 'N/A'}`);

  const outPath = join(PROJECT_ROOT, 'research', `discovery-${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 40)}.json`);
  writeFileSync(outPath, JSON.stringify(discovery, null, 2), 'utf-8');
  console.log(`\nFull discovery brief saved to: ${outPath}`);
  console.log('\n=== Ready for Phase 4 — Build the Narrative ===\n');
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
