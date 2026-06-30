import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllCountries } from '@/lib/content/countries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'

export const metadata: Metadata = generatePageMetadata({
  title: 'Country Profiles',
  description: 'Every country, quantified. GDP, military, education, health, AI, energy, trade — in one place. Comprehensive country intelligence.',
  path: '/country-profiles',
})

export default function CountryProfilesPage() {
  const countries = getAllCountries()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Country Profiles</h1>
        <p className="text-muted-foreground mt-2">Every country, quantified. GDP, military, education, health, AI, energy, trade — in one place.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {countries.map(c => (
          <Link key={c.code} href={`/country-profiles/${c.code}`}>
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{c.name} ({c.code})</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View full profile &rarr;</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
