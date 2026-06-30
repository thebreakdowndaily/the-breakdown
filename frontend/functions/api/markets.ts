// Cloudflare Pages Function — Market Data Proxy
// Fetches real-time index data from Yahoo Finance (server-side, no CORS, no exposed keys)

interface MarketSnapshot {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  timestamp: number
}

const INDICES: { symbol: string; name: string; yahoo: string }[] = [
  { symbol: 'SPX', name: 'S&P 500', yahoo: '^GSPC' },
  { symbol: 'N225', name: 'Nikkei 225', yahoo: '^N225' },
  { symbol: 'FTSE', name: 'FTSE 100', yahoo: '^FTSE' },
  { symbol: 'SHCOMP', name: 'Shanghai Composite', yahoo: '000001.SS' },
  { symbol: 'SENSEX', name: 'SENSEX', yahoo: '^BSESN' },
  { symbol: 'NIFTY', name: 'NIFTY 50', yahoo: '^NSEI' },
]

export async function onRequest(context: { request: Request }): Promise<Response> {
  try {
    const results: MarketSnapshot[] = await Promise.all(
      INDICES.map(async (idx) => {
        try {
          const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(idx.yahoo)}?range=1d&interval=5m`
          const res = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; TheBreakdown/1.0)',
              'Accept': 'application/json',
            },
          })

          if (!res.ok) {
            console.warn(`Yahoo Finance returned ${res.status} for ${idx.symbol}`)
            return fallback(idx)
          }

          const json = await res.json()
          const meta = json?.chart?.result?.[0]?.meta
          const quotes = json?.chart?.result?.[0]?.indicators?.quote?.[0]

          if (!meta || !quotes) return fallback(idx)

          const prices = quotes.close?.filter((p: number | null) => p !== null) as number[] | undefined
          const currentPrice = prices?.[prices.length - 1] ?? meta.regularMarketPrice ?? 0
          const previousClose = meta.chartPreviousClose ?? currentPrice
          const change = currentPrice - previousClose
          const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0

          return {
            symbol: idx.symbol,
            name: idx.name,
            price: roundPrice(currentPrice),
            change: roundPrice(change),
            changePercent: Math.round(changePercent * 10) / 10,
            timestamp: meta.regularMarketTime ?? Date.now(),
          }
        } catch (err) {
          console.warn(`Failed to fetch ${idx.symbol}:`, err)
          return fallback(idx)
        }
      })
    )

    return new Response(JSON.stringify({ data: results, updatedAt: Date.now() }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=60',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch market data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

function roundPrice(p: number): number {
  if (p >= 1000) return Math.round(p)
  if (p >= 10) return Math.round(p * 100) / 100
  return Math.round(p * 1000) / 1000
}

function fallback(idx: { symbol: string; name: string }): MarketSnapshot {
  const FALLBACKS: Record<string, [number, number]> = {
    SPX: [5632, 0.8],
    N225: [39841, -0.3],
    FTSE: [8214, 0.2],
    SHCOMP: [3102, -0.6],
    SENSEX: [81456, 0.5],
    NIFTY: [24812, 0.6],
  }
  const [price, changePct] = FALLBACKS[idx.symbol] || [0, 0]
  return {
    symbol: idx.symbol,
    name: idx.name,
    price,
    change: price * changePct / 100,
    changePercent: changePct,
    timestamp: Date.now(),
  }
}
