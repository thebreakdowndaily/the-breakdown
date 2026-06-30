import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Lightbulb, Building2, Users, Banknote, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FIX_STORIES, getFixStory } from '@/lib/content/fix'
import type { Metadata } from 'next'

interface FixDetailPageProps {
  params: Promise<{ slug: string }>
}

const COLUMN_ICONS: Record<string, typeof Lightbulb> = {
  'System Analysis': Lightbulb,
  'Government Action': Building2,
  'Citizen Action': Users,
  'Budget': Banknote,
  'Global Comparison': Globe,
}

export async function generateStaticParams() {
  return FIX_STORIES.map((story) => ({ slug: story.slug }))
}

export async function generateMetadata({ params }: FixDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const story = getFixStory(slug)
  if (!story) return { title: 'Fix Not Found' }
  return {
    title: `${story.title} — The Fix — The Breakdown OS`,
    description: story.summary,
    openGraph: {
      title: story.title,
      description: story.summary,
      type: 'article',
    },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  Health: 'bg-red-500/10 text-red-600 border-red-200',
  Education: 'bg-blue-500/10 text-blue-600 border-blue-200',
  Energy: 'bg-amber-500/10 text-amber-600 border-amber-200',
  Economy: 'bg-purple-500/10 text-purple-600 border-purple-200',
  Infrastructure: 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
  Environment: 'bg-green-500/10 text-green-600 border-green-200',
}

export default async function FixDetailPage({ params }: FixDetailPageProps) {
  const { slug } = await params
  const story = getFixStory(slug)
  if (!story) notFound()

  const columns = [
    { title: 'System Analysis', icon: Lightbulb, content: story.systemAnalysis, color: 'border-l-amber-500' },
    { title: 'Government Action', icon: Building2, content: story.governmentAction, color: 'border-l-blue-500' },
    { title: 'Citizen Action', icon: Users, content: story.citizenAction, color: 'border-l-green-500' },
    { title: 'Budget', icon: Banknote, content: story.budget, color: 'border-l-purple-500' },
    { title: 'Global Comparison', icon: Globe, content: story.globalComparison, color: 'border-l-cyan-500' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/the-fix" className="hover:text-foreground transition-colors">The Fix</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium truncate max-w-[300px]">{story.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <Badge variant="outline" className={CATEGORY_COLORS[story.category]}>{story.category}</Badge>
          <Badge>{story.status}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">{story.title}</h1>
        <p className="text-lg text-muted-foreground">{story.summary}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {story.metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</p>
              <p className="text-xl font-bold font-heading mt-1">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 5-Column Analysis */}
      <div className="space-y-6">
        {columns.map((col) => {
          const Icon = col.icon
          return (
            <Card key={col.title} className={`border-l-4 ${col.color}`}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <CardTitle className="text-base">{col.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{col.content}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Related Fixes */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-lg font-bold font-heading mb-4">More Fix Stories</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {FIX_STORIES.filter((s) => s.slug !== story.slug).slice(0, 4).map((s) => (
            <Link key={s.slug} href={`/the-fix/${s.slug}`}>
              <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={CATEGORY_COLORS[s.category]}>{s.category}</Badge>
                  </div>
                  <CardTitle className="text-sm">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground line-clamp-2">{s.summary}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
