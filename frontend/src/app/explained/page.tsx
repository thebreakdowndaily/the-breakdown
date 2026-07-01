import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ALL_STORIES } from '@/lib/content/generated/stories'

export const metadata: Metadata = generatePageMetadata({
  title: 'Explained',
  description: 'Complex topics, clearly broken down. Systems, policies, and science — no jargon. Deep dives into India\'s most important stories.',
  path: '/explained',
})

const CATEGORY_ORDER = [
  'Economy',
  'Climate',
  'Geopolitics',
  'Technology',
  'Tech / AI',
  'Tech / Policy',
  'AI & Technology',
  'India',
  'Incredible India',
  'Politics',
  'Accountability',
  'World',
  'Explained',
]

export default function ExplainedPage() {
  const stories = [...ALL_STORIES]
    .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))

  const totalReadTime = stories.reduce((acc, s) => acc + (s.readTime || 0), 0)
  const categories = [...new Set(stories.map(s => s.category))].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  )

  const featured = stories[0]
  const grouped = categories.reduce<Record<string, typeof stories>>((acc, cat) => {
    acc[cat] = stories.filter(s => s.category === cat)
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Explained</h1>
        <p className="text-muted-foreground mt-2">Systems, policies, science, and geopolitics — stripped of jargon and anchored in evidence. Every explainer answers not just what happened, but how it works and why it matters.</p>
      </div>

      {/* Aggregate stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Explainers', value: stories.length.toString() },
          { label: 'Topics', value: categories.length.toString() },
          { label: 'Total reading time', value: `${totalReadTime} min` },
          { label: 'Latest', value: stories[0]?.publishedAt ? new Date(stories[0].publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
        ].map(m => (
          <Card key={m.label} size="sm">
            <CardHeader>
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{m.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold font-heading">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured story */}
      {featured && (
        <div className="mb-10">
          <h2 className="text-xl font-bold font-heading mb-4">Latest Explainers</h2>
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
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      )}

      {/* Grouped by category */}
      {categories.map(cat => {
        const catStories = grouped[cat] || []
        const rest = catStories[0]?.slug === featured?.slug ? catStories.slice(1) : catStories
        if (rest.length === 0) return null
        return (
          <div key={cat} className="mb-10">
            <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
              <Badge variant="secondary" className="text-sm px-3 py-1">{cat}</Badge>
              <span className="text-sm text-muted-foreground font-normal">{rest.length} explainer{rest.length !== 1 ? 's' : ''}</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <Badge className="absolute top-3 left-3">{s.category}</Badge>
                      </div>
                    )}
                    <CardContent className={s.hero ? 'p-4' : 'p-5'}>
                      {!s.hero && <Badge className="mb-2 w-fit">{s.category}</Badge>}
                      <CardTitle className="text-sm mb-1 line-clamp-2">{s.title}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">{s.summary}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
