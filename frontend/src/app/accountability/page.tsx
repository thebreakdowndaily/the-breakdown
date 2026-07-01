import type { Metadata } from 'next'
import Link from 'next/link'
import { Wallet, HardHat, CheckCircle2, FileSearch } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SPENDING_DATA, PROJECTS_DATA, PROMISES_DATA, RTI_DATA } from '@/lib/content/accountability'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Accountability',
  description: 'Government tracking — spending, infrastructure projects, election promises, and RTI resources. Democracy demands accountability.',
  path: '/accountability',
})

const TRACKERS = [
  {
    title: 'Government Spending',
    description: 'Ministry-wise budget allocation vs actual expenditure tracked in real-time. Monitor how your tax money is spent across all ministries.',
    href: '/accountability/spending',
    icon: Wallet,
    metrics: '₹48.7L Cr tracked',
    color: 'border-l-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Projects Tracker',
    description: 'Major infrastructure projects monitored by timeline, budget, and completion status. Track Bharatmala, High Speed Rail, Smart Cities and more.',
    href: '/accountability/projects',
    icon: HardHat,
    metrics: '12 projects monitored',
    color: 'border-l-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    title: 'Promises vs Delivery',
    description: 'Election promises measured against actual delivery. Verified data on what was promised, what was delivered, and what is still pending.',
    href: '/accountability/promises',
    icon: CheckCircle2,
    metrics: '10 promises tracked',
    color: 'border-l-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'RTI Resources',
    description: 'Guide to filing RTI applications, sample templates, success stories, and filing tips to empower citizen-led transparency.',
    href: '/accountability/rti',
    icon: FileSearch,
    metrics: '9 resources available',
    color: 'border-l-purple-500',
    bgColor: 'bg-purple-500/10',
  },
]

export default function AccountabilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative rounded-xl border bg-card overflow-hidden">
          <div className="p-8 md:p-12 max-w-3xl">
            <Badge className="mb-4">Government Tracking</Badge>
            <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Accountability</h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Democracy demands more than elections. It requires continuous, verifiable accountability. We track government spending against budget estimates, monitor infrastructure projects through their lifecycle, measure election promises against delivery, and equip citizens with RTI tools to demand transparency. Every data point is sourced from official records — verified, analysed, and presented without editorial spin.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="text-xs bg-muted/50 px-3 py-1.5 rounded-full font-medium">Ministry Budgets</span>
              <span className="text-xs bg-muted/50 px-3 py-1.5 rounded-full font-medium">Project Progress</span>
              <span className="text-xs bg-muted/50 px-3 py-1.5 rounded-full font-medium">Promise Tracker</span>
              <span className="text-xs bg-muted/50 px-3 py-1.5 rounded-full font-medium">RTI Guides</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {TRACKERS.map((tracker) => {
          const Icon = tracker.icon
          return (
            <Card key={tracker.title} className={`border-l-4 ${tracker.color}`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className={`p-2 rounded-lg ${tracker.bgColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tracker.title}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{tracker.metrics}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm mb-4">{tracker.description}</CardDescription>
                <Link
                  href={tracker.href}
                  className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-7 gap-1 px-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  View Full Tracker
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-heading">Recent Spending Data</h2>
          <Link href="/accountability/spending" className="text-sm text-muted-foreground hover:text-foreground">All Ministries →</Link>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="p-3 font-medium">Ministry</th>
                  <th className="p-3 font-medium">Budget Estimate</th>
                  <th className="p-3 font-medium">Actual Spending</th>
                  <th className="p-3 font-medium text-right">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {SPENDING_DATA.slice(0, 5).map((row) => (
                  <tr key={row.ministry} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-3 font-medium">{row.ministry}</td>
                    <td className="p-3 text-muted-foreground">{row.budgetEstimate}</td>
                    <td className="p-3 text-muted-foreground">{row.actualSpending}</td>
                    <td className="p-3 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.utilization >= 95 ? 'bg-green-500/10 text-green-600' :
                        row.utilization >= 85 ? 'bg-amber-500/10 text-amber-600' :
                        'bg-red-500/10 text-red-600'
                      }`}>
                        {row.utilization}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-heading">Project Status Overview</h2>
          <Link href="/accountability/projects" className="text-sm text-muted-foreground hover:text-foreground">All Projects →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {PROJECTS_DATA.slice(0, 4).map((project) => (
            <Card key={project.name}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm">{project.name}</CardTitle>
                  <Badge variant={
                    project.status === 'Completed' ? 'default' :
                    project.status === 'On Track' ? 'outline' :
                    project.status === 'Delayed' ? 'secondary' : 'destructive'
                  }>{project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{project.cost}</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-heading">Promises vs Delivery</h2>
          <Link href="/accountability/promises" className="text-sm text-muted-foreground hover:text-foreground">Full Tracker →</Link>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="p-3 font-medium">Promise</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {PROMISES_DATA.slice(0, 5).map((row) => (
                  <tr key={row.promise} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-3 font-medium">{row.promise}</td>
                    <td className="p-3 text-muted-foreground">{row.category}</td>
                    <td className="p-3">
                      <Badge variant={
                        row.status === 'Delivered' ? 'default' :
                        row.status === 'In Progress' ? 'outline' :
                        'secondary'
                      }>{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-heading">Popular RTI Resources</h2>
          <Link href="/accountability/rti" className="text-sm text-muted-foreground hover:text-foreground">All Resources →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RTI_DATA.slice(0, 6).map((resource) => (
            <Card key={resource.title} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                </div>
                <h3 className="font-medium text-sm mb-1">{resource.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{resource.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{resource.downloads} downloads</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
