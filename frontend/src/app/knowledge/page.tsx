import Link from 'next/link'
import { ENTITIES } from '@/lib/content/knowledge'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'

export const dynamic = 'force-static'

const ENTITY_COLORS: Record<string, string> = {
  Person: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Country: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Organization: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Policy: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Event: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  Technology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
}

export const metadata: Metadata = {
  title: 'Knowledge Graph — The Breakdown OS',
  description: 'Every entity tracked by The Breakdown — people, organisations, policies, technologies, events, and countries with intelligence briefs and connections.',
}

export default function KnowledgeIndexPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Breadcrumbs />
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Knowledge Graph</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">Knowledge Graph</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          A structured index of every entity tracked by The Breakdown. Each entry links to an intelligence brief, connection map, timelines, and related analysis — covering people, policies, technologies, events, and countries.
        </p>

        {['Person', 'Organization', 'Technology', 'Policy', 'Event', 'Country'].map((type) => {
          const entities = ENTITIES.filter(e => e.type === type)
          if (entities.length === 0) return null
          return (
            <section key={type} className="mb-10">
              <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                <Badge className={`${ENTITY_COLORS[type]} border-0`}>{type}</Badge>
                <span className="text-base font-normal text-muted-foreground">({entities.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {entities.map((e) => (
                  <Link
                    key={e.id}
                    href={`/knowledge/${e.id}`}
                    className="group rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">{e.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{e.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
