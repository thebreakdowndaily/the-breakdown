import fs from 'fs'
const c = fs.readFileSync('C:/newsjack-content/frontend/src/lib/content/knowledge.ts', 'utf-8')
const ids = [...c.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1])
for (const id of ids) {
  const re = new RegExp('id:\\s*\\'' + id + '\\' + '[\\s\\S]{0,200}?(image:|\\n  \\})')
  const m = c.match(re)
  const hasImage = m && m[1] === 'image:'
  console.log(id + ': ' + (hasImage ? 'HAS IMAGE' : 'NO IMAGE'))
}
