import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ALL_STORIES } from '@/lib/content/generated/stories'

export const metadata: Metadata = generatePageMetadata({
  title: 'India Dashboard',
  description: 'Comprehensive tracking of India\'s economy, infrastructure, policy, technology, and governance. Real-time data and analysis.',
  path: '/india',
})

const INDIA_SECTORS = [
  { label: 'GDP Growth', value: '6.4%', detail: 'FY26 Advance Estimate' },
  { label: 'Industrial Output (IIP)', value: '4.8%', detail: 'Apr 2026, YoY' },
  { label: 'GST Collection', value: '₹1.87L Cr', detail: 'May 2026' },
  { label: 'PMI Manufacturing', value: '58.3', detail: 'Expansion, 6-mo high' },
  { label: 'Exports', value: '$39.2B', detail: 'May 2026' },
  { label: 'Forex Reserves', value: '$645B', detail: 'As of Jun 19' },
  { label: 'Unemployment Rate', value: '7.8%', detail: 'May 2026' },
  { label: 'Power Demand', value: '162 GW', detail: 'Peak, +9% YoY' },
]

export default function IndiaPage() {
  const stories = [...ALL_STORIES]
    .filter(s => ['India', 'Incredible India', 'Politics', 'Economy', 'Climate'].includes(s.category))
    .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))

  const featured = stories[0]
  const rest = stories.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">India Dashboard</h1>
        <p className="text-muted-foreground mt-2">Comprehensive tracking of India&#39;s economy, infrastructure, policy, technology, and governance.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {INDIA_SECTORS.map(m => (
          <Card key={m.label} size="sm">
            <CardHeader>
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{m.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold font-heading">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* India Stories */}
      <div className="mb-6">
        <h2 className="text-xl font-bold font-heading mb-4">India Stories</h2>
        {stories.length === 0 ? (
          <div className="rounded-xl border bg-muted/30 h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">No India stories yet.</p>
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
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            )}
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
        )}
      </div>

      {/* Links to Key Sections */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {[
          { title: 'Data Lab', href: '/data-lab', desc: 'GDP, inflation, budget & more' },
          { title: 'Accountability', href: '/accountability', desc: 'Spending, projects, promises' },
          { title: 'Policy Lab', href: '/policy-lab', desc: 'Key government policies' },
          { title: 'The Fix', href: '/the-fix', desc: 'Evidence-based solutions' },
        ].map(link => (
          <Link key={link.title} href={link.href}>
            <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer hover:border-primary/30">
              <CardContent className="p-4 text-center">
                <p className="font-bold font-heading text-sm">{link.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
