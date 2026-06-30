import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Source } from '@/types'

interface PrimarySourcesProps {
  sources: Source[]
}

const TYPE_LABELS: Record<string, string> = {
  official: 'Official',
  news: 'News',
  academic: 'Academic',
  primary: 'Primary',
}

export function PrimarySources({ sources }: PrimarySourcesProps) {
  if (!sources.length) return null
  return (
    <section>
      <h2 className="text-xl font-bold font-heading mb-4">Primary Sources</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {sources.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {TYPE_LABELS[s.type] || s.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2 truncate">{s.url}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}
