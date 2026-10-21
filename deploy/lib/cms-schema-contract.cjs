/**
 * Read-only contract check shared by Express and Netlify legacy CMS runtimes.
 * These handlers use the legacy content/fact_check_image/read_time schema.
 * The canonical blocks/hero_image/reading_time schema is rejected until a
 * block-preserving bridge exists. Never create or seed rows here.
 */
const TABLE_PROBES = Object.freeze([
  Object.freeze({ table: 'stories', columns: [
    'id', 'slug', 'title', 'summary', 'content', 'category', 'tags',
    'fact_check_image', 'fact_check_image_caption', 'author', 'read_time',
    'published_at', 'status', 'created_at', 'updated_at',
  ] }),
  Object.freeze({ table: 'admin_users', columns: ['id', 'email', 'name', 'password_hash'] }),
  Object.freeze({ table: 'pipeline_log', columns: [
    'id', 'story_id', 'from_status', 'to_status', 'changed_by', 'note', 'created_at',
  ] }),
  Object.freeze({ table: 'publish_log', columns: ['id', 'story_id', 'published_by', 'deploy_status'] }),
  Object.freeze({ table: 'story_sources', columns: ['id', 'story_id', 'label', 'url', 'source_type'] }),
]);

const REQUIRED_STATUSES = Object.freeze([
  'draft', 'in-review', 'fact-checking', 'ready',
  'approved-for-release', 'published', 'archived', 'scheduled', 'trash',
]);

function compactError(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 180);
}

async function assertLegacyCmsSchema({ baseUrl, serviceKey, fetchImpl = globalThis.fetch }) {
  if (!baseUrl || !serviceKey) {
    const error = new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY are required');
    error.code = 'SUPABASE_CMS_SCHEMA_MISMATCH';
    throw error;
  }
  const failures = [];
  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    Accept: 'application/json',
  };

  for (const probe of TABLE_PROBES) {
    const url = new URL(`/rest/v1/${probe.table}`, baseUrl);
    url.searchParams.set('select', probe.columns.join(','));
    url.searchParams.set('limit', '0');
    try {
      const response = await fetchImpl(url, { method: 'GET', headers });
      if (!response.ok) {
        const detail = compactError(await response.text().catch(() => ''));
        failures.push(`${probe.table}: HTTP ${response.status}${detail ? ` — ${detail}` : ''}`);
      }
    } catch (error) {
      failures.push(`${probe.table}: request failed (${compactError(error && error.message || error)})`);
    }
  }

  for (const status of REQUIRED_STATUSES) {
    const url = new URL('/rest/v1/stories', baseUrl);
    url.searchParams.set('select', 'status');
    url.searchParams.set('status', `eq.${status}`);
    url.searchParams.set('limit', '0');
    try {
      const response = await fetchImpl(url, { method: 'GET', headers });
      if (!response.ok) {
        const detail = compactError(await response.text().catch(() => ''));
        failures.push(`stories.status does not support "${status}": HTTP ${response.status}${detail ? ` — ${detail}` : ''}`);
      }
    } catch (error) {
      failures.push(`stories.status=${status}: request failed (${compactError(error && error.message || error)})`);
    }
  }

  if (failures.length) {
    const error = new Error(
      'Supabase database does not match the legacy CMS contract. No content writes were attempted. ' +
      'Configure the intended CMS database or migrate the schema deliberately. ' + failures.join('; ')
    );
    error.code = 'SUPABASE_CMS_SCHEMA_MISMATCH';
    throw error;
  }
  return { checkedTables: TABLE_PROBES.length, checkedStatuses: REQUIRED_STATUSES.length };
}

module.exports = { TABLE_PROBES, REQUIRED_STATUSES, assertLegacyCmsSchema };
