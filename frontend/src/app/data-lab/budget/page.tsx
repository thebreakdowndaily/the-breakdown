'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { budgetChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Total Expenditure', value: '₹48.2L Cr', change: '+7.3%', trend: 'up' as const },
  { label: 'Revenue', value: '₹35.0L Cr', change: '+12.9%', trend: 'up' as const },
  { label: 'Fiscal Deficit', value: '4.9%', change: '-0.6pp', trend: 'down' as const },
  { label: 'Capital Expenditure', value: '₹11.1L Cr', change: '+16.9%', trend: 'up' as const },
  { label: 'Tax Revenue', value: '₹25.8L Cr', change: '+11.5%', trend: 'up' as const },
  { label: 'Debt-to-GDP', value: '57.2%', change: '-0.8pp', trend: 'down' as const },
]

export default function BudgetLabPage() {
  return (
    <LabLayout title="Budget" description="Union Budget, allocations, deficits, revenue, expenditure trends." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Revenue, Expenditure & Deficit" option={budgetChart} height={380} />
        <LabChart title="Budget Allocation by Ministry (2024-25)" option={{
          color: ['#FF9933', '#138808', '#2563eb', '#dc2626', '#7c3aed', '#ea580c', '#0d9488', '#ca8a04'],
          tooltip: { trigger: 'item' },
          series: [{
            type: 'pie',
            radius: ['30%', '60%'],
            center: ['50%', '55%'],
            itemStyle: { borderRadius: 4 },
            label: { formatter: '{b}\n₹{c}L Cr' },
            data: [
              { value: 6.2, name: 'Defence' },
              { value: 4.5, name: 'Health' },
              { value: 3.8, name: 'Education' },
              { value: 3.5, name: 'Agriculture' },
              { value: 2.7, name: 'Transport' },
              { value: 2.4, name: 'Home Affairs' },
              { value: 1.9, name: 'Energy' },
              { value: 4.8, name: 'Others' },
            ],
          }],
        }} height={380} />
      </div>
      <LabChart title="Revenue Sources (2024-25)" option={{
        color: ['#138808', '#2563eb', '#FF9933', '#7c3aed', '#dc2626'],
        tooltip: { trigger: 'item' },
        series: [{
          type: 'pie',
          radius: ['35%', '65%'],
          center: ['50%', '50%'],
          itemStyle: { borderRadius: 4 },
          label: { formatter: '{b}: {d}%' },
          data: [
            { value: 52, name: 'Income & Corp Tax' },
            { value: 18, name: 'GST' },
            { value: 14, name: 'Customs & Excise' },
            { value: 8, name: 'Non-Tax Revenue' },
            { value: 8, name: 'Other Sources' },
          ],
        }],
      }} height={320} />

      <LabContext title="Fiscal Consolidation Is on Track" variant="info">
        The fiscal deficit has narrowed from 9.2% of GDP in 2020-21 to a budgeted 4.9% in 2024-25. The government
        aims to reach 4.5% by 2025-26. This glide path has been supported by robust tax collections (especially
        GST and income tax) and rationalised expenditure. However, the debt-to-GDP ratio at 57.2% remains above
        the FRBM target of 40%, leaving limited room for counter-cyclical spending in a downturn.
      </LabContext>

      <LabContext title="Capex Push — Quality of Spending Is Improving" variant="insight">
        Capital expenditure has grown at 16.9% — nearly 2.5x the growth in revenue expenditure. A higher capex
        share improves the quality of public spending by building roads, railways, defence infrastructure, and
        digital assets. Every rupee of capex is estimated to have a multiplier of 2.5–3.5x on GDP, compared to
        ~0.9x for revenue spending.
      </LabContext>

      <LabSources sources={[
        'Ministry of Finance — Union Budget 2024–25, Budget at a Glance',
        'Controller General of Accounts — Monthly Accounts Reports, 2024',
        'Reserve Bank of India — State Finances: A Study of Budgets, 2024',
        'International Monetary Fund — India Article IV Consultation, 2024',
      ]} />
    </LabLayout>
  )
}
