import { Card, CardContent } from '@/components/ui/card'

interface QuickFact {
  label: string
  value: string
  source?: string
}

interface QuickFactsProps {
  facts: QuickFact[]
}

export function QuickFacts({ facts }: QuickFactsProps) {
  if (!facts.length) return null
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-4">Quick Facts</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {facts.map((fact, i) => (
          <Card key={i} className="min-w-[200px] shrink-0">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{fact.label}</p>
              <p className="text-lg font-bold font-heading">{fact.value}</p>
              {fact.source && (
                <p className="text-xs text-muted-foreground mt-2">Source: {fact.source}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
