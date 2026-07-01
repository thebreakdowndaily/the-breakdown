import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ALL_STORIES } from '@/lib/content/generated/stories'

export const metadata: Metadata = generatePageMetadata({
  title: 'Explained',
  description: 'Complex topics, clearly broken down. Systems, policies, and science — no jargon. Deep dives into India\'s most important stories.',
  path: '/explained',
})

export default function ExplainedPage() {
  const stories = [...ALL_STORIES]
    .filter(s => s.category === 'Explained')
    .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Explained</h1>
        <p className="text-muted-foreground mt-2">Systems, policies, science, and geopolitics — stripped of jargon and anchored in evidence. Every explainer answers not just what happened, but how it works and why it matters.</p>
      </div>
      {stories.length === 0 ? (
        <div className="rounded-xl border bg-muted/30 h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No explainers yet. New analyses are in production.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.map(s => (
            <Link key={s.slug} href={`/story/${s.slug}`}>
              <Card className="h-full overflow-hidden group hover:bg-muted/50 transition-colors cursor-pointer flex flex-col">
                {s.hero && (
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={s.hero}
                      alt=""
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-3 left-3">{s.category}</Badge>
                  </div>
                )}
                <CardHeader className={s.hero ? 'pb-2' : ''}>
                  {!s.hero && (
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{s.category}</Badge>
                      <span className="text-xs text-muted-foreground">{s.readTime} min read</span>
                    </div>
                  )}
                  <CardTitle className="text-base leading-snug line-clamp-2">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-2">{s.summary}</p>
                  {s.hero && (
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <span>{s.readTime} min read</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
