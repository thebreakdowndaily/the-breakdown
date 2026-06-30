'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// ----- Types -----

interface MarketIndex {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

interface MarketData {
  data: MarketIndex[]
  updatedAt: number
}

// ----- Static Data (fallback + core content) -----

const CONFLICTS = [
  { flag: '🇺🇦', name: 'Ukraine-Russia War', lat: 49.5, lng: 31.0, casualties: '500K+', status: 'Active' as const, color: '#dc2626' },
  { flag: '🇮🇳', name: 'India-China Border Standoff', lat: 33.5, lng: 78.5, casualties: '45+', status: 'Stalemate' as const, color: '#f59e0b' },
  { flag: '🇮🇱', name: 'Middle East Conflict', lat: 31.0, lng: 35.0, casualties: '40K+', status: 'Ceasefire Talks' as const, color: '#f59e0b' },
  { flag: '🇹🇼', name: 'Taiwan Strait Tensions', lat: 25.0, lng: 121.0, casualties: '—', status: 'Elevated' as const, color: '#f59e0b' },
  { flag: '🇸🇩', name: 'Sudan Civil War', lat: 15.5, lng: 30.0, casualties: '20K+', status: 'Active' as const, color: '#dc2626' },
  { flag: '🇲🇲', name: 'Myanmar Civil War', lat: 22.0, lng: 96.0, casualties: '50K+', status: 'Active' as const, color: '#dc2626' },
]

const DIPLOMACY = [
  { title: 'India-EU FTA Round 9', date: 'Jun 28–30', venue: 'Brussels' },
  { title: 'Quad Foreign Ministers Meet', date: 'Jul 8', venue: 'Tokyo' },
  { title: 'UN Climate Summit (COP31)', date: 'Nov 2026', venue: 'Brisbane' },
  { title: 'SCO Heads of State Summit', date: 'Jul 4', venue: 'Astana' },
  { title: 'India-Australia 2+2 Dialogue', date: 'Jul 12', venue: 'Canberra' },
]

const WEATHER_EVENTS = [
  { title: 'Cyclone Remal Aftermath', detail: 'Bengal, 2.4M displaced, ₹15K cr damage' },
  { title: 'Heatwave — North India', detail: 'Delhi hits 48.2°C, red alert across 5 states' },
  { title: 'SW Monsoon Progress', detail: 'Covers Maharashtra, 12% deficit, slow advance' },
  { title: 'Glacial Lake Outburst Risk', detail: 'Sikkim, 14 lakes identified, 2 critical' },
  { title: 'Europe Heatwave', detail: 'France & UK break June temperature records' },
]

const MARKET_FALLBACK: MarketIndex[] = [
  { symbol: 'SPX', name: 'S&P 500', price: 5632, change: 44.3, changePercent: 0.8 },
  { symbol: 'N225', name: 'Nikkei 225', price: 39841, change: -119.5, changePercent: -0.3 },
  { symbol: 'FTSE', name: 'FTSE 100', price: 8214, change: 16.4, changePercent: 0.2 },
  { symbol: 'SHCOMP', name: 'Shanghai Composite', price: 3102, change: -18.6, changePercent: -0.6 },
  { symbol: 'SENSEX', name: 'SENSEX', price: 81456, change: 407.3, changePercent: 0.5 },
  { symbol: 'NIFTY', name: 'NIFTY 50', price: 24812, change: 148.9, changePercent: 0.6 },
]

// ----- Dynamic Map Import -----

const SituationMap = dynamic(() => import('./situation-map').then(m => m.SituationMap), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] rounded-xl border bg-muted/20 flex items-center justify-center text-muted-foreground text-sm">
      Loading interactive map…
    </div>
  ),
})

// ----- Helpers -----

function Change({ value, dir }: { value: string; dir: 'up' | 'down' }) {
  return (
    <span className={dir === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
      {dir === 'up' ? '▲' : '▼'} {value}
    </span>
  )
}

function formatPrice(p: number): string {
  if (p >= 10000) return p.toLocaleString('en-IN')
  if (p >= 1000) return p.toLocaleString('en-US')
  return p.toFixed(2)
}

// ----- Main Component -----

export function GlobalSituationRoom() {
  const [markets, setMarkets] = useState<MarketIndex[]>(MARKET_FALLBACK)
  const [marketTs, setMarketTs] = useState<number | null>(null)
  const [marketError, setMarketError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchMarkets() {
      try {
        // Try the Cloudflare Pages Function first
        const res = await fetch('/api/markets')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json: MarketData = await res.json()
        if (!cancelled && json?.data?.length) {
          setMarkets(json.data)
          setMarketTs(json.updatedAt)
          setMarketError(false)
        }
      } catch {
        // Try build-time static snapshot
        try {
          const res = await fetch('/data/markets.json')
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const json: MarketData = await res.json()
          if (!cancelled && json?.data?.length) {
            setMarkets(json.data)
            setMarketTs(json.updatedAt)
            setMarketError(false)
          }
        } catch {
          if (!cancelled) setMarketError(true)
        }
      }
    }

    fetchMarkets()
    const interval = setInterval(fetchMarkets, 120_000) // poll every 2 min
    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-heading">Global Situation Room</h2>
        <Link href="/world" className="text-sm text-muted-foreground hover:text-foreground">Full Map →</Link>
      </div>

      {/* Interactive World Map */}
      <div className="mb-6">
        <SituationMap conflicts={CONFLICTS} />
      </div>

      {/* 2×2 Info Panels */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Active Conflicts */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 rounded-xl ring-1 ring-[var(--saffron)]/40 animate-pulse pointer-events-none" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-[var(--saffron)]" />
              Active Conflicts
              <Badge variant="outline" className="ml-auto text-[10px]">{CONFLICTS.length} tracked</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2.5">
              {CONFLICTS.map((c, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate"><span className="mr-1.5">{c.flag}</span>{c.name}</span>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-xs text-muted-foreground">{c.casualties}</span>
                      <Badge variant="outline" className="text-[10px]">{c.status}</Badge>
                    </div>
                  </div>
                  {i < CONFLICTS.length - 1 && <Separator className="mt-2.5" />}
                </div>
              ))}
            </div>
            <Link href="/world" className="block mt-3 text-xs text-muted-foreground hover:text-foreground">
              View All Conflicts →
            </Link>
          </CardContent>
        </Card>

        {/* Diplomatic Trackers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-blue-500" />
              Diplomatic Trackers
              <Badge variant="outline" className="ml-auto text-[10px]">{DIPLOMACY.length} upcoming</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2.5">
              {DIPLOMACY.map((d, i) => (
                <div key={i}>
                  <div className="flex items-start justify-between text-sm gap-2">
                    <span className="font-medium text-sm">{d.title}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{d.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.venue}</p>
                  {i < DIPLOMACY.length - 1 && <Separator className="mt-2.5" />}
                </div>
              ))}
            </div>
            <Link href="/world" className="block mt-3 text-xs text-muted-foreground hover:text-foreground">
              View All Diplomatic Events →
            </Link>
          </CardContent>
        </Card>

        {/* Global Markets — Live Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-green-500" />
              Global Markets
              {marketError ? (
                <Badge variant="outline" className="ml-auto text-[10px] text-amber-500">cached</Badge>
              ) : (
                <Badge variant="outline" className="ml-auto text-[10px] text-green-500">
                  {marketTs ? `live ${new Date(marketTs).toLocaleTimeString()}` : 'loading…'}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2.5">
              {markets.map((m, i) => (
                <div key={m.symbol}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{m.name}</span>
                      <span className="text-xs text-muted-foreground">{m.symbol}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="tabular-nums text-sm">{formatPrice(m.price)}</span>
                      <div className="flex items-center gap-1 min-w-[60px] justify-end">
                        <span className={m.changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
                          {m.changePercent >= 0 ? '▲' : '▼'}
                        </span>
                        <span className={`text-xs tabular-nums ${m.changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                          {m.changePercent >= 0 ? '+' : ''}{m.changePercent}%
                        </span>
                      </div>
                    </div>
                  </div>
                  {i < markets.length - 1 && <Separator className="mt-2.5" />}
                </div>
              ))}
            </div>
            <Link href="/data-lab" className="block mt-3 text-xs text-muted-foreground hover:text-foreground">
              View All Markets & Economic Data →
            </Link>
          </CardContent>
        </Card>

        {/* Weather / Climate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-amber-500" />
              Weather & Climate
              <Badge variant="outline" className="ml-auto text-[10px]">IMD • global</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2.5">
              {WEATHER_EVENTS.map((w, i) => (
                <div key={i}>
                  <div className="flex items-start justify-between text-sm gap-2">
                    <span className="font-medium text-sm">{w.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{w.detail}</p>
                  {i < WEATHER_EVENTS.length - 1 && <Separator className="mt-2.5" />}
                </div>
              ))}
            </div>
            <Link href="/search?q=climate+weather+india+2026" className="block mt-3 text-xs text-muted-foreground hover:text-foreground">
              View All Climate Data →
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
