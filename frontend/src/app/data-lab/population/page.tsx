'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { populationChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Total Population (2024 est.)', value: '144.5 Cr', change: '+0.8%', trend: 'up' as const },
  { label: 'Median Age', value: '28.7 yrs', change: '+0.3', trend: 'up' as const },
  { label: 'Urbanisation Rate', value: '36.2%', change: '+1.1pp', trend: 'up' as const },
  { label: 'Sex Ratio (F per 1,000 M)', value: '1,020', change: '+2', trend: 'up' as const },
  { label: 'Population Density', value: '481/km²', change: '+4', trend: 'up' as const },
  { label: 'Working-Age Share (15-64)', value: '68.3%', change: '+0.4pp', trend: 'up' as const },
]

export default function PopulationLabPage() {
  return (
    <LabLayout title="Population" description="Demographic structure, age pyramid dynamics, urbanisation trajectory, density patterns, and the implications of India's demographic dividend for labour markets and public services." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Population Age Pyramid (2024)" option={populationChart} height={380} />
        <LabChart title="Urbanisation Trend — Historical & Projected" option={{
          color: ['#FF9933', '#138808'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['Urban %', 'Rural %'], bottom: 0 },
          grid: { left: '3%', right: '4%', bottom: '12%', containLabel: true },
          xAxis: { type: 'category', data: ['1960', '1970', '1980', '1990', '2000', '2011', '2021', '2031*', '2041*'] },
          yAxis: { type: 'value', name: 'Percentage', max: 100 },
          series: [
            { type: 'line', data: [17.9, 19.8, 23.1, 25.5, 27.7, 31.2, 34.5, 38.2, 42.0], smooth: true, symbol: 'circle', areaStyle: { opacity: 0.15 } },
            { type: 'line', data: [82.1, 80.2, 76.9, 74.5, 72.3, 68.8, 65.5, 61.8, 58.0], smooth: true, symbol: 'diamond', areaStyle: { opacity: 0.1 } },
          ],
        }} height={380} />
      </div>
      <LabChart title="Population by State — Top 10 Most Populous" option={{
        color: ['#FF9933'],
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['UP', 'Maharashtra', 'Bihar', 'WB', 'MP', 'TN', 'Rajasthan', 'Karnataka', 'Gujarat', 'AP'] },
        yAxis: { type: 'value', name: 'Population (Crore)' },
        series: [{
          type: 'bar',
          data: [23.6, 12.6, 12.4, 9.8, 8.5, 7.8, 7.7, 6.8, 6.5, 5.4],
          barMaxWidth: 36,
          itemStyle: { borderRadius: [6, 6, 0, 0], color: '#FF9933' },
        }],
      }} height={320} />

      <LabContext title="The Demographic Dividend Clock Is Ticking" variant="insight">
        India's median age of 28.7 makes it one of the youngest major economies — 10.5 years younger than China and 20 years younger than Japan. The working-age share (15–64) of 68.3% is near its peak and will remain favourable until the mid-2050s. But a favourable age structure is not automatic growth: the dividend is conditional on employment. India needs to create ~10 million formal jobs annually just to absorb new entrants, while female labour force participation (37%) remains 10 percentage points below the global average. Countries that squandered their demographic window — much of Latin America and the Middle East — show that a young population without sufficient employment is a fiscal liability, not an asset.
      </LabContext>

      <LabContext title="Urbanisation — 260 Million More City Dwellers by 2041" variant="info">
        India's urban population has grown from 18% (1960) to an estimated 36% (2024) and is projected to reach 42% by 2041 — adding roughly 260 million people to cities, equivalent to the entire current population of Indonesia. The infrastructure challenge is immense: urban housing shortage is estimated at 19 million units, 30% of urban households lack piped water, and only ~70% of municipal solid waste is collected. Capital expenditure on urban infrastructure as a share of GDP (~0.5%) remains far below what China (2–3% during its 2000–2015 urbanisation phase) or even Brazil (1.5%) invested at comparable stages of urban transition.
      </LabContext>

      <LabSources sources={[
        'Registrar General of India — Census 2011 and Population Projections, 2024',
        'United Nations — World Population Prospects, 2024 Revision',
        'United Nations — World Urbanization Prospects, 2024',
        'NITI Aayog — Population Projections for India, 2011–2036',
        'World Bank — Urban Development Data for India, 2024',
        'Ministry of Housing and Urban Affairs — Urban Infrastructure Gap Analysis, 2024',
      ]} />
    </LabLayout>
  )
}
