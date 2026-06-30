'use client'

import Link from 'next/link'
import { ChevronRight, HardHat } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PROJECTS_DATA } from '@/lib/content/accountability'

const totalCost = '₹25.3L Cr'
const avgProgress = Math.round(PROJECTS_DATA.reduce((acc, p) => acc + p.progress, 0) / PROJECTS_DATA.length)

const STATUS_COUNTS = PROJECTS_DATA.reduce<Record<string, number>>((acc, p) => {
  acc[p.status] = (acc[p.status] || 0) + 1
  return acc
}, {})

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/accountability" className="hover:text-foreground transition-colors">Accountability</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Projects Tracker</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <HardHat className="w-6 h-6 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold font-heading">Projects Tracker</h1>
        </div>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Major infrastructure projects monitored by timeline, budget, and completion status. Data from MoSPI, ministry dashboards, and parliamentary questions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Projects Monitored</p>
            <p className="text-2xl font-bold font-heading mt-1">{PROJECTS_DATA.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Cost</p>
            <p className="text-2xl font-bold font-heading mt-1">{totalCost}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Progress</p>
            <p className="text-2xl font-bold font-heading mt-1">{avgProgress}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">On Track</p>
            <p className="text-2xl font-bold font-heading mt-1">{STATUS_COUNTS['On Track'] || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {Object.entries(STATUS_COUNTS).map(([status, count]) => (
          <Card key={status}>
            <CardContent className="p-4 text-center">
              <Badge variant={
                status === 'Completed' ? 'default' :
                status === 'On Track' ? 'outline' :
                status === 'Delayed' ? 'secondary' : 'destructive'
              } className="mb-2">{status}</Badge>
              <p className="text-xl font-bold font-heading">{count}</p>
              <p className="text-xs text-muted-foreground">{((count / PROJECTS_DATA.length) * 100).toFixed(0)}% of total</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All Projects', 'On Track', 'Delayed', 'At Risk', 'Completed', 'Under ₹50,000 Cr', 'Over ₹1L Cr'].map((f) => (
          <Badge key={f} variant="outline" className="cursor-pointer hover:bg-muted transition-colors">{f}</Badge>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {PROJECTS_DATA.map((project) => (
          <Card key={project.name}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{project.ministry} · {project.cost} · Deadline: {project.deadline}</p>
                </div>
                <Badge variant={
                  project.status === 'Completed' ? 'default' :
                  project.status === 'On Track' ? 'outline' :
                  project.status === 'Delayed' ? 'secondary' : 'destructive'
                }>{project.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span>Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    project.progress >= 75 ? 'bg-green-500' :
                    project.progress >= 40 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="mt-3 text-xs text-muted-foreground flex gap-4">
                <span>Budget: {project.cost}</span>
                <span>Progress: {project.progress}%</span>
                <span>Deadline: {project.deadline}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
