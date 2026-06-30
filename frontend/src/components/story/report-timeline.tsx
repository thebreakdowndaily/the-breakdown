import { TimelineEvent } from '@/types'

interface ReportTimelineProps {
  events: TimelineEvent[]
}

export function ReportTimeline({ events }: ReportTimelineProps) {
  if (!events.length) return null
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-6">Timeline</h2>
      <div className="space-y-0">
        {events.map((t, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              {i < events.length - 1 && <div className="w-px flex-1 bg-border" />}
            </div>
            <div className="pb-6">
              <p className="text-sm text-muted-foreground font-mono">{t.date}</p>
              <p className="font-medium">{t.title}</p>
              <p className="text-sm text-muted-foreground">{t.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
