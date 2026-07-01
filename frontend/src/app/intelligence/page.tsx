import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ALL_STORIES } from '@/lib/content/generated/stories'

export const metadata: Metadata = generatePageMetadata({
  title: 'Intelligence',
  description: 'Real-time situational awareness. Live events, conflicts, diplomacy, and trade — India\'s first visual intelligence platform.',
  path: '/intelligence',
})

const INTELLIGENCE_CATEGORIES = ['Geopolitics', 'World']

export default function IntelligencePage() {
  const stories = [...ALL_STORIES]
    .filter(s => INTELLIGENCE_CATEGORIES.includes(s.category))
    .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))

  const featured = stories[0]
  const rest = stories.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Intelligence</h1>
        <p className="text-muted-foreground mt-2">Geopolitical analysis, diplomatic tracking, and global situational awareness — structured as intelligence briefs drawn from verified sources, not speculation.</p>
      </div>
      {stories.length === 0 ? (
        <div className="rounded-xl border bg-muted/30 h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No intelligence reports yet. Fresh analysis is being prepared.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {featured && (
            <Link href={`/story/${featured.slug}`} className="block group">
              <Card className="relative overflow-hidden border-0">
                <div className="aspect-[21/9] relative">
                  {featured.hero && (
                    <img
                      src={featured.hero}
                      alt=""
                      className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <Badge className="mb-3">{featured.category}</Badge>
                    <h2 className="text-xl md:text-2xl font-bold font-heading text-white mb-2 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-white/70 line-clamp-2 max-w-3xl">{featured.summary}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-white/50">
                      <span>{featured.readTime} min read</span>
                      {featured.publishedAt && (
                        <span>{new Date(featured.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map(s => (
              <Link key={s.slug} href={`/story/${s.slug}`}>
                <Card className="h-full overflow-hidden group hover:bg-muted/50 transition-colors flex flex-col">
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
                    {!s.hero && <Badge className="mb-2 w-fit">{s.category}</Badge>}
                    <CardTitle className="text-base leading-snug line-clamp-2">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-2">{s.summary}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span>{s.readTime} min read</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
