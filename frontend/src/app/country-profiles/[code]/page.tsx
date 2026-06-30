import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCountryByCode, getAllCountryCodes } from '@/lib/content/countries'
import { ENTITIES } from '@/lib/content/knowledge'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import type { Metadata } from 'next'

interface CountryPageProps {
  params: Promise<{ code: string }>
}

export async function generateStaticParams() {
  const codes = getAllCountryCodes()
  return codes.map((code) => ({ code }))
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { code } = await params
  const country = getCountryByCode(code.toUpperCase())
  if (!country) return { title: 'Country Not Found' }
  return {
    title: `${country.name} Profile — The Breakdown OS`,
    description: country.description,
    openGraph: {
      title: `${country.name} — Country Profile`,
      description: country.description,
    },
  }
}

function formatNumber(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}T`
  if (n >= 1e8) return `${(n / 1e7).toFixed(0)}Cr`
  return n.toLocaleString()
}

function formatPopulation(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (n >= 1e7) return `${(n / 1e7).toFixed(1)}Cr`
  return n.toLocaleString()
}

function formatCurrency(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`
  return `$${n.toLocaleString()}`
}

const energyColors: Record<string, string> = {
  Coal: 'bg-gray-700',
  Renewable: 'bg-green-india',
  Hydro: 'bg-blue-500',
  'Natural Gas': 'bg-orange-400',
  Nuclear: 'bg-purple-500',
  Oil: 'bg-amber-600',
}

export default async function CountryProfilePage({ params }: CountryPageProps) {
  const { code } = await params
  const country = getCountryByCode(code.toUpperCase())
  if (!country) notFound()

  // Find matching Knowledge Graph entity by name
  const kgEntity = ENTITIES.find(e => e.name === country.name)

  const maxTradeExport = Math.max(...country.tradePartners.map(t => t.exportValue))
  const maxTradeImport = Math.max(...country.tradePartners.map(t => t.importValue))

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Country Profiles', href: '/country-profiles' },
        { label: country.name },
      ]} />

      <div className="flex items-center gap-6">
        <span className="text-6xl">{country.flag}</span>
        <div>
          <h1 className="text-4xl font-bold font-heading">{country.name}</h1>
          <p className="text-muted-foreground text-lg">Capital: {country.capital}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Population', value: formatPopulation(country.population) },
          { label: 'GDP', value: formatNumber(country.gdp) },
          { label: 'GDP Growth', value: `${country.gdpGrowth}%`, color: country.gdpGrowth > 0 ? 'text-green-india' : 'text-red-500' },
          { label: 'Inflation', value: `${country.inflation}%`, color: country.inflation > 5 ? 'text-red-500' : 'text-green-india' },
          { label: 'Military Spending', value: formatCurrency(country.militarySpending) },
        ].map(m => (
          <div key={m.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">{m.label}</p>
            <p className={`text-2xl font-bold font-heading ${m.color || ''}`}>{m.value}</p>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground leading-relaxed max-w-4xl">{country.description}</p>

      <section>
        <h2 className="text-2xl font-bold font-heading mb-4">Economy</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold mb-3">Top Exports</h3>
            <ul className="space-y-2">
              {country.topExports.map((e, i) => (
                <li key={e} className="flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold mb-3">Top Imports</h3>
            <ul className="space-y-2">
              {country.topImports.map((e, i) => (
                <li key={e} className="flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-heading mb-4">Energy Mix</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex h-8 rounded-lg overflow-hidden">
            {country.energyMix.map(e => (
              <div
                key={e.source}
                className={`${energyColors[e.source] || 'bg-gray-400'} flex items-center justify-center text-xs text-white font-medium`}
                style={{ width: `${e.percentage}%` }}
              >
                {e.percentage > 8 ? `${e.source} ${e.percentage}%` : ''}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {country.energyMix.map(e => (
              <div key={e.source} className="flex items-center gap-2 text-sm">
                <span className={`w-3 h-3 rounded-full ${energyColors[e.source] || 'bg-gray-400'}`} />
                <span>{e.source}</span>
                <span className="text-muted-foreground">{e.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-heading mb-4">Global Rankings</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Education', rank: country.educationRank, index: country.educationIndex },
            { label: 'Health', rank: country.healthRank, index: country.healthIndex },
            { label: 'AI', rank: country.aiRanking, index: country.aiIndex },
            { label: 'Military', rank: country.militaryRank, index: null },
          ].map(r => (
            <div key={r.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-sm text-muted-foreground">{r.label}</p>
              <p className="text-3xl font-bold font-heading mt-1">#{r.rank}</p>
              {r.index !== null && (
                <p className="text-xs text-muted-foreground mt-1">Index: {r.index.toFixed(2)}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-heading mb-4">Trade Partners</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          {country.tradePartners.map(tp => (
            <div key={tp.country}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{tp.country}</span>
                <span className="text-muted-foreground">Exp: {formatCurrency(tp.exportValue)} / Imp: {formatCurrency(tp.importValue)}</span>
              </div>
              <div className="flex gap-1 h-3">
                <div className="flex-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(tp.exportValue / maxTradeExport) * 100}%` }}
                  />
                </div>
                <div className="flex-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${(tp.importValue / maxTradeImport) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>Exports</span>
                <span>Imports</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
        <Link
          href={`/timelines?country=${country.code}`}
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-9 gap-2 px-4 bg-primary text-primary-foreground hover:bg-primary/80"
        >
          View Timeline
        </Link>
        <Link
          href={kgEntity ? `/knowledge/${kgEntity.id}` : `/search?q=${encodeURIComponent(country.name)}`}
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-9 gap-2 px-4 bg-accent text-accent-foreground hover:bg-accent/80"
        >
          View in Knowledge Graph
        </Link>
        <Link
          href="/country-profiles"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-input bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-9 gap-2 px-4 hover:bg-muted"
        >
          Back to Countries
        </Link>
      </div>
    </div>
  )
}
