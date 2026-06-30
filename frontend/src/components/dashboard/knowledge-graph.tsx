'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'
import { ENTITIES } from '@/lib/content/knowledge'

const ENTITY_COLORS: Record<string, string> = {
  Person: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Country: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Organization: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Policy: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Event: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  Technology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
}

export function KnowledgeGraph() {
  // Group entities by type
  const grouped = ENTITIES.reduce<Record<string, typeof ENTITIES>>((acc, e) => {
    if (!acc[e.type]) acc[e.type] = []
    acc[e.type].push(e)
    return acc
  }, {})

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold font-heading">Knowledge Graph</h2>
          <Badge variant="outline" className="text-[10px]">{ENTITIES.length} entities</Badge>
        </div>
        <Link href="/knowledge" className="text-sm text-muted-foreground hover:text-foreground">Explore Knowledge Graph →</Link>
      </div>
      <FadeIn>
        <Card>
          <CardContent className="p-6">
          {/* Type filters / counter strip */}
          <div className="flex flex-wrap gap-2 mb-5">
            {Object.entries(grouped).map(([type, entities]) => (
              <Badge key={type} variant="outline" className="text-[10px]">
                {type}: {entities.length}
              </Badge>
            ))}
          </div>

          {/* Entity cards with images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {ENTITIES.map((e) => (
              <Link
                key={e.id}
                href={`/knowledge/${e.id}`}
                className="group flex flex-col rounded-lg border p-3 card-hover cursor-pointer"
                role="article"
              >
                {/* Image */}
                <div className="relative aspect-square rounded-md overflow-hidden bg-muted/30 mb-2.5">
                  {e.image ? (
                    <img
                      src={e.image}
                      alt={e.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-muted-foreground">
                      {e.type === 'Person' ? '👤' : e.type === 'Country' ? '🌍' : e.type === 'Organization' ? '🏢' : e.type === 'Technology' ? '🔧' : e.type === 'Policy' ? '📋' : '📌'}
                    </div>
                  )}
                </div>

                {/* Type badge */}
                <Badge className={`shrink-0 self-start mb-1.5 text-[10px] ${ENTITY_COLORS[e.type] || ''} border-0`}>
                  {e.type}
                </Badge>

                {/* Name */}
                <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {e.name}
                </p>

                {/* Description */}
                <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-tight">
                  {e.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center border-t pt-4">
            <Link
              href="/knowledge"
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              Explore the full Knowledge Graph with connections, timelines, and sources →
            </Link>
          </div>
        </CardContent>
      </Card>
      </FadeIn>
    </section>
  )
}
