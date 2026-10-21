/**
 * Read-only startup preflight for the legacy Pages CMS Supabase contract.
 *
 * The Pages adapter writes the legacy CMS schema (content/fact_check_image/read_time).
 * The canonical site schema (blocks/hero_image/reading_time) is not compatible.
 * Probe with SELECT ... LIMIT 0 so a wrong project fails before any content writes.
 */
export const SUPABASE_CMS_SCHEMA_PROBES = Object.freeze([
  Object.freeze({
    table: 'stories',
    columns: Object.freeze([
      'id', 'slug', 'title', 'summary', 'content', 'category', 'tags',
      'fact_check_image', 'fact_check_image_caption', 'author', 'read_time',
      'published_at', 'status', 'created_at', 'updated_at',
    ]),
  }),
  Object.freeze({
    table: 'admin_users',
    columns: Object.freeze(['id', 'email', 'name', 'password_hash']),
  }),
  Object.freeze({
    table: 'pipeline_log',
    columns: Object.freeze([
      'id', 'story_id', 'from_status', 'to_status', 'changed_by', 'note', 'created_at',
    ]),
  }),
]);

export const REQUIRED_CMS_WORKFLOW_STATUSES = Object.freeze([
  'draft',
  'in-review',
  'fact-checking',
  'ready',
  'approved-for-release',
  'published',
  'archived',
]);

function compactError(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 180);
}

/**
 * Verify the CMS table/column and workflow-state contract with read-only REST
 * requests. No table creation, story seeding, or database mutation occurs here.
 */
export async function assertSupabaseCmsSchema({ baseUrl, serviceKey, fetchImpl = fetch }) {
  if (!baseUrl || !serviceKey) {
    throw new Error('Supabase CMS schema preflight requires SUPABASE_URL and SUPABASE_SERVICE_KEY');
  }

  const failures = [];
  for (const probe of SUPABASE_CMS_SCHEMA_PROBES) {
    const url = new URL(`/rest/v1/${probe.table}`, baseUrl);
    url.searchParams.set('select', probe.columns.join(','));
    url.searchParams.set('limit', '0');

    let response;
    try {
      response = await fetchImpl(url, {
        method: 'GET',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Accept: 'application/json',
        },
      });
    } catch (error) {
      failures.push(`${probe.table}: request failed (${compactError(error?.message || error)})`);
      continue;
    }

    if (!response.ok) {
      const detail = compactError(await response.text().catch(() => ''));
      failures.push(`${probe.table}: HTTP ${response.status}${detail ? ` — ${detail}` : ''}`);
    }
  }

  // A status enum that cannot represent every workflow state is a schema
  // mismatch too. PostgREST casts enum filters to the underlying database type.
  for (const status of REQUIRED_CMS_WORKFLOW_STATUSES) {
    const url = new URL('/rest/v1/stories', baseUrl);
    url.searchParams.set('select', 'status');
    url.searchParams.set('status', `eq.${status}`);
    url.searchParams.set('limit', '0');

    let response;
    try {
      response = await fetchImpl(url, {
        method: 'GET',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Accept: 'application/json',
        },
      });
    } catch (error) {
      failures.push(`stories.status=${status}: request failed (${compactError(error?.message || error)})`);
      continue;
    }

    if (!response.ok) {
      const detail = compactError(await response.text().catch(() => ''));
      failures.push(`stories.status does not support "${status}": HTTP ${response.status}${detail ? ` — ${detail}` : ''}`);
    }
  }

  if (failures.length) {
    const error = new Error(
      'Supabase database does not match the required legacy Pages CMS schema. ' +
      'No content writes were attempted. Configure the intended CMS database or migrate it deliberately. ' +
      failures.join('; ')
    );
    error.name = 'SupabaseCmsSchemaError';
    error.code = 'SUPABASE_CMS_SCHEMA_MISMATCH';
    throw error;
  }

  return { checkedTables: SUPABASE_CMS_SCHEMA_PROBES.length, checkedStatuses: REQUIRED_CMS_WORKFLOW_STATUSES.length };
}
