import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { SearchPageClient } from './search-page-client'

export const metadata: Metadata = generatePageMetadata({
  title: 'Search',
  description: 'Search all intelligence reports, data labs, policy analysis, and articles on The Breakdown OS.',
  path: '/search',
})

export default function SearchPage() {
  return <SearchPageClient />
}
