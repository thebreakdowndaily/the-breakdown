import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface RelatedEntity {
  id: string
  label: string
  type: string
  description?: string
}

interface RelatedKnowledgeProps {
  entities: RelatedEntity[]
}

const TYPE_STYLES: Record<string, string> = {
  person: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800',
  country: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800',
  company: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800',
  organization: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800',
  law: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800',
  scheme: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 border-teal-200 dark:border-teal-800',
  report: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200 border-slate-200 dark:border-slate-800',
  event: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800',
  policy: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800',
  budget: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800',
}

export function RelatedKnowledge({ entities }: RelatedKnowledgeProps) {
  if (!entities.length) return null
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-4">Related Knowledge</h2>
      <div className="flex flex-wrap gap-3">
        {entities.map((e) => (
          <div key={e.id} className="group relative">
            <Badge
              variant="outline"
              className={cn(
                'text-xs px-3 py-1.5 cursor-pointer',
                TYPE_STYLES[e.type] || ''
              )}
            >
              {e.type.toUpperCase()} · {e.label}
            </Badge>
            {e.description && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-48">
                <div className="bg-popover text-popover-foreground text-xs rounded-lg px-3 py-2 shadow-lg border">
                  {e.description}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
