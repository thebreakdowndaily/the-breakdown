'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FIX_STORIES } from '@/lib/content/fix'
import type { FixStory } from '@/lib/content/fix'

const CATEGORIES = ['All', 'Energy', 'Education', 'Environment', 'Infrastructure', 'Health', 'Economy'] as const
const STATUSES = ['All', 'In Progress', 'Under Review', 'Proposed', 'Implemented'] as const
const SORT_OPTIONS = ['Priority (High → Low)', 'Priority (Low → High)', 'Alphabetical'] as const

const CATEGORY_COLORS: Record<string, string> = {
  Health: 'bg-red-500/10 text-red-600 border-red-200',
  Education: 'bg-blue-500/10 text-blue-600 border-blue-200',
  Energy: 'bg-amber-500/10 text-amber-600 border-amber-200',
  Economy: 'bg-purple-500/10 text-purple-600 border-purple-200',
  Infrastructure: 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
  Environment: 'bg-green-500/10 text-green-600 border-green-200',
}

const STATUS_COLORS: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  'In Progress': 'default',
  Proposed: 'secondary',
  Implemented: 'default',
  'Under Review': 'outline',
}

const PRIORITY_COLORS: Record<string, string> = {
  High: 'text-red-500 border-red-200 bg-red-500/10',
  Medium: 'text-amber-500 border-amber-200 bg-amber-500/10',
  Low: 'text-green-500 border-green-200 bg-green-500/10',
}

const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 } as const

function filterFixes(
  stories: FixStory[],
  category: string,
  status: string,
  sort: string
): FixStory[] {
  let filtered = [...stories]

  if (category !== 'All') {
    filtered = filtered.filter(s => s.category === category)
  }
  if (status !== 'All') {
    filtered = filtered.filter(s => s.status === status)
  }

  switch (sort) {
    case 'Priority (High → Low)':
      filtered.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
      break
    case 'Priority (Low → High)':
      filtered.sort((a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority])
      break
    case 'Alphabetical':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
  }

  return filtered
}

export function FixFilterList() {
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState<string>('Priority (High → Low)')

  const filtered = useMemo(
    () => filterFixes(FIX_STORIES, category, status, sort),
    [category, status, sort]
  )

  const activeFilters = [
    category !== 'All' && category,
    status !== 'All' && status,
  ].filter(Boolean)

  return (
    <div>
      {/* Filter bar */}
      <div className="space-y-4 mb-8">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                category === c
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/50 text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
              }`}
            >
              {c === 'All' ? 'All Sectors' : c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mr-1">Status:</span>
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-2 py-1 rounded text-[11px] font-medium border transition-all ${
                  status === s
                    ? 'bg-card text-foreground border-foreground/30'
                    : 'bg-muted/30 text-muted-foreground/60 border-transparent hover:text-foreground hover:border-border'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Sort:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-xs bg-muted/50 border border-border rounded-md px-2 py-1 text-foreground"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filters + count */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium">{filtered.length} of {FIX_STORIES.length} fixes</span>
          {activeFilters.length > 0 && (
            <>
              <span className="text-muted-foreground/40">·</span>
              <span>Filtered by: {activeFilters.join(', ')}</span>
              <button
                onClick={() => { setCategory('All'); setStatus('All') }}
                className="text-primary hover:underline ml-1"
              >
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Fix cards */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((story) => (
            <Card key={story.slug} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className={CATEGORY_COLORS[story.category]}>{story.category}</Badge>
                  <Badge variant={STATUS_COLORS[story.status]}>{story.status}</Badge>
                </div>
                <CardTitle className="text-lg">{story.title}</CardTitle>
                <CardDescription className="text-sm mt-1">{story.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${PRIORITY_COLORS[story.priority]}`}>
                    {story.priority} Priority
                  </span>
                </div>

                {/* Progress bars on cards */}
                {story.progress && story.progress.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {story.progress.slice(0, 2).map((p, i) => {
                      const pct = p.target > 0 ? Math.min((p.current / p.target) * 100, 100) : 0
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[10px] text-muted-foreground truncate">{p.label}</span>
                            <span className="text-[10px] font-medium font-heading">{Math.round(pct)}%</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-3 mt-auto">
                  <span>System Analysis</span>
                  <span className="text-muted-foreground/40">·</span>
                  <span>Govt Action</span>
                  <span className="text-muted-foreground/40">·</span>
                  <span>Budget</span>
                  <span className="text-muted-foreground/40">·</span>
                  <span>Global</span>
                </div>
              </CardContent>
              <div className="px-(--card-spacing) pb-(--card-spacing)">
                <Link
                  href={`/the-fix/${story.slug}`}
                  className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-8 gap-1.5 px-2.5 bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  View Fix
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground font-medium">No fixes match your filters.</p>
          <button
            onClick={() => { setCategory('All'); setStatus('All') }}
            className="text-sm text-primary hover:underline mt-2"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
