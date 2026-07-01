'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

const ACTIONS = ['Deep Dive', 'Cross-Reference', 'Executive Brief', 'Data Visualisation', 'Event Timeline', 'Geopolitical Map', 'Source Trace']

export function AskBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }, [query, router])

  const handleAction = useCallback((action: string) => {
    router.push(`/search?q=${encodeURIComponent(action + ': ')}`)
  }, [router])

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-bold font-heading mb-1">Query Intelligence Engine</h2>
        <p className="text-sm text-muted-foreground mb-4">Evidence-backed answers with source attribution and data visualisation.</p>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Query reports, data, entities..."
            className="flex-1"
          />
          <Button type="submit" disabled={!query.trim()}>
            <Search className="size-3.5 mr-1.5" />
            Analyse
          </Button>
        </form>
        <div className="flex flex-wrap gap-1.5">
          {ACTIONS.map(a => (
            <Badge key={a} variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors" onClick={() => handleAction(a)}>
              {a}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
