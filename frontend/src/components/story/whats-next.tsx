import { Badge } from '@/components/ui/badge'

interface NextEvent {
  date: string
  event: string
  probability?: string
}

interface WhatsNextProps {
  events: NextEvent[]
}

export function WhatsNext({ events }: WhatsNextProps) {
  if (!events.length) return null
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-6">What's Next</h2>
      <div className="space-y-0 relative">
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
        {events.map((ev, i) => (
          <div key={i} className="flex gap-4 pb-6 relative">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-background z-10">
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm font-mono text-muted-foreground mb-1">{ev.date}</p>
              <p className="text-sm font-medium">{ev.event}</p>
              {ev.probability && (
                <Badge variant="outline" className="mt-2 text-xs">
                  {ev.probability} probability
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
