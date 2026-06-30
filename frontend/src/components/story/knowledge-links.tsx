import { Badge } from '@/components/ui/badge'

interface KnowledgeLink {
  label: string
  type: 'person' | 'country' | 'company' | 'organization' | 'law' | 'scheme' | 'report' | 'event' | 'policy'
}

const TYPE_COLORS: Record<string, string> = {
  person: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  country: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  organization: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  policy: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  event: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export function KnowledgeLinks({ links }: { links: KnowledgeLink[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l, i) => (
        <Badge key={i} className={TYPE_COLORS[l.type] || ''} variant="outline">
          {l.type.toUpperCase()} · {l.label}
        </Badge>
      ))}
    </div>
  )
}
