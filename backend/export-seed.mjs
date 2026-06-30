/**
 * Export SQLite database to a JSON seed file for Pages Functions.
 * Run: node export-seed.mjs > ../frontend/functions/api/seed-data.ts
 */

import initSqlJs from 'sql.js'
import fs from 'fs'

async function main() {
  const SQL = await initSqlJs()
  const buffer = fs.readFileSync('data/breakdown.db')
  const db = new SQL.Database(buffer)

  // Export stories
  const stories = []
  const stmt = db.prepare('SELECT * FROM stories ORDER BY slug')
  while (stmt.step()) {
    const row = stmt.getAsObject()
    stories.push({
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
    })
  }
  stmt.free()

  // Export users
  const users = []
  const userStmt = db.prepare('SELECT id, username, display_name, role FROM users')
  while (userStmt.step()) {
    users.push(userStmt.getAsObject())
  }
  userStmt.free()

  // Export pipeline logs
  const logs = []
  const logStmt = db.prepare('SELECT * FROM pipeline_log ORDER BY created_at DESC LIMIT 100')
  while (logStmt.step()) {
    logs.push(logStmt.getAsObject())
  }
  logStmt.free()

  db.close()

  // Generate TypeScript
  const ts = `// Auto-generated seed data from SQLite database
// Generated: ${new Date().toISOString()}

export interface SeedStory {
  slug: string
  title: string
  summary: string
  body: string
  category: string
  tags: string[]
  hero: string
  caption: string
  author: string
  readTime: number
  publishedAt: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface SeedUser {
  id: number
  username: string
  display_name: string
  role: string
}

export interface SeedLog {
  id: number
  story_id: number
  from_status: string
  to_status: string
  changed_by: string
  note: string
  created_at: string
}

export const SEED_STORIES: SeedStory[] = ${JSON.stringify(stories, null, 2)}

export const SEED_USERS: SeedUser[] = ${JSON.stringify(users, null, 2)}

export const SEED_PIPELINE_LOGS: SeedLog[] = ${JSON.stringify(logs, null, 2)}
`

  // Write to Pages Functions directory
  const outDir = '../frontend/functions/api'
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  fs.writeFileSync(outDir + '/seed-data.ts', ts)

  console.log(`Exported ${stories.length} stories, ${users.length} users, ${logs.length} pipeline logs`)
  console.log(`Output: ${outDir}/seed-data.ts`)
}

main().catch(console.error)
