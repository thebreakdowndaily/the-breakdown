'use client'

import { AISearch } from '@/components/ai/ai-search'
import { SearchOverlay } from '@/components/ai/search-overlay'
import { Search } from 'lucide-react'

export function SearchPageClient() {
  return (
    <>
      <SearchOverlay />
      <div className="min-h-screen px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <Search className="size-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Search</h1>
                <p className="text-xs text-muted-foreground">
                  Ask The Breakdown — search with intelligence
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-2.5 py-1.5 text-xs text-muted-foreground sm:flex">
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">
                ⌘
              </kbd>
              <span className="text-muted-foreground">+</span>
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">
                K
              </kbd>
            </div>
          </div>
          <AISearch />
        </div>
      </div>
    </>
  )
}
