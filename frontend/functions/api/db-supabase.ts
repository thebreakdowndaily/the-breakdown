/**
 * Supabase database adapter for the Pages Function API.
 *
 * Uses the Supabase REST API directly via fetch (no JS client needed).
 * Works alongside the existing CMS tables by reusing the `stories` table
 * and creating its own `pipeline_log` table (created via Supabase SQL editor
 * or local script; this adapter will gracefully handle its absence).
 *
 * Priority: checked first by getDb() in db.ts when SUPABASE_URL and
 * SUPABASE_SERVICE_KEY are set in environment variables.
 */

import { type Story, type User, type PipelineLog, type DbBackend } from './types'
import { SEED_STORIES } from './seed-data'

interface SupabaseConfig {
  url: string
  anonKey: string
  serviceKey: string
}

function headers(cfg: SupabaseConfig, useService = false): Record<string, string> {
  const key = useService ? cfg.serviceKey : cfg.anonKey
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Prefer: 'return=representation',
  }
}

/** Convert a Supabase row to our Story type */
function rowToStory(row: any): Story {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary || '',
    body: row.content || row.body || '',
    category: row.category || 'Uncategorised',
    tags: typeof row.tags === 'string'
      ? (() => { try { return JSON.parse(row.tags) } catch { return [] } })()
      : (Array.isArray(row.tags) ? row.tags : []),
    hero: row.hero || row.fact_check_image || '',
    caption: row.caption || row.fact_check_image_caption || '',
    author: row.author || 'The Breakdown Desk',
    readTime: row.read_time || 5,
    publishedAt: row.published_at || null,
    status: row.status || 'draft',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/** Convert our Story fields to Supabase-compatible column names */
function storyToRow(data: Partial<Story>): Record<string, any> {
  const row: Record<string, any> = {}
  if (data.slug !== undefined) row.slug = data.slug
  if (data.title !== undefined) row.title = data.title
  if (data.summary !== undefined) row.summary = data.summary
  if (data.body !== undefined) row.content = data.body
  if (data.category !== undefined) row.category = data.category
  if (data.tags !== undefined) row.tags = JSON.stringify(data.tags)
  if (data.hero !== undefined) row.fact_check_image = data.hero
  if (data.caption !== undefined) row.fact_check_image_caption = data.caption
  if (data.author !== undefined) row.author = data.author
  if (data.readTime !== undefined) row.read_time = data.readTime
  if (data.publishedAt !== undefined) row.published_at = data.publishedAt
  if (data.status !== undefined) row.status = data.status
  return row
}

export class SupabaseBackend implements DbBackend {
  private cfg: SupabaseConfig

  constructor(url: string, anonKey: string, serviceKey: string) {
    this.cfg = { url, anonKey, serviceKey }
  }

  async ensureSchema(): Promise<void> {
    // The Supabase project already has:
    //   - admin_users table (CMS users)
    //   - stories table (CMS content, 48 existing stories)
    //
    // A pipeline_log table needs to be created via Supabase SQL editor:
    //   CREATE TABLE IF NOT EXISTS pipeline_log (
    //     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    //     story_id UUID NOT NULL,
    //     from_status TEXT,
    //     to_status TEXT NOT NULL,
    //     changed_by TEXT NOT NULL DEFAULT 'system',
    //     note TEXT NOT NULL DEFAULT '',
    //     created_at TIMESTAMPTZ DEFAULT NOW()
    //   );
    //
    // We gracefully handle its absence — pipeline features will
    // return empty logs until the table is created.

    // Seed our 30 stories into the stories table if they don't exist by slug
    for (const s of SEED_STORIES) {
      const resp = await fetch(
        `${this.cfg.url}/rest/v1/stories?slug=eq.${encodeURIComponent(s.slug)}&select=id`,
        { headers: headers(this.cfg, true) }
      )
      const existing = await resp.json()
      if (!Array.isArray(existing) || existing.length === 0) {
        await fetch(`${this.cfg.url}/rest/v1/stories`, {
          method: 'POST',
          headers: headers(this.cfg, true),
          body: JSON.stringify({
            slug: s.slug,
            title: s.title,
            summary: s.summary,
            content: s.body,
            category: s.category,
            tags: JSON.stringify(s.tags),
            fact_check_image: s.hero,
            fact_check_image_caption: s.caption,
            author: s.author,
            read_time: s.readTime,
            published_at: s.publishedAt || null,
            status: s.status || 'published',
            created_at: s.createdAt,
            updated_at: s.updatedAt,
          }),
        })
      }
    }
  }

  /** Helper to safely query a table that may not exist */
  private async safeQuery(table: string, query: string): Promise<any[]> {
    try {
      const resp = await fetch(`${this.cfg.url}/rest/v1/${table}?${query}`, {
        headers: headers(this.cfg, true),
      })
      if (resp.status === 404 || resp.status === 400) {
        console.warn(`[supabase] Table '${table}' not found — pipeline features unavailable`)
        return []
      }
      if (!resp.ok) return []
      const data = await resp.json()
      return Array.isArray(data) ? data : []
    } catch (err) {
      console.warn(`[supabase] Error querying '${table}':`, err)
      return []
    }
  }

  // ---- Stories ----

  async listStories(params: {
    all?: boolean
    status?: string
    category?: string
    limit?: number
    offset?: number
  }): Promise<{ stories: Story[]; total: number }> {
    const filters: string[] = []
    if (!params.all && !params.status) {
      filters.push('status=eq.published')
    } else if (params.status) {
      filters.push(`status=eq.${params.status}`)
    }
    if (params.category) {
      filters.push(`category=eq.${params.category}`)
    }

    const filterStr = filters.length > 0 ? '&' + filters.join('&') : ''
    const limit = params.limit || 50
    const offset = params.offset || 0

    // Get total count
    const countResp = await fetch(
      `${this.cfg.url}/rest/v1/stories?select=count${filterStr}`,
      { headers: headers(this.cfg, true) }
    )
    const countData = await countResp.json()
    const total = Array.isArray(countData) && countData.length > 0 ? countData[0].count : 0

    // Get stories
    const resp = await fetch(
      `${this.cfg.url}/rest/v1/stories?select=*${filterStr}&order=created_at.desc&limit=${limit}&offset=${offset}`,
      { headers: headers(this.cfg, true) }
    )
    const rows = await resp.json()
    const stories = (Array.isArray(rows) ? rows : []).map(rowToStory)
    return { stories, total }
  }

  async getStory(slug: string): Promise<Story | null> {
    const resp = await fetch(
      `${this.cfg.url}/rest/v1/stories?slug=eq.${encodeURIComponent(slug)}&select=*`,
      { headers: headers(this.cfg, true) }
    )
    const rows = await resp.json()
    if (!Array.isArray(rows) || rows.length === 0) return null
    return rowToStory(rows[0])
  }

  async createStory(data: Partial<Story>): Promise<Story> {
    const row = storyToRow(data)
    row.created_at = new Date().toISOString()
    row.updated_at = row.created_at
    const resp = await fetch(`${this.cfg.url}/rest/v1/stories`, {
      method: 'POST',
      headers: headers(this.cfg, true),
      body: JSON.stringify(row),
    })
    const result = await resp.json()
    return rowToStory(Array.isArray(result) ? result[0] : result)
  }

  async updateStory(slug: string, data: Partial<Story>): Promise<Story | null> {
    const existing = await this.getStory(slug)
    if (!existing) return null

    const row = storyToRow(data)
    row.updated_at = new Date().toISOString()
    // Don't overwrite slug
    delete row.slug

    const resp = await fetch(
      `${this.cfg.url}/rest/v1/stories?slug=eq.${encodeURIComponent(slug)}`,
      {
        method: 'PATCH',
        headers: headers(this.cfg, true),
        body: JSON.stringify(row),
      }
    )
    if (!resp.ok) return null
    return this.getStory(slug)
  }

  async deleteStory(slug: string): Promise<boolean> {
    await fetch(
      `${this.cfg.url}/rest/v1/stories?slug=eq.${encodeURIComponent(slug)}`,
      {
        method: 'PATCH',
        headers: headers(this.cfg, true),
        body: JSON.stringify({ status: 'archived', updated_at: new Date().toISOString() }),
      }
    )
    return true
  }

  // ---- Users ----

  async getUser(username: string): Promise<User | null> {
    const resp = await fetch(
      `${this.cfg.url}/rest/v1/admin_users?email=eq.${encodeURIComponent(username)}&select=*`,
      { headers: headers(this.cfg, true) }
    )
    const rows = await resp.json()
    if (Array.isArray(rows) && rows.length > 0) {
      const u = rows[0]
      return {
        id: u.id,
        username: u.email,
        display_name: u.name,
        role: 'admin',
        password_hash: u.password_hash,
      }
    }
    return null
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const resp = await fetch(`${this.cfg.url}/rest/v1/admin_users`, {
      method: 'POST',
      headers: headers(this.cfg, true),
      body: JSON.stringify({
        email: user.username,
        name: user.display_name,
        password_hash: user.password_hash || '',
      }),
    })
    const result = await resp.json()
    const row = Array.isArray(result) ? result[0] : result
    return {
      id: row.id,
      username: row.email,
      display_name: row.name,
      role: 'admin',
    }
  }

  // ---- Pipeline ----

  async getPipelineStats(): Promise<{ status: string; count: number }[]> {
    const allResp = await fetch(
      `${this.cfg.url}/rest/v1/stories?select=status`,
      { headers: headers(this.cfg, true) }
    )
    const all = await allResp.json()
    const counts: Record<string, number> = {}
    if (Array.isArray(all)) {
      for (const s of all) {
        counts[s.status] = (counts[s.status] || 0) + 1
      }
    }
    return Object.entries(counts).map(([status, count]) => ({ status, count }))
  }

  async createPipelineLog(
    storyId: number | string,
    from: string | null,
    to: string,
    by: string,
    note: string,
  ): Promise<PipelineLog> {
    const rows = await this.safeQuery('pipeline_log', 'select=id&limit=1')
    if (rows.length === 0) {
      // pipeline_log table doesn't exist yet — return a fake log
      return {
        id: 0,
        story_id: storyId,
        from_status: from,
        to_status: to,
        changed_by: by,
        note: note + ' (table not created)',
        created_at: new Date().toISOString(),
      }
    }

    const resp = await fetch(`${this.cfg.url}/rest/v1/pipeline_log`, {
      method: 'POST',
      headers: headers(this.cfg, true),
      body: JSON.stringify({
        story_id: storyId,
        from_status: from,
        to_status: to,
        changed_by: by,
        note,
      }),
    })
    const result = await resp.json()
    const row = Array.isArray(result) ? result[0] : result
    return {
      id: row.id,
      story_id: row.story_id,
      from_status: row.from_status,
      to_status: row.to_status,
      changed_by: row.changed_by,
      note: row.note,
      created_at: row.created_at,
    }
  }

  async getPipelineLogs(_storySlug?: string): Promise<PipelineLog[]> {
    const rows = await this.safeQuery(
      'pipeline_log',
      'select=*&order=created_at.desc&limit=100'
    )
    return rows.map((r: any) => ({
      id: r.id,
      story_id: r.story_id,
      from_status: r.from_status,
      to_status: r.to_status,
      changed_by: r.changed_by,
      note: r.note,
      created_at: r.created_at,
    }))
  }

  // ---- Health ----

  async health(): Promise<{ stories: number }> {
    const resp = await fetch(
      `${this.cfg.url}/rest/v1/stories?select=count`,
      { headers: headers(this.cfg, true) }
    )
    const data = await resp.json()
    const count = Array.isArray(data) && data.length > 0 ? data[0].count : 0
    return { stories: count }
  }
}
