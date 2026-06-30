/**
 * THE BREAKDOWN OS — Shared Library
 *
 * Shared utilities for all newsroom scripts:
 *   - API key resolution
 *   - OpenAI chat completion
 *   - Slug generation
 *   - Directory/file helpers
 *   - CLI argument parsing
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { stdin, stdout, env } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const PROJECT_ROOT = join(__dirname, '..', '..');
export const SCRIPTS_DIR = __dirname;

export const MODEL = 'gpt-4o-mini';
export const TEMPERATURE = 0.5;

/** Resolve OpenAI API key from env or .env */
export function getApiKey() {
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

/** Resolve OpenAI base URL from env or .env (defaults to https://api.openai.com) */
export function getApiBaseUrl() {
  if (env.OPENAI_BASE_URL) return env.OPENAI_BASE_URL.replace(/\/+$/, '');
  try {
    const envPath = join(PROJECT_ROOT, '.env');
    if (existsSync(envPath)) {
      const lines = readFileSync(envPath, 'utf-8').split('\n');
      for (const line of lines) {
        const match = line.match(/^OPENAI_BASE_URL=(.+)$/);
        if (match) return match[1].trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');
      }
    }
  } catch { /* ignore */ }
  return 'https://api.openai.com';
}

/** Check API key, exit with error if missing */
export function requireApiKey() {
  const key = getApiKey();
  if (!key) {
    console.error('ERROR: OPENAI_API_KEY not found. Set it in .env or as an environment variable.');
    process.exit(1);
  }
  return key;
}

/** Call OpenAI chat completion (supports OPENAI_BASE_URL override for OpenRouter etc.) */
export async function callOpenAI(systemPrompt, userPrompt, maxTokens = 4096, model = MODEL) {
  const apiKey = requireApiKey();
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
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

/** Generate URL-friendly slug */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

/** Read a file, return null if missing */
export function readFile(path) {
  try {
    return readFileSync(path, 'utf-8');
  } catch {
    return null;
  }
}

/** Write JSON file, creating directory if needed */
export function writeJSON(path, data) {
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
  return path;
}

/** Write text file, creating directory if needed */
export function writeText(path, content) {
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(path, content, 'utf-8');
  return path;
}

/** Prompt user for input */
export function ask(question) {
  return new Promise(resolve => {
    const rl = createInterface({ input: stdin, output: stdout });
    rl.question(question, answer => { rl.close(); resolve(answer); });
  });
}

/** Load the editorial engine system prompt */
export function loadEditorialEngine() {
  return readFileSync(join(SCRIPTS_DIR, 'editorial-engine.md'), 'utf-8');
}

/** Load any agent prompt by name */
export function loadAgent(name) {
  const path = join(PROJECT_ROOT, '.opencode', 'agents', `${name}.md`);
  const content = readFile(path);
  if (!content) throw new Error(`Agent not found: ${name}`);
  // Strip frontmatter (--- ... ---) if present
  return content.replace(/^---[\s\S]*?---\n*/, '');
}

/** Parse --key value or --flag CLI args */
export function parseArgs() {
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
  return args;
}

/** Generate ISO timestamp */
export function timestamp() {
  return new Date().toISOString();
}

/** Estimate reading time in minutes */
export function readingTime(text) {
  const wpm = 200;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / wpm));
}
