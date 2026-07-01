'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { aiChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'AI Private Investment (2024)', value: '$9.2B', change: '+23%', trend: 'up' as const },
  { label: 'AI-Related Patents Filed', value: '5,000+', change: '+32%', trend: 'up' as const },
  { label: 'AI Talent Pool', value: '7.2L', change: '+24%', trend: 'up' as const },
  { label: 'AI-Focused Startups', value: '2,100+', change: '+18%', trend: 'up' as const },
  { label: 'Global AI Readiness Rank', value: '7th', change: '+2', trend: 'up' as const },
  { label: 'National AI Mission Outlay', value: '₹10,000 Cr', change: '+50%', trend: 'up' as const },
]

export default function AILabPage() {
  return (
    <LabLayout title="AI & Technology" description="Artificial intelligence investment flows, patenting activity, sectoral adoption rates, talent pool dynamics, and India's readiness across infrastructure, government strategy, and R&D." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="AI Investment Inflows & Patent Filings" option={aiChart} height={380} />
        <LabChart title="Enterprise AI Adoption Rate by Sector" option={{
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
      <LabChart title="AI Readiness Score — India vs USA vs China (2024)" option={{
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

      <LabContext title="AI Readiness — Strong on Strategy, Weak on Compute and Data" variant="info">
        India ranks 7th in the Global AI Readiness Index (up from 9th in 2023), driven by strong government-strategy scores (72) and talent availability (65) — reflecting the INDIAai programme, the National AI Portal, and bilateral AI partnerships with the US. However, the infrastructure sub-index (58) and data-availability sub-index (50) are the weakest pillars. India has an estimated ~2,000 GPUs available for AI training against a projected need of 10,000+. The IndiaAI Mission's ₹10,000 Cr allocation includes compute procurement, but without a comprehensive data governance law (the Digital Personal Data Protection Act, 2023, is limited in scope), the data pipeline for training large language models will remain constrained.
      </LabContext>

      <LabContext title="The AI Adoption Frontier — Retail Surges, Agriculture Stalls" variant="insight">
        Enterprise AI adoption in India ranges from 72% in retail (e-commerce recommendation engines, demand forecasting) and 68% in financial services (fraud detection, algorithmic credit scoring) to just 35% in agriculture — the sector employing the largest share of India's workforce. The gap reflects structural barriers: small landholdings (86% of farmers are marginal or small), low digital literacy in rural areas, and the absence of affordable AI-as-a-service models for precision agriculture. Government initiatives like the AI for Agriculture dashboard and ICRISAT's crop-yield prediction pilots show promise, but scaling AI to 126 million smallholder farms requires a fundamentally different deployment architecture than the cloud-API model that works for urban enterprises.
      </LabContext>

      <LabSources sources={[
        'NITI Aayog — National Strategy for Artificial Intelligence, 2024 Update',
        'Tortoise Media — Global AI Index, 2024',
        'Stanford Institute for Human-Centered AI — AI Index Annual Report, 2024',
        'Ministry of Electronics and IT — IndiaAI Programme Progress Report, 2024',
        'NASSCOM — India AI Landscape Report, 2024',
        'International Monetary Fund — AI Preparedness Index, 2024',
      ]} />
    </LabLayout>
  )
}
