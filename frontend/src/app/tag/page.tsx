import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ALL_STORIES } from '@/lib/content/generated/stories'
import { slugifyTag, getAllTags } from '@/lib/utils'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'All Tags',
  description: 'Browse all topics and tags across The Breakdown\'s intelligence reports.',
  path: '/tag',
})

export default function TagIndexPage() {
  const tags = getAllTags(ALL_STORIES)
  const tagCounts: Record<string, number> = {}
  for (const s of ALL_STORIES) {
    if (s.tags) s.tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1 })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tags' },
      ]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">All Topics & Tags</h1>
        <p className="text-muted-foreground mt-2">
          {tags.length} topics across {ALL_STORIES.length} intelligence reports
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Link
            key={tag}
            href={`/tag/${slugifyTag(tag)}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted hover:border-primary/30 transition-all"
          >
            {tag}
            <span className="text-[11px] text-muted-foreground">({tagCounts[tag] || 0})</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
