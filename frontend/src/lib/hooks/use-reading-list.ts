'use client'

import { useState, useEffect, useCallback } from 'react'

export interface BookmarkedStory {
  slug: string
  title: string
  summary: string
  category: string
  savedAt: string
}

const STORAGE_KEY = 'tbd-reading-list'

export function useReadingList() {
  const [items, setItems] = useState<BookmarkedStory[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch { /* ignore */ }
  }, [])

  const save = useCallback((story: BookmarkedStory) => {
    setItems(prev => {
      const exists = prev.some(i => i.slug === story.slug)
      if (exists) return prev
      const updated = [story, ...prev]
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch { /* ignore */ }
      return updated
    })
  }, [])

  const remove = useCallback((slug: string) => {
    setItems(prev => {
      const updated = prev.filter(i => i.slug !== slug)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch { /* ignore */ }
      return updated
    })
  }, [])

  const isSaved = useCallback((slug: string) => {
    return items.some(i => i.slug === slug)
  }, [items])

  const toggle = useCallback((story: BookmarkedStory) => {
    if (isSaved(story.slug)) {
      remove(story.slug)
    } else {
      save(story)
    }
  }, [isSaved, save, remove])

  const clear = useCallback(() => {
    setItems([])
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  }, [])

  return { items, save, remove, isSaved, toggle, clear }
}
