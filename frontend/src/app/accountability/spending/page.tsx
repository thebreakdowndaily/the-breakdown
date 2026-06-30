'use client'

import Link from 'next/link'
import { ChevronRight, Wallet, ArrowUp, ArrowDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SPENDING_DATA } from '@/lib/content/accountability'

const totalBudget = SPENDING_DATA.reduce((acc, s) => {
  const num = parseFloat(s.budgetEstimate.replace(/[^0-9.]/g, ''))
  const multiplier = s.budgetEstimate.includes('L') ? 100000 : 1
  return acc + num * multiplier
}, 0)

const totalSpent = SPENDING_DATA.reduce((acc, s) => {
  const num = parseFloat(s.actualSpending.replace(/[^0-9.]/g, ''))
  const multiplier = s.actualSpending.includes('L') ? 100000 : 1
  return acc + num * multiplier
}, 0)

const avgUtilization = Math.round(SPENDING_DATA.reduce((acc, s) => acc + s.utilization, 0) / SPENDING_DATA.length)

export default function SpendingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/accountability" className="hover:text-foreground transition-colors">Accountability</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Government Spending</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Wallet className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold font-heading">Government Spending</h1>
        </div>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Ministry-wise Union Budget allocation vs actual expenditure for FY 2025-26. Data sourced from CGA, union budget documents, and parliamentary committee reports.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Budget Tracked</p>
            <p className="text-2xl font-bold font-heading mt-1">{(totalBudget / 100000).toFixed(1)}L Cr</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Spent</p>
            <p className="text-2xl font-bold font-heading mt-1">{(totalSpent / 100000).toFixed(1)}L Cr</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Utilization</p>
            <p className="text-2xl font-bold font-heading mt-1">{avgUtilization}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Ministries Tracked</p>
            <p className="text-2xl font-bold font-heading mt-1">{SPENDING_DATA.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All Ministries', 'High Utilization (>95%)', 'Low Utilization (<90%)', 'Defence', 'Infrastructure'].map((f) => (
          <Badge key={f} variant="outline" className="cursor-pointer hover:bg-muted transition-colors">{f}</Badge>
        ))}
      </div>

      {/* Chart - Visual Bar */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Budget Allocation vs Spending by Ministry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {SPENDING_DATA.slice(0, 8).map((row) => {
              const budgetNum = parseFloat(row.budgetEstimate.replace(/[^0-9.]/g, '')) * (row.budgetEstimate.includes('L') ? 100000 : 1)
              const spentNum = parseFloat(row.actualSpending.replace(/[^0-9.]/g, '')) * (row.actualSpending.includes('L') ? 100000 : 1)
              const maxVal = Math.max(budgetNum, spentNum)
              return (
                <div key={row.ministry} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium truncate mr-2">{row.ministry}</span>
                    <span className="text-muted-foreground shrink-0">{row.utilization}%</span>
                  </div>
                  <div className="relative h-6">
                    <div className="absolute inset-0 flex items-center gap-0.5">
                      <div
                        className="h-4 rounded-l-sm bg-muted-foreground/20"
                        style={{ width: `${(budgetNum / (maxVal * 1.2)) * 100}%` }}
                        title={`Budget: ${row.budgetEstimate}`}
                      />
                      <div
                        className="h-4 rounded-r-sm bg-primary"
                        style={{ width: `${(spentNum / (maxVal * 1.2)) * 100}%` }}
                        title={`Spent: ${row.actualSpending}`}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Budget: {row.budgetEstimate}</span>
                    <span>Spent: {row.actualSpending}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-muted-foreground/20 inline-block" /> Budget Estimate
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Actual Spending
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ministry-wise Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="p-3 font-medium">Ministry</th>
                  <th className="p-3 font-medium">Budget Estimate</th>
                  <th className="p-3 font-medium">Actual Spending</th>
                  <th className="p-3 font-medium">Utilization</th>
                  <th className="p-3 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {SPENDING_DATA.map((row) => (
                  <tr key={row.ministry} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-3 font-medium">{row.ministry}</td>
                    <td className="p-3 text-muted-foreground">{row.budgetEstimate}</td>
                    <td className="p-3 text-muted-foreground">{row.actualSpending}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              row.utilization >= 95 ? 'bg-green-500' :
                              row.utilization >= 85 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${row.utilization}%` }}
                          />
                        </div>
                        <span className="text-xs">{row.utilization}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      {row.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      ) : row.trend === 'down' ? (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
