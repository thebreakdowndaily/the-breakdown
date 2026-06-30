'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ALL_STORIES } from '@/lib/content/generated/stories'

// ----- Types -----

interface TimelineEvent {
  time: string
  title: string
  description: string
  category: string
  slug?: string
}

// ----- Helpers -----

function formatTime(isoString?: string): string {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
    hour12: true,
  })
}

function storyToEvent(story: { title: string; summary: string; category: string; publishedAt?: string; slug?: string }): TimelineEvent | null {
  if (!story.publishedAt) return null
  return {
    time: formatTime(story.publishedAt),
    title: story.title,
    description: story.summary || '',
    category: story.category || 'Story',
    slug: story.slug,
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  Economy: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Policy: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Markets: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Technology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  Security: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  Politics: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Geopolitics: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Climate: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
}

// ----- Fallback static events when no stories are recent -----

const FALLBACK_EVENTS: TimelineEvent[] = [
  {
    time: '09:30 AM',
    title: 'RBI MPC Minutes Released',
    description: 'Minutes of June 3-5 MPC meeting show 5-1 vote to hold repo rate at 6.00%. Governor Das highlights inflation risks from food prices.',
    category: 'Economy',
  },
  {
    time: '12:15 PM',
    title: 'PM Modi Reviews Hydrogen Mission Progress',
    description: 'Prime Minister chairs high-level review of National Green Hydrogen Mission. DAE presents world-first nuclear hydrogen plant at Kalpakkam.',
    category: 'Policy',
  },
  {
    time: '03:45 PM',
    title: 'Markets Close at Record Highs',
    description: 'Sensex closes at 81,456 (+0.5%), Nifty at 24,812 (+0.6%). Realty and IT stocks lead gains on strong FII inflows.',
    category: 'Markets',
  },
]

// ----- Main Component -----

export function DashboardTimeline() {
  const todayEvents = useMemo(() => {
    // Try to derive events from stories published today
    const today = new Date()
    const todayStr = today.toISOString().slice(0, 10)

    const todayStories = ALL_STORIES.filter(s => {
      if (!s.publishedAt) return false
      const storyDate = new Date(s.publishedAt)
      const diffDays = Math.abs((today.getTime() - storyDate.getTime()) / (1000 * 60 * 60 * 24))
      return diffDays <= 7 // stories from last 7 days
    })

    const events: TimelineEvent[] = []

    // Add story-based events
    todayStories.slice(0, 5).forEach(s => {
      const e = storyToEvent(s)
      if (e) events.push(e)
    })

    // If not enough, pad with fallback
    if (events.length < 3) {
      const needed = 3 - events.length
      events.push(...FALLBACK_EVENTS.slice(0, needed))
    }

    return events.slice(0, 5)
  }, [])

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold font-heading">Timeline of the Day</h2>
          <Badge variant="outline" className="text-[10px]">
            {new Date().toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Badge>
        </div>
        <Link href="/timelines" className="text-sm text-muted-foreground hover:text-foreground">All Timelines →</Link>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
            <div className="space-y-6">
              {todayEvents.map((e, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-[7px] top-1.5 size-2.5 rounded-full bg-primary ring-2 ring-background" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground font-mono">{e.time}</span>
                        <Badge className={`text-[10px] ${CATEGORY_COLORS[e.category] || ''} border-0`}>{e.category}</Badge>
                      </div>
                      {e.slug ? (
                        <Link href={`/story/${e.slug}`} className="group">
                          <h3 className="text-sm font-medium group-hover:text-primary transition-colors">{e.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{e.description}</p>
                        </Link>
                      ) : (
                        <>
                          <h3 className="text-sm font-medium">{e.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 max-w-lg">{e.description}</p>
                        </>
                      )}
                    </div>
                    {e.slug && (
                      <Link
                        href={`/story/${e.slug}`}
                        className="shrink-0 text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 mt-1"
                      >
                        Read →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-6 pt-4 border-t flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span>
              <strong className="text-foreground">{todayEvents.length}</strong> events today
            </span>
            <span>
              <strong className="text-foreground">{ALL_STORIES.length}</strong> stories in pipeline
            </span>
            <Link href="/timelines" className="underline underline-offset-2 hover:text-foreground">
              View full timelines →
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
