/**
 * Database layer for the Pages Function API.
 *
 * Supports three backends (in priority order):
 *   1. Supabase — when SUPABASE_URL + SUPABASE_SERVICE_KEY are set in env
 *   2. Turso (libsql) — when TURSO_DB_URL is set in env
 *   3. In-memory — fallback (seeded from the 30 story files)
 *
 * This module abstracts the storage so the route handlers
 * don't need to know which backend is active.
 */

import { type Story, type User, type PipelineLog, type DbBackend } from './types'
import { SEED_STORIES, SEED_USERS, SEED_PIPELINE_LOGS } from './seed-data'

// ---------------------------------------------------------------------------
// In-memory backend
// ---------------------------------------------------------------------------

class InMemoryBackend implements DbBackend {
  private stories: Story[]
  private users: User[]
  private logs: PipelineLog[]
  private nextStoryId = SEED_STORIES.length + 1
  private nextLogId = 0

  constructor() {
    this.stories = SEED_STORIES.map((s, i) => ({
      ...s,
      id: i + 1,
      publishedAt: s.publishedAt || null,
    }))
    this.users = SEED_USERS.map(u => ({ ...u }))
    this.logs = []
    this.nextLogId = SEED_PIPELINE_LOGS.length + 1
  }

  listStories(params: { all?: boolean; status?: string; category?: string; limit?: number; offset?: number }): { stories: Story[]; total: number } {
    let filtered = [...this.stories]
    if (!params.all) {
      filtered = filtered.filter(s => s.status === 'published')
    } else if (params.status) {
      filtered = filtered.filter(s => s.status === params.status)
    }
    if (params.category) {
      filtered = filtered.filter(s => s.category === params.category)
    }
    const total = filtered.length
    const offset = params.offset || 0
    const limit = params.limit || 50
    return { stories: filtered.slice(offset, offset + limit), total }
  }

  getStory(slug: string): Story | null {
    return this.stories.find(s => s.slug === slug) || null
  }

  createStory(data: Partial<Story>): Story {
    const now = new Date().toISOString()
    const story: Story = {
      id: this.nextStoryId++,
      slug: data.slug || '',
      title: data.title || '',
      summary: data.summary || '',
      body: data.body || '',
      category: data.category || 'Uncategorised',
      tags: data.tags || [],
      hero: data.hero || '',
      caption: data.caption || '',
      author: data.author || 'The Breakdown Desk',
      readTime: data.readTime || 5,
      publishedAt: null,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    }
    this.stories.push(story)
    return story
  }

  updateStory(slug: string, data: Partial<Story>): Story | null {
    const idx = this.stories.findIndex(s => s.slug === slug)
    if (idx === -1) return null
    this.stories[idx] = { ...this.stories[idx], ...data, slug, updatedAt: new Date().toISOString() }
    return this.stories[idx]
  }

  deleteStory(slug: string): boolean {
    const idx = this.stories.findIndex(s => s.slug === slug)
    if (idx === -1) return false
    this.stories[idx].status = 'archived'
    this.stories[idx].updatedAt = new Date().toISOString()
    return true
  }

  getUser(username: string): User | null {
    return this.users.find(u => u.username === username) || null
  }

  createUser(user: Omit<User, 'id'>): User {
    const newUser: User = { id: this.users.length + 1, ...user }
    this.users.push(newUser)
    return newUser
  }

  getPipelineStats(): { status: string; count: number }[] {
    const counts: Record<string, number> = {}
    for (const s of this.stories) {
      counts[s.status] = (counts[s.status] || 0) + 1
    }
    return Object.entries(counts).map(([status, count]) => ({ status, count }))
  }

  createPipelineLog(storyId: number | string, from: string | null, to: string, by: string, note: string): PipelineLog {
    const log: PipelineLog = {
      id: this.nextLogId++,
      story_id: storyId,
      from_status: from,
      to_status: to,
      changed_by: by,
      note,
      created_at: new Date().toISOString(),
    }
    this.logs.push(log)
    return log
  }

  getPipelineLogs(_storySlug?: string): PipelineLog[] {
    return [...this.logs]
  }

  health(): { stories: number } {
    return { stories: this.stories.length }
  }
}

// ---------------------------------------------------------------------------
// Turso/libsql backend
// ---------------------------------------------------------------------------

class TursoBackend implements DbBackend {
  private client: any
  private dbUrl: string
  private authToken: string

  constructor(dbUrl: string, authToken: string) {
    this.dbUrl = dbUrl
    this.authToken = authToken
  }

  private async getClient(): Promise<any> {
    if (this.client) return this.client
    // Dynamic import — libsql may not be installed when using in-memory
    const { createClient } = await import('@libsql/client/web')
    this.client = createClient({
      url: this.dbUrl,
      authToken: this.authToken,
    })
    return this.client
  }

  async ensureSchema(): Promise<void> {
    const c = await this.getClient()
    await c.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL DEFAULT '',
        display_name TEXT NOT NULL DEFAULT '',
        role TEXT NOT NULL DEFAULT 'editor',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `)
    await c.execute(`
      CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        summary TEXT NOT NULL DEFAULT '',
        body TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL DEFAULT 'Uncategorised',
        tags TEXT NOT NULL DEFAULT '[]',
        hero TEXT NOT NULL DEFAULT '',
        caption TEXT NOT NULL DEFAULT '',
        author TEXT NOT NULL DEFAULT 'The Breakdown Desk',
        read_time INTEGER NOT NULL DEFAULT 5,
        published_at TEXT,
        status TEXT NOT NULL DEFAULT 'draft',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `)
    await c.execute(`
      CREATE TABLE IF NOT EXISTS pipeline_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        story_id INTEGER NOT NULL,
        from_status TEXT,
        to_status TEXT NOT NULL,
        changed_by TEXT NOT NULL DEFAULT 'system',
        note TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
      )
    `)
    // Seed stories if table is empty
    const result = await c.execute('SELECT COUNT(*) as count FROM stories')
    const row = result.rows?.[0]
    if (!row || row.count === 0) {
      for (const s of SEED_STORIES) {
        await c.execute({
          sql: `INSERT OR IGNORE INTO stories (slug, title, summary, body, category, tags, hero, caption, author, read_time, published_at, status, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [s.slug, s.title, s.summary, s.body, s.category, JSON.stringify(s.tags), s.hero, s.caption, s.author, s.readTime, s.publishedAt || null, s.status || 'published', s.createdAt, s.updatedAt],
        })
      }
    }
    // Ensure admin user exists
    const userResult = await c.execute('SELECT COUNT(*) as count FROM users WHERE username = ?', ['admin'])
    const userRow = userResult.rows?.[0]
    if (!userRow || userRow.count === 0) {
      await c.execute({
        sql: `INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)`,
        args: ['admin', '', 'Admin', 'admin'],
      })
    }
  }

  async listStories(params: { all?: boolean; status?: string; category?: string; limit?: number; offset?: number }): Promise<{ stories: Story[]; total: number }> {
    const c = await this.getClient()
    const wheres: string[] = []
    const args: any[] = []

    if (!params.all) {
      wheres.push("status = 'published'")
    } else if (params.status) {
      wheres.push('status = ?')
      args.push(params.status)
    }
    if (params.category) {
      wheres.push('category = ?')
      args.push(params.category)
    }
    const where = wheres.length > 0 ? 'WHERE ' + wheres.join(' AND ') : ''

    const countResult = await c.execute(`SELECT COUNT(*) as count FROM stories ${where}`, args)
    const total = countResult.rows?.[0]?.count || 0

    const limit = params.limit || 50
    const offset = params.offset || 0
    const result = await c.execute({
      sql: `SELECT * FROM stories ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      args: [...args, limit, offset],
    })

    const stories = (result.rows || []).map(this.rowToStory)
    return { stories, total }
  }

  async getStory(slug: string): Promise<Story | null> {
    const c = await this.getClient()
    const result = await c.execute('SELECT * FROM stories WHERE slug = ?', [slug])
    if (!result.rows || result.rows.length === 0) return null
    return this.rowToStory(result.rows[0])
  }

  async createStory(data: Partial<Story>): Promise<Story> {
    const c = await this.getClient()
    const now = new Date().toISOString()
    const result = await c.execute({
      sql: `INSERT INTO stories (slug, title, summary, body, category, tags, hero, caption, author, read_time, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?) RETURNING *`,
      args: [data.slug, data.title || '', data.summary || '', data.body || '', data.category || 'Uncategorised',
             JSON.stringify(data.tags || []), data.hero || '', data.caption || '', data.author || 'The Breakdown Desk',
             data.readTime || 5, now, now],
    })
    return this.rowToStory(result.rows![0])
  }

  async updateStory(slug: string, data: Partial<Story>): Promise<Story | null> {
    const existing = await this.getStory(slug)
    if (!existing) return null

    const c = await this.getClient()
    const now = new Date().toISOString()
    const merged = { ...existing, ...data, slug, updatedAt: now }

    await c.execute({
      sql: `UPDATE stories SET title=?, summary=?, body=?, category=?, tags=?, hero=?, caption=?, author=?, read_time=?, status=?, updated_at=? WHERE slug=?`,
      args: [merged.title, merged.summary, merged.body, merged.category, JSON.stringify(merged.tags),
             merged.hero, merged.caption, merged.author, merged.readTime, merged.status, now, slug],
    })
    return merged
  }

  async deleteStory(slug: string): Promise<boolean> {
    const c = await this.getClient()
    await c.execute("UPDATE stories SET status='archived', updated_at=datetime('now') WHERE slug=?", [slug])
    return true
  }

  async getUser(username: string): Promise<User | null> {
    const c = await this.getClient()
    const result = await c.execute('SELECT * FROM users WHERE username = ?', [username])
    if (!result.rows || result.rows.length === 0) return null
    return result.rows[0] as any
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const c = await this.getClient()
    const result = await c.execute({
      sql: `INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?) RETURNING *`,
      args: [user.username, user.password_hash || '', user.display_name, user.role],
    })
    return result.rows![0] as any
  }

  async getPipelineStats(): Promise<{ status: string; count: number }[]> {
    const c = await this.getClient()
    const result = await c.execute('SELECT status, COUNT(*) as count FROM stories GROUP BY status')
    return (result.rows || []).map((r: any) => ({ status: r.status, count: r.count }))
  }

  async createPipelineLog(storyId: number | string, from: string | null, to: string, by: string, note: string): Promise<PipelineLog> {
    const c = await this.getClient()
    const result = await c.execute({
      sql: `INSERT INTO pipeline_log (story_id, from_status, to_status, changed_by, note) VALUES (?, ?, ?, ?, ?) RETURNING *`,
      args: [storyId, from, to, by, note],
    })
    return result.rows![0] as any
  }

  async getPipelineLogs(_storySlug?: string): Promise<PipelineLog[]> {
    const c = await this.getClient()
    const result = await c.execute('SELECT * FROM pipeline_log ORDER BY created_at DESC LIMIT 100')
    return (result.rows || []) as any
  }

  async health(): Promise<{ stories: number }> {
    const c = await this.getClient()
    const result = await c.execute('SELECT COUNT(*) as count FROM stories')
    return { stories: result.rows?.[0]?.count || 0 }
  }

  private rowToStory(row: any): Story {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      summary: row.summary,
      body: row.body,
      category: row.category,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : (row.tags || []),
      hero: row.hero || '',
      caption: row.caption || '',
      author: row.author || 'The Breakdown Desk',
      readTime: row.read_time || 5,
      publishedAt: row.published_at || null,
      status: row.status || 'draft',
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }
}

// ---------------------------------------------------------------------------
// Exported factory
// ---------------------------------------------------------------------------

let _db: DbBackend | null = null

export async function getDb(env?: Record<string, string>): Promise<DbBackend> {
  if (_db) return _db

  const supabaseUrl = env?.SUPABASE_URL || (typeof process !== 'undefined' ? process.env.SUPABASE_URL : undefined)
  const supabaseServiceKey = env?.SUPABASE_SERVICE_KEY || (typeof process !== 'undefined' ? process.env.SUPABASE_SERVICE_KEY : undefined)
  const supabaseAnonKey = env?.SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? process.env.SUPABASE_ANON_KEY : '')

  // 1. Supabase (highest priority)
  if (supabaseUrl && supabaseServiceKey) {
    console.log('[db] Using Supabase backend:', supabaseUrl)
    const { SupabaseBackend } = await import('./db-supabase')
    const backend = new SupabaseBackend(supabaseUrl, supabaseAnonKey || '', supabaseServiceKey)
    await backend.ensureSchema()
    _db = backend
    return _db
  }

  // 2. Turso (fallback)
  const tursoUrl = env?.TURSO_DB_URL || (typeof process !== 'undefined' ? process.env.TURSO_DB_URL : undefined)
  const tursoToken = env?.TURSO_AUTH_TOKEN || (typeof process !== 'undefined' ? process.env.TURSO_AUTH_TOKEN : undefined)

  if (tursoUrl && tursoToken) {
    console.log('[db] Using Turso backend:', tursoUrl)
    const backend = new TursoBackend(tursoUrl, tursoToken)
    await backend.ensureSchema()
    _db = backend
    return _db
  }

  // 3. In-memory (last resort)
  console.log('[db] Using in-memory backend')
  _db = new InMemoryBackend()
  return _db
}

/** Reset the cached db (useful for testing) */
export function resetDb(): void {
  _db = null
}
