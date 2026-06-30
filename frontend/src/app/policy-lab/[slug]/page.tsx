import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPolicyBySlug, getAllPolicySlugs, getRelatedPolicies } from '@/lib/content/policies'
import { Badge } from '@/components/ui/badge'
import type { Metadata } from 'next'

interface PolicyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPolicySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params
  const policy = getPolicyBySlug(slug)
  if (!policy) return { title: 'Policy Not Found' }
  return {
    title: `${policy.title} — Policy Lab | The Breakdown OS`,
    description: policy.description,
  }
}

const statusColors: Record<string, string> = {
  Active: 'bg-green-india',
  Implementation: 'bg-amber-500',
  Announced: 'bg-blue-500',
}

export default async function PolicyDetailPage({ params }: PolicyPageProps) {
  const { slug } = await params
  const policy = getPolicyBySlug(slug)
  if (!policy) notFound()

  const related = getRelatedPolicies(slug)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={statusColors[policy.status] || 'bg-primary'}>{policy.status}</Badge>
            <span className="text-sm text-muted-foreground">{policy.category}</span>
          </div>
          <h1 className="text-3xl font-bold font-heading">{policy.title}</h1>
        </div>
        {policy.budget !== '—' && (
          <div className="rounded-xl border border-border bg-card p-3 text-center min-w-[140px]">
            <p className="text-xs text-muted-foreground">Budget Outlay</p>
            <p className="text-lg font-bold font-heading text-primary">{policy.budget}</p>
          </div>
        )}
      </div>

      <section>
        <h2 className="text-xl font-bold font-heading mb-3">Executive Summary</h2>
        <p className="text-muted-foreground leading-relaxed">{policy.description}</p>
      </section>

      <section>
        <h2 className="text-xl font-bold font-heading mb-3">Key Provisions</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          {policy.keyProvisions.map((provision, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
              <p className="text-sm pt-0.5">{provision}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold font-heading mb-3">Timeline</h2>
        <div className="relative">
          <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {policy.timeline.map((m, i) => (
              <div key={i} className="relative pl-10">
                <div className="absolute left-2 top-1 w-3 h-3 rounded-full border-2 border-primary bg-background" />
                <div>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{m.date}</span>
                  <p className="text-sm mt-1">{m.milestone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold font-heading mb-3">Impact Metrics</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {policy.impactMetrics.map(m => (
            <div key={m.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">{m.label}</p>
              <p className="text-xl font-bold font-heading mt-1">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold font-heading mb-3">Global Comparison</h2>
        <div className="rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Country</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {policy.globalComparison.map(gc => (
                  <tr key={gc.country} className="border-b border-border last:border-0">
                    <td className="p-3 font-medium">{gc.country}</td>
                    <td className="p-3">
                      <Badge className={statusColors[gc.status] || 'bg-primary'}>{gc.status}</Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">{gc.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="pt-4 border-t border-border">
          <h2 className="text-xl font-bold font-heading mb-4">Related Policies</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {related.map(p => (
              <Link key={p.slug} href={`/policy-lab/${p.slug}`}>
                <div className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors">
                  <Badge className={statusColors[p.status] || 'bg-primary'}>{p.status}</Badge>
                  <h3 className="font-semibold mt-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.category} &middot; {p.budget}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div>
        <Link
          href="/policy-lab"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-input bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-9 gap-2 px-4 hover:bg-muted"
        >
          Back to Policy Lab
        </Link>
      </div>
    </div>
  )
}
