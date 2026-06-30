import Link from 'next/link'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'

const SECTORS = [
  { name: 'GDP', href: '/data-lab/gdp', description: 'Quarterly growth, sectoral breakdown, global rank', color: 'bg-blue-500', icon: '📈' },
  { name: 'Inflation', href: '/data-lab/inflation', description: 'CPI, WPI, food inflation trends', color: 'bg-red-500', icon: '🏷️' },
  { name: 'Budget', href: '/data-lab/budget', description: 'Union Budget allocation, fiscal deficit, revenue', color: 'bg-amber-500', icon: '💰' },
  { name: 'Military', href: '/data-lab/military', description: 'Defence expenditure, capability comparisons', color: 'bg-green-500', icon: '🛡️' },
  { name: 'Trade', href: '/data-lab/trade', description: 'Exports, imports, balance of trade, partners', color: 'bg-purple-500', icon: '🚢' },
  { name: 'Energy', href: '/data-lab/energy', description: 'Power generation, renewables, nuclear capacity', color: 'bg-orange-500', icon: '⚡' },
  { name: 'Population', href: '/data-lab/population', description: 'Demographics, density, urbanisation trends', color: 'bg-teal-500', icon: '👥' },
  { name: 'AI', href: '/data-lab/ai', description: 'AI investment, patents, workforce readiness', color: 'bg-indigo-500', icon: '🤖' },
]

export function DataLabPreview() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-heading">Data Lab</h2>
        <Link href="/data-lab" className="text-sm text-muted-foreground hover:text-foreground">Full Data Lab →</Link>
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
