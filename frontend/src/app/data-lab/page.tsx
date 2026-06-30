import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { BarChart3, TrendingUp, Banknote, Swords, GraduationCap, Heart, Users, BrainCircuit, Zap, Globe } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Data Lab',
  description: 'Interactive visualizations on GDP, inflation, budget, military, education, health, population, AI, energy, and trade. Every chart is explorable.',
  path: '/data-lab',
})

interface Section {
  label: string
  href: string
  description: string
  detail: string
  icon: React.ReactNode
}

const sections: Section[] = [
  { label: 'GDP', href: '/data-lab/gdp', description: 'Gross Domestic Product', detail: 'Quarterly growth, sectoral breakdown, global rank, per capita trends.', icon: <BarChart3 className="size-5" /> },
  { label: 'Inflation', href: '/data-lab/inflation', description: 'CPI, WPI & Core Inflation', detail: 'Category-wise breakdown, food vs fuel, global comparison, RBI repo rate context.', icon: <TrendingUp className="size-5" /> },
  { label: 'Budget', href: '/data-lab/budget', description: 'Union Budget', detail: 'Revenue & expenditure trends, fiscal deficit, ministry allocations, tax composition.', icon: <Banknote className="size-5" /> },
  { label: 'Military', href: '/data-lab/military', description: 'Defence & Force Strength', detail: 'Spending trends, personnel, equipment inventory, global firepower rank.', icon: <Swords className="size-5" /> },
  { label: 'Education', href: '/data-lab/education', description: 'Literacy & Enrollment', detail: 'State-wise literacy, GER trends, NEP 2020 progress, budget allocation.', icon: <GraduationCap className="size-5" /> },
  { label: 'Health', href: '/data-lab/health', description: 'Healthcare Outcomes', detail: 'Life expectancy, mortality, disease burden, state-wise spending, infrastructure.', icon: <Heart className="size-5" /> },
  { label: 'Population', href: '/data-lab/population', description: 'Demographics', detail: 'Age pyramid, urbanization shift, state-wise distribution, median age trends.', icon: <Users className="size-5" /> },
  { label: 'AI', href: '/data-lab/ai', description: 'Artificial Intelligence', detail: 'Investment, patents, adoption by sector, talent pool, global readiness index.', icon: <BrainCircuit className="size-5" /> },
  { label: 'Energy', href: '/data-lab/energy', description: 'Energy Mix & Renewables', detail: 'Consumption by source, solar & wind growth, per capita use, energy intensity.', icon: <Zap className="size-5" /> },
  { label: 'Trade', href: '/data-lab/trade', description: 'Exports, Imports & FDI', detail: 'Trade balance, top partners, services exports, FDI inflows, global share.', icon: <Globe className="size-5" /> },
]

export default function DataLabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Data Lab</h1>
        <p className="text-muted-foreground mt-2">Interactive visualizations — every chart is explorable, filterable, and comparable. Select a topic below.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(s => (
          <Link key={s.href} href={s.href} className="group">
            <Card role="article" className="h-full hover:border-foreground/20 transition-all hover:shadow-sm cursor-pointer hover:bg-muted/30">
              <CardHeader className="pb-2 flex-row items-start gap-3 space-y-0">
                <div className="mt-0.5 size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  {s.icon}
                </div>
                <div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">{s.label}</CardTitle>
                  <p className="text-sm font-medium text-foreground/80 mt-0.5">{s.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{s.detail}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
