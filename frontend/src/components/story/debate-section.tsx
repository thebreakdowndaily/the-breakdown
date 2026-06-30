import { Card, CardContent } from '@/components/ui/card'

interface DebatePosition {
  side: string
  argument: string
  source?: string
}

interface DebateSectionProps {
  title: string
  positions: DebatePosition[]
}

export function DebateSection({ title, positions }: DebateSectionProps) {
  if (!positions.length) return null
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {positions.map((p, i) => (
          <Card key={i} className={p.side === 'for' ? 'border-l-green-india border-l-4' : p.side === 'against' ? 'border-l-destructive border-l-4' : ''}>
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {p.side === 'for' ? 'For' : p.side === 'against' ? 'Against' : p.side}
              </p>
              <p className="text-sm leading-relaxed">{p.argument}</p>
              {p.source && (
                <p className="text-xs text-muted-foreground mt-3">Source: {p.source}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
