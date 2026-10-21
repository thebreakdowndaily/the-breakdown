import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const adminPages = [
  'frontend/public/admin/index.html',
  'backend/admin/index.html',
  'deploy/admin/index.html',
  'cloudflare-deploy/admin/index.html',
];

for (const relativePath of adminPages) {
  const absolutePath = join(projectRoot, relativePath);
  let html;
  try {
    html = readFileSync(absolutePath, 'utf8');
  } catch (error) {
    throw new Error(`Could not read admin page ${relativePath}: ${error.message}`);
  }

  const matches = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
  let executableCount = 0;
  for (const [index, match] of matches.entries()) {
    const attributes = match[1] || '';
    const source = match[2] || '';
    if (/\bsrc\s*=/.test(attributes)) continue;
    const typeMatch = attributes.match(/\btype\s*=\s*["']?([^\s"'>]+)/i);
    const type = (typeMatch?.[1] || 'text/javascript').toLowerCase();
    if (!['text/javascript', 'application/javascript', 'module'].includes(type)) continue;
    if (!source.trim()) continue;
    executableCount += 1;
    test(`${basename(absolutePath)} inline script ${index + 1} parses`, () => {
      assert.doesNotThrow(() => new vm.Script(source, { filename: relativePath + `#script-${index + 1}` }));
    });
  }

  test(`${relativePath} contains executable inline JavaScript`, () => {
    assert.ok(executableCount > 0, `No executable inline scripts discovered in ${relativePath}`);
  });
}
