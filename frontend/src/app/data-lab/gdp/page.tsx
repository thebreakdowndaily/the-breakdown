'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { gdpLineChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Nominal GDP', value: '$4.1T', change: '+7.8%', trend: 'up' as const },
  { label: 'Real GDP Growth', value: '6.4%', change: '+1.2pp', trend: 'up' as const },
  { label: 'GDP per Capita', value: '$2,850', change: '+14.9%', trend: 'up' as const },
  { label: 'World Rank (Nominal)', value: '5th', change: '—', trend: 'neutral' as const },
  { label: 'PPP GDP', value: '$14.5T', change: '+8.1%', trend: 'up' as const },
  { label: 'Services Share of GVA', value: '54%', change: '+1.5pp', trend: 'up' as const },
]

export default function GDPLabPage() {
  return (
    <LabLayout title="GDP" description="Gross Domestic Product — growth trajectories, sectoral composition, quarterly momentum, and India's position in the global output hierarchy." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Real GDP Growth & Per Capita Income Trajectory" option={gdpLineChart} height={380}
          dataTable={{
            headers: ['Year', 'GDP Growth (%)', 'GDP per Capita ($)', 'GNI ($)'],
            rows: [
              ['2014-15', 7.4, 1570, 1560],
              ['2015-16', 8.0, 1605, 1590],
              ['2016-17', 8.3, 1740, 1720],
              ['2017-18', 6.8, 1850, 1830],
              ['2018-19', 6.5, 2005, 1980],
              ['2019-20', 3.9, 2050, 2020],
              ['2020-21', -5.8, 1930, 1900],
              ['2021-22', 9.1, 2270, 2240],
              ['2022-23', 7.2, 2480, 2450],
              ['2023-24', 7.8, 2850, 2800],
            ],
          }}
        />
        <LabChart title="Gross Value Added by Sector (2023-24)" option={{
          color: ['#FF9933', '#138808', '#2563eb'],
          tooltip: { trigger: 'item' },
          series: [{
            type: 'pie',
            radius: ['35%', '65%'],
            center: ['50%', '50%'],
            itemStyle: { borderRadius: 4 },
            label: { formatter: '{b}: {d}%' },
            data: [
              { value: 54, name: 'Services' },
              { value: 26, name: 'Industry' },
              { value: 18, name: 'Agriculture' },
              { value: 2, name: 'Others' },
            ],
          }],
        }} height={380} />
      </div>
      <LabChart title="Quarterly Real GDP Growth (YoY)" option={{
        color: ['#FF9933'],
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'] },
        yAxis: { type: 'value', name: 'Growth %' },
        series: [{
          type: 'bar',
          data: [6.1, 7.8, 7.6, 8.4, 7.8, 6.7, 5.4, 6.2],
          barMaxWidth: 32,
          itemStyle: { borderRadius: [6, 6, 0, 0] },
        }],
      }} height={320} />

      <LabContext title="Growth Deceleration in H2 2024 — Cyclical or Structural?" variant="info">
        GDP growth moderated from 8.4% in Q4 2023 to a two-year low of 5.4% in Q3 2024, before recovering to 6.2% in Q4 2024. The slowdown was concentrated in manufacturing (3.9% vs 7.8% a year earlier) and construction, while election-related spending restraint pulled public capex down 3.1% in Q3. The V-shaped recovery in Q4, led by services and household consumption, suggests a transient drag rather than a structural break — but the 6.2% exit rate implies FY25 GDP growth will undershoot the RBI's 7.2% projection.
      </LabContext>

      <LabContext title="Services at 54% — A Premature Deindustrialisation Risk" variant="insight">
        Services' share of GVA has risen from ~48% to 54% over a decade, mimicking the structural evolution of advanced economies. However, India's manufacturing share (26%) remains well below the 30%+ target of the National Manufacturing Policy and far behind China's peak of ~32%. Agriculture, employing ~45% of the workforce, contributes just 18% of GVA — implying a labour productivity gap of nearly 4:1 relative to services. This pattern of services-led growth without a commensurate manufacturing base raises questions about job creation at scale, since services have historically absorbed fewer low-skill workers than manufacturing.
      </LabContext>

      <LabSources sources={[
        'Ministry of Statistics and Programme Implementation — Quarterly Estimates of GDP, FY 2024–25',
        'World Bank — World Development Indicators: GDP per capita & PPP, 2024',
        'International Monetary Fund — World Economic Outlook Database, October 2024',
        'Reserve Bank of India — Handbook of Statistics on the Indian Economy, 2024',
        'National Statistical Office — First Advance Estimates of National Income, 2024–25',
      ]} />
    </LabLayout>
  )
}
