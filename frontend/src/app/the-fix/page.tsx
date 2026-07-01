import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FIX_STORIES } from '@/lib/content/fix'
import { FixFilterList } from '@/components/the-fix/fix-filter-list'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'The Fix',
  description: 'Evidence-based prescriptions for India\'s toughest problems. Each fix story applies a 5-column analytical framework — system analysis, government action, citizen action, budget, and global comparison — from health and education to infrastructure and energy.',
  path: '/the-fix',
})

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

      <FixFilterList />
    </div>
  )
}
