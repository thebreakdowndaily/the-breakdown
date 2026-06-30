'use client'

import Link from 'next/link'
import { ChevronRight, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PROMISES_DATA } from '@/lib/content/accountability'

const DELIVERED = PROMISES_DATA.filter((p) => p.status === 'Delivered').length
const PARTIAL = PROMISES_DATA.filter((p) => p.status === 'Partially Delivered').length
const IN_PROGRESS = PROMISES_DATA.filter((p) => p.status === 'In Progress').length
const NOT_DELIVERED = PROMISES_DATA.filter((p) => p.status === 'Not Delivered').length

const STATUS_CONFIG: Record<string, { variant: 'default' | 'outline' | 'secondary' | 'destructive'; color: string }> = {
  'Delivered': { variant: 'default', color: 'bg-green-500/10 text-green-600' },
  'Partially Delivered': { variant: 'secondary', color: 'bg-amber-500/10 text-amber-600' },
  'In Progress': { variant: 'outline', color: 'bg-blue-500/10 text-blue-600' },
  'Not Delivered': { variant: 'destructive', color: 'bg-red-500/10 text-red-600' },
}

export default function PromisesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/accountability" className="hover:text-foreground transition-colors">Accountability</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Promises vs Delivery</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-green-500/10">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold font-heading">Promises vs Delivery</h1>
        </div>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Election promises measured against actual delivery. We track what was promised, what was delivered, and what remains pending — with official data sources.
        </p>
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Promises Tracked</p>
            <p className="text-2xl font-bold font-heading mt-1">{PROMISES_DATA.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Delivered</p>
            <p className="text-2xl font-bold font-heading mt-1 text-green-600">{DELIVERED}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Partially Delivered</p>
            <p className="text-2xl font-bold font-heading mt-1 text-amber-600">{PARTIAL}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Not Delivered</p>
            <p className="text-2xl font-bold font-heading mt-1 text-red-600">{NOT_DELIVERED}</p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Distribution */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Delivery Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-8 rounded-full overflow-hidden">
            <div
              className="bg-green-500 flex items-center justify-center text-xs font-medium text-white"
              style={{ width: `${(DELIVERED / PROMISES_DATA.length) * 100}%` }}
            >{DELIVERED > 0 && `${DELIVERED} Delivered`}</div>
            <div
              className="bg-amber-500 flex items-center justify-center text-xs font-medium text-white"
              style={{ width: `${(PARTIAL / PROMISES_DATA.length) * 100}%` }}
            >{PARTIAL > 0 && `${PARTIAL} Partial`}</div>
            <div
              className="bg-blue-500 flex items-center justify-center text-xs font-medium text-white"
              style={{ width: `${(IN_PROGRESS / PROMISES_DATA.length) * 100}%` }}
            >{IN_PROGRESS > 0 && `${IN_PROGRESS} In Progress`}</div>
            <div
              className="bg-red-500 flex items-center justify-center text-xs font-medium text-white"
              style={{ width: `${(NOT_DELIVERED / PROMISES_DATA.length) * 100}%` }}
            >{NOT_DELIVERED > 0 && `${NOT_DELIVERED} Not Delivered`}</div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All', 'Delivered', 'Partially Delivered', 'In Progress', 'Not Delivered', 'Health', 'Economy', 'Infrastructure'].map((f) => (
          <Badge key={f} variant="outline" className="cursor-pointer hover:bg-muted transition-colors">{f}</Badge>
        ))}
      </div>

      {/* Promises Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Promise Tracker</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="p-3 font-medium">Promise</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Commitment</th>
                  <th className="p-3 font-medium">Delivery Status</th>
                  <th className="p-3 font-medium">Result</th>
                </tr>
              </thead>
              <tbody>
                {PROMISES_DATA.map((row) => {
                  const cfg = STATUS_CONFIG[row.status]
                  return (
                    <tr key={row.promise} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-medium">{row.promise}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">{row.category}</Badge>
                      </td>
                      <td className="p-3 text-muted-foreground text-xs max-w-[200px]">{row.commitment}</td>
                      <td className="p-3">
                        <Badge variant={cfg.variant}>{row.status}</Badge>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground max-w-[250px]">{row.delivery}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
