// Cloudflare Pages Function — API Catch-All
// Handles all /api/* routes except /api/markets (handled by markets.ts)

import { getDb } from './db'
import { type Story, type DbBackend } from './types'

// ---------------------------------------------------------------------------
// Simple JWT (no native HMAC in Pages Functions — OK for demo; replace with
// Web Crypto API for production with non-trivial secrets).
// ---------------------------------------------------------------------------

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  return atob(str)
}

function createToken(username: string, secret: string): string {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = base64UrlEncode(JSON.stringify({
    sub: username,
    username,
    role: 'admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400,
  }))
  return header + '.' + payload + '.' + base64UrlEncode(header + '.' + payload)
}

function verifyToken(token: string, _secret: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(base64UrlDecode(parts[1]))
    if (payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
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

function getAuthUser(request: Request, _secret: string): any {
  const header = request.headers.get('Authorization')
  if (!header || !header.startsWith('Bearer ')) return null
  return verifyToken(header.slice(7), _secret)
}

// ---------------------------------------------------------------------------
// Route handlers (all async to support Turso backend)
// ---------------------------------------------------------------------------

async function handleAuth(request: Request, db: DbBackend, env: Record<string, string>, path: string): Promise<Response> {
  const jwtSecret = env.JWT_SECRET || 'breakdown-dev-secret'
  const adminPass = env.ADMIN_PASSWORD || 'breakdown2026'

  if (path === '/api/auth/login' && request.method === 'POST') {
    const { username, password } = await request.json()
    if (username === 'admin' && password === adminPass) {
      const token = createToken(username, jwtSecret)
      return json({
        token,
        user: { id: 1, username: 'admin', displayName: 'Admin', role: 'admin' },
      })
    }
    return error('Invalid credentials', 401)
  }

  if (path === '/api/auth/me' && request.method === 'GET') {
    const user = getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    return json({ user })
  }

  return error('Not found', 404)
}

async function handleStories(request: Request, db: DbBackend, env: Record<string, string>, path: string): Promise<Response> {
  const jwtSecret = env.JWT_SECRET || 'breakdown-dev-secret'

  // GET /api/stories
  if (path === '/api/stories' && request.method === 'GET') {
    const url = new URL(request.url)
    const includeAll = url.searchParams.get('all') === 'true'
    const statusFilter = url.searchParams.get('status') || undefined
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
      const user = getAuthUser(request, jwtSecret)
      if (!user) return error('Story not found', 404)
    }
    return json({ story })
  }

  // POST /api/stories
  if (path === '/api/stories' && request.method === 'POST') {
    const user = getAuthUser(request, jwtSecret)
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
    const user = getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    const slug = putMatch[1]
    const data = await request.json()
    const story = await db.updateStory(slug, data)
    if (!story) return error('Story not found', 404)
    return json({ story })
  }

  // DELETE /api/stories/:slug
  if (singleMatch && request.method === 'DELETE') {
    const user = getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    const slug = singleMatch[1]
    await db.deleteStory(slug)
    return json({ message: 'Story archived' })
  }

  return error('Not found', 404)
}

async function handlePipeline(request: Request, db: DbBackend, env: Record<string, string>, path: string): Promise<Response> {
  const jwtSecret = env.JWT_SECRET || 'breakdown-dev-secret'

  const ACTION_MAP: Record<string, string> = {
    submit: 'in-review',
    approve: 'fact-checking',
    verify: 'ready',
    publish: 'published',
    reject: 'draft',
    archive: 'archived',
    draft: 'draft',
  }

  const VALID_TRANSITIONS: Record<string, string[]> = {
    draft: ['in-review'],
    'in-review': ['fact-checking', 'draft'],
    'fact-checking': ['ready', 'draft'],
    ready: ['published', 'draft'],
    published: ['archived'],
    archived: ['draft'],
  }

  // GET /api/pipeline/stats
  if (path === '/api/pipeline/stats' && request.method === 'GET') {
    const user = getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    const stats = await db.getPipelineStats()
    const total = stats.reduce((sum, s) => sum + s.count, 0)
    return json({ stats, total })
  }

  // POST /api/pipeline/:slug/:action
  const actionMatch = path.match(/^\/api\/pipeline\/([^/]+)\/([^/]+)$/)
  if (actionMatch && request.method === 'POST') {
    const user = getAuthUser(request, jwtSecret)
    if (!user) return error('Unauthorized', 401)
    const slug = actionMatch[1]
    const action = actionMatch[2]
    const { note } = await request.json().catch(() => ({ note: '' }))

    const toStatus = ACTION_MAP[action]
    if (!toStatus) return error(`Invalid action: ${action}`)

    const story = await db.getStory(slug)
    if (!story) return error('Story not found', 404)

    const allowed = VALID_TRANSITIONS[story.status] || []
    if (!allowed.includes(toStatus)) {
      return error(`Cannot transition from '${story.status}' to '${toStatus}'`)
    }

    await db.updateStory(slug, { status: toStatus, publishedAt: toStatus === 'published' ? new Date().toISOString() : story.publishedAt })
    return json({ message: `Story moved from '${story.status}' to '${toStatus}'`, story: { slug, title: story.title, status: toStatus } })
  }

  // GET /api/pipeline/:slug/log
  const logMatch = path.match(/^\/api\/pipeline\/([^/]+)\/log$/)
  if (logMatch && request.method === 'GET') {
    const logs = await db.getPipelineLogs()
    return json({ logs })
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
