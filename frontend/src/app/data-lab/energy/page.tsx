'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { energyChart, energyConsumptionTrend } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Total Primary Energy Consumption', value: '1,120 Mtoe', change: '+3.7%', trend: 'up' as const },
  { label: 'Renewables in Primary Energy', value: '22%', change: '+2pp', trend: 'up' as const },
  { label: 'Installed Solar Capacity', value: '90 GW', change: '+28%', trend: 'up' as const },
  { label: 'Per Capita Energy Consumption', value: '830 kgoe', change: '+3.8%', trend: 'up' as const },
  { label: 'Coal in Primary Energy Mix', value: '55%', change: '-2pp', trend: 'down' as const },
  { label: 'Energy Intensity of GDP', value: '0.42 MJ/$', change: '-1.5%', trend: 'down' as const },
]

export default function EnergyLabPage() {
  return (
    <LabLayout title="Energy" description="Primary energy mix, renewable capacity expansion, fossil-fuel dependence, per capita consumption gaps, energy intensity trends, and the path to 500 GW non-fossil capacity by 2030." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Primary Energy Mix by Source (2024)" option={energyChart} height={380} />
        <LabChart title="Total Consumption & Renewables Share Trend" option={energyConsumptionTrend} height={380} />
      </div>
      <LabChart title="Renewable & Nuclear Capacity Addition by Source (GW)" option={{
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

      <LabContext title="Solar's 22x Growth — But the 2030 Target Requires a 3x in Six Years" variant="insight">
        Solar capacity has expanded from 4 GW (2015) to 90 GW (2024) — a 22-fold increase — making India the world's 4th-largest solar generator. The government's 500 GW non-fossil capacity target by 2030 implies solar must reach ~280 GW, requiring a tripling of current capacity in just six years. Rooftop solar, currently ~15% of installed solar, remains the laggard: of the 40 GW residential rooftop target by 2026, only ~7 GW had been installed as of mid-2024. The PM Surya Ghar Muft Bijli Yojana (₹75,000 Cr subsidy) aims to accelerate adoption, but state-level net-metering caps and distribution company resistance to revenue loss remain binding constraints.
      </LabContext>

      <LabContext title="India's Energy Trilemma — Coal Must Decline Even as Demand Surges" variant="warning">
        Despite the renewables surge, coal still accounts for 55% of primary energy and ~73% of electricity generation. The tension between baseload reliability and climate commitments defines India's energy trilemma. Per capita consumption (830 kgoe) is roughly one-third of the global average — India's total energy demand will inevitably rise as ~200 million people move above the poverty line and industrialisation deepens. The IEA projects India will add ~900 TWh of electricity demand by 2030, equivalent to the entire current consumption of Japan. Without rapid scaling of battery storage (current capacity: ~100 MWh vs. a projected requirement of 40+ GWh by 2030) and grid-balancing infrastructure, coal's absolute output may not peak until the early 2030s even as its share declines.
      </LabContext>

      <LabSources sources={[
        'Ministry of Power — Renewable Energy Capacity Dashboard, 2024',
        'Central Electricity Authority — National Electricity Plan, 2024',
        'International Energy Agency — India Energy Outlook, 2024',
        'BP — Statistical Review of World Energy, 2024',
        'Ministry of New and Renewable Energy — Annual Report, 2023–24',
        'Central Electricity Authority — Load Generation Balance Report, 2024–25',
      ]} />
    </LabLayout>
  )
}
