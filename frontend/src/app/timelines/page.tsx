import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllTimelines } from '@/lib/content/timelines'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'

export const metadata: Metadata = generatePageMetadata({
  title: 'Timelines',
  description: 'Chronological analysis of India\'s defining arcs — nuclear programme, human spaceflight, digital transformation, US relations, and border tensions. Events, dates, and strategic context.',
  path: '/timelines',
})

const categoryColors: Record<string, string> = {
  'Defence & Technology': 'bg-red-600',
  'Space Exploration': 'bg-blue-600',
  'Technology & Governance': 'bg-purple-600',
  'Geopolitics': 'bg-amber-600',
}

export default function TimelinesPage() {
  const timelines = getAllTimelines()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Timelines</h1>
        <p className="text-muted-foreground mt-2">Every inflection point has a sequence. These timelines trace the decisions, crises, and breakthroughs that shaped India's trajectory — from nuclear weapons and spaceflight to digital governance and Great-Power rivalry. Data-driven historiography for the policy age.</p>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search timelines..."
          className="w-full h-10 rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary transition-colors"
          disabled
        />
        <p className="text-xs text-muted-foreground mt-1">Search coming soon</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {timelines.map(t => (
          <Link key={t.slug} href={`/timelines/${t.slug}`}>
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={categoryColors[t.category] || 'bg-primary'}>{t.category}</Badge>
                  <span className="text-xs text-muted-foreground">{t.country}</span>
                </div>
                <CardTitle className="text-lg">{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{t.description}</p>
                <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                  <span>{t.events.length} events</span>
                  <span className="text-foreground/60">|</span>
                  <span>{t.events[0].date} – {t.events[t.events.length - 1].date}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
