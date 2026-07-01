'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { militaryChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Defence Budget (BE 2024-25)', value: '₹6.2L Cr', change: '+4.8%', trend: 'up' as const },
  { label: 'Active Armed Forces', value: '14.6L', change: '+0.5%', trend: 'up' as const },
  { label: 'Defence Spending % of GDP', value: '2.1%', change: '-0.1pp', trend: 'down' as const },
  { label: 'Global Military Strength Rank', value: '4th', change: '—', trend: 'neutral' as const },
  { label: 'Defence Exports (FY24)', value: '₹21,000 Cr', change: '+32%', trend: 'up' as const },
  { label: 'Capital Modernisation Share', value: '28%', change: '+3pp', trend: 'up' as const },
]

export default function MilitaryLabPage() {
  return (
    <LabLayout title="Military" description="Defence expenditure trends, personnel strength by service, equipment inventories, modernisation priorities, and India's position in the global strategic balance." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Active Personnel by Service Arm" option={militaryChart} height={380} />
        <LabChart title="Defence Budget: Revenue vs Capital Split" option={{
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
      <LabChart title="Major Conventional Weapons Inventory — Peer Comparison" option={{
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

      <LabContext title="Defence-to-GDP Ratio at a Two-Decade Low" variant="warning">
        Defence spending as a share of GDP has declined from 2.4% (2012) to 2.1% (2024-25) — the lowest in 20 years and well below the 3% recommended by successive Parliamentary Standing Committees. In absolute terms, China's defence budget is approximately 4x India's, even at Beijing's official (likely understated) 1.7% of GDP. The capital-to-revenue ratio within India's defence budget has improved (28% capital, up from 22% in 2019) but the overall resource envelope is shrinking relative to the economy. The most acute gaps are in naval surface combatants, submarine fleet age, and air force squadron strength — currently at 31 squadrons against a sanctioned requirement of 42.
      </LabContext>

      <LabContext title="Defence Exports — From Buyer to Builder" variant="insight">
        Defence exports surged 32% year-on-year to ₹21,000 crore (~$2.5B), driven by BrahMos missiles, Akash air-defence systems, radars, and light combat aircraft. India now ships to over 85 countries, up from ~30 a decade ago. The government's export target of ₹35,000 crore by 2028–29 will require scaling private-sector participation — currently, private firms account for ~40% of defence production. The biggest headwind is the length of the export clearance process: average approval times of 6–9 months compare poorly with global benchmarks, discouraging international OEMs from using India as a defence manufacturing hub.
      </LabContext>

      <LabSources sources={[
        'Ministry of Defence — Annual Report 2023–24',
        'SIPRI — Military Expenditure Database, 2024',
        'Department of Defence Production — Defence Exports Data, FY 2023–24',
        'International Institute for Strategic Studies — The Military Balance, 2024',
        'Parliamentary Standing Committee on Defence — Demands for Grants 2024–25',
      ]} />
    </LabLayout>
  )
}
