import { Card, CardContent } from '@/components/ui/card'

interface EvidenceItem {
  claim: string
  source: string
  sourceUrl?: string
}

interface EvidenceBoxProps {
  evidence: EvidenceItem[]
}

export function EvidenceBox({ evidence }: EvidenceBoxProps) {
  if (!evidence.length) return null
  return (
    <Card className="bg-muted/50">
      <CardContent className="p-6">
        <h2 className="text-lg font-bold font-heading mb-4">Evidence</h2>
        <div className="space-y-4">
          {evidence.map((item, i) => (
            <div key={i} className="border-l-2 border-saffron pl-4">
              <p className="text-sm font-medium mb-1">{item.claim}</p>
              {item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Source: {item.source}
                </a>
              ) : (
                <p className="text-xs text-muted-foreground">Source: {item.source}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
