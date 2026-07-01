'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'
import type { EChartsOption } from 'echarts'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

// ----- Metrics Data -----

interface Metric {
  label: string
  value: string
  detail: string
  trend: 'up' | 'down' | 'neutral'
  sparkline: number[]
  color: string
  change?: string
}

const INDIA_METRICS: Metric[] = [
  {
    label: 'GDP Growth',
    value: '6.4%',
    detail: 'FY26 Advance Estimate, MoSPI',
    trend: 'up',
    color: 'bg-blue-500',
    change: '+0.3pp',
    sparkline: [5.8, 6.1, 6.3, 6.0, 6.8, 7.2, 6.5, 6.4],
  },
  {
    label: 'Industrial Output (IIP)',
    value: '4.8%',
    detail: 'Apr 2026, manufacturing-led expansion',
    trend: 'up',
    color: 'bg-indigo-500',
    change: '+0.6pp',
    sparkline: [2.1, 3.5, 4.2, 3.8, 5.1, 4.8, 4.6, 4.8],
  },
  {
    label: 'GST Collection',
    value: '₹1.87L Cr',
    detail: 'May 2026, 8.2% YoY growth sustained',
    trend: 'up',
    color: 'bg-amber-500',
    change: '+8.2% YoY',
    sparkline: [1.42, 1.55, 1.61, 1.58, 1.72, 1.78, 1.82, 1.87],
  },
  {
    label: 'PMI Manufacturing',
    value: '58.3',
    detail: 'Expansion territory, 6-month high',
    trend: 'up',
    color: 'bg-emerald-500',
    change: '+1.2',
    sparkline: [54.9, 55.8, 56.3, 57.1, 57.8, 58.3, 58.1, 58.3],
  },
  {
    label: 'Merchandise Exports',
    value: '$39.2B',
    detail: 'May 2026, engineering & pharma lead',
    trend: 'up',
    color: 'bg-cyan-500',
    change: '+5.1% YoY',
    sparkline: [34.2, 35.8, 36.5, 37.1, 38.4, 39.2, 38.9, 39.2],
  },
  {
    label: 'Forex Reserves',
    value: '$645B',
    detail: 'As of Jun 19, import cover strengthened',
    trend: 'up',
    color: 'bg-green-500',
    change: '+$12B',
    sparkline: [578, 591, 608, 619, 628, 635, 641, 645],
  },
  {
    label: 'Unemployment Rate',
    value: '7.8%',
    detail: 'May 2026, urban-rural divergence persists',
    trend: 'down',
    color: 'bg-red-500',
    change: '-0.3pp',
    sparkline: [9.1, 8.7, 8.4, 8.2, 8.0, 7.9, 7.8, 7.8],
  },
  {
    label: 'Peak Power Demand',
    value: '162 GW',
    detail: 'June, driven by heatwave & industrial load',
    trend: 'up',
    color: 'bg-orange-500',
    change: '+13 GW',
    sparkline: [132, 138, 144, 149, 155, 160, 162, 162],
  },
]

// ----- Sparkline Chart Factory -----

function sparklineOption(data: number[], color: string, trend: 'up' | 'down' | 'neutral'): EChartsOption {
  const lineColor = trend === 'up' ? '#16a34a' : trend === 'down' ? '#dc2626' : '#6b7280'
  return {
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: { show: false, type: 'category' as const, data: data.map((_, i) => i) },
    yAxis: { show: false, type: 'value' as const },
    series: [
      {
        type: 'line',
        data,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2, color: lineColor },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: lineColor + '40' },
              { offset: 1, color: lineColor + '05' },
            ],
          },
        },
        animation: true,
        animationDuration: 800,
      },
    ],
  }
}

// ----- Main Component -----

export function IndiaDashboard() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold font-heading">India Macro Dashboard</h2>
          <Badge variant="outline" className="text-[10px] text-green-500 border-green-500/30">
            <span className="size-1.5 rounded-full bg-green-500 inline-block mr-1 animate-pulse" />
            real-time indicators
          </Badge>
        </div>
        <Link href="/data-lab" className="text-sm text-muted-foreground hover:text-foreground">Full Economic Dataset →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {INDIA_METRICS.map(m => (
          <Card key={m.label} size="sm" className="relative overflow-hidden group card-hover">
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <span className={`size-2 rounded-full ${m.color}`} />
                  {m.label}
                </CardTitle>
                {m.change && (
                  <span className={`text-[10px] tabular-nums ${
                    m.trend === 'up' ? 'text-green-500' :
                    m.trend === 'down' ? 'text-red-500' :
                    'text-muted-foreground'
                  }`}>
                    {m.change}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-lg md:text-xl font-bold font-heading tabular-nums">{m.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{m.detail}</p>

              {/* Sparkline */}
              <div className="mt-1.5 h-8 opacity-60 group-hover:opacity-100 transition-opacity">
                <ReactECharts
                  option={sparklineOption(m.sparkline, m.color, m.trend)}
                  style={{ height: '100%', width: '100%' }}
                  notMerge
                  lazyUpdate
                />
              </div>
            </CardContent>

            {/* Trend indicator bar */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
              m.trend === 'up' ? 'bg-green-500/60' :
              m.trend === 'down' ? 'bg-red-500/60' :
              'bg-muted-foreground/20'
            }`} />
          </Card>
        ))}
      </div>
    </section>
  )
}
