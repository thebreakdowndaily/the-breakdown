'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { tradeChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Merchandise Exports (FY24)', value: '$437B', change: '-3.1%', trend: 'down' as const },
  { label: 'Merchandise Imports (FY24)', value: '$678B', change: '-5.8%', trend: 'down' as const },
  { label: 'Merchandise Trade Deficit', value: '$241B', change: '-10.4%', trend: 'down' as const },
  { label: 'Services Exports (FY24)', value: '$340B', change: '+11.2%', trend: 'up' as const },
  { label: 'FDI Inflows (CY 2024)', value: '$71B', change: '+6.5%', trend: 'up' as const },
  { label: "India's Share of Global Exports", value: '2.1%', change: '+0.1pp', trend: 'up' as const },
]

export default function TradeLabPage() {
  return (
    <LabLayout title="Trade" description="Merchandise and services trade flows, bilateral deficits, export destination and import source concentration, FDI trends, and India's positioning in global supply chain realignment." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Merchandise Exports, Imports & Trade Deficit" option={tradeChart} height={380} />
        <LabChart title="Export Destinations by Share (FY 2023-24)" option={{
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
      <LabChart title="Import Sources by Share (FY 2023-24)" option={{
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

      <LabContext title="China Import Dependency — A $60 Billion Asymmetry" variant="warning">
        China supplies 24.5% of India's imports — exceeding the combined share of the next three sources (USA, UAE, Russia). The dependency is concentrated in strategic categories: electronics (including mobile phones and semiconductors), industrial machinery, active pharmaceutical ingredients, and solar cells/panels. The bilateral trade deficit with China stood at ~$60 billion in FY24. While the PLI scheme has boosted domestic electronics production (mobile phone output tripled since 2019, reducing import dependence), advanced semiconductor fabrication and capital goods remain deep structural vulnerabilities. The China-plus-one supply chain diversification narrative has benefited Vietnam and Mexico far more than India so far.
      </LabContext>

      <LabContext title="Services Exports — India's Structural Comparative Advantage" variant="insight">
        Services exports hit $340 billion (+11.2% YoY), dramatically outperforming merchandise exports (-3.1%). IT/ITES contributes ~55%, with the Global Capability Centre boom — over 1,600 GCCs employing ~2 million people — providing structural demand tailwinds. India's 4.5% share of global services exports is more than double its 2.1% merchandise share, confirming a revealed comparative advantage in knowledge-intensive sectors. The distinction matters for the current account: services surplus of ~$160 billion offsets ~65% of the merchandise trade deficit, a buffer that most emerging economies lack. However, services exports face headwinds from AI-driven automation of routine IT services and rising protectionism in key developed markets.
      </LabContext>

      <LabContext title="FDI — $71B Inflow but Manufacturing Share Stagnates" variant="info">
        FDI inflows of $71 billion in 2024 were led by Mauritius, Singapore, and the USA. Computer software & hardware, services, and trading accounted for the bulk of equity inflows — manufacturing's share has stagnated at ~18% of total FDI over the past five years. The government's aspirational target of $100 billion annual inflows requires more than just tax incentives: binding constraints include land acquisition delays, rigid labour regulations at the state level, and logistics costs estimated at ~14% of GDP (vs. 8–10% in China and Thailand). The production-linked incentive (PLI) scheme has catalysed investment in 14 sectors, but overall FDI-to-GDP ratio (~2%) remains below the pre-pandemic peak of 2.5%.
      </LabContext>

      <LabSources sources={[
        'Ministry of Commerce and Industry — Export-Import Data Bank, FY 2023–24',
        'Reserve Bank of India — Balance of Payments Statistics, Q3 FY 2024–25',
        'Department for Promotion of Industry and Internal Trade — FDI Fact Sheet, 2024',
        'World Trade Organization — Global Trade Outlook and Statistics, 2024',
        'World Bank — India Trade Brief, 2024',
        'NITI Aayog — Logistics Ease Across Different States (LEADS) Report, 2024',
      ]} />
    </LabLayout>
  )
}
