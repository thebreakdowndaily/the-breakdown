'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { educationChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Literacy Rate', value: '77.7%', change: '+3.2pp', trend: 'up' as const },
  { label: 'Gross Enrollment (Higher Ed)', value: '28.4%', change: '+1.2pp', trend: 'up' as const },
  { label: 'Schools (Lakhs)', value: '15.2L', change: '+0.3%', trend: 'up' as const },
  { label: 'Teachers (Lakhs)', value: '96.5L', change: '+1.5%', trend: 'up' as const },
  { label: 'Education Budget', value: '₹3.8L Cr', change: '+8.2%', trend: 'up' as const },
  { label: 'Dropout Rate (Secondary)', value: '14.6%', change: '-1.1pp', trend: 'down' as const },
]

export default function EducationLabPage() {
  return (
    <LabLayout title="Education" description="Literacy, enrollment, GER, NEP implementation, global rankings." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Literacy Rate by State" option={educationChart} height={380} />
        <LabChart title="Gross Enrollment Ratio Trend" option={{
          color: ['#FF9933', '#138808', '#2563eb'],
          tooltip: { trigger: 'axis' },
          legend: { data: ['Primary', 'Secondary', 'Higher Education'], bottom: 0 },
          grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
          xAxis: { type: 'category', data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'] },
          yAxis: { type: 'value', name: 'GER %', max: 110 },
          series: [
            { type: 'line', data: [98, 99, 100, 101, 102, 102, 103, 104, 105], smooth: true, symbol: 'circle' },
            { type: 'line', data: [74, 76, 78, 80, 82, 84, 85, 87, 88], smooth: true, symbol: 'diamond' },
            { type: 'line', data: [21, 22, 24, 25, 26, 27, 28, 28.4, 29], smooth: true, symbol: 'triangle' },
          ],
        }} height={380} />
      </div>
      <LabChart title="NEP 2020 Implementation Progress" option={{
        color: ['#138808', '#2563eb', '#FF9933', '#7c3aed'],
        tooltip: { trigger: 'axis' },
        legend: { data: ['Target 2025', 'Achieved', 'In Progress', 'Not Started'], bottom: 0 },
        grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
        xAxis: { type: 'category', data: ['Curricular Reform', 'Teacher Training', 'Digital Infrastructure', 'Vocational Ed', 'Multilingual', 'Assessment Reform'] },
        yAxis: { type: 'value', name: 'Progress %', max: 100 },
        series: [
          { type: 'bar', data: [100, 100, 100, 100, 100, 100], barMaxWidth: 20 },
          { type: 'bar', data: [60, 45, 55, 35, 50, 30], barMaxWidth: 20 },
          { type: 'bar', data: [30, 35, 30, 40, 35, 40], barMaxWidth: 20 },
          { type: 'bar', data: [10, 20, 15, 25, 15, 30], barMaxWidth: 20 },
        ],
      }} height={320} />

      <LabContext title="Higher Education Enrollment Remains Below Target" variant="info">
        India's Gross Enrollment Ratio (GER) in higher education stands at 28.4%, well below the global
        average (~40%) and the government's target of 50% by 2035 under NEP 2020. While GER has been
        steadily rising — from 21% in 2015 — the pace must accelerate to absorb the demographic dividend.
        States like Tamil Nadu and Kerala lead with GER above 45%, while Bihar and UP lag below 20%.
      </LabContext>

      <LabContext title="NEP 2020 — Mixed Progress, Assessment Reform Lags" variant="warning">
        Five years after NEP 2020's launch, curricular reform (60%) and multilingual education (50%) have seen
        moderate progress. But assessment reform has achieved only 30% of targets, and vocational education
        integration stands at just 35%. The shift from rote learning to competency-based assessment has proven
        difficult to implement at scale, requiring teacher retraining and new evaluation frameworks.
      </LabContext>

      <LabSources sources={[
        'Ministry of Education — Unified District Information System for Education (UDISE+) 2022–23',
        'All India Survey on Higher Education (AISHE) 2022–23',
        'National Education Policy 2020 — Implementation Status Report, MoE 2024',
        'UNESCO — Global Education Monitoring Report, 2024',
      ]} />
    </LabLayout>
  )
}
