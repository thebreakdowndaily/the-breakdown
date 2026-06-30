import { ExternalLink } from 'lucide-react'

interface LabSourcesProps {
  sources: string[]
}

export function LabSources({ sources }: LabSourcesProps) {
  if (sources.length === 0) return null
  return (
    <div className="mt-8 pt-6 border-t text-xs text-muted-foreground space-y-1">
      <p className="font-medium mb-1">Data Sources</p>
      {sources.map((source, i) => (
        <p key={i} className="flex items-start gap-1.5">
          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0" />
          <span>{source}</span>
        </p>
      ))}
    </div>
  )
}
