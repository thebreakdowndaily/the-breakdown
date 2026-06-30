import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { initDb, getDb, closeDb } from './db.js'
import { createInitialAdmin } from './auth.js'
import authRoutes from './routes/auth.js'
import storiesRoutes from './routes/stories.js'
import pipelineRoutes from './routes/pipeline.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = parseInt(process.env.PORT || '3001')

const app = express()

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '10mb' }))

// API Routes — must be before the admin catch-all
app.use('/api/auth', authRoutes)
app.use('/api/stories', storiesRoutes)
app.use('/api/pipeline', pipelineRoutes)

// Serve admin SPA
const adminDir = path.join(__dirname, '..', 'admin')
app.use('/admin', express.static(adminDir))
app.get('/admin*', (_req, res) => {
  res.sendFile(path.join(adminDir, 'index.html'))
})

// Health check
app.get('/api/health', (_req, res) => {
  const db = getDb()
  const count = db.exec('SELECT COUNT(*) as count FROM stories')
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

// Start server
async function start(): Promise<void> {
  await initDb()
  createInitialAdmin()

  app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║     The Breakdown — Backend Server          ║
║──────────────────────────────────────────────║
║  API:     http://localhost:${PORT}/api          ║
║  Health:  http://localhost:${PORT}/api/health   ║
║  Admin:   http://localhost:${PORT}/admin        ║
╚══════════════════════════════════════════════╝
    `)
  })
}

start().catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})

// Graceful shutdown
process.on('SIGINT', () => { closeDb(); process.exit(0) })
process.on('SIGTERM', () => { closeDb(); process.exit(0) })
