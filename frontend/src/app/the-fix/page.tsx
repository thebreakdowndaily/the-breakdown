import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FIX_STORIES } from '@/lib/content/fix'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'The Fix',
  description: 'Evidence-based prescriptions for India\'s toughest problems. Each fix story applies a 5-column analytical framework — system analysis, government action, citizen action, budget, and global comparison — from health and education to infrastructure and energy.',
  path: '/the-fix',
})

const CATEGORY_COLORS: Record<string, string> = {
  Health: 'bg-red-500/10 text-red-600 border-red-200',
  Education: 'bg-blue-500/10 text-blue-600 border-blue-200',
  Energy: 'bg-amber-500/10 text-amber-600 border-amber-200',
  Economy: 'bg-purple-500/10 text-purple-600 border-purple-200',
  Infrastructure: 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
  Environment: 'bg-green-500/10 text-green-600 border-green-200',
}

const STATUS_COLORS: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  'In Progress': 'default',
  Proposed: 'secondary',
  Implemented: 'default',
  'Under Review': 'outline',
}

const PRIORITY_COLORS: Record<string, string> = {
  High: 'text-red-500 border-red-200 bg-red-500/10',
  Medium: 'text-amber-500 border-amber-200 bg-amber-500/10',
  Low: 'text-green-500 border-green-200 bg-green-500/10',
}

export default function TheFixPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative rounded-xl border bg-card overflow-hidden">
          <div className="p-8 md:p-12 max-w-3xl">
            <Badge className="mb-4">Evidence-Based Solutions</Badge>
            <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">The Fix</h1>
             <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
               Diagnosis is cheap. What India needs is evidence-based, costed prescriptions. The Fix applies a 5-column analytical framework — <strong>System Analysis</strong> (root cause and structural constraints), <strong>Government Action</strong> (policy response and funding), <strong>Citizen Action</strong> (what individuals and communities can do), <strong>Budget</strong> (cost breakdown and fiscal sustainability), and <strong>Global Comparison</strong> (how peer countries solved it) — to every major challenge, from nuclear energy and education to water and judicial reform.
             </p>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              {['System Analysis', 'Government Action', 'Citizen Action', 'Budget', 'Global Comparison'].map((col) => (
                <span key={col} className="px-3 py-1 rounded-full border bg-muted/50 font-medium">{col}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold font-heading">{FIX_STORIES.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Fix Stories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold font-heading">{FIX_STORIES.filter(s => s.priority === 'High').length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold font-heading">{FIX_STORIES.filter(s => s.status === 'In Progress').length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold font-heading">{new Set(FIX_STORIES.map(s => s.category)).size}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Sectors Covered</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {FIX_STORIES.map((story) => (
          <Card key={story.slug} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className={CATEGORY_COLORS[story.category]}>{story.category}</Badge>
                <Badge variant={STATUS_COLORS[story.status]}>{story.status}</Badge>
              </div>
              <CardTitle className="text-lg">{story.title}</CardTitle>
              <CardDescription className="text-sm mt-1">{story.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${PRIORITY_COLORS[story.priority]}`}>
                  {story.priority} Priority
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {story.metrics.map((m) => (
                  <div key={m.label} className="bg-muted/50 rounded-lg p-2.5">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</p>
                    <p className="text-sm font-bold font-heading mt-0.5">{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-3 mt-auto">
                <span>System Analysis</span>
                <span className="text-muted-foreground/40">·</span>
                <span>Govt Action</span>
                <span className="text-muted-foreground/40">·</span>
                <span>Budget</span>
                <span className="text-muted-foreground/40">·</span>
                <span>Global</span>
              </div>
            </CardContent>
            <div className="px-(--card-spacing) pb-(--card-spacing)">
              <Link
                href={`/the-fix/${story.slug}`}
                className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-8 gap-1.5 px-2.5 bg-primary text-primary-foreground hover:bg-primary/80"
              >
                View Fix
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
