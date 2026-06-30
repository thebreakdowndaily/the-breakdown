import { Card, CardContent } from '@/components/ui/card'

interface RootCauseItem {
  factor: string
  impact: string
}

interface RootCauseProps {
  title: string
  description: string
  causes: RootCauseItem[]
}

export function RootCause({ title, description, causes }: RootCauseProps) {
  if (!causes.length) return null
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      <div className="flex flex-col md:flex-row gap-0 items-stretch">
        {causes.map((cause, i) => (
          <div key={i} className="flex-1 flex flex-col">
            <Card className="flex-1">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron/20 text-xs font-bold text-saffron-dark shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium">{cause.factor}</p>
                </div>
                <p className="text-xs text-muted-foreground">{cause.impact}</p>
              </CardContent>
            </Card>
            {i < causes.length - 1 && (
              <div className="hidden md:flex justify-center py-2 text-muted-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
