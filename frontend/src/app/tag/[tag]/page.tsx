import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ALL_STORIES } from '@/lib/content/generated/stories'
import { slugifyTag, unslugifyTag } from '@/lib/utils'
import type { IntelligenceReport } from '@/types'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

/** Generate a page for every unique tag */
export function generateStaticParams() {
  const tags = new Set<string>()
  for (const story of ALL_STORIES) {
    if (story.tags) story.tags.forEach(t => tags.add(slugifyTag(t)))
  }
  return [...tags].map(tag => ({ tag }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const display = unslugifyTag(tag)
  const count = ALL_STORIES.filter(s => s.tags?.some(t => slugifyTag(t) === tag)).length
  return {
    title: `${display} — Stories tagged — The Breakdown`,
    description: `${count} intelligence report${count !== 1 ? 's' : ''} tagged with "${display}". Evidence-based analysis and verified reporting.`,
    openGraph: {
      title: `Topic: ${display}`,
      description: `${count} intelligence report${count !== 1 ? 's' : ''} tagged with "${display}".`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const display = unslugifyTag(tag)

  const stories: (IntelligenceReport & { body?: string })[] = ALL_STORIES
    .filter(s => s.tags?.some(t => slugifyTag(t) === tag))
    .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))

  if (stories.length === 0) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tags', href: '/tag' },
        { label: display },
      ]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Topic: {display}</h1>
        <p className="text-muted-foreground mt-2">
          {stories.length} intelligence report{stories.length !== 1 ? 's' : ''} tagged with <Badge variant="secondary" className="inline">{display}</Badge>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stories.map((story) => (
          <Link key={story.slug} href={`/story/${story.slug}`}>
            <Card className="h-full card-hover cursor-pointer group overflow-hidden">
              <CardContent className="p-5">
                <Badge className="w-fit text-[10px] mb-2">
                {story.category}
              </Badge>
                <h2 className="font-bold font-heading text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {story.title}
                </h2>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{story.summary}</p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/40">
                  <span>
                    {story.publishedAt ? new Date(story.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    }) : ''}
                  </span>
                  <span>{story.readTime} min read</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
