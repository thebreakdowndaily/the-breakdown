'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { energyChart, energyConsumptionTrend } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Total Consumption', value: '1,120 Mtoe', change: '+3.7%', trend: 'up' as const },
  { label: 'Renewables Share', value: '22%', change: '+2pp', trend: 'up' as const },
  { label: 'Installed Solar Capacity', value: '90 GW', change: '+28%', trend: 'up' as const },
  { label: 'Per Capita Consumption', value: '830 kgoe', change: '+3.8%', trend: 'up' as const },
  { label: 'Coal Share', value: '55%', change: '-2pp', trend: 'down' as const },
  { label: 'Energy Intensity', value: '0.42 MJ/$', change: '-1.5%', trend: 'down' as const },
]

export default function EnergyLabPage() {
  return (
    <LabLayout title="Energy" description="Energy mix, renewables, fossil fuels, nuclear, per capita consumption." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Energy Mix 2024" option={energyChart} height={380} />
        <LabChart title="Consumption & Renewables Trend" option={energyConsumptionTrend} height={380} />
      </div>
      <LabChart title="Renewable Capacity Growth (GW)" option={{
        color: ['#FF9933', '#138808', '#2563eb', '#0d9488', '#7c3aed'],
        tooltip: { trigger: 'axis' },
        legend: { data: ['Solar', 'Wind', 'Hydro', 'Biomass', 'Nuclear'], bottom: 0 },
        grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
        xAxis: { type: 'category', data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
        yAxis: { type: 'value', name: 'Capacity (GW)' },
        series: [
          { type: 'bar', data: [4, 8, 18, 26, 35, 45, 55, 68, 78, 90], stack: 'renewable', barMaxWidth: 32 },
          { type: 'bar', data: [27, 29, 33, 36, 38, 39, 41, 43, 45, 47], stack: 'renewable', barMaxWidth: 32 },
          { type: 'bar', data: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51], stack: 'renewable', barMaxWidth: 32 },
          { type: 'bar', data: [5, 6, 8, 9, 10, 10, 11, 12, 13, 14], stack: 'renewable', barMaxWidth: 32 },
          { type: 'bar', data: [6, 6, 7, 7, 7, 7, 7, 7, 7, 8], stack: 'renewable', barMaxWidth: 32 },
        ],
      }} height={320} />

      <LabContext title="Solar Is Leading the Energy Transition" variant="insight">
        Solar capacity has grown from just 4 GW in 2015 to 90 GW in 2024 — a 22x increase in nine years.
        India now ranks 4th globally in solar power generation. The government's 500 GW non-fossil target
        by 2030 will require solar to reach ~280 GW, implying a tripling of current capacity in six years.
        Rooftop solar, which currently accounts for ~15% of solar capacity, will need faster adoption
        through the PM Surya Ghar Muft Bijli Yojana.
      </LabContext>

      <LabContext title="Coal Remains Dominant Despite Rapid Renewables Growth" variant="warning">
        Despite solar's exponential growth, coal still accounts for 55% of India's energy mix and ~73%
        of electricity generation. The tension between baseload reliability (coal) and climate commitments
        (renewables) defines India's energy trilemma. Per capita energy consumption at 830 kgoe is still
        one-third of the global average — as India grows, total energy demand will rise, making the
        transition harder unless storage and grid-balancing solutions scale rapidly.
      </LabContext>

      <LabSources sources={[
        'Ministry of Power — Renewable Energy Capacity Dashboard, 2024',
        'Central Electricity Authority — National Electricity Plan, 2024',
        'International Energy Agency — India Energy Outlook, 2024',
        'BP Statistical Review of World Energy, 2024',
        'Ministry of New and Renewable Energy — Annual Report, 2023–24',
      ]} />
    </LabLayout>
  )
}
