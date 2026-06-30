'use client'

import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] rounded-lg bg-muted/20 animate-pulse flex items-center justify-center text-muted-foreground text-sm">
      Loading chart…
    </div>
  ),
})

interface ChartProps {
  title: string
  option: Record<string, unknown>
  height?: number
}

export function Chart({ title, option, height = 400 }: ChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ECharts option={option} style={{ height }} />
      </CardContent>
    </Card>
  )
}

// Common chart options
export const GDP_LINE_CHART = {
  xAxis: { type: 'category', data: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'] },
  yAxis: { type: 'value', name: 'GDP Growth (%)' },
  series: [{ data: [4.2, -5.8, 9.1, 7.2, 7.8, 8.2, 6.5, 6.4], type: 'line', smooth: true }],
  tooltip: { trigger: 'axis' },
  grid: { left: '10%', right: '10%', top: '10%', bottom: '15%' },
}

export const ENERGY_MIX_PIE = {
  tooltip: { trigger: 'item' },
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    data: [
      { value: 38, name: 'Coal' },
      { value: 25, name: 'Renewables' },
      { value: 22, name: 'Oil & Gas' },
      { value: 3, name: 'Nuclear' },
      { value: 12, name: 'Hydro' },
    ],
  }],
}
