import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assertSupabaseCmsSchema,
  SUPABASE_CMS_SCHEMA_PROBES,
  REQUIRED_CMS_WORKFLOW_STATUSES,
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
  assert.equal(result.checkedStatuses, REQUIRED_CMS_WORKFLOW_STATUSES.length);
  assert.equal(requests.length, 3 + REQUIRED_CMS_WORKFLOW_STATUSES.length);
  assert.deepEqual(requests.slice(0, 3).map(r => r.url.pathname), [
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
  assert.deepEqual(
    requests.slice(3).map(r => r.url.searchParams.get('status')),
    REQUIRED_CMS_WORKFLOW_STATUSES.map(status => `eq.${status}`),
  );
});

test('CMS schema preflight fails closed on canonical-story schema mismatch', async () => {
  const requests = [];
  await assert.rejects(
    () => assertSupabaseCmsSchema({
      baseUrl: 'https://cms-example.supabase.co',
      serviceKey: 'test-service-key',
      fetchImpl: async (url, options) => {
        requests.push({ url: new URL(url), options });
        const parsed = new URL(url);
        if (parsed.pathname.endsWith('/stories') && parsed.searchParams.get('select')?.includes('content')) {
          return {
            ok: false,
            status: 400,
            text: async () => 'column stories.content does not exist',
          };
        }
        if (parsed.searchParams.get('status') === 'eq.approved-for-release') {
          return {
            ok: false,
            status: 400,
            text: async () => 'invalid input value for enum story_status',
          };
        }
        return okResponse();
      },
    }),
    error => {
      assert.match(error.message, /does not match the required legacy Pages CMS schema/i);
      assert.match(error.message, /stories: HTTP 400/i);
      assert.match(error.message, /stories\.content does not exist/i);
      assert.match(error.message, /does not support "approved-for-release"/i);
      assert.doesNotMatch(error.message, /test-service-key/);
      return true;
    },
  );
  assert.ok(requests.every(request => request.options.method === 'GET'));
});

test('declares required legacy CMS columns and every pipeline state', () => {
  const byTable = Object.fromEntries(SUPABASE_CMS_SCHEMA_PROBES.map(probe => [probe.table, probe.columns]));
  assert.ok(byTable.stories.includes('content'));
  assert.ok(byTable.stories.includes('fact_check_image'));
  assert.ok(byTable.stories.includes('read_time'));
  assert.ok(byTable.admin_users.includes('password_hash'));
  assert.ok(byTable.pipeline_log.includes('to_status'));
  assert.deepEqual(REQUIRED_CMS_WORKFLOW_STATUSES, [
    'draft', 'in-review', 'fact-checking', 'ready', 'approved-for-release', 'published', 'archived',
  ]);
});
