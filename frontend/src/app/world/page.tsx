import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ALL_STORIES } from '@/lib/content/generated/stories'
import { getAllCountries } from '@/lib/content/countries'
import { WorldMapWrapper } from '@/components/dashboard/world-map-wrapper'

export const metadata: Metadata = generatePageMetadata({
  title: 'World',
  description: 'Global intelligence, conflicts, diplomacy, and trade. Every country, tracked. Interactive maps and real-time data.',
  path: '/world',
})

export default function WorldPage() {
  const allStories = [...ALL_STORIES]
    .filter(s => ['World', 'Geopolitics'].includes(s.category))
    .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))

  const countries = getAllCountries()
  const featured = allStories[0]
  const rest = allStories.slice(1, 9)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">World</h1>
        <p className="text-muted-foreground mt-2">Global intelligence tracking across conflicts, diplomacy, trade corridors, and shifting alliances. Every country profiled, every trend mapped against verified data.</p>
      </div>

      {featured && (
        <div className="mb-8">
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
        </div>
      )}

      {rest.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold font-heading mb-4">Latest Global Reports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rest.map(s => (
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
                      <Badge className="absolute top-2 left-2 text-[10px]">{s.category}</Badge>
                    </div>
                  )}
                  <CardContent className="p-3 flex-1 flex flex-col justify-between">
                    <CardTitle className="text-xs leading-snug line-clamp-2 mb-1">{s.title}</CardTitle>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{s.readTime} min</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mb-10">
        <h2 className="text-lg font-bold font-heading mb-4">Global Map</h2>
        <WorldMapWrapper stories={allStories} />
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-heading">Country Profiles</h2>
          <Link href="/country-profiles" className="text-sm text-muted-foreground hover:text-foreground">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {countries.slice(0, 5).map(c => (
            <Link key={c.code} href={`/country-profiles/${c.code}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer text-center hover:border-primary/30">
                <CardContent className="p-4">
                  <p className="text-sm font-medium">{c.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
