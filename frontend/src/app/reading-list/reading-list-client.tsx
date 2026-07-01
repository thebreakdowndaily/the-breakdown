'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useReadingList, BookmarkedStory } from '@/lib/hooks/use-reading-list'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function ReadingListClient() {
  const { items, remove, clear } = useReadingList()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 rounded-lg border bg-muted/10 animate-pulse" />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4 text-muted-foreground"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <h2 className="text-lg font-bold font-heading mb-2">Your reading list is empty</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Bookmark reports and intelligence briefs to build a personal research library for later reference.
          </p>
          <Link href="/story">
            <Button variant="default">Browse Stories</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{items.length} story{items.length !== 1 ? 'ies' : 'y'} saved</p>
        <Button variant="ghost" size="sm" onClick={clear} className="text-xs text-muted-foreground">
          Clear all
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((story) => (
          <Link key={story.slug} href={`/story/${story.slug}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <Badge className="mb-1 w-fit text-[10px]" variant="secondary">{story.category}</Badge>
                  <h3 className="font-bold text-sm leading-snug mb-0.5">{story.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{story.summary}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    remove(story.slug)
                  }}
                  className="shrink-0 text-muted-foreground hover:text-destructive transition-colors p-1"
                  aria-label={`Remove ${story.title} from reading list`}
                  title="Remove"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
