import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Ticker } from '@/components/dashboard/ticker'
import { GlobalSituationRoom } from '@/components/dashboard/global-situation-room'
import { KnowledgeGraph } from '@/components/dashboard/knowledge-graph'
import { NewsletterForm } from '@/components/dashboard/newsletter-form'
import { DashboardTimeline } from '@/components/dashboard/dashboard-timeline'
import { QuickNumbers } from '@/components/dashboard/quick-numbers'
import { AskBar } from '@/components/ai/ask-bar'
import { IndiaDashboard } from '@/components/dashboard/india-dashboard'
import { DataLabPreview } from '@/components/dashboard/data-lab-preview'
import { ALL_STORIES } from '@/lib/content/generated/stories'

const INDIA_METRICS = [] as never // replaced by <IndiaDashboard /> component

const EDITOR_PICKS = [
  { title: 'The Fix', description: 'Evidence-based solutions to India&#39;s toughest problems', href: '/the-fix' },
  { title: 'Accountability', description: 'Track promises, schemes, and government performance', href: '/accountability' },
  { title: 'Explained', description: 'Deep-dive explainers on policy, science, and geopolitics', href: '/explained' },
  { title: 'Intelligence Reports', description: 'Curated intelligence on critical topics', href: '/intelligence' },
]

export default function HomePage() {
  // Derive featured story from pipeline: most recent published story
  const featured = ALL_STORIES.length > 0
    ? ([...ALL_STORIES]
        .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))
        .find(s => s.slug && s.title) || ALL_STORIES[0])
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Ticker */}
      <div className="mb-8">
        <Ticker />
      </div>

      {/* Brand Hero */}
      <section className="mb-12 text-center pb-8 border-b">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-4">
            Complex Stories. <span className="text-primary">Clear Analysis.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            No pundits. No hype. No partisan angles.
          </p>
        </div>
      </section>

      {/* Hero — Question driven by featured story */}
      {featured && (
        <section className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Featured Story</p>
              <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight max-w-3xl">
                {featured.title}
              </h1>
            </div>
            <Link href={`/story/${featured.slug}`}>
              <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted transition-colors">Read →</Badge>
            </Link>
          </div>
        </section>
      )}

      {/* Featured Investigation — pipeline-derived */}
      {featured && (
        <section className="mb-16">
          <div className="relative rounded-xl border bg-card overflow-hidden">
            <div className="p-8 md:p-12 max-w-2xl">
              <Badge className="mb-4">{featured.category}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">{featured.title}</h2>
              <p className="text-muted-foreground mb-6">{featured.summary || 'Read the full analysis.'}</p>
              <Link
                href={`/story/${featured.slug}`}
                className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-8 gap-1.5 px-2.5 bg-primary text-primary-foreground hover:bg-primary/80"
              >
                Read Investigation
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Market Dashboard */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-muted-foreground">Market Dashboard</h2>
          <span className="text-[11px] text-muted-foreground/60">Live indicators</span>
        </div>
        <QuickNumbers />
      </section>

      {/* Global Situation Room */}
      <section className="mb-16">
        <GlobalSituationRoom />
      </section>

      {/* India Dashboard */}
      <section className="mb-16">
        <IndiaDashboard />
      </section>

      {/* Data Lab Preview */}
      <section className="mb-16">
        <DataLabPreview />
      </section>

      {/* Knowledge Graph */}
      <section className="mb-16">
        <KnowledgeGraph />
      </section>

      {/* Timeline of the Day */}
      <section className="mb-16">
        <DashboardTimeline />
      </section>

      {/* Editor's Picks */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-heading">Editor&#39;s Picks</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {EDITOR_PICKS.map(w => (
            <Link key={w.title} href={w.href}>
              <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base">{w.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{w.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Stories */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-heading">Latest Stories</h2>
          <Link href="/story" className="text-sm text-muted-foreground hover:text-foreground">View All Stories →</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...ALL_STORIES]
            .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))
            .slice(0, 6)
            .map((story) => (
              <Link key={story.slug} href={`/story/${story.slug}`}>
                <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-5">
                    <Badge className="mb-2 w-fit">{story.category}</Badge>
                    <h3 className="font-bold font-heading text-sm mb-1 line-clamp-2">{story.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{story.summary}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-16 max-w-md mx-auto">
        <NewsletterForm />
      </section>

      {/* Ask The Breakdown */}
      <section className="mb-16">
        <AskBar />
      </section>
    </div>
  )
}
