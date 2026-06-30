import { Card, CardContent } from '@/components/ui/card'
import { KeyNumber } from '@/types'
import { cn } from '@/lib/utils'

interface KeyNumbersProps {
  numbers: KeyNumber[]
}

export function KeyNumbers({ numbers }: KeyNumbersProps) {
  if (!numbers.length) return null
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-4">Key Numbers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {numbers.map((n, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{n.label}</p>
              <p className="text-2xl font-bold font-heading mt-1">{n.value}</p>
              {n.change && (
                <p className={cn(
                  "text-xs mt-1",
                  n.trend === 'up' && 'text-green-india',
                  n.trend === 'down' && 'text-destructive',
                  !n.trend && 'text-muted-foreground'
                )}>
                  {n.trend === 'up' && '↑ '}
                  {n.trend === 'down' && '↓ '}
                  {n.change}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
