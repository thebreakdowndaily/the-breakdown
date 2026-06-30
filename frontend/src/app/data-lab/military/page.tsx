'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { militaryChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Defence Budget', value: '₹6.2L Cr', change: '+4.8%', trend: 'up' as const },
  { label: 'Active Personnel', value: '14.6L', change: '+0.5%', trend: 'up' as const },
  { label: 'Defence % of GDP', value: '2.1%', change: '-0.1pp', trend: 'down' as const },
  { label: 'Global Military Rank', value: '4th', change: '—', trend: 'neutral' as const },
  { label: 'Defence Exports', value: '₹21,000 Cr', change: '+32%', trend: 'up' as const },
  { label: 'Modernisation Share', value: '28%', change: '+3pp', trend: 'up' as const },
]

export default function MilitaryLabPage() {
  return (
    <LabLayout title="Military" description="Defence spending, force strength, equipment, global comparison." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Force Strength by Branch" option={militaryChart} height={380} />
        <LabChart title="Defence Budget Trend" option={{
          color: ['#FF9933', '#138808', '#2563eb'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['Revenue', 'Capital', 'Total'], bottom: 0 },
          grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
          xAxis: { type: 'category', data: ['2019-20', '2020-21', '2021-22', '2022-23', '2023-24', '2024-25'] },
          yAxis: { type: 'value', name: '₹ Lakh Crore' },
          series: [
            { type: 'bar', data: [3.8, 4.0, 4.2, 4.5, 4.8, 5.0], barMaxWidth: 24, stack: 'total' },
            { type: 'bar', data: [1.0, 1.1, 1.2, 1.4, 1.6, 1.8], barMaxWidth: 24, stack: 'total' },
            { type: 'bar', data: [4.8, 5.1, 5.4, 5.9, 6.4, 6.8], barMaxWidth: 24 },
          ],
        }} height={380} />
      </div>
      <LabChart title="Major Equipment Inventory" option={{
        color: ['#FF9933', '#138808', '#2563eb', '#dc2626'],
        tooltip: { trigger: 'axis' },
        legend: { data: ['Tanks', 'Aircraft', 'Naval Vessels', 'Missile Systems'], bottom: 0 },
        grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
        xAxis: { type: 'category', data: ['India', 'China', 'USA', 'Russia', 'Pakistan'] },
        yAxis: { type: 'value', name: 'Count' },
        series: [
          { type: 'bar', data: [4600, 5800, 5500, 2800, 2500], barMaxWidth: 20 },
          { type: 'bar', data: [2200, 3200, 13200, 4200, 1400], barMaxWidth: 20 },
          { type: 'bar', data: [295, 780, 490, 610, 115], barMaxWidth: 20 },
          { type: 'bar', data: [1800, 2500, 4000, 3200, 1200], barMaxWidth: 20 },
        ],
      }} height={320} />

      <LabContext title="Defence Spending as % of GDP Is Declining" variant="warning">
        Despite a nominal increase, defence spending as a share of GDP has fallen from 2.4% in 2012 to 2.1%
        in 2024-25. This is below the 3% target recommended by successive Parliamentary committees. Meanwhile,
        China's defence spending (~1.7% of GDP on official figures) is ~4x India's in absolute terms. The gap
        in capital modernisation — especially in naval and air force platforms — remains a strategic concern.
      </LabContext>

      <LabContext title="Exports Surge Reflects Self-Reliance Push" variant="insight">
        Defence exports grew 32% year-on-year to ₹21,000 crore, driven by platforms like the BrahMos missile
        system, Akash air defence, radars, and light combat aircraft. India now exports to over 85 countries.
        The government's target of ₹35,000 crore in defence exports by 2028-29 will require sustained
        private-sector participation and faster clearance of export orders.
      </LabContext>

      <LabSources sources={[
        'Ministry of Defence — Annual Report 2023–24',
        'SIPRI — Military Expenditure Database, 2024',
        'Department of Defence Production — Export Data, 2024',
        'International Institute for Strategic Studies — The Military Balance, 2024',
      ]} />
    </LabLayout>
  )
}
