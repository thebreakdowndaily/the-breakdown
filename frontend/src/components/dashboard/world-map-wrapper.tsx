'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const WorldMapInner = dynamic(() => import('./world-map').then(m => m.WorldMap), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] rounded-lg border bg-muted/20 flex items-center justify-center text-muted-foreground text-sm">
      Loading map…
    </div>
  ),
})

interface WorldMapWrapperProps {
  stories: { slug: string; title: string; summary: string; category: string; publishedAt?: string }[]
  onCountryChange?: (country: string | null) => void
}

export function WorldMapWrapper({ stories, onCountryChange }: WorldMapWrapperProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  function handleCountrySelect(country: string | null) {
    setSelectedCountry(country)
    onCountryChange?.(country)
  }

  const filteredStories = selectedCountry
    ? stories.filter(s => {
        const q = selectedCountry.toLowerCase()
        return (s.title || '').toLowerCase().includes(q) || (s.summary || '').toLowerCase().includes(q)
      })
    : stories

  return (
    <div>
      <WorldMapInner selectedCountry={selectedCountry} onCountrySelect={handleCountrySelect} />

      {selectedCountry && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            Showing stories about <strong>{selectedCountry}</strong>
          </span>
          <button
            onClick={() => handleCountrySelect(null)}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            Clear filter
          </button>
        </div>
      )}

      {filteredStories.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredStories.map(s => (
            <a key={s.slug} href={`/story/${s.slug}`} className="block">
              <div className="rounded-lg border p-5 h-full hover:bg-muted/50 transition-colors cursor-pointer">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors mb-2">
                  {s.category}
                </span>
                <h3 className="font-bold text-sm mb-1 line-clamp-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{s.summary}</p>
              </div>
            </a>
          ))}
        </div>
      ) : selectedCountry ? (
        <div className="rounded-xl border bg-muted/30 h-[120px] flex items-center justify-center mt-4">
          <p className="text-muted-foreground text-sm">No stories found for this country.</p>
        </div>
      ) : null}
    </div>
  )
}
