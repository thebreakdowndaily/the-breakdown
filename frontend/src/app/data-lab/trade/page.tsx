'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { tradeChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Exports', value: '$437B', change: '-3.1%', trend: 'down' as const },
  { label: 'Imports', value: '$678B', change: '-5.8%', trend: 'down' as const },
  { label: 'Trade Deficit', value: '$241B', change: '-10.4%', trend: 'down' as const },
  { label: 'Services Export', value: '$340B', change: '+11.2%', trend: 'up' as const },
  { label: 'FDI Inflow', value: '$71B', change: '+6.5%', trend: 'up' as const },
  { label: 'Global Trade Share', value: '2.1%', change: '+0.1pp', trend: 'up' as const },
]

export default function TradeLabPage() {
  return (
    <LabLayout title="Trade" description="Exports, imports, trade balance, FTAs, global supply chain position." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Exports, Imports & Trade Balance" option={tradeChart} height={380} />
        <LabChart title="Top Export Destinations (2023-24)" option={{
          color: ['#FF9933', '#138808', '#2563eb', '#7c3aed', '#ea580c', '#0d9488', '#dc2626', '#ca8a04'],
          tooltip: { trigger: 'item' },
          series: [{
            type: 'pie',
            radius: ['35%', '65%'],
            center: ['50%', '55%'],
            itemStyle: { borderRadius: 4 },
            label: { formatter: '{b}: {d}%' },
            data: [
              { value: 17.5, name: 'USA' },
              { value: 15.2, name: 'UAE' },
              { value: 8.8, name: 'Netherlands' },
              { value: 6.5, name: 'China' },
              { value: 5.2, name: 'UK' },
              { value: 4.8, name: 'Singapore' },
              { value: 4.2, name: 'Bangladesh' },
              { value: 37.8, name: 'Others' },
            ],
          }],
        }} height={380} />
      </div>
      <LabChart title="Top Import Sources (2023-24)" option={{
        color: ['#2563eb', '#FF9933', '#dc2626', '#138808', '#7c3aed', '#ea580c'],
        tooltip: { trigger: 'item' },
        series: [{
          type: 'pie',
          radius: ['35%', '65%'],
          center: ['50%', '55%'],
          itemStyle: { borderRadius: 4 },
          label: { formatter: '{b}: {d}%' },
          data: [
            { value: 24.5, name: 'China' },
            { value: 8.5, name: 'USA' },
            { value: 7.2, name: 'UAE' },
            { value: 6.0, name: 'Russia' },
            { value: 5.0, name: 'Saudi Arabia' },
            { value: 4.5, name: 'Iraq' },
            { value: 44.3, name: 'Others' },
          ],
        }],
      }} height={320} />

      <LabContext title="China Dependency in Imports Remains a Risk" variant="warning">
        China alone accounts for 24.5% of India's imports — more than the next three countries combined.
        Key import categories include electronics (mobile phones, semiconductors), machinery, APIs for
        pharmaceuticals, and renewable energy components. While the Production Linked Incentive (PLI)
        schemes aim to reduce dependency, domestic manufacturing of advanced electronics remains nascent.
        The trade deficit with China was ~$60 billion in 2023-24.
      </LabContext>

      <LabContext title="Services Exports Are the Bright Spot" variant="insight">
        India's services exports reached $340 billion, growing 11.2% — far outpacing merchandise exports.
        IT/ITES contributes ~55% of services exports, followed by professional services, financial services,
        and travel. The Global Capability Centre (GCC) boom — with over 1,600 GCCs in India — is driving
        sustained demand. India's share of global services exports (~4.5%) is significantly higher than its
        merchandise share (~2.1%), indicating a structural advantage in knowledge-intensive sectors.
      </LabContext>

      <LabContext title="FDI Inflows — Steady but Concentrated" variant="info">
        FDI inflows reached $71 billion in 2024, with Mauritius, Singapore, and the USA as the top sources.
        The services sector, computer hardware & software, and trading attracted the largest shares. However,
        FDI into manufacturing remains below potential, and the government's target of $100 billion annual
        inflows will require further reforms in land acquisition, labour laws, and logistics efficiency.
      </LabContext>

      <LabSources sources={[
        'Ministry of Commerce and Industry — Export-Import Data Bank, 2024',
        'Reserve Bank of India — Balance of Payments Statistics, 2024',
        'Department for Promotion of Industry and Internal Trade — FDI Data, 2024',
        'World Trade Organization — Global Trade Outlook, 2024',
        'World Bank — India Trade Brief, 2024',
      ]} />
    </LabLayout>
  )
}
