import { Router, Request, Response } from 'express'
import { getDb, queryOne, queryAll, execute } from '../db.js'
import { authMiddleware } from '../auth.js'

const router = Router()

const ACTION_MAP: Record<string, { to: string; defaultNote: string }> = {
  submit:  { to: 'in-review',     defaultNote: 'Submitted for review' },
  approve: { to: 'fact-checking', defaultNote: 'Approved for fact-checking' },
  verify:  { to: 'ready',         defaultNote: 'Fact-checking complete' },
  publish: { to: 'published',     defaultNote: 'Published to live site' },
  reject:  { to: 'draft',         defaultNote: 'Returned to draft' },
  archive: { to: 'archived',      defaultNote: 'Archived' },
  draft:   { to: 'draft',         defaultNote: 'Moved back to draft' },
}

const VALID_TRANSITIONS: Record<string, string[]> = {
  'draft': ['in-review'],
  'in-review': ['fact-checking', 'draft'],
  'fact-checking': ['ready', 'draft'],
  'ready': ['published', 'draft'],
  'published': ['archived'],
  'archived': ['draft'],
}

// POST /api/pipeline/:slug/:action
router.post('/:slug/:action', authMiddleware, (req: Request, res: Response) => {
  const { slug, action } = req.params
  const { note } = req.body || {}
  const db = getDb()

  const actionDef = ACTION_MAP[action as string]
  if (!actionDef) {
    res.status(400).json({ error: `Invalid action: ${action}. Valid: ${Object.keys(ACTION_MAP).join(', ')}` })
    return
  }

  const story = queryOne(db, 'SELECT id, slug, title, status FROM stories WHERE slug = ?', [slug])
  if (!story) {
    res.status(404).json({ error: 'Story not found' })
    return
  }

  const status = story.status as string
  const allowed = (VALID_TRANSITIONS[status] || []) as string[]
  if (!allowed.includes(actionDef.to)) {
    res.status(400).json({
      error: `Cannot transition from '${story.status}' to '${actionDef.to}'`,
      allowedTransitions: allowed,
    })
    return
  }

  const now = new Date().toISOString()
  const username = (req as any).user?.username || 'system'

  // Update story status
  const updateFields = ["status = ?", "updated_at = ?"]
  const updateParams: any[] = [actionDef.to, now]

  if (actionDef.to === 'published') {
    updateFields.push("published_at = ?")
    updateParams.push(now)
  }

  updateParams.push(slug)
  execute(db, `UPDATE stories SET ${updateFields.join(', ')} WHERE slug = ?`, updateParams)

  // Log pipeline action
  execute(db, `
    INSERT INTO pipeline_log (story_id, from_status, to_status, changed_by, note)
    VALUES (?, ?, ?, ?, ?)
  `, [story.id, story.status, actionDef.to, username, note || actionDef.defaultNote])

  res.json({
    message: `Story moved from '${story.status}' to '${actionDef.to}'`,
    story: { slug: story.slug, title: story.title, status: actionDef.to },
  })
})

// GET /api/pipeline/:slug/log
router.get('/:slug/log', (req: Request, res: Response) => {
  const db = getDb()
  const story = queryOne(db, 'SELECT id FROM stories WHERE slug = ?', [req.params.slug])
  if (!story) {
    res.status(404).json({ error: 'Story not found' })
    return
  }

  const logs = queryAll(db, 'SELECT * FROM pipeline_log WHERE story_id = ? ORDER BY created_at DESC', [story.id])
  res.json({ logs })
})

// GET /api/pipeline/stats
router.get('/stats', authMiddleware, (_req: Request, res: Response) => {
  const db = getDb()
  const stats = queryAll(db, 'SELECT status, COUNT(*) as count FROM stories GROUP BY status')
  const total = stats.reduce((sum: number, s: any) => sum + s.count, 0)
  res.json({ stats, total })
})

export default router
