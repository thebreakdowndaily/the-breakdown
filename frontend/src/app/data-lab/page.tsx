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
  { label: 'GDP', href: '/data-lab/gdp', description: 'Gross Domestic Product', detail: 'Quarterly growth, sectoral contribution, global rank trajectory, per capita convergence, and composition over time.', icon: <BarChart3 className="size-5" /> },
  { label: 'Inflation', href: '/data-lab/inflation', description: 'CPI, WPI & Core Inflation', detail: 'Category-wise breakdown, food vs fuel divergence, global comparison, RBI repo rate correlation, and real wage impact.', icon: <TrendingUp className="size-5" /> },
  { label: 'Budget', href: '/data-lab/budget', description: 'Union Budget', detail: 'Revenue and expenditure trends, fiscal deficit trajectory, ministry-wise allocation shifts, and tax composition evolution.', icon: <Banknote className="size-5" /> },
  { label: 'Military', href: '/data-lab/military', description: 'Defence & Force Strength', detail: 'Spending trends as share of GDP, personnel strength by service, equipment inventory, and global firepower rank.', icon: <Swords className="size-5" /> },
  { label: 'Education', href: '/data-lab/education', description: 'Literacy & Enrollment', detail: 'State-wise literacy rates, gross enrollment ratio trends, NEP 2020 implementation, and budget allocation efficiency.', icon: <GraduationCap className="size-5" /> },
  { label: 'Health', href: '/data-lab/health', description: 'Healthcare Outcomes', detail: 'Life expectancy gains, mortality trends, disease burden shift, state-level spending variance, and infrastructure density.', icon: <Heart className="size-5" /> },
  { label: 'Population', href: '/data-lab/population', description: 'Demographics', detail: 'Age structure shift, urbanisation pace, state-wise distribution changes, dependency ratio, and median age trajectory.', icon: <Users className="size-5" /> },
  { label: 'AI', href: '/data-lab/ai', description: 'Artificial Intelligence', detail: 'Investment flows, patent filing trends, sectoral adoption rates, talent pool depth, and global readiness index standing.', icon: <BrainCircuit className="size-5" /> },
  { label: 'Energy', href: '/data-lab/energy', description: 'Energy Mix & Renewables', detail: 'Consumption by source, solar and wind capacity growth, per capita use vs peers, and energy intensity trajectory.', icon: <Zap className="size-5" /> },
  { label: 'Trade', href: '/data-lab/trade', description: 'Exports, Imports & FDI', detail: 'Trade balance evolution, top partner shifts, services export growth, FDI sectoral flows, and global share trends.', icon: <Globe className="size-5" /> },
]

export default function DataLabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Data Lab</h1>
        <p className="text-muted-foreground mt-2">Open datasets transformed into interactive visualisations. Every chart is explorable, filterable, and comparable across time and geographies. Select a topic below.</p>
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
