import { Router, Request, Response } from 'express'
import { createHash } from 'node:crypto'
import { getDb, queryOne, queryAll, execute } from '../db.js'
import { authMiddleware } from '../auth.js'

const router = Router()

const PUBLICATION_APPROVAL_PREFIX = 'PUBLICATION_APPROVAL_V1:'
const APPROVAL_TTL_MS = 60 * 60 * 1000

function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String)
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) return parsed.map(String)
    } catch { /* invalid stored tags are normalised to empty */ }
  }
  return []
}

function storyContentHash(story: any): string {
  // Keep the canonical property order aligned with frontend/functions/api/publication-gate.mjs.
  const payload = {
    slug: String(story.slug || ''),
    title: String(story.title || ''),
    summary: String(story.summary || ''),
    body: String(story.body ?? story.content ?? ''),
    category: String(story.category || 'Uncategorised'),
    tags: parseTags(story.tags),
    hero: String(story.hero ?? story.fact_check_image ?? ''),
    caption: String(story.caption ?? story.fact_check_image_caption ?? ''),
    author: String(story.author || 'The Breakdown Desk'),
    readTime: Number(story.readTime ?? story.read_time ?? 5),
  }
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex')
}

function getPublicationDestination(): string | null {
  const raw = process.env.PUBLICATION_DESTINATION || ''
  try {
    const parsed = new URL(raw)
    if (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost') return null
    if (parsed.pathname !== '/' || parsed.search || parsed.hash) return null
    return parsed.origin
  } catch {
    return null
  }
}

function parseApproval(note: unknown): any | null {
  if (typeof note !== 'string' || !note.startsWith(PUBLICATION_APPROVAL_PREFIX)) return null
  try {
    const value = JSON.parse(note.slice(PUBLICATION_APPROVAL_PREFIX.length))
    if (value?.schema !== 1 || typeof value.contentHash !== 'string' ||
        typeof value.destination !== 'string' || typeof value.approvedBy !== 'string' ||
        typeof value.approvedAt !== 'string') return null
    return value
  } catch { return null }
}

function latestApprovalIsValid(db: ReturnType<typeof getDb>, story: any): { ok: true } | { ok: false; reason: string } {
  const destination = getPublicationDestination()
  if (!destination) return { ok: false, reason: 'PUBLICATION_DESTINATION is not configured as a valid HTTPS origin' }
  const log = queryOne(db,
    'SELECT * FROM pipeline_log WHERE story_id = ? ORDER BY created_at DESC, id DESC LIMIT 1',
    [story.id])
  if (!log || log.to_status !== 'approved-for-release') return { ok: false, reason: 'No current release approval exists' }
  const approval = parseApproval(log.note)
  if (!approval) return { ok: false, reason: 'Release approval record is malformed or missing' }
  if (String(log.changed_by) !== approval.approvedBy) {
    return { ok: false, reason: 'Approval identity does not match the latest authorised decision' }
  }
  if (approval.destination !== destination) return { ok: false, reason: 'Approval destination does not match this release' }
  const approvedAt = Date.parse(approval.approvedAt)
  const now = Date.now()
  if (!Number.isFinite(approvedAt) || approvedAt > now + 60_000 || now - approvedAt > APPROVAL_TTL_MS) {
    return { ok: false, reason: 'Release approval is expired or has an invalid timestamp' }
  }
  if (approval.contentHash !== storyContentHash(story)) return { ok: false, reason: 'Story content changed after approval' }
  return { ok: true }
}

const ACTION_MAP: Record<string, { to: string; defaultNote: string }> = {
  submit:  { to: 'in-review',     defaultNote: 'Submitted for review' },
  approve: { to: 'fact-checking', defaultNote: 'Approved for fact-checking' },
  verify:  { to: 'ready',         defaultNote: 'Fact-checking complete' },
  'approve-release': { to: 'approved-for-release', defaultNote: 'Approved for public release' },
  publish: { to: 'published',     defaultNote: 'Published to live site' },
  reject:  { to: 'draft',         defaultNote: 'Returned to draft' },
  archive: { to: 'archived',      defaultNote: 'Archived' },
  draft:   { to: 'draft',         defaultNote: 'Moved back to draft' },
}

const VALID_TRANSITIONS: Record<string, string[]> = {
  'draft': ['in-review'],
  'in-review': ['fact-checking', 'draft'],
  'fact-checking': ['ready', 'draft'],
  'ready': ['approved-for-release', 'draft'],
  'approved-for-release': ['published', 'draft'],
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

  const story = queryOne(db, 'SELECT * FROM stories WHERE slug = ?', [slug])
  if (!story) {
    res.status(404).json({ error: 'Story not found' })
    return
  }

  const status = story.status as string
  const currentUser = (req as any).user || {}
  const username = String(currentUser.username || 'system')
  if (action === 'approve-release' && !['admin', 'editor-in-chief'].includes(String(currentUser.role))) {
    res.status(403).json({ error: 'Only an authorised Editor-in-Chief can approve public release' })
    return
  }

  const allowed = (VALID_TRANSITIONS[status] || []) as string[]
  if (!allowed.includes(actionDef.to)) {
    res.status(400).json({
      error: `Cannot transition from '${story.status}' to '${actionDef.to}'`,
      allowedTransitions: allowed,
    })
    return
  }

  const now = new Date().toISOString()
  let logNote = (typeof note === 'string' && note) || actionDef.defaultNote

  if (action === 'approve-release') {
    const destination = getPublicationDestination()
    if (!destination) {
      res.status(503).json({ error: 'PUBLICATION_DESTINATION must be configured as a valid HTTPS origin' })
      return
    }
    const approval = {
      schema: 1,
      contentHash: storyContentHash(story),
      destination,
      approvedBy: username,
      approvedAt: now,
    }
    logNote = PUBLICATION_APPROVAL_PREFIX + JSON.stringify(approval)
    // Persist the exact-version approval before allowing the state transition.
    execute(db, `
      INSERT INTO pipeline_log (story_id, from_status, to_status, changed_by, note)
      VALUES (?, ?, ?, ?, ?)
    `, [story.id, status, 'approved-for-release', username, logNote])
  }

  let publicationAuditWritten = false
  if (action === 'publish') {
    if (!['admin', 'editor-in-chief', 'publisher'].includes(String(currentUser.role))) {
      res.status(403).json({ error: 'Not authorised to execute publication' })
      return
    }
    const validation = latestApprovalIsValid(db, story)
    if (!validation.ok) {
      res.status(409).json({ error: `Publication blocked: ${validation.reason}` })
      return
    }

    // Write the release event before changing public status. If the status
    // update fails, the prior approval cannot be replayed accidentally.
    execute(db, `
      INSERT INTO pipeline_log (story_id, from_status, to_status, changed_by, note)
      VALUES (?, ?, 'published', ?, 'Release event recorded after version-bound approval validation')
    `, [story.id, status, username])
    publicationAuditWritten = true
  }

  const updateFields = ["status = ?", "updated_at = ?"]
  const updateParams: any[] = [actionDef.to, now]
  if (actionDef.to === 'published') {
    updateFields.push("published_at = ?")
    updateParams.push(now)
  }
  if (actionDef.to === 'draft') {
    updateFields.push("published_at = NULL")
  }

  updateParams.push(slug)
  execute(db, `UPDATE stories SET ${updateFields.join(', ')} WHERE slug = ?`, updateParams)

  // The approval event itself is already the latest audit event on this path.
  if (action !== 'approve-release' && !publicationAuditWritten) {
    execute(db, `
      INSERT INTO pipeline_log (story_id, from_status, to_status, changed_by, note)
      VALUES (?, ?, ?, ?, ?)
    `, [story.id, status, actionDef.to, username, logNote])
  }

  res.json({
    message: `Story moved from '${story.status}' to '${actionDef.to}'`,
    story: { slug: story.slug, title: story.title, status: actionDef.to },
  })
})

// GET /api/pipeline/:slug/log
router.get('/:slug/log', authMiddleware, (req: Request, res: Response) => {
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
