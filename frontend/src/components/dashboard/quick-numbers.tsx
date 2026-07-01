'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

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

// ----- Static Economic Indicators -----
// These are published quarterly/monthly by RBI, MOSPI, etc.
// Updated when new data is released by the respective authorities.

interface QuickNumber {
  label: string
  value: string
  change: string
  positive: boolean | null // true=up, false=down, null=neutral
}

const ECONOMIC_INDICATORS: QuickNumber[] = [
  { label: 'GDP Growth (FY26)', value: '6.4%', change: '+0.3pp', positive: true },
  { label: 'CPI Inflation', value: '4.2%', change: '-0.5pp', positive: true },
  { label: 'RBI Repo Rate', value: '6.00%', change: 'held steady', positive: null },
]

const NIFTY_FALLBACK: QuickNumber = {
  label: 'NIFTY 50',
  value: '23,894',
  change: '-0.2%',
  positive: false,
}

// ----- Helpers -----

function formatNiftyPrice(price: number): string {
  return Math.round(price).toLocaleString('en-IN')
}

function deriveNiftyChange(changePercent: number): string {
  const sign = changePercent >= 0 ? '+' : ''
  return `${sign}${changePercent.toFixed(1)}%`
}

// ----- Component -----

export function QuickNumbers() {
  const [nifty, setNifty] = useState<QuickNumber>(NIFTY_FALLBACK)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchNifty() {
      try {
        const res = await fetch('/data/markets.json')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json: MarketData = await res.json()
        if (cancelled || !json?.data?.length) return

        const niftyData = json.data.find(m => m.symbol === 'NIFTY')
        if (niftyData) {
          setNifty({
            label: 'NIFTY 50',
            value: formatNiftyPrice(niftyData.price),
            change: deriveNiftyChange(niftyData.changePercent),
            positive: niftyData.changePercent >= 0,
          })
          setLive(true)
        }
      } catch {
        // Keep fallback
      }
    }

    fetchNifty()
    return () => { cancelled = true }
  }, [])

  const allNumbers = [...ECONOMIC_INDICATORS, nifty]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {allNumbers.map(n => (
        <Card key={n.label} className="card-hover">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{n.label}</p>
            <p className="text-2xl font-bold font-heading mt-1 tabular-nums">
              {n.value}
            </p>
            <p className={
              n.positive === true ? 'text-xs mt-1 text-green-500' :
              n.positive === false ? 'text-xs mt-1 text-red-500' :
              'text-xs mt-1 text-muted-foreground'
            }>
              {n.change}
              {n.label === 'NIFTY 50' && live && (
                <span className="ml-1 text-[10px] text-muted-foreground/50">live</span>
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
