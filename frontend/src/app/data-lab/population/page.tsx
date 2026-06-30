'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { populationChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Total Population', value: '144.5 Cr', change: '+0.8%', trend: 'up' as const },
  { label: 'Median Age', value: '28.7 yrs', change: '+0.3', trend: 'up' as const },
  { label: 'Urban Population', value: '36.2%', change: '+1.1pp', trend: 'up' as const },
  { label: 'Sex Ratio', value: '1,020', change: '+2', trend: 'up' as const },
  { label: 'Population Density', value: '481/km²', change: '+4', trend: 'up' as const },
  { label: 'Literacy Rate', value: '77.7%', change: '+3.2pp', trend: 'up' as const },
]

export default function PopulationLabPage() {
  return (
    <LabLayout title="Population" description="Demographics, age distribution, urbanization, density trends." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Age Distribution (Population Pyramid)" option={populationChart} height={380} />
        <LabChart title="Urbanization Trend" option={{
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
      <LabChart title="State-wise Population (Top 10)" option={{
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

      <LabContext title="The Demographic Window Is Open — But Not Forever" variant="insight">
        India has one of the youngest populations globally, with a median age of 28.7 years compared to
        China's 39.2 and Japan's 48.6. This demographic dividend — a high working-age share — is projected
        to last until the mid-2050s. To reap the full benefit, India needs to create ~10 million jobs per
        year while improving education quality, skill training, and labour force participation — especially
        for women, where the rate (37%) lags well below the global average (47%).
      </LabContext>

      <LabContext title="Urbanisation Is Accelerating — Infrastructure Must Keep Pace" variant="info">
        India's urban population has risen from 18% in 1960 to an estimated 36% in 2024, and is projected
        to reach 42% by 2041 — adding roughly 260 million people to cities. This urban transition, if poorly
        managed, will strain housing, transport, water, and sanitation. The Smart Cities Mission and AMRUT
        are steps in the right direction, but capital expenditure on urban infrastructure as a share of GDP
        remains below what comparable economies invested during their rapid urbanisation phases.
      </LabContext>

      <LabSources sources={[
        'Registrar General of India — Census 2011, projected estimates 2024',
        'United Nations — World Population Prospects 2024 Revision',
        'United Nations — World Urbanization Prospects 2024',
        'NITI Aayog — Population Projections for India 2011–2036',
        'World Bank — Urban Development Data for India, 2024',
      ]} />
    </LabLayout>
  )
}
