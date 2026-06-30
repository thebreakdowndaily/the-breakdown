import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

export interface MetricItem {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
}

interface MetricsBarProps {
  metrics: MetricItem[]
  columns?: 4 | 5 | 6
}

export function MetricsBar({ metrics, columns = 4 }: MetricsBarProps) {
  const gridCols = {
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }

  return (
    <div className={cn('grid gap-4 mb-8', gridCols[columns])}>
      {metrics.map((m) => {
        const trend = m.trend ?? (m.change?.startsWith('+') || (m.change && !m.change.startsWith('-') && m.change !== '0%') ? 'up' : m.change?.startsWith('-') ? 'down' : undefined)
        return (
          <Card key={m.label}>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</p>
              <p className="text-2xl font-bold mt-1 font-heading">{m.value}</p>
              {m.change && (
                <div className={cn(
                  'inline-flex items-center gap-0.5 text-xs font-medium mt-1',
                  trend === 'up' && 'text-green-600',
                  trend === 'down' && 'text-red-500',
                  (!trend || trend === 'neutral') && 'text-muted-foreground'
                )}>
                  {trend === 'up' && <TrendingUp className="w-3 h-3" />}
                  {trend === 'down' && <TrendingDown className="w-3 h-3" />}
                  {m.change}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
