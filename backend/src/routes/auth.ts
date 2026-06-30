import { Router, Request, Response } from 'express'
import { getDb, queryOne, execute } from '../db.js'
import { hashPassword, verifyPassword, generateToken, authMiddleware, AuthUser } from '../auth.js'

const router = Router()

// POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required' })
    return
  }

  const db = getDb()
  const user = queryOne(db, 'SELECT * FROM users WHERE username = ?', [username])
  if (!user || !verifyPassword(password, user.password_hash)) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    displayName: user.display_name,
    role: user.role,
  }

  const token = generateToken(authUser)
  res.json({
    token,
    user: authUser,
  })
})

// GET /api/auth/me
router.get('/me', authMiddleware, (req: Request, res: Response) => {
  res.json({ user: (req as any).user })
})

// POST /api/auth/register (admin only)
router.post('/register', authMiddleware, (req: Request, res: Response) => {
  const currentUser = (req as any).user as AuthUser
  if (currentUser.role !== 'admin') {
    res.status(403).json({ error: 'Only admins can create users' })
    return
  }

  const { username, password, displayName, role } = req.body
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required' })
    return
  }

  const db = getDb()
  const existing = queryOne(db, 'SELECT id FROM users WHERE username = ?', [username])
  if (existing) {
    res.status(409).json({ error: 'Username already exists' })
    return
  }

  const hash = hashPassword(password)
  execute(
    db,
    'INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)',
    [username, hash, displayName || username, role || 'editor']
  )

  res.status(201).json({ message: 'User created' })
})

export default router
