import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { getDb, queryOne, execute } from './db.js'

const JWT_SECRET = process.env.JWT_SECRET || ''
const JWT_EXPIRY = '24h'

export interface AuthUser {
  id: number
  username: string
  displayName: string
  role: string
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12)
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash)
}

export function generateToken(user: AuthUser): string {
  if (JWT_SECRET.length < 32) throw new Error('JWT_SECRET must be configured with at least 32 characters')
  return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRY })
}

export function verifyToken(token: string): AuthUser | null {
  try {
    if (JWT_SECRET.length < 32) return null
    return jwt.verify(token, JWT_SECRET) as AuthUser
  } catch {
    return null
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token provided' })
    return
  }

  const token = header.slice(7)
  const user = verifyToken(token)
  if (!user) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token' })
    return
  }

  ;(req as any).user = user
  next()
}

export function createInitialAdmin(): void {
  if (JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be configured with at least 32 characters; refusing insecure startup')
  }

  const db = getDb()
  const configuredPassword = process.env.ADMIN_PASSWORD || ''
  const existing = queryOne(db, 'SELECT id, password_hash FROM users WHERE username = ?', ['admin'])

  if (existing) {
    const storedHash = String(existing.password_hash || '')
    const usesKnownDefault = storedHash ? verifyPassword('breakdown2026', storedHash) : true
    if (usesKnownDefault) {
      if (configuredPassword.length < 14) {
        throw new Error('The existing admin uses an empty/known default password. Set ADMIN_PASSWORD to a strong 14+ character value to rotate it.')
      }
      execute(db, 'UPDATE users SET password_hash = ?, updated_at = datetime(\'now\') WHERE id = ?',
        [hashPassword(configuredPassword), existing.id])
      console.warn('Admin password rotated from an unsafe/default value using ADMIN_PASSWORD.')
    }
    return
  }

  if (configuredPassword.length < 14) {
    throw new Error('ADMIN_PASSWORD must be configured with at least 14 characters before creating the initial admin')
  }
  execute(
    db,
    'INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)',
    ['admin', hashPassword(configuredPassword), 'Admin', 'admin']
  )
  console.log('✓ Created initial admin user (username: admin)')
}
