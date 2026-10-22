import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AI_DIR = dirname(fileURLToPath(import.meta.url));
const read = (name) => readFileSync(join(AI_DIR, name), 'utf8');

test('story generation loads the canonical playbook into Markdown and HTML prompts', () => {
  const generator = read('generate-story.mjs');
  assert.equal(
    (generator.match(/editorial-storytelling-playbook-v1\.md/g) ?? []).length,
    2,
    'both article-generation functions must load the playbook'
  );
  assert.equal(
    (generator.match(/\$\{storytellingPlaybook\}/g) ?? []).length,
    2,
    'both generation prompts must include the loaded playbook'
  );
});

test('chart generation cannot fill missing evidence with invented data', () => {
  const generator = read('generate-story.mjs');
  assert.match(generator, /DATA REQUIRED/);
  assert.match(generator, /do not invent example values/);
  assert.doesNotMatch(generator, /realistic data tables|realistic data/i);
  assert.match(generator, /never invent values/i);
  assert.match(generator, /Use data points, statistics, dates and direct quotations only when the supplied, checked sources explicitly support them/);
  assert.doesNotMatch(generator, /status: "published"/);
  assert.match(generator, /status: "draft"/);
  assert.doesNotMatch(generator, /Math\.floor\(Math\.random\(\) \* 8\)/);
  assert.match(generator, /Do not invent URLs, channel names, durations/);
  assert.match(generator, /do not invent quotes or fill a quota/i);
});

test('reference generation rejects plausible but unverified citations', () => {
  const generator = read('generate-story.mjs');
  assert.match(generator, /Never invent titles, authors, publishers, dates, URLs/);
  assert.match(generator, /NOT VERIFIED/);
  assert.match(generator, /SOURCE GAPS/);
  assert.doesNotMatch(generator, /realistic-sounding references/i);
});

test('the master editorial engine points to the canonical playbook and avoids voice imitation', () => {
  const engine = read('editorial-engine.md');
  assert.match(engine, /editorial-storytelling-playbook-v1\.md/);
  assert.doesNotMatch(engine, /Write like: The Economist|Write like:.*Bloomberg/);
  assert.match(engine, /Never sensationalize, exaggerate, imitate/);
});

test('the playbook requires reported scenes, source integrity and format-specific structure', () => {
  const playbook = read('editorial-storytelling-playbook-v1.md');
  assert.match(playbook, /Choose the narrative form to fit the reporting/);
  assert.match(playbook, /Never invent dialogue, action, sensory detail/);
  assert.match(playbook, /Never fabricate or infer a reference/);
  assert.match(playbook, /right of reply/i);
  assert.match(playbook, /counterevidence/i);
  assert.match(playbook, /Rukmini S\\. — make public data legible/);
  assert.match(playbook, /dataforindia\\.com\\/author\\/rukmini/);
  assert.match(playbook, /gijn\\.org\\/resource\\/introduction-investigative-journalism-data-journalism/);
});

test('the editorial review engine treats fabricated narrative evidence as a blocker', () => {
  const review = read('editorial-review-engine-v1.md');
  assert.match(review, /STAGE 7A — NARRATIVE & SCENE INTEGRITY/);
  assert.match(review, /is a BLOCKER regardless of score/);
});
