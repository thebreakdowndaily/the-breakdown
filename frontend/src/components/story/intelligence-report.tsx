import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { KeyNumber, TimelineEvent } from '@/types'

interface IntelligenceReportProps {
  title: string
  summary: string
  category: string
  content: string
  keyNumbers: KeyNumber[]
  timeline: TimelineEvent[]
}

export function IntelligenceReport({ title, summary, category, content, keyNumbers, timeline }: IntelligenceReportProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <Badge className="mb-4">{category}</Badge>
        <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight mb-4">{title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">{summary}</p>
      </header>

      {/* Key Numbers */}
      {keyNumbers.length > 0 && (
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyNumbers.map((k, i) => (
              <Card key={i}>
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase">{k.label}</p>
                  <p className="text-2xl font-bold mt-1">{k.value}</p>
                  {k.change && <p className="text-xs mt-1 text-muted-foreground">{k.change}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <Separator className="mb-8" />

      {/* Content Body */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Timeline */}
      {timeline.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold font-heading mb-6">Timeline</h2>
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-4">
                  <p className="text-sm text-muted-foreground font-mono">{t.date}</p>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
