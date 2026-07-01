import Link from 'next/link'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'

const SECTORS = [
  { name: 'GDP', href: '/data-lab/gdp', description: 'Quarterly growth, sectoral breakdown, global ranking', color: 'bg-blue-500', icon: '📈' },
  { name: 'Inflation', href: '/data-lab/inflation', description: 'CPI, WPI, core vs food inflation divergence', color: 'bg-red-500', icon: '🏷️' },
  { name: 'Budget', href: '/data-lab/budget', description: 'Fiscal deficit, revenue trends, CAPEX trajectory', color: 'bg-amber-500', icon: '💰' },
  { name: 'Military', href: '/data-lab/military', description: 'Defence spending, force modernisation, capability gap analysis', color: 'bg-green-500', icon: '🛡️' },
  { name: 'Trade', href: '/data-lab/trade', description: 'Export-import balance, trade partners, tariff impact', color: 'bg-purple-500', icon: '🚢' },
  { name: 'Energy', href: '/data-lab/energy', description: 'Generation mix, renewables share, nuclear capacity additions', color: 'bg-orange-500', icon: '⚡' },
  { name: 'Population', href: '/data-lab/population', description: 'Demographic dividend, urbanisation, dependency ratio', color: 'bg-teal-500', icon: '👥' },
  { name: 'AI', href: '/data-lab/ai', description: 'Investment flows, patent filings, workforce readiness index', color: 'bg-indigo-500', icon: '🤖' },
]

export function DataLabPreview() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-heading">Data Lab — Evidence Base</h2>
        <Link href="/data-lab" className="text-sm text-muted-foreground hover:text-foreground">Explore All Datasets →</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SECTORS.map(s => (
          <Link key={s.name} href={s.href}>
            <Card className="h-full card-hover cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{s.icon}</span>
                  <div className={`size-3 rounded-full ${s.color} group-hover:scale-110 transition-transform`} />
                </div>
                <CardTitle className="text-base mb-1">{s.name}</CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
