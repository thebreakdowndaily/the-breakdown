import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ENTITIES, getEntityBySlug, getRelatedEntities } from '@/lib/content/knowledge'
import { getTimelineBySlug } from '@/lib/content/timelines'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { EntityGraph } from '@/components/knowledge/entity-graph'
import type { EntityGraphNode } from '@/components/knowledge/entity-graph'

interface KnowledgePageProps {
  params: Promise<{ id: string }>
}

const SITE_URL = process.env.SITE_URL || 'https://thebreakdown.in'

const ENTITY_COLORS: Record<string, string> = {
  Person: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Country: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Organization: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Policy: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Event: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  Technology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
}

export function generateStaticParams() {
  return ENTITIES.map((e) => ({ id: e.id }))
}

export async function generateMetadata({ params }: KnowledgePageProps): Promise<Metadata> {
  const { id } = await params
  const entity = getEntityBySlug(id)
  if (!entity) return { title: 'Entity Not Found — The Breakdown OS' }
  return {
    title: `${entity.name} — Knowledge Graph — The Breakdown OS`,
    description: entity.description,
    openGraph: {
      title: `${entity.name} — The Breakdown Knowledge Graph`,
      description: entity.description,
      type: 'article',
    },
  }
}

export default async function KnowledgePage({ params }: KnowledgePageProps) {
  const { id } = await params
  const entity = getEntityBySlug(id)
  if (!entity) notFound()

  const related = getRelatedEntities(entity)

  // Build graph data: center + all related entities + any indirectly connected
  const graphNodes: EntityGraphNode[] = [
    { id: entity.id, name: entity.name, type: entity.type },
    ...related.map(r => ({ id: r.id, name: r.name, type: r.type })),
  ]
  const graphEdges: { source: string; target: string }[] = related.map(r => ({
    source: entity.id,
    target: r.id,
  }))
  // Also add edges between related entities if they reference each other
  for (const r of related) {
    for (const other of related) {
      if (r.id < other.id && r.relatedIds.includes(other.id)) {
        graphEdges.push({ source: r.id, target: other.id })
      }
    }
  }

  const entityGraphColors: Record<string, string> = {
    Person: 'hsl(221 83% 53%)',
    Country: 'hsl(142 71% 45%)',
    Organization: 'hsl(271 81% 56%)',
    Policy: 'hsl(38 92% 50%)',
    Event: 'hsl(0 84% 60%)',
    Technology: 'hsl(187 85% 53%)',
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Graph', href: '/knowledge' },
          { label: entity.name },
        ]} />

        {/* Entity Header */}
        <div className="mb-8">
          <Badge className={`mb-3 ${ENTITY_COLORS[entity.type] || 'bg-gray-100 text-gray-700'} border-0`}>
            {entity.type}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">{entity.name}</h1>
          <p className="text-lg text-muted-foreground">{entity.description}</p>
        </div>

        {/* Entity Details */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="text-xl font-heading">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{entity.details}</p>
          </CardContent>
        </Card>

        {/* Connections Graph */}
        {graphNodes.length > 1 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold font-heading mb-4">Entity Connections</h2>
            <EntityGraph
              centerId={entity.id}
              nodes={graphNodes}
              edges={graphEdges}
              entityColors={entityGraphColors}
            />
          </section>
        )}

        {/* Related Timelines */}
        {entity.timelineIds && entity.timelineIds.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold font-heading mb-4">Related Timelines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {entity.timelineIds.map(id => {
                const timeline = getTimelineBySlug(id)
                if (!timeline) return null
                return (
                  <Link
                    key={id}
                    href={`/timelines/${id}`}
                    className="group rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{timeline.category} · {timeline.country}</p>
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">{timeline.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{timeline.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{timeline.events.length} events</p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Related Stories */}
        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading mb-4">Related Stories</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Stories mentioning <strong>{entity.name}</strong>
          </p>
          <RelatedStoriesForEntity entityName={entity.name} />
        </section>

        {/* Related Entities */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold font-heading mb-4">Related Entities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/knowledge/${r.id}`}
                  className="group rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <Badge className={`mb-2 ${ENTITY_COLORS[r.type] || 'bg-gray-100 text-gray-700'} border-0`}>
                    {r.type}
                  </Badge>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">{r.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-12 pt-8 border-t text-center">
          <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
            Explore the full Knowledge Graph →
          </Link>
        </div>
      </div>
    </main>
  )
}

/** Server-side component that finds stories mentioning an entity name */
async function RelatedStoriesForEntity({ entityName }: { entityName: string }) {
  let stories: { title: string; slug: string; summary: string; body?: string; category?: string; tags?: string[] }[] = []

  try {
    const { ALL_STORIES } = await import('@/lib/content/generated/stories')
    const entityWords = entityName.toLowerCase().split(/\s+/).filter(Boolean)
    stories = ALL_STORIES
      .filter((s: { title?: string; summary?: string; body?: string; tags?: string[]; slug?: string }) => {
        if (!s.title && !s.summary && !s.body) return false

        const titleLower = s.title?.toLowerCase() || ''
        const summaryLower = s.summary?.toLowerCase() || ''
        const bodyLower = s.body?.toLowerCase() || ''
        const slugLower = s.slug?.toLowerCase() || ''
        const tagsLower = s.tags?.map(t => t.toLowerCase()) || []

        // Check if any word from entity name appears in title (strong match)
        const titleWordMatch = entityWords.some(w => titleLower.includes(w))
        if (titleWordMatch) return true

        // Check if any word from entity name appears in summary (medium match)
        const summaryWordMatch = entityWords.some(w => summaryLower.includes(w))
        if (summaryWordMatch) return true

        // Check if entity name appears in body text (broad match)
        if (bodyLower.includes(entityName.toLowerCase())) return true

        // Check tags flexibly (entity name as substring of any tag, or tag as substring of entity name)
        const tagMatch = tagsLower.some(t =>
          entityName.toLowerCase().includes(t) || t.includes(entityName.toLowerCase())
        )
        if (tagMatch) return true

        // Check slug
        if (slugLower.includes(entityName.toLowerCase())) return true

        return false
      })
      .slice(0, 6)
  } catch {
    // Module not available — return empty
  }

  if (stories.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground text-sm">
          No stories found for this entity yet.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stories.map((s) => (
        <Link
          key={s.slug}
          href={`/story/${s.slug}`}
          className="group rounded-lg border p-4 hover:bg-muted/50 transition-colors"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.category || 'Story'}</p>
          <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">{s.title}</p>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.summary}</p>
        </Link>
      ))}
    </div>
  )
}
