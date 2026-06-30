import initSqlJs, { Database as SqlJsDatabase } from 'sql.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '..', 'data', 'breakdown.db')

let db: SqlJsDatabase | null = null

export async function initDb(): Promise<SqlJsDatabase> {
  if (db) return db

  const SQL = await initSqlJs()

  // Load existing database from file, or create new
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH)
    db = new SQL.Database(buffer)
  } else {
    db = new SQL.Database()
    // Ensure data directory exists
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  initializeSchema(db)
  saveDb() // Save after schema creation
  return db
}

function saveDb(): void {
  if (!db) return
  const data = db.export()
  const buffer = Buffer.from(data)
  fs.writeFileSync(DB_PATH, buffer)
}

function initializeSchema(database: SqlJsDatabase): void {
  database.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT 'editor',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)
  database.run(`
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
  database.run(`
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
  database.run(`
    CREATE TABLE IF NOT EXISTS revisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id INTEGER NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      summary TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      changed_by TEXT NOT NULL DEFAULT 'system',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
    )
  `)
  database.run(`
    CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status)
  `)
  database.run(`
    CREATE INDEX IF NOT EXISTS idx_stories_slug ON stories(slug)
  `)
  database.run(`
    CREATE INDEX IF NOT EXISTS idx_pipeline_log_story ON pipeline_log(story_id)
  `)
  database.run(`
    CREATE INDEX IF NOT EXISTS idx_revisions_story ON revisions(story_id)
  `)
}

export function getDb(): SqlJsDatabase {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() first.')
  }
  return db
}

export function persistDb(): void {
  saveDb()
}

export function closeDb(): void {
  saveDb()
  if (db) {
    db.close()
    db = null
  }
}

// Helper: run a query and return all rows as objects
export function queryAll(database: SqlJsDatabase, sql: string, params: any[] = []): any[] {
  const stmt = database.prepare(sql)
  if (params.length > 0) {
    stmt.bind(params)
  }
  const results: any[] = []
  while (stmt.step()) {
    results.push(stmt.getAsObject())
  }
  stmt.free()
  return results
}

// Helper: run a query and return first row as object
export function queryOne(database: SqlJsDatabase, sql: string, params: any[] = []): any | null {
  const results = queryAll(database, sql, params)
  return results.length > 0 ? results[0] : null
}

// Helper: run a write query and return affected count
export function execute(database: SqlJsDatabase, sql: string, params: any[] = []): number {
  if (params.length > 0) {
    const stmt = database.prepare(sql)
    stmt.bind(params)
    stmt.step()
    stmt.free()
  } else {
    database.run(sql)
  }
  // Note: sql.js doesn't provide changes() easily, so we save and return 1
  saveDb()
  return 1
}
