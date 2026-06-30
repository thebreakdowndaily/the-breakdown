'use client'

import { useEffect, useState } from 'react'
import { useReadingList, BookmarkedStory } from '@/lib/hooks/use-reading-list'
import { Button } from '@/components/ui/button'

interface BookmarkButtonProps {
  story: BookmarkedStory
  className?: string
}

export function BookmarkButton({ story, className }: BookmarkButtonProps) {
  const { isSaved, toggle } = useReadingList()
  const [saved, setSaved] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) setSaved(isSaved(story.slug))
  }, [mounted, isSaved, story.slug])

  if (!mounted) {
    return <div className={`w-8 h-8 ${className || ''}`} />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        toggle(story)
        setSaved(!saved)
      }}
      className={className}
      aria-label={saved ? 'Remove from reading list' : 'Save to reading list'}
      title={saved ? 'Remove from reading list' : 'Save to reading list'}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </Button>
  )
}
