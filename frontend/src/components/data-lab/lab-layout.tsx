import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight, BarChart3 } from 'lucide-react'
import { MetricsBar, type MetricItem } from './metrics-bar'

interface LabLayoutProps {
  title: string
  description: string
  metrics?: MetricItem[]
  children: ReactNode
}

export function LabLayout({ title, description, metrics, children }: LabLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/data-lab" className="hover:text-foreground transition-colors">Data Lab</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">{title}</span>
      </nav>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-6 h-6 text-[#FF9933]" />
          <h1 className="text-3xl font-bold font-heading">{title}</h1>
        </div>
        <p className="text-muted-foreground mt-1 max-w-2xl">{description}</p>
      </div>
      {metrics && metrics.length > 0 && <MetricsBar metrics={metrics} />}
      {children}
    </div>
  )
}
