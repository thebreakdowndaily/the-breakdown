'use client'

import Link from 'next/link'
import { ChevronRight, FileSearch, Download, FileText, Award, FileCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RTI_DATA } from '@/lib/content/accountability'

const TYPE_CONFIG: Record<string, { icon: typeof FileText; label: string; color: string }> = {
  guide: { icon: FileText, label: 'Guide', color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
  sample: { icon: FileCheck, label: 'Sample', color: 'bg-green-500/10 text-green-600 border-green-200' },
  success: { icon: Award, label: 'Success Story', color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
  template: { icon: Download, label: 'Template', color: 'bg-purple-500/10 text-purple-600 border-purple-200' },
}

export default function RTIPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/accountability" className="hover:text-foreground transition-colors">Accountability</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">RTI Resources</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <FileSearch className="w-6 h-6 text-purple-500" />
          </div>
          <h1 className="text-3xl font-bold font-heading">RTI Resources</h1>
        </div>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Everything you need to file effective RTI applications — step-by-step guides, sample templates, appeal formats, and real success stories to empower citizen-led transparency.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Resources</p>
            <p className="text-2xl font-bold font-heading mt-1">{RTI_DATA.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Guides</p>
            <p className="text-2xl font-bold font-heading mt-1">{RTI_DATA.filter(r => r.type === 'guide').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Samples & Templates</p>
            <p className="text-2xl font-bold font-heading mt-1">{RTI_DATA.filter(r => r.type === 'sample' || r.type === 'template').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Success Stories</p>
            <p className="text-2xl font-bold font-heading mt-1">{RTI_DATA.filter(r => r.type === 'success').length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="https://rtionline.gov.in"
              className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileSearch className="w-4 h-4 text-blue-500" />
              <span>File RTI Online (Central)</span>
            </Link>
            <Link
              href="https://cic.gov.in"
              className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileSearch className="w-4 h-4 text-amber-500" />
              <span>Central Information Commission</span>
            </Link>
            <Link
              href="https://rti.gov.in"
              className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileSearch className="w-4 h-4 text-green-500" />
              <span>RTI Act 2005 Full Text</span>
            </Link>
            <Link
              href="https://nalsa.gov.in"
              className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileSearch className="w-4 h-4 text-purple-500" />
              <span>Free Legal Aid (NALSA)</span>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RTI_DATA.map((resource) => {
          const typeConfig = TYPE_CONFIG[resource.type]
          const Icon = typeConfig.icon
          return (
            <Card key={resource.title} className="hover:border-foreground/20 transition-colors cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <Badge variant="outline" className={typeConfig.color}>{typeConfig.label}</Badge>
                </div>
                <h3 className="font-medium text-sm mb-2">{resource.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{resource.downloads} downloads</span>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                    <Download className="w-3 h-3" /> Download
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
