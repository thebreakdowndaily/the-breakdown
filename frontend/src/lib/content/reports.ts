import { IntelligenceReport, Category } from '@/types'
import { ALL_STORIES } from './generated/stories'

const ALL = ALL_STORIES as IntelligenceReport[]

export async function getReportsByCategory(category: Category): Promise<IntelligenceReport[]> {
  return ALL.filter((r) => r.category === category).sort(
    (a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0)
  )
}

export async function getReport(slug: string): Promise<IntelligenceReport | null> {
  return ALL.find((r) => r.slug === slug) || null
}

export async function getRecentReports(limit = 10): Promise<IntelligenceReport[]> {
  return [...ALL]
    .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))
    .slice(0, limit)
}

export async function getAllReportSlugs(): Promise<string[]> {
  return ALL.map((r) => r.slug)
}

export async function searchReports(query: string): Promise<IntelligenceReport[]> {
  const q = query.toLowerCase()
  return ALL.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q) ||
      (r.tags && r.tags.some((t) => t.toLowerCase().includes(q))) ||
      (r.body && r.body.toLowerCase().includes(q))
  )
}
