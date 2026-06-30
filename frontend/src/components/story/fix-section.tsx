import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface FixSolution {
  actor: string
  action: string
  status: string
  budget?: string
}

interface FixSectionProps {
  solutions: FixSolution[]
}

const STATUS_STYLES: Record<string, string> = {
  'In Progress': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  'Proposed': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Implemented': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
}

export function FixSection({ solutions }: FixSectionProps) {
  if (!solutions.length) return null
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-4">The Fix</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {solutions.map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Badge
                variant="outline"
                className={cn('mb-3', STATUS_STYLES[s.status] || '')}
              >
                {s.status}
              </Badge>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.actor}</p>
              <p className="text-sm font-medium mb-2">{s.action}</p>
              {s.budget && (
                <p className="text-xs text-muted-foreground">Budget impact: {s.budget}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
