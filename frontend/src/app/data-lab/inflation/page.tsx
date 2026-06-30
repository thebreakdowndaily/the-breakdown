'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { inflationChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'CPI Inflation', value: '4.8%', change: '-0.6pp', trend: 'down' as const },
  { label: 'WPI Inflation', value: '2.0%', change: '+2.7pp', trend: 'up' as const },
  { label: 'Core CPI', value: '3.9%', change: '-0.3pp', trend: 'down' as const },
  { label: 'Food Inflation', value: '5.2%', change: '+1.1pp', trend: 'up' as const },
  { label: 'Fuel Inflation', value: '1.8%', change: '-2.4pp', trend: 'down' as const },
  { label: 'RBI Repo Rate', value: '6.50%', change: 'unchanged', trend: 'neutral' as const },
]

export default function InflationLabPage() {
  return (
    <LabLayout title="Inflation" description="CPI, WPI, core inflation, food inflation, global comparison." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="CPI vs WPI Trend" option={inflationChart} height={380} />
        <LabChart title="CPI Breakdown by Category" option={{
          color: ['#FF9933', '#138808', '#2563eb', '#dc2626', '#7c3aed'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['Food', 'Housing', 'Fuel & Light', 'Transport', 'Health'], bottom: 0 },
          grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
          xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
          yAxis: { type: 'value', name: 'Inflation %' },
          series: [
            { type: 'line', data: [5.8, 5.6, 5.2, 5.0, 4.8, 5.1, 5.5, 5.3, 4.9, 4.7, 4.5, 4.8], smooth: true },
            { type: 'line', data: [4.2, 4.1, 3.9, 3.8, 3.6, 3.7, 3.9, 3.8, 3.5, 3.4, 3.3, 3.5], smooth: true },
            { type: 'line', data: [3.0, 2.8, 2.5, 2.2, 1.8, 1.5, 1.2, 1.0, 1.5, 1.8, 2.0, 1.8], smooth: true },
            { type: 'line', data: [6.5, 6.2, 5.8, 5.5, 5.0, 4.8, 5.2, 5.5, 5.0, 4.5, 4.2, 4.0], smooth: true },
            { type: 'line', data: [4.5, 4.3, 4.0, 3.8, 3.5, 3.6, 3.8, 3.7, 3.4, 3.2, 3.0, 3.1], smooth: true },
          ],
        }} height={380} />
      </div>
      <LabChart title="Global Inflation Comparison" option={{
        color: ['#FF9933', '#2563eb', '#dc2626', '#138808'],
        tooltip: { trigger: 'axis' },
        legend: { data: ['India', 'USA', 'UK', 'China'], bottom: 0 },
        grid: { left: '3%', right: '4%', bottom: '12%', containLabel: true },
        xAxis: { type: 'category', data: ['2019', '2020', '2021', '2022', '2023', '2024'] },
        yAxis: { type: 'value', name: 'CPI %' },
        series: [
          { type: 'line', data: [4.8, 6.2, 5.5, 6.7, 5.4, 4.8], smooth: true, symbol: 'circle' },
          { type: 'line', data: [1.8, 1.2, 4.7, 8.0, 3.4, 2.9], smooth: true, symbol: 'diamond' },
          { type: 'line', data: [1.8, 0.9, 2.6, 9.1, 7.3, 2.5], smooth: true, symbol: 'triangle' },
          { type: 'line', data: [2.9, 2.5, 0.9, 1.8, 0.2, 0.5], smooth: true, symbol: 'rect' },
        ],
      }} height={320} />

      <LabContext title="Food Inflation Remains Sticky" variant="warning">
        Food inflation has consistently stayed above 5%, driven by volatile vegetable prices, pulses, and
        edible oils. This matters because food accounts for ~46% of the CPI basket. Until supply-side
        interventions improve cold-chain infrastructure and reduce post-harvest losses, food inflation is
        likely to remain the primary upside risk to the RBI's 4% target.
      </LabContext>

      <LabContext title="India vs Global Inflation — A Resilient Position" variant="insight">
        India's CPI inflation has remained lower than the US and UK since 2022, despite the country's higher
        food weight in the basket. The RBI's proactive rate hikes (250 bps between May 2022 and Feb 2023) and
        the government's supply-side measures (export bans, duty cuts, buffer stock releases) helped contain
        the spillover from global commodity shocks.
      </LabContext>

      <LabSources sources={[
        'Ministry of Statistics and Programme Implementation — Consumer Price Index Releases, 2024',
        'Reserve Bank of India — Monetary Policy Reports, 2024–25',
        'International Monetary Fund — World Economic Outlook, October 2024',
        'World Bank — Commodity Markets Outlook, 2024',
      ]} />
    </LabLayout>
  )
}
