// Build-time market data snapshot
// Fetches index data from Yahoo Finance and saves to public/data/markets.json
// Falls back gracefully if fetch fails

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const INDICES = [
  { symbol: 'SPX', name: 'S&P 500', yahoo: '^GSPC' },
  { symbol: 'N225', name: 'Nikkei 225', yahoo: '^N225' },
  { symbol: 'FTSE', name: 'FTSE 100', yahoo: '^FTSE' },
  { symbol: 'SHCOMP', name: 'Shanghai Composite', yahoo: '000001.SS' },
  { symbol: 'SENSEX', name: 'SENSEX', yahoo: '^BSESN' },
  { symbol: 'NIFTY', name: 'NIFTY 50', yahoo: '^NSEI' },
]

const FALLBACKS = {
  SPX: { price: 5632, change: 44.3, changePercent: 0.8 },
  N225: { price: 39841, change: -119.5, changePercent: -0.3 },
  FTSE: { price: 8214, change: 16.4, changePercent: 0.2 },
  SHCOMP: { price: 3102, change: -18.6, changePercent: -0.6 },
  SENSEX: { price: 81456, change: 407.3, changePercent: 0.5 },
  NIFTY: { price: 24812, change: 148.9, changePercent: 0.6 },
}

async function fetchMarketData() {
  const results = []

  for (const idx of INDICES) {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(idx.yahoo)}?range=1d&interval=1d`
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; TheBreakdown-Build/1.0)',
          'Accept': 'application/json',
        },
      })

      if (!res.ok) {
        console.warn(`  ⚠ Yahoo returned ${res.status} for ${idx.symbol}, using fallback`)
        results.push({ ...idx, ...FALLBACKS[idx.symbol] })
        continue
      }

      const json = await res.json()
      const meta = json?.chart?.result?.[0]?.meta
      const quotes = json?.chart?.result?.[0]?.indicators?.quote?.[0]

      if (!meta || !quotes) {
        results.push({ ...idx, ...FALLBACKS[idx.symbol] })
        continue
      }

      const prices = quotes.close?.filter((p) => p !== null)
      const currentPrice = prices?.[prices.length - 1] ?? meta.regularMarketPrice ?? 0
      const previousClose = meta.chartPreviousClose ?? currentPrice
      const change = currentPrice - previousClose
      const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0

      results.push({
        symbol: idx.symbol,
        name: idx.name,
        price: roundPrice(currentPrice),
        change: roundPrice(change),
        changePercent: Math.round(changePercent * 10) / 10,
      })

      console.log(`  ✓ ${idx.symbol}: ${roundPrice(currentPrice)} (${Math.round(changePercent * 10) / 10}%)`)
    } catch {
      console.warn(`  ⚠ Error fetching ${idx.symbol}, using fallback`)
      results.push({ ...idx, ...FALLBACKS[idx.symbol] })
    }
  }

  return results
}

function roundPrice(p) {
  if (p >= 1000) return Math.round(p)
  if (p >= 10) return Math.round(p * 100) / 100
  return Math.round(p * 1000) / 1000
}

const outDir = join(__dirname, '..', 'public', 'data')
const outPath = join(outDir, 'markets.json')

console.log('📊 Fetching market data...')

const data = await fetchMarketData()
const output = { data, updatedAt: Date.now() }

writeFileSync(outPath, JSON.stringify(output, null, 2))
console.log(`✓ Wrote ${outPath} (${data.length} indices)`)
