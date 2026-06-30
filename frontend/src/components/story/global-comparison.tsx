import { Card, CardContent } from '@/components/ui/card'

interface CountryComparison {
  name: string
  flag: string
  metric: string
  value: string
  rank: number
}

interface GlobalComparisonProps {
  title: string
  countries: CountryComparison[]
}

export function GlobalComparison({ title, countries }: GlobalComparisonProps) {
  if (!countries.length) return null
  const sorted = [...countries].sort((a, b) => a.rank - b.rank)
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sorted.map((c, i) => (
          <Card key={i} className={i === 0 ? 'ring-2 ring-saffron' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{c.flag}</span>
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">#{c.rank}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{c.metric}</p>
              <p className="text-lg font-bold font-heading">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
