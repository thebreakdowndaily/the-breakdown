import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assertSupabaseCmsSchema,
  SUPABASE_CMS_SCHEMA_PROBES,
} from '../functions/api/supabase-schema-contract.mjs';

function okResponse() {
  return { ok: true, status: 200, text: async () => '[]' };
}

test('CMS schema preflight only performs read-only limited SELECT probes', async () => {
  const requests = [];
  const result = await assertSupabaseCmsSchema({
    baseUrl: 'https://cms-example.supabase.co',
    serviceKey: 'test-service-key-never-log',
    fetchImpl: async (url, options) => {
      requests.push({ url: new URL(url), options });
      return okResponse();
    },
  });

  assert.equal(result.checkedTables, 3);
  assert.equal(requests.length, 3);
  assert.deepEqual(requests.map(r => r.url.pathname), [
    '/rest/v1/stories',
    '/rest/v1/admin_users',
    '/rest/v1/pipeline_log',
  ]);
  for (const request of requests) {
    assert.equal(request.options.method, 'GET');
    assert.equal(request.url.searchParams.get('limit'), '0');
    assert.ok(request.url.searchParams.get('select'));
    assert.equal(request.options.headers.Authorization, 'Bearer test-service-key-never-log');
  }
});

test('CMS schema preflight fails closed on canonical-story schema mismatch', async () => {
  const methods = [];
  await assert.rejects(
    () => assertSupabaseCmsSchema({
      baseUrl: 'https://cms-example.supabase.co',
      serviceKey: 'test-service-key',
      fetchImpl: async (url, options) => {
        methods.push(options.method);
        if (new URL(url).pathname.endsWith('/stories')) {
          return {
            ok: false,
            status: 400,
            text: async () => 'column stories.content does not exist',
          };
        }
        return okResponse();
      },
    }),
    error => {
      assert.match(error.message, /does not match the required legacy Pages CMS schema/i);
      assert.match(error.message, /stories: HTTP 400/i);
      assert.match(error.message, /stories\.content does not exist/i);
      assert.doesNotMatch(error.message, /test-service-key/);
      return true;
    },
  );
  assert.deepEqual(methods, ['GET', 'GET', 'GET']);
});

test('declares the exact legacy CMS columns that must exist before routing requests', () => {
  const byTable = Object.fromEntries(SUPABASE_CMS_SCHEMA_PROBES.map(probe => [probe.table, probe.columns]));
  assert.ok(byTable.stories.includes('content'));
  assert.ok(byTable.stories.includes('fact_check_image'));
  assert.ok(byTable.stories.includes('read_time'));
  assert.ok(byTable.admin_users.includes('password_hash'));
  assert.ok(byTable.pipeline_log.includes('to_status'));
});
