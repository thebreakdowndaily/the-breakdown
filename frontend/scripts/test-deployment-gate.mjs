import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.cwd(), '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('story production packages are written outside the public web root', () => {
  const publisher = read('scripts/ai/publish.mjs');
  const pipeline = read('scripts/pipeline.mjs');
  assert.match(publisher, /artifacts['"]?,\s*['"]newsroom['"]?,\s*['"]stories['"]?/);
  assert.match(pipeline, /artifacts['"]?,\s*['"]newsroom['"]?,\s*['"]stories['"]?/);
  assert.doesNotMatch(publisher, /join\(PROJECT_ROOT,\s*['"]public['"],\s*['"]stories['"]/);
  assert.doesNotMatch(pipeline, /join\(__dirname,\s*['"]\.\.['"],\s*['"]public['"],\s*['"]stories['"]/);
});

test('unverified external CMS pushes fail before deployment begins', () => {
  const deploy = read('scripts/deploy.ps1');
  const pushFlag = deploy.indexOf('if ($PushCMS)');
  const blocker = deploy.indexOf('CMS push BLOCKED');
  const cloudflareDeploy = deploy.indexOf('CLOUDFLARE PAGES DEPLOY');
  assert.ok(pushFlag >= 0 && blocker > pushFlag, 'expected explicit CMS-push block');
  assert.ok(cloudflareDeploy > blocker, 'CMS-push guard must precede all deployment side effects');
  assert.match(deploy.slice(pushFlag, cloudflareDeploy), /exit 1/);
});

test('backend startup seeding cannot publish from frontmatter or overwrite CMS edits', () => {
  const seed = read('backend/src/seed.ts');
  assert.match(seed, /INSERT OR IGNORE INTO stories/);
  assert.match(seed, /NULL, 'draft'/);
  assert.match(seed, /existing CMS record preserved/);
  assert.doesNotMatch(seed, /INSERT OR REPLACE INTO stories/);
});
