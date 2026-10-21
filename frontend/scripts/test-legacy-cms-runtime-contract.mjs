import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLegacyCmsSchema, REQUIRED_STATUSES } = require('../../deploy/lib/cms-schema-contract.cjs');
const { validateDeploymentHookUrl, triggerDeploymentHook } = require('../../deploy/lib/publication-deploy-hook.cjs');

function okResponse() { return { ok: true, status: 200, text: async () => '[]' }; }

test('legacy CMS schema preflight uses GET and limit=0 only', async () => {
  const requests = [];
  const result = await assertLegacyCmsSchema({
    baseUrl: 'https://cms-example.supabase.co',
    serviceKey: 'do-not-log-this-key',
    fetchImpl: async (url, options) => { requests.push({ url: new URL(url), options }); return okResponse(); },
  });
  assert.equal(result.checkedTables, 5);
  assert.equal(result.checkedStatuses, REQUIRED_STATUSES.length);
  assert.equal(requests.length, 5 + REQUIRED_STATUSES.length);
  assert.ok(requests.every(r => r.options.method === 'GET' && r.url.searchParams.get('limit') === '0'));
});

test('legacy CMS preflight fails closed on canonical schema and status mismatches', async () => {
  const requests = [];
  await assert.rejects(
    () => assertLegacyCmsSchema({
      baseUrl: 'https://cms-example.supabase.co', serviceKey: 'secret-do-not-disclose',
      fetchImpl: async (url, options) => {
        requests.push({ url: new URL(url), options });
        const parsed = new URL(url);
        if (parsed.pathname.endsWith('/stories') && parsed.searchParams.get('select')?.includes('content')) {
          return { ok: false, status: 400, text: async () => 'column stories.content does not exist' };
        }
        if (parsed.searchParams.get('status') === 'eq.approved-for-release') {
          return { ok: false, status: 400, text: async () => 'invalid enum value' };
        }
        return okResponse();
      },
    }),
    error => {
      assert.equal(error.code, 'SUPABASE_CMS_SCHEMA_MISMATCH');
      assert.match(error.message, /stories.content does not exist/i);
      assert.match(error.message, /does not support "approved-for-release"/i);
      assert.doesNotMatch(error.message, /secret-do-not-disclose/);
      return true;
    },
  );
  assert.ok(requests.every(r => r.options.method === 'GET'));
});

test('publication requires a valid deployment hook before making content public', () => {
  assert.throws(() => validateDeploymentHookUrl(''), error => error.code === 'DEPLOY_HOOK_NOT_CONFIGURED');
  assert.equal(validateDeploymentHookUrl('https://deploy.example.test/hook?token=secret'), 'https://deploy.example.test/hook?token=secret');
  assert.throws(() => validateDeploymentHookUrl('http://deploy.example.test/hook'), error => error.code === 'DEPLOY_HOOK_INVALID_URL');
});

test('deploy hook acknowledgement is awaited and non-2xx responses fail truthfully', async () => {
  const ack = await triggerDeploymentHook('https://deploy.example.test/hook', async () => ({ ok: true, status: 202 }));
  assert.deepEqual(ack, { status: 202 });
  await assert.rejects(
    () => triggerDeploymentHook('https://deploy.example.test/hook?token=secret', async () => ({ ok: false, status: 503 })),
    error => error.code === 'DEPLOY_HOOK_REJECTED' && error.status === 503 && !/secret/.test(error.message),
  );
});

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repositoryRoot = resolve(process.cwd(), '..');
const readRepositoryFile = path => readFileSync(resolve(repositoryRoot, path), 'utf8');

test('every legacy CMS runtime fails closed on schema mismatch and awaits deploy acknowledgement', () => {
  const expressServer = readRepositoryFile('deploy/server.js');
  const netlifyApi = readRepositoryFile('deploy/netlify/functions/api.js');
  const pagesApi = readRepositoryFile('frontend/functions/api/[[path]].ts');

  assert.match(expressServer, /await assertLegacyCmsSchema/);
  assert.match(expressServer, /await triggerDeploymentHook\(deploymentHookUrl\)/);
  assert.match(expressServer, /Refusing to start because the configured database does not match/i);
  assert.match(netlifyApi, /await ensureSchemaPreflight\(\)/);
  assert.match(netlifyApi, /await triggerDeploymentHook\(deploymentHookUrl\)/);
  assert.match(pagesApi, /validateDeploymentHookUrl\(env\.DEPLOY_HOOK_URL/);
  assert.match(pagesApi, /await triggerDeploymentHook\(deploymentHookUrl/);
  assert.match(pagesApi, /public rebuild was not acknowledged/i);
});
