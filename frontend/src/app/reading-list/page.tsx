import type { Metadata } from 'next'
import { ReadingListClient } from './reading-list-client'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'

export const metadata: Metadata = generatePageMetadata({
  title: 'Reading List',
  description: 'Your saved stories — bookmark stories to read later.',
  path: '/reading-list',
})

export default function ReadingListPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Reading List' },
        ]} />

        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">Reading List</h1>
        <p className="text-muted-foreground mb-8">Stories you have bookmarked for later reading — your personal research queue.</p>

        <ReadingListClient />
      </div>
    </main>
  )
}
