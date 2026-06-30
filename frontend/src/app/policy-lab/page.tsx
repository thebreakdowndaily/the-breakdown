import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllPolicies } from '@/lib/content/policies'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'

export const metadata: Metadata = generatePageMetadata({
  title: 'Policy Lab',
  description: 'Policy analysis, budget tracking, legislation tracker, and impact assessment. Evidence-based policy research on India\'s key initiatives.',
  path: '/policy-lab',
})

const statusColors: Record<string, string> = {
  Active: 'bg-green-india',
  Implementation: 'bg-amber-500',
  Announced: 'bg-blue-500',
}

export default function PolicyLabPage() {
  const policies = getAllPolicies()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Policy Lab</h1>
        <p className="text-muted-foreground mt-2">Policy analysis, budget tracking, legislation tracker, and impact assessment.</p>
      </div>

      <div className="space-y-4">
        {policies.map(p => (
          <Link key={p.slug} href={`/policy-lab/${p.slug}`}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer hover:shadow-sm">
              <CardHeader className="flex-row items-center justify-between space-y-0 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <Badge className={statusColors[p.status] || 'bg-primary'}>{p.status}</Badge>
                  <CardTitle className="text-base">{p.title}</CardTitle>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">{p.category}</span>
                  {p.budget !== '—' && <span className="font-mono">{p.budget}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                  <span>{p.keyProvisions.length} provisions</span>
                  <span className="text-foreground/60">|</span>
                  <span>{p.timeline.length} milestones</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
