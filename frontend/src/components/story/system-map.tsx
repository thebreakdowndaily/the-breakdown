import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SystemFactor {
  label: string
  type: string
  related?: string
}

interface SystemMapProps {
  title: string
  factors: SystemFactor[]
}

const TYPE_COLORS: Record<string, string> = {
  cause: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800',
  effect: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800',
  solution: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800',
  driver: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800',
}

export function SystemMap({ title, factors }: SystemMapProps) {
  if (!factors.length) return null
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-4">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {factors.map((f, i) => (
          <div key={i} className="group relative">
            <Badge
              variant="outline"
              className={cn(
                'text-xs px-3 py-1.5',
                TYPE_COLORS[f.type] || ''
              )}
            >
              {f.label}
            </Badge>
            {f.related && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-popover text-popover-foreground text-xs rounded-lg px-3 py-2 shadow-lg border whitespace-nowrap">
                  Related: {f.related}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
