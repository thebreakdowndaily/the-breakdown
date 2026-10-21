// Cloudflare Pages Function — API Catch-All
// Handles all /api/* routes except /api/markets (handled by markets.ts)

import { getDb } from './db'
import { type Story, type DbBackend } from './types'
import { createApprovalNote, hashStoryVersion, validatePublicationApproval } from './publication-gate.mjs'

// ---------------------------------------------------------------------------
// JWT HS256 — Web Crypto HMAC signature verification (fail closed).
// Required env: PAGES_JWT_SECRET (32+ chars). Never issue or accept unsigned tokens.
// ---------------------------------------------------------------------------

function encodeBytes(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlEncode(value: string): string {
  return encodeBytes(new TextEncoder().encode(value));
}

function base64UrlDecode(value: string): string {
  value = value.replace(/-/g, '+').replace(/_/g, '/');
  while (value.length % 4) value += '=';
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function secretIsConfigured(secret: string): boolean {
  return typeof secret === 'string' && secret.length >= 32;
}

async function hmacKey(secret: string, usages: KeyUsage[]): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, usages
  );
}

async function createToken(username: string, secret: string): Promise<string> {
  if (!secretIsConfigured(secret)) throw new Error('PAGES_JWT_SECRET must be configured with at least 32 characters');
  const now = Math.floor(Date.now() / 1000);
  const head = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify({
    iss: 'the-breakdown-pages-api', aud: 'the-breakdown-pages-admin',
    sub: username, username, role: 'admin', iat: now, exp: now + 3600,
  }));
  const signingInput = head + '.' + body;
  const key = await hmacKey(secret, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));
  return signingInput + '.' + encodeBytes(new Uint8Array(signature));
}

async function verifyToken(token: string, secret: string): Promise<any> {
  try {
    if (!secretIsConfigured(secret)) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const header = JSON.parse(base64UrlDecode(parts[0]));
    if (header.alg !== 'HS256' || header.typ !== 'JWT') return null;
    const key = await hmacKey(secret, ['verify']);
    const signature = Uint8Array.from(atob(parts[2].replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - parts[2].length % 4) % 4)), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(parts[0] + '.' + parts[1]));
    if (!valid) return null;
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    if (!Number.isInteger(payload.exp) || payload.exp <= now) return null;
    if (!Number.isInteger(payload.iat) || payload.iat > now + 60) return null;
    if (payload.iss !== 'the-breakdown-pages-api' || payload.aud !== 'the-breakdown-pages-admin') return null;
    if (payload.sub !== payload.username || typeof payload.username !== 'string' || payload.role !== 'admin') return null;
    return payload;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Response helpers
// ---------------------------------------------------------------------------

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

function error(message: string, status = 400): Response {
  return json({ error: message }, status)
}

async function getAuthUser(request: Request, secret: string): Promise<any> {
  const header = request.headers.get('Authorization')
  if (!header || !header.startsWith('Bearer ')) return null
  return verifyToken(header.slice(7), secret)
}

// ---------------------------------------------------------------------------
// Route handlers (all async to support Turso backend)
// ---------------------------------------------------------------------------

function constantTimeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder()
  const aa = encoder.encode(a)
  const bb = encoder.encode(b)
  let diff = aa.length ^ bb.length
  const n = Math.max(aa.length, bb.length)
  for (let i = 0; i < n; i++) diff |= (aa[i] || 0) ^ (bb[i] || 0)
  return diff === 0
}

async function handleAuth(request: Request, db: DbBackend, env: Record<string, string>, path: string): Promise<Response> {
  const jwtSecret = env.PAGES_JWT_SECRET || ''
  const adminPass = env.PAGES_ADMIN_PASSWORD || ''

  if (path === '/api/auth/login' && request.method === 'POST') {
    if (jwtSecret.length < 32 || !adminPass) {
      return error('Authentication is not configured. Set PAGES_JWT_SECRET (32+ characters) and PAGES_ADMIN_PASSWORD.', 503)
    }
    const { username, password } = await request.json()
    if (username === 'admin' && constantTimeEqual(String(password || ''), adminPass)) {
      const token = await createToken(username, jwtSecret)
      return json({
        token,
        user: { id: 1, username: 'admin', displayName: 'Admin', role: 'admin' },
      })
    }
    return error('Invalid credentials', 401)
  }

  if (path === '/api/auth/me' && request.method === 'GET') {
    const user = await getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    return json({ user })
  }

  return error('Not found', 404)
}

async function handleStories(request: Request, db: DbBackend, env: Record<string, string>, path: string): Promise<Response> {
  const jwtSecret = env.PAGES_JWT_SECRET || ''

  // GET /api/stories
  if (path === '/api/stories' && request.method === 'GET') {
    const url = new URL(request.url)
    const includeAll = url.searchParams.get('all') === 'true'
    const statusFilter = url.searchParams.get('status') || undefined
    if (includeAll || (statusFilter && statusFilter !== 'published')) {
      const user = await getAuthUser(request, jwtSecret)
      if (!user) return error('Unauthorized', 401)
    }
    const category = url.searchParams.get('category') || undefined
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100)
    const offset = parseInt(url.searchParams.get('offset') || '0')

    const result = await db.listStories({ all: includeAll, status: statusFilter, category, limit, offset })
    return json({ stories: result.stories, total: result.total, limit, offset })
  }

  // GET /api/stories/:slug
  const singleMatch = path.match(/^\/api\/stories\/([^/]+)$/)
  if (singleMatch && request.method === 'GET') {
    const slug = singleMatch[1]
    const story = await db.getStory(slug)
    if (!story) return error('Story not found', 404)
    if (story.status !== 'published') {
      const user = await getAuthUser(request, jwtSecret)
      if (!user) return error('Story not found', 404)
    }
    return json({ story })
  }

  // POST /api/stories
  if (path === '/api/stories' && request.method === 'POST') {
    const user = await getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    const data = await request.json()
    if (!data.slug) return error('Slug is required')
    const existing = await db.getStory(data.slug)
    if (existing) return error('Story with this slug already exists', 409)
    const story = await db.createStory(data)
    return json({ story }, 201)
  }

  // PUT /api/stories/:slug
  const putMatch = path.match(/^\/api\/stories\/([^/]+)$/)
  if (putMatch && request.method === 'PUT') {
    const user = await getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    const slug = putMatch[1]
    const incoming = await request.json()
    // Status is controlled only by the pipeline endpoint, never by a generic edit.
    const { status: _ignoredStatus, ...data } = incoming || {}
    const existing = await db.getStory(slug)
    if (!existing) return error('Story not found', 404)

    const previousHash = await hashStoryVersion(existing)
    const nextHash = await hashStoryVersion({ ...existing, ...data, slug })
    const updateData: Record<string, any> = { ...data }
    const contentChanged = previousHash !== nextHash
    if (contentChanged && existing.status !== 'draft') {
      // Reopen the editorial workflow whenever reviewed material changes.
      updateData.status = 'draft'
      updateData.publishedAt = null
    }

    const story = await db.updateStory(slug, updateData)
    if (!story) return error('Story not found', 404)
    if (contentChanged && existing.status !== story.status) {
      await db.createPipelineLog(existing.id!, existing.status, 'draft', user.username || 'system',
        'Story content changed; prior review/publication approval invalidated')
    }
    return json({ story, approvalInvalidated: contentChanged && existing.status !== 'draft' })
  }

  // DELETE /api/stories/:slug
  if (singleMatch && request.method === 'DELETE') {
    const user = await getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    const slug = singleMatch[1]
    await db.deleteStory(slug)
    return json({ message: 'Story archived' })
  }

  return error('Not found', 404)
}

async function handlePipeline(request: Request, db: DbBackend, env: Record<string, string>, path: string): Promise<Response> {
  const jwtSecret = env.PAGES_JWT_SECRET || ''

  const ACTION_MAP: Record<string, string> = {
    submit: 'in-review',
    approve: 'fact-checking',
    verify: 'ready',
    'approve-release': 'approved-for-release',
    publish: 'published',
    reject: 'draft',
    archive: 'archived',
    draft: 'draft',
  }

  const VALID_TRANSITIONS: Record<string, string[]> = {
    draft: ['in-review'],
    'in-review': ['fact-checking', 'draft'],
    'fact-checking': ['ready', 'draft'],
    ready: ['approved-for-release', 'draft'],
    'approved-for-release': ['published', 'draft'],
    published: ['archived'],
    archived: ['draft'],
  }

  // GET /api/pipeline/stats
  if (path === '/api/pipeline/stats' && request.method === 'GET') {
    const user = await getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    const stats = await db.getPipelineStats()
    const total = stats.reduce((sum, s) => sum + s.count, 0)
    return json({ stats, total })
  }

  // GET /api/pipeline/:slug/log — authenticated audit history.
  const logMatch = path.match(/^\/api\/pipeline\/([^/]+)\/log$/)
  if (logMatch && request.method === 'GET') {
    const user = await getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    const logs = await db.getPipelineLogs(logMatch[1])
    return json({ logs })
  }

  // POST /api/pipeline/:slug/:action
  const actionMatch = path.match(/^\/api\/pipeline\/([^/]+)\/([^/]+)$/)
  if (actionMatch && request.method === 'POST') {
    const user = await getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    const slug = actionMatch[1]
    const action = actionMatch[2]
    const { note } = await request.json().catch(() => ({ note: '' }))

    const toStatus = ACTION_MAP[action]
    if (!toStatus) return error(`Invalid action: ${action}`)

    const story = await db.getStory(slug)
    if (!story) return error('Story not found', 404)

    if (action === 'approve-release' && !['admin', 'editor-in-chief'].includes(String(user.role))) {
      return error('Only an authorised Editor-in-Chief can approve public release', 403)
    }

    const allowed = VALID_TRANSITIONS[story.status] || []
    if (!allowed.includes(toStatus)) {
      return error(`Cannot transition from '${story.status}' to '${toStatus}'`)
    }

    let approvalLogRecorded = false
    const destinationRaw = env.PUBLICATION_DESTINATION || ''
    let destination = ''
    try {
      const parsed = new URL(destinationRaw)
      if (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost') {
        return error('PUBLICATION_DESTINATION must be an HTTPS origin', 503)
      }
      destination = parsed.origin
    } catch {
      if (action === 'approve-release' || action === 'publish') {
        return error('PUBLICATION_DESTINATION is not configured as a valid URL origin', 503)
      }
    }

    if (action === 'approve-release') {
      if (!destination) return error('PUBLICATION_DESTINATION is required for release approval', 503)
      const approvedAt = new Date().toISOString()
      const contentHash = await hashStoryVersion(story)
      const approvalNote = createApprovalNote({
        contentHash, destination, approvedBy: String(user.username), approvedAt,
      })
      let savedApproval
      try {
        savedApproval = await db.createPipelineLog(
          story.id!, story.status, 'approved-for-release', String(user.username), approvalNote,
        )
      } catch (err) {
        console.error('[publication-gate] Could not persist approval:', err)
        return error('Approval record could not be persisted; release is blocked', 503)
      }
      if (!savedApproval?.id || String(savedApproval.id) === '0' || savedApproval.note?.includes('table not created')) {
        return error('Durable approval log is unavailable; release is blocked. Apply the pipeline_log migration.', 503)
      }
      approvalLogRecorded = true
    }

    let publicationAuditWritten = false
    if (action === 'publish') {
      if (!destination) return error('PUBLICATION_DESTINATION is required for publication', 503)
      let logs
      try {
        logs = await db.getPipelineLogs(slug)
      } catch (err) {
        console.error('[publication-gate] Could not read approval log:', err)
        return error('Approval history is unavailable; release is blocked', 503)
      }
      const result = await validatePublicationApproval({ logs, story, destination, now: Date.now() })
      if (!result.ok) return error(`Publication blocked: ${result.reason}`, 409)

      // Write the durable release event BEFORE changing public status. If the
      // following update fails, this approval cannot be replayed accidentally.
      try {
        await db.createPipelineLog(
          story.id!, story.status, 'published', String(user.username || 'system'),
          'Release event recorded after validating version-bound human approval',
        )
      } catch (err) {
        console.error('[publication-gate] Could not persist release event:', err)
        return error('Release audit could not be persisted; publication is blocked', 503)
      }
      publicationAuditWritten = true
    }

    const updateData: Record<string, any> = { status: toStatus }
    if (toStatus === 'published') updateData.publishedAt = new Date().toISOString()
    if (toStatus === 'draft') updateData.publishedAt = null

    const updated = await db.updateStory(slug, updateData)
    if (!updated) return error('Story update failed; no state transition recorded', 500)

    if (!approvalLogRecorded && !publicationAuditWritten) {
      try {
        await db.createPipelineLog(
          story.id!, story.status, toStatus, String(user.username || 'system'),
          (typeof note === 'string' && note) || `Pipeline action: ${action}`,
        )
      } catch (err) {
        console.error('[pipeline] Failed to persist state transition log:', err)
        if (toStatus === 'published') {
          return error('Story status changed but publication audit log failed; check state and do not retry blindly', 500)
        }
      }
    }

    // When publishing, trigger the Cloudflare Pages deploy hook.
    if (toStatus === 'published' && env.DEPLOY_HOOK_URL) {
      fetch(env.DEPLOY_HOOK_URL, { method: 'POST' }).catch(err => {
        console.error('[deploy-hook] Failed to trigger rebuild:', err)
      })
    }

    return json({ message: `Story moved from '${story.status}' to '${toStatus}'`, story: { slug, title: story.title, status: toStatus } })
  }

  return error('Not found', 404)
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export async function onRequest(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  const { request, env } = context
  const url = new URL(request.url)
  const path = url.pathname

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  try {
    const db = await getDb(env)

    if (path.startsWith('/api/auth/')) {
      return await handleAuth(request, db, env, path)
    }
    if (path.startsWith('/api/stories')) {
      return await handleStories(request, db, env, path)
    }
    if (path.startsWith('/api/pipeline')) {
      return await handlePipeline(request, db, env, path)
    }
    if (path === '/api/health') {
      const health = await db.health()
      return json({ status: 'ok', timestamp: new Date().toISOString(), ...health })
    }

    return error('Not found', 404)
  } catch (err: any) {
    console.error('[api] Error:', err)
    return error(err.message || 'Internal error', 500)
  }
}
