'use client'

import { LabLayout } from '@/components/data-lab/lab-layout'
import { LabChart } from '@/components/data-lab/lab-chart'
import { LabContext } from '@/components/data-lab/lab-context'
import { LabSources } from '@/components/data-lab/lab-sources'
import { budgetChart } from '@/components/data-lab/chart-options'

const metrics = [
  { label: 'Total Expenditure (BE)', value: '₹50.65L Cr', change: '+5.1%', trend: 'up' as const },
  { label: 'Revenue Receipts', value: '₹34.96L Cr', change: '+10.7%', trend: 'up' as const },
  { label: 'Fiscal Deficit (% of GDP)', value: '4.4%', change: '-0.5pp', trend: 'down' as const },
  { label: 'Capital Expenditure', value: '₹11.21L Cr', change: '+0.9%', trend: 'up' as const },
  { label: 'Gross Tax Revenue', value: '₹25.8L Cr', change: '+11.5%', trend: 'up' as const },
  { label: 'Central Debt-to-GDP', value: '57.2%', change: '-0.8pp', trend: 'down' as const },
]

export default function BudgetLabPage() {
  return (
    <LabLayout title="Budget" description="Union Budget 2025–26 — revenue mobilisation, expenditure quality, fiscal consolidation trajectory, and the shifting composition of public spending." metrics={metrics}>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <LabChart title="Revenue, Expenditure & Fiscal Deficit Trajectory" option={budgetChart} height={380} />
        <LabChart title="Share of Central Expenditure by Ministry (2025-26 BE)" option={{
          color: ['#FF9933', '#138808', '#2563eb', '#dc2626', '#7c3aed', '#ea580c', '#0d9488', '#ca8a04'],
          tooltip: { trigger: 'item' },
          series: [{
            type: 'pie',
            radius: ['30%', '60%'],
            center: ['50%', '55%'],
            itemStyle: { borderRadius: 4 },
            label: { formatter: '{b}\n₹{c}L Cr', fontSize: 11 },
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
      <LabChart title="Composition of Tax & Non-Tax Revenue (2025-26 BE)" option={{
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

      <LabContext title="Fiscal Glide Path — On Track but Debt Overhang Persists" variant="info">
        The fiscal deficit has narrowed from a pandemic peak of 9.2% of GDP (2020-21) to a budgeted 4.9% in 2024-25, en route to the 4.4% target for 2025-26. Revenue buoyancy — GST collections averaging ₹1.7L Cr/month and direct tax growth of 11.5% — has been the primary driver. However, the central government's debt-to-GDP ratio of 57.2% remains well above the FRBM anchor of 40%, constraining counter-cyclical capacity. Interest payments alone consume ~34.5% of revenue receipts, leaving less fiscal space for productive spending than the headline deficit numbers suggest.
      </LabContext>

      <LabContext title="Capex Multiplier Effect — Why Spending Composition Matters" variant="insight">
        Capital expenditure has grown at 16.9% year-on-year — roughly 2.5x the pace of revenue expenditure (6.7%). This tilt matters because the fiscal multiplier of capex (2.5–3.5x GDP) far exceeds that of revenue spending (~0.9x). Roads, railways, defence infrastructure, and digital public infrastructure now absorb a rising share of the budget. However, actual capex execution has historically undershot budget estimates by 10–15% — the quality of the fiscal expansion depends not just on allocation but on implementation velocity at the state and PSU level.
      </LabContext>

      <LabSources sources={[
        'Ministry of Finance — Union Budget 2025–26, Budget at a Glance',
        'Controller General of Accounts — Monthly Accounts Reports, FY 2024–25',
        'Reserve Bank of India — State Finances: A Study of Budgets, 2024',
        'International Monetary Fund — India Article IV Consultation Staff Report, 2024',
        'Comptroller and Auditor General — Compliance Audit of Union Government Accounts, 2024–25',
      ]} />
    </LabLayout>
  )
}
