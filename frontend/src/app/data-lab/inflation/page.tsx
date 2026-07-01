'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { inflationChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'CPI (Headline)', value: '3.93%', change: '-0.87pp', trend: 'down' as const },
  { label: 'WPI', value: '9.68%', change: '+7.68pp', trend: 'up' as const },
  { label: 'Core CPI (ex-Food & Fuel)', value: '3.9%', change: '-0.3pp', trend: 'down' as const },
  { label: 'Consumer Food CPI (CFPI)', value: '4.78%', change: '-0.42pp', trend: 'down' as const },
  { label: 'Fuel & Light CPI', value: '1.8%', change: '-2.4pp', trend: 'down' as const },
  { label: 'RBI Repo Rate', value: '5.25%', change: '-1.25pp', trend: 'down' as const },
]

export default function InflationLabPage() {
  return (
    <LabLayout title="Inflation" description="Consumer and wholesale price trends, core inflation dynamics, food-price stickiness, and India's position relative to global inflation cycles." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="CPI vs WPI — Persistent Wedge" option={inflationChart} height={380} />
        <LabChart title="CPI Inflation by Major Sub-Groups" option={{
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
      <LabChart title="Headline CPI — India vs Major Economies" option={{
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

      <LabContext title="Food Inflation — The Persistent Anchor Keeping CPI Elevated" variant="warning">
        Food & beverages inflation has remained above 5% for most of FY24–25, driven by erratic rainfall, vegetable price spikes, and elevated pulse and edible-oil costs. With a 45.9% weight in the CPI basket, food is the single largest determinant of headline inflation. Core CPI (ex-food and fuel) has cooled to 3.9%, signalling that demand-side pressure is contained. The implication: until cold-chain infrastructure, perishable logistics, and MSP reform reduce structural food-price volatility, headline CPI will remain structurally above the RBI's 4% target even when core is benign.
      </LabContext>

      <LabContext title="India's Inflation Resilience — Supply Management, Not Demand Cooling" variant="insight">
        India's headline CPI has undershot both the US and UK since 2022, despite a heavier food weighting in its basket — a vulnerability that should theoretically amplify global commodity pass-through. The explanation lies in aggressive fiscal supply management: export restrictions on wheat, sugar, and onions; customs duty cuts on edible oils and pulses; and targeted open-market releases of buffer stocks. India's relative insulation from the 2022 energy price shock also owes to administered retail fuel pricing. The RBI's 250 bps of cumulative rate hikes (May 2022–Feb 2023) anchored expectations, but the real story is that India tamed inflation through supply-side activism rather than demand destruction.
      </LabContext>

      <LabSources sources={[
        'Ministry of Statistics and Programme Implementation — Consumer Price Index Monthly Releases, 2024–25',
        'Reserve Bank of India — Monetary Policy Report, December 2024',
        'International Monetary Fund — World Economic Outlook, October 2024',
        'World Bank — Commodity Markets Outlook, Q4 2024',
        'Office of the Economic Adviser — Wholesale Price Index Monthly Data, 2024–25',
      ]} />
    </LabLayout>
  )
}
