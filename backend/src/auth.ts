import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { getDb, queryOne, execute } from './db.js'

const JWT_SECRET = process.env.JWT_SECRET || 'breakdown-dev-secret-change-in-production'
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
  return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRY })
}

export function verifyToken(token: string): AuthUser | null {
  try {
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
  const db = getDb()
  const existing = queryOne(db, 'SELECT id FROM users WHERE username = ?', ['admin'])
  if (existing) return

  const password = process.env.ADMIN_PASSWORD || 'breakdown2026'
  const hash = hashPassword(password)
  execute(
    db,
    'INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)',
    ['admin', hash, 'Admin', 'admin']
  )

  console.log('✓ Created initial admin user (username: admin)')
}
