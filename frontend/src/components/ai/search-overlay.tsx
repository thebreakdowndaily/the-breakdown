'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'
import { SUGGESTED_QUESTIONS } from '@/lib/search/suggestions'
import { ALL_STORIES } from '@/lib/content/generated/stories'
import { Search, Clock, TrendingUp, X, BookOpen, ChevronRight } from 'lucide-react'

interface RecentSearch {
  query: string
  timestamp: number
}

const RECENT_KEY = 'ats-recent-searches'
const MAX_RECENT = 8

function getRecentSearches(): RecentSearch[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function addRecentSearch(query: string) {
  const current = getRecentSearches()
  const filtered = current.filter(
    (s) => s.query.toLowerCase() !== query.toLowerCase()
  )
  const updated = [{ query, timestamp: Date.now() }, ...filtered].slice(
    0,
    MAX_RECENT
  )
  localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
  return updated
}

export function SearchOverlay() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [recents, setRecents] = useState<RecentSearch[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const openOverlay = useCallback(() => {
    setOpen(true)
    setRecents(getRecentSearches())
    setSelectedIndex(-1)
  }, [])

  const closeOverlay = useCallback(() => {
    setOpen(false)
    setQuery('')
    setSelectedIndex(-1)
  }, [])

  useKeyboardShortcut('k', () => {
    if (open) {
      closeOverlay()
    } else {
      openOverlay()
    }
  })

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        closeOverlay()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, closeOverlay])

  const q = query.trim().toLowerCase()

  const storyResults = useMemo(() => {
    if (!q || q.length < 2) return []
    const words = q.split(/\s+/).filter(Boolean)
    return ALL_STORIES
      .map((s) => {
        const title = (s.title || '').toLowerCase()
        const summary = (s.summary || '').toLowerCase()
        const tags = (s.tags || []).map(t => t.toLowerCase())
        const searchable = [title, summary, ...tags].join(' ')
        let score = 0
        if (searchable.includes(q)) score += 10
        for (const word of words) {
          if (word.length < 2) continue
          if (title.includes(word)) score += 6
          else if (summary.includes(word)) score += 3
          else if (tags.some(t => t.includes(word))) score += 2
        }
        return { story: s, score }
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }, [q])

  const hasResults = query.trim().length > 0

  function handleSearch(val: string) {
    addRecentSearch(val)
    closeOverlay()
    window.location.href = `/search?q=${encodeURIComponent(val)}`
  }

  function handleNavigate(slug: string) {
    closeOverlay()
    window.location.href = `/story/${slug}`
  }

  const items = hasResults
    ? [
        { type: 'search-all' as const, label: `Search for "${query.trim()}"` },
        ...storyResults.map(r => ({ type: 'story' as const, slug: r.story.slug, title: r.story.title, category: r.story.category })),
      ]
    : []

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!hasResults && !(e.key === 'Enter' && query.trim())) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < items.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : items.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && selectedIndex < items.length) {
        const item = items[selectedIndex]
        if (item.type === 'search-all') {
          handleSearch(query.trim())
        } else if (item.type === 'story') {
          handleNavigate(item.slug)
        }
      } else if (query.trim()) {
        handleSearch(query.trim())
      }
    }
  }

  useEffect(() => {
    setSelectedIndex(-1)
  }, [query])

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const el = listRef.current.children[selectedIndex] as HTMLElement
      el?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-200"
        onClick={closeOverlay}
      />
      <div className="relative z-10 mt-[15vh] w-full max-w-xl px-4">
        <div className="rounded-2xl border border-border/50 bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask The Breakdown..."
              className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
            <button
              onClick={closeOverlay}
              className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="p-2" ref={listRef}>
            {!hasResults ? (
              <div className="space-y-1">
                {recents.length > 0 && (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2">
                      <Clock className="size-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">
                        Recent
                      </span>
                    </div>
                    {recents.slice(0, 5).map((r) => (
                      <button
                        key={r.timestamp}
                        onClick={() => handleSearch(r.query)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                      >
                        <Clock className="size-3.5 shrink-0 text-muted-foreground" />
                        <span>{r.query}</span>
                      </button>
                    ))}
                    <Separator className="my-2" />
                  </>
                )}
                <div className="flex items-center gap-2 px-3 py-2">
                  <TrendingUp className="size-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Suggested
                  </span>
                </div>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSearch(q)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <Search className="size-3.5 shrink-0 text-muted-foreground" />
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            ) : (
              <ScrollArea className="max-h-[360px]">
                <div className="space-y-0.5">
                  {/* Full search option */}
                  {query.trim().length >= 2 && (
                    <button
                      onClick={() => handleSearch(query.trim())}
                      data-index={0}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        selectedIndex === 0 ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                      }`}
                    >
                      <Search className="size-3.5 shrink-0 text-primary" />
                      <span className="font-medium">
                        Full search &ldquo;{query.trim()}&rdquo;
                      </span>
                      <ChevronRight className="size-3.5 ml-auto text-muted-foreground" />
                    </button>
                  )}

                  {/* Story suggestions */}
                  {storyResults.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 px-3 py-1.5 mt-1">
                        <BookOpen className="size-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">
                          Stories
                        </span>
                      </div>
                      {storyResults.map((r, i) => {
                        const idx = i + 1
                        return (
                          <button
                            key={r.story.slug}
                            onClick={() => handleNavigate(r.story.slug)}
                            data-index={idx}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                              selectedIndex === idx ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                            }`}
                          >
                            <BookOpen className="size-3.5 shrink-0 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <span className="block truncate font-medium">{r.story.title}</span>
                            </div>
                            <Badge variant="secondary" className="shrink-0 text-[10px] px-1.5 py-0">
                              {r.story.category}
                            </Badge>
                          </button>
                        )
                      })}
                    </>
                  )}

                  {/* No results */}
                  {storyResults.length === 0 && query.trim().length >= 2 && (
                    <p className="px-3 py-4 text-xs text-muted-foreground text-center">
                      No matching stories found. Press Enter for full search.
                    </p>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          <span className="hidden sm:inline">
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] mr-1">↑↓</kbd>
            navigate{' '}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] mr-1 ml-1">↵</kbd>
            select{' '}
          </span>
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Esc</kbd>
          {' '}close
        </p>
      </div>
    </div>
  )
}
