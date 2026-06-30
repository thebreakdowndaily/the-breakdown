import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ALL_STORIES } from '@/lib/content/generated/stories'

export const metadata: Metadata = generatePageMetadata({
  title: 'AI & Technology',
  description: 'Tracking the frontier — AI governance, deep tech, digital public infrastructure, and cybersecurity. India\'s technology ecosystem.',
  path: '/ai-technology',
})

const TECH_TOPICS = [
  { title: 'AI Governance', desc: 'IndiaAI Mission, global AI regulation, ethics, and safety frameworks.', href: '/data-lab/ai' },
  { title: 'Digital Public Infrastructure', desc: 'UPI, Aadhaar, DigiLocker, ONDC, and India Stack.', href: '/data-lab/trade' },
  { title: 'Policy Lab', desc: 'Data protection, PLI schemes, and tech policy analysis.', href: '/policy-lab' },
]

export default function AITechnologyPage() {
  const stories = [...ALL_STORIES]
    .filter(s => ['AI & Technology', 'Technology'].includes(s.category))
    .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">AI & Technology</h1>
        <p className="text-muted-foreground mt-2">Tracking the frontier. AI governance, deep tech, digital infrastructure, and cybersecurity.</p>
      </div>

      {/* Tech Topic Links */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {TECH_TOPICS.map(t => (
          <Link key={t.title} href={t.href}>
            <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer hover:border-primary/30">
              <CardContent className="p-5">
                <CardTitle className="text-base mb-1">{t.title}</CardTitle>
                <CardDescription>{t.desc}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Tech Stories */}
      <div>
        <h2 className="text-lg font-bold font-heading mb-4">Technology Stories</h2>
        {stories.length === 0 ? (
          <div className="rounded-xl border bg-muted/30 h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">No technology stories yet.</p>
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
                  <CardContent className={s.hero ? 'p-4' : 'p-5'}>
                    {!s.hero && <Badge className="mb-2 w-fit">{s.category}</Badge>}
                    <CardTitle className="text-sm mb-1 line-clamp-2">{s.title}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">{s.summary}</CardDescription>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <span>{s.readTime} min read</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
