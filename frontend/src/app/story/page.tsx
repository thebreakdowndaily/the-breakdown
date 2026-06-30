'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ALL_STORIES } from '@/lib/content/generated/stories'
import { ArrowUpDown, Clock, Calendar, Bookmark } from 'lucide-react'
import { useReadingList } from '@/lib/hooks/use-reading-list'
import type { BookmarkedStory } from '@/lib/hooks/use-reading-list'

const ALL_CATEGORIES = [...new Set(ALL_STORIES.map((s) => s.category))]
type SortKey = 'newest' | 'oldest' | 'longest' | 'shortest'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'longest', label: 'Longest read' },
  { key: 'shortest', label: 'Shortest read' },
]

export default function StoryIndexPage() {
  const [filter, setFilter] = useState<string>('All')
  const [sortKey, setSortKey] = useState<SortKey>('newest')
  const readingList = useReadingList()

  const handleToggleBookmark = useCallback((story: BookmarkedStory) => {
    readingList.toggle(story)
  }, [readingList])

  const reports = useMemo(() => {
    const filtered = filter === 'All'
      ? [...ALL_STORIES]
      : ALL_STORIES.filter((r) => r.category === filter)

    filtered.sort((a, b) => {
      switch (sortKey) {
        case 'newest':
          return (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) -
                 (a.publishedAt ? new Date(a.publishedAt).getTime() : 0)
        case 'oldest':
          return (a.publishedAt ? new Date(a.publishedAt).getTime() : 0) -
                 (b.publishedAt ? new Date(b.publishedAt).getTime() : 0)
        case 'longest':
          return (b.readTime || 0) - (a.readTime || 0)
        case 'shortest':
          return (a.readTime || 0) - (b.readTime || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [filter, sortKey])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">All Reports</h1>
        <p className="text-muted-foreground mt-2">
          Intelligence reports, investigations, and analysis.
          <span className="ml-2 text-xs text-muted-foreground/60">
            ({ALL_STORIES.length} reports)
          </span>
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="flex flex-wrap gap-2">
          {['All', ...ALL_CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`inline-flex items-center rounded-4xl px-3 py-1 text-xs font-medium h-7 transition-colors ${
                filter === c
                  ? 'bg-secondary text-secondary-foreground border border-transparent'
                  : 'border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="size-3.5 text-muted-foreground" />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="bg-transparent text-xs text-muted-foreground border border-border rounded-md px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map((r) => {
          const isSaved = readingList.isSaved(r.slug)
          return (
            <div key={r.slug} className="relative group/card">
              <Link href={`/story/${r.slug}`}>
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5 flex flex-col group overflow-hidden">
                  {r.hero && (
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img
                        src={r.hero}
                        alt=""
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-3 left-3">{r.category}</Badge>
                      <span className="absolute top-3 right-3 text-[11px] text-white/80 flex items-center gap-1 bg-black/40 rounded-full px-2 py-0.5">
                        <Clock className="size-3" />
                        {r.readTime} min
                      </span>
                    </div>
                  )}
                  <CardHeader className={r.hero ? 'pb-3 pt-4' : 'pb-3'}>
                    {!r.hero && (
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="w-fit">{r.category}</Badge>
                        <span className="text-[11px] text-muted-foreground/60 flex items-center gap-1">
                          <Clock className="size-3" />
                          {r.readTime} min
                        </span>
                      </div>
                    )}
                    <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors line-clamp-3">
                      {r.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {r.summary || 'No summary available.'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {r.publishedAt ? new Date(r.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }) : 'Date TBC'}
                      </span>
                      {r.tags && r.tags.length > 0 && (
                        <span className="text-muted-foreground/60 truncate max-w-[120px]">
                          #{r.tags[0]}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleToggleBookmark({
                    slug: r.slug,
                    title: r.title,
                    summary: r.summary || '',
                    category: r.category,
                    savedAt: new Date().toISOString(),
                  })
                }}
                className="absolute top-3 right-3 z-10 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-background/80 text-muted-foreground hover:text-primary"
                aria-label={isSaved ? 'Remove from reading list' : 'Add to reading list'}
                title={isSaved ? 'Remove from reading list' : 'Add to reading list'}
              >
                <Bookmark className={`size-3.5 ${isSaved ? 'fill-primary text-primary' : ''}`} />
              </button>
            </div>
          )
        })}
      </div>

      {reports.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-2">No reports found in this category.</p>
          <button
            onClick={() => setFilter('All')}
            className="text-sm text-primary hover:underline"
          >
            View all reports
          </button>
        </div>
      )}
    </div>
  )
}
