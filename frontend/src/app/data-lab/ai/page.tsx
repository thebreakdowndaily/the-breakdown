'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { aiChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'AI Investment (2024)', value: '$9.2B', change: '+23%', trend: 'up' as const },
  { label: 'AI Patents Filed', value: '5,000+', change: '+32%', trend: 'up' as const },
  { label: 'AI Talent Pool', value: '7.2L', change: '+24%', trend: 'up' as const },
  { label: 'AI Startups', value: '2,100+', change: '+18%', trend: 'up' as const },
  { label: 'Global AI Index Rank', value: '7th', change: '+2', trend: 'up' as const },
  { label: 'Govt AI Budget', value: '₹10,000 Cr', change: '+50%', trend: 'up' as const },
]

export default function AILabPage() {
  return (
    <LabLayout title="AI & Technology" description="AI investment, patents, adoption, talent, policy readiness index." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="AI Investment & Patents" option={aiChart} height={380} />
        <LabChart title="AI Adoption by Sector" option={{
          color: ['#FF9933', '#138808', '#2563eb', '#7c3aed', '#ea580c'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['Financial Services', 'Healthcare', 'Manufacturing', 'Retail', 'Agriculture'], bottom: 0 },
          grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
          xAxis: { type: 'category', data: ['2019', '2020', '2021', '2022', '2023', '2024'] },
          yAxis: { type: 'value', name: 'Adoption %' },
          series: [
            { type: 'line', data: [22, 28, 35, 45, 58, 68], smooth: true },
            { type: 'line', data: [12, 16, 22, 30, 40, 52], smooth: true },
            { type: 'line', data: [18, 22, 28, 35, 45, 55], smooth: true },
            { type: 'line', data: [25, 30, 38, 48, 60, 72], smooth: true },
            { type: 'line', data: [5, 8, 12, 18, 25, 35], smooth: true },
          ],
        }} height={380} />
      </div>
      <LabChart title="Global AI Readiness Index 2024" option={{
        color: ['#FF9933', '#2563eb', '#138808', '#dc2626', '#7c3aed', '#ea580c'],
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['Talent', 'Infrastructure', 'Govt Strategy', 'R&D', 'Adoption', 'Data'] },
        yAxis: { type: 'value', name: 'Score', max: 100 },
        series: [
          { type: 'bar', data: [65, 58, 72, 55, 60, 50], name: 'India', barMaxWidth: 28, itemStyle: { borderRadius: [6, 6, 0, 0] } },
          { type: 'bar', data: [88, 95, 85, 92, 90, 82], name: 'USA', barMaxWidth: 28, itemStyle: { borderRadius: [6, 6, 0, 0] } },
          { type: 'bar', data: [82, 90, 78, 88, 85, 75], name: 'China', barMaxWidth: 28, itemStyle: { borderRadius: [6, 6, 0, 0] } },
        ],
      }} height={320} />

      <LabContext title="India Ranks 7th Globally — But Gaps Remain" variant="info">
        India ranks 7th in the Global AI Readiness Index, up from 9th in 2023. Strong scores in government
        strategy (72) and talent availability (65) reflect initiatives like INDIAai, the National AI Portal,
        and the government's US-India AI Initiative. However, infrastructure (58) and data availability (50)
        lag significantly — suggesting that compute capacity, data governance frameworks, and cloud
        infrastructure need urgent attention.
      </LabContext>

      <LabContext title="Retail Leads AI Adoption — Agriculture Lags" variant="insight">
        Retail and financial services have seen the fastest AI adoption, driven by e-commerce, fraud detection,
        and customer analytics. Agriculture, despite employing ~45% of India's workforce, has the lowest AI
        adoption rate (35% in 2024). Emerging applications in precision farming, crop yield prediction, and
        supply chain optimisation have the potential to transform the sector — but require affordable
        deployment models for smallholder farmers.
      </LabContext>

      <LabSources sources={[
        'NITI Aayog — National Strategy for Artificial Intelligence, 2024 Update',
        'Global AI Index — Tortoise Media, 2024',
        'Stanford HAI — AI Index Annual Report, 2024',
        'Ministry of Electronics and IT — India AI Programme Progress Report, 2024',
        'NASSCOM — India AI Landscape Report, 2024',
      ]} />
    </LabLayout>
  )
}
