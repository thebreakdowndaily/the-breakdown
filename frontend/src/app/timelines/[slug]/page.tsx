import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTimelineBySlug, getAllTimelineSlugs, getRelatedTimelines } from '@/lib/content/timelines'
import { Badge } from '@/components/ui/badge'
import type { Metadata } from 'next'

interface TimelinePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllTimelineSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: TimelinePageProps): Promise<Metadata> {
  const { slug } = await params
  const timeline = getTimelineBySlug(slug)
  if (!timeline) return { title: 'Timeline Not Found' }
  return {
    title: `${timeline.title} — Timeline | The Breakdown OS`,
    description: timeline.description,
    openGraph: {
      title: `${timeline.title} — Timeline`,
      description: timeline.description,
    },
  }
}

const categoryColors: Record<string, string> = {
  'Defence & Technology': 'bg-red-600',
  'Space Exploration': 'bg-blue-600',
  'Technology & Governance': 'bg-purple-600',
  'Geopolitics': 'bg-amber-600',
}

export default async function TimelineDetailPage({ params }: TimelinePageProps) {
  const { slug } = await params
  const timeline = getTimelineBySlug(slug)
  if (!timeline) notFound()

  const related = getRelatedTimelines(slug)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Badge className={categoryColors[timeline.category] || 'bg-primary'}>{timeline.category}</Badge>
          <span className="text-sm text-muted-foreground">{timeline.country}</span>
        </div>
        <h1 className="text-3xl font-bold font-heading">{timeline.title}</h1>
        <p className="text-muted-foreground mt-2">{timeline.description}</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
        <div className="space-y-8">
          {timeline.events.map((event, i) => (
            <div key={i} className="relative pl-12">
              <div className="absolute left-2 top-1 w-5 h-5 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{event.date}</span>
                </div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-bold font-heading mb-4">Related Timelines</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {related.map(t => (
              <Link key={t.slug} href={`/timelines/${t.slug}`}>
                <div className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors">
                  <Badge className={categoryColors[t.category] || 'bg-primary'}>{t.category}</Badge>
                  <h3 className="font-semibold mt-2">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8">
        <Link
          href="/timelines"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-input bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-9 gap-2 px-4 hover:bg-muted"
        >
          Back to Timelines
        </Link>
      </div>
    </div>
  )
}
