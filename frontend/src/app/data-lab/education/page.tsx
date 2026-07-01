'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { educationChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Literacy Rate (Age 7+)', value: '77.7%', change: '+3.2pp', trend: 'up' as const },
  { label: 'Higher Ed GER', value: '28.4%', change: '+1.2pp', trend: 'up' as const },
  { label: 'Total Schools', value: '15.2L', change: '+0.3%', trend: 'up' as const },
  { label: 'Total Teachers', value: '96.5L', change: '+1.5%', trend: 'up' as const },
  { label: 'Education Budget (BE 2024-25)', value: '₹3.8L Cr', change: '+8.2%', trend: 'up' as const },
  { label: 'Secondary Dropout Rate', value: '14.6%', change: '-1.1pp', trend: 'down' as const },
]

export default function EducationLabPage() {
  return (
    <LabLayout title="Education" description="Literacy attainment, enrollment ratios across school and higher education, NEP 2020 implementation status, and the quality-quantity trade-off in India's education system." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Literacy Rate by State (2021)" option={educationChart} height={380} />
        <LabChart title="Gross Enrollment Ratio by Education Level" option={{
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
      <LabChart title="NEP 2020 — Implementation Progress vs 2025 Milestone Targets" option={{
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

      <LabContext title="Higher Education GER — 28.4% and Stuck" variant="info">
        India's higher education Gross Enrollment Ratio of 28.4% remains far below the global average (~40%) and the NEP 2020 target of 50% by 2035. The pace of improvement — 7.4 percentage points over eight years — implies that achieving the 2035 goal requires nearly doubling the current rate of progress. The state-level divergence is stark: Tamil Nadu and Kerala exceed 45%, while Bihar and Uttar Pradesh languish below 20%. Since these populous states also have the lowest per-capita incomes, the gap is as much about economic access as institutional capacity.
      </LabContext>

      <LabContext title="NEP 2020 — Five Years In, Assessment Reform Is Failing" variant="warning">
        Five years after NEP 2020's rollout, implementation remains uneven. Curricular reform (60% of targets met) and multilingual education (50%) have seen moderate progress. But assessment reform — the shift from rote-learning to competency-based evaluation — has reached only 30% of its 2025 milestone. Vocational education integration (35%) is similarly behind schedule. The bottlenecks are systemic: teacher training capacity reaches only ~15% of in-service teachers annually, and the National Assessment Centre (PARAKH) is still building state-level capacity. Without faster progress on assessment reform, the NEP's core pedagogical ambition — to replace memorisation with critical thinking — will remain aspirational.
      </LabContext>

      <LabSources sources={[
        'Ministry of Education — Unified District Information System for Education (UDISE+) 2022–23',
        'All India Survey on Higher Education (AISHE) 2022–23',
        'Ministry of Education — NEP 2020 Implementation Status Report, 2024',
        'UNESCO — Global Education Monitoring Report, 2024',
        'National Assessment and Accreditation Council — Annual Report 2023–24',
      ]} />
    </LabLayout>
  )
}
