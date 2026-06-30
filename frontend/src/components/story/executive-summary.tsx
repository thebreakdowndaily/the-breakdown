import { Card, CardContent } from '@/components/ui/card'

interface ExecutiveSummaryProps {
  points: string[]
}

export function ExecutiveSummary({ points }: ExecutiveSummaryProps) {
  if (!points.length) return null
  return (
    <Card className="border-l-4 border-l-saffron">
      <CardContent className="p-6">
        <h2 className="text-lg font-bold font-heading mb-4">Executive Summary</h2>
        <ul className="space-y-3">
          {points.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
