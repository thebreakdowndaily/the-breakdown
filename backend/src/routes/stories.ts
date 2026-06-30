import { Router, Request, Response } from 'express'
import { getDb, queryAll, queryOne, execute } from '../db.js'
import { authMiddleware } from '../auth.js'

const router = Router()

function rowToStory(row: any) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    body: row.body,
    category: row.category,
    tags: JSON.parse(row.tags || '[]'),
    hero: row.hero,
    caption: row.caption,
    author: row.author,
    readTime: row.read_time,
    publishedAt: row.published_at || row.created_at,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// GET /api/stories — list stories
router.get('/', (req: Request, res: Response) => {
  const db = getDb()
  const includeAll = req.query.all === 'true'
  const status = req.query.status as string | undefined
  const category = req.query.category as string | undefined
  const limit = Math.min(parseInt(req.query.limit as string) || 50, 100)
  const offset = parseInt(req.query.offset as string) || 0

  let conditions: string[] = []
  let params: any[] = []

  if (!includeAll) {
    conditions.push("status = ?")
    params.push('published')
  } else if (status) {
    conditions.push("status = ?")
    params.push(status)
  }

  if (category) {
    conditions.push("category = ?")
    params.push(category)
  }

  const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''
  const sql = `SELECT * FROM stories ${where} ORDER BY published_at DESC, created_at DESC LIMIT ? OFFSET ?`
  params.push(limit, offset)

  const rows = queryAll(db, sql, params)
  const stories = rows.map(rowToStory)

  // Total count
  const countSql = `SELECT COUNT(*) as total FROM stories ${where}`
  const countParams = includeAll || !status ? params.slice(0, -2) : params.slice(0, -2)
  // Actually simpler: recount without limit/offset
  let total = 0
  if (conditions.length > 0) {
    const countResult = queryOne(db, countSql, params.slice(0, -2))
    total = countResult?.total || 0
  } else {
    const countResult = queryOne(db, 'SELECT COUNT(*) as total FROM stories')
    total = countResult?.total || 0
  }

  res.json({ stories, total, limit, offset })
})

// GET /api/stories/:slug — get single story
router.get('/:slug', (req: Request, res: Response) => {
  const db = getDb()
  const row = queryOne(db, 'SELECT * FROM stories WHERE slug = ?', [req.params.slug])

  if (!row) {
    res.status(404).json({ error: 'Story not found' })
    return
  }

  if (row.status !== 'published') {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(404).json({ error: 'Story not found' })
      return
    }
  }

  res.json({ story: rowToStory(row) })
})

// POST /api/stories — create new story
router.post('/', authMiddleware, (req: Request, res: Response) => {
  const { slug, title, summary, body, category, tags, hero, caption, author, readTime } = req.body

  if (!slug) {
    res.status(400).json({ error: 'Slug is required' })
    return
  }

  const db = getDb()
  const existing = queryOne(db, 'SELECT id FROM stories WHERE slug = ?', [slug])
  if (existing) {
    res.status(409).json({ error: 'Story with this slug already exists' })
    return
  }

  const now = new Date().toISOString()
  execute(db, `
    INSERT INTO stories (slug, title, summary, body, category, tags, hero, caption, author, read_time, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?)
  `, [
    slug,
    title || '',
    summary || '',
    body || '',
    category || 'Uncategorised',
    JSON.stringify(tags || []),
    hero || '',
    caption || '',
    author || 'The Breakdown Desk',
    readTime || 5,
    now,
    now,
  ])

  const row = queryOne(db, 'SELECT * FROM stories WHERE slug = ?', [slug])
  res.status(201).json({ story: rowToStory(row) })
})

// PUT /api/stories/:slug — update story
router.put('/:slug', authMiddleware, (req: Request, res: Response) => {
  const db = getDb()
  const existing = queryOne(db, 'SELECT * FROM stories WHERE slug = ?', [req.params.slug])

  if (!existing) {
    res.status(404).json({ error: 'Story not found' })
    return
  }

  const { title, summary, body, category, tags, hero, caption, author, readTime, status } = req.body

  // Save revision before updating
  execute(db, `
    INSERT INTO revisions (story_id, title, summary, body, changed_by)
    VALUES (?, ?, ?, ?, ?)
  `, [existing.id, existing.title, existing.summary, existing.body, (req as any).user?.username || 'system'])

  const now = new Date().toISOString()
  execute(db, `
    UPDATE stories SET
      title = COALESCE(?, title),
      summary = COALESCE(?, summary),
      body = COALESCE(?, body),
      category = COALESCE(?, category),
      tags = COALESCE(?, tags),
      hero = COALESCE(?, hero),
      caption = COALESCE(?, caption),
      author = COALESCE(?, author),
      read_time = COALESCE(?, read_time),
      status = COALESCE(?, status),
      updated_at = ?
    WHERE slug = ?
  `, [
    title ?? null,
    summary ?? null,
    body ?? null,
    category ?? null,
    tags ? JSON.stringify(tags) : null,
    hero ?? null,
    caption ?? null,
    author ?? null,
    readTime ?? null,
    status ?? null,
    now,
    req.params.slug,
  ])

  const updated = queryOne(db, 'SELECT * FROM stories WHERE slug = ?', [req.params.slug])
  res.json({ story: rowToStory(updated) })
})

// DELETE /api/stories/:slug — archive
router.delete('/:slug', authMiddleware, (req: Request, res: Response) => {
  const db = getDb()
  const existing = queryOne(db, 'SELECT id FROM stories WHERE slug = ?', [req.params.slug])
  if (!existing) {
    res.status(404).json({ error: 'Story not found' })
    return
  }

  execute(db, "UPDATE stories SET status = 'archived', updated_at = datetime('now') WHERE slug = ?", [req.params.slug])
  res.json({ message: 'Story archived' })
})

export default router
