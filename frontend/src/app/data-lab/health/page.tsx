'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { healthChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Life Expectancy at Birth', value: '70.5 yrs', change: '+2.0', trend: 'up' as const },
  { label: 'Infant Mortality (per 1,000 live births)', value: '25.5', change: '-3.2', trend: 'down' as const },
  { label: 'Health Budget (BE 2024-25)', value: '₹4.5L Cr', change: '+12.5%', trend: 'up' as const },
  { label: 'Doctor Density (per 1,000)', value: '1.2', change: '+0.1', trend: 'up' as const },
  { label: 'Hospital Beds (per 1,000)', value: '1.7', change: '+0.1', trend: 'up' as const },
  { label: 'Maternal Mortality (per 100k births)', value: '97', change: '-8', trend: 'down' as const },
]

export default function HealthLabPage() {
  return (
    <LabLayout title="Health" description="Healthcare expenditure, epidemiological transition, infrastructure gaps, outcome disparities across states, and India's progress towards universal health coverage benchmarks." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Health Outcomes & Infrastructure Indicators" option={healthChart} height={380} />
        <LabChart title="Disease Burden by Category — DALYs per 100k" option={{
          color: ['#dc2626', '#ea580c', '#ca8a04', '#138808', '#2563eb'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['Cardiovascular', 'Respiratory', 'Communicable', 'Maternal & Child', 'Injuries'], bottom: 0 },
          grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
          xAxis: { type: 'category', data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'] },
          yAxis: { type: 'value', name: 'DALYs per 100k' },
          series: [
            { type: 'line', data: [5200, 5300, 5400, 5500, 5600, 5700, 5800, 5750, 5700], smooth: true },
            { type: 'line', data: [2800, 2700, 2600, 2500, 2400, 2500, 2600, 2450, 2350], smooth: true },
            { type: 'line', data: [3500, 3200, 2900, 2600, 2300, 2000, 1900, 1800, 1700], smooth: true },
            { type: 'line', data: [2200, 2100, 2000, 1900, 1800, 1700, 1600, 1500, 1400], smooth: true },
            { type: 'line', data: [1500, 1480, 1460, 1450, 1440, 1420, 1400, 1380, 1350], smooth: true },
          ],
        }} height={380} />
      </div>
      <LabChart title="Health Spending as % of State Budget — Top & Bottom Performers" option={{
        color: ['#FF9933', '#138808'],
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['Kerala', 'Tamil Nadu', 'Delhi', 'Karnataka', 'Maharashtra', 'Telangana', 'Gujarat', 'UP', 'Bihar'] },
        yAxis: { type: 'value', name: '% of State Budget' },
        series: [{
          type: 'bar',
          data: [7.5, 6.8, 6.5, 6.0, 5.8, 5.5, 5.2, 4.8, 4.5],
          barMaxWidth: 28,
          itemStyle: { borderRadius: [6, 6, 0, 0], color: '#FF9933' },
        }],
      }} height={320} />

      <LabContext title="Epidemiological Transition — India's Disease Burden Is Shifting Under Its Feet" variant="insight">
        India's disease burden is undergoing a classic epidemiological transition. Communicable, maternal, and child-health conditions have halved from 3,500 to 1,700 DALYs per 100k since 2015, reflecting gains in sanitation, immunisation, and maternal care. But non-communicable diseases (NCDs) are rising fast: cardiovascular disease (5,700+ DALYs per 100k) is now the single largest contributor, followed by respiratory conditions and diabetes. This dual burden — unfinished infectious-disease control alongside surging NCDs — requires a corresponding reallocation of public health budgets. Currently, NCDs receive ~35% of the health budget despite accounting for ~65% of the disease burden.
      </LabContext>

      <LabContext title="Health Spending — The 2.5% GDP Target Has Not Been Met" variant="warning">
        Public health expenditure (Centre + States) stands at ~1.8% of GDP, well short of the National Health Policy 2017 target of 2.5% by 2025. The gap matters because out-of-pocket expenditure still accounts for ~47% of total health spending — among the highest in the world for a middle-income country. Wide state-level disparities persist: Kerala allocates 7.5% of its state budget to health and achieves an infant mortality rate of 6 per 1,000 live births; Bihar spends 4.5% with an IMR of 38 per 1,000. The implication is clear: health outcomes track fiscal prioritisation, and the states with the worst outcomes spend the least.
      </LabContext>

      <LabSources sources={[
        'Ministry of Health and Family Welfare — National Health Accounts Estimates, 2022–23',
        'World Health Organization — Global Health Estimates, 2024',
        'Institute for Health Metrics and Evaluation — Global Burden of Disease India Compare, 2024',
        'NITI Aayog — Healthy States, Progressive India Report, 2023',
        'National Family Health Survey (NFHS-5), 2019–21',
        'World Bank — World Development Indicators: Health expenditure data, 2024',
      ]} />
    </LabLayout>
  )
}
