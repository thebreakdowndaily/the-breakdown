import { notFound } from 'next/navigation'
import { getReport, getAllReportSlugs } from '@/lib/content/reports'
import { ReportLayout } from '@/components/story/report-layout'
import { ALL_STORIES } from '@/lib/content/generated/stories'
import type { IntelligenceReport } from '@/types'
import type { Metadata } from 'next'

interface StoryPageProps {
  params: Promise<{ slug: string }>
}

const SITE_URL = process.env.SITE_URL || 'https://thebreakdown.in'

export async function generateStaticParams() {
  try {
    const slugs = await getAllReportSlugs()
    return slugs.length ? slugs.map((slug) => ({ slug })) : [{ slug: "fallback" }]
  } catch {
    return [{ slug: "fallback" }]
  }
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const report = await getReport(slug)
  if (!report) return { title: 'Report Not Found — The Breakdown' }
  return {
    title: `${report.title} — The Breakdown OS`,
    description: report.summary,
    openGraph: {
      title: report.title,
      description: report.summary,
      type: 'article',
      publishedTime: report.publishedAt,
      images: report.hero ? [{ url: report.hero, width: 1200, height: 630 }] : [],
    },
  }
}

function storyJsonLd(report: Awaited<ReturnType<typeof getReport>>) {
  if (!report) return ''
  const url = `${SITE_URL}/story/${report.slug}`
  const imageUrl = report.hero ? `${SITE_URL}${report.hero.startsWith('/') ? report.hero : '/' + report.hero}` : `${SITE_URL}/og-image.svg`
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        headline: report.title,
        description: report.summary,
        url,
        image: imageUrl,
        datePublished: report.publishedAt,
        dateModified: report.publishedAt,
        author: {
          '@type': 'Person',
          name: report.author || 'Editorial Intelligence Unit',
        },
        publisher: {
          '@type': 'Organization',
          name: 'The Breakdown',
          url: SITE_URL,
          logo: `${SITE_URL}/og-image.svg`,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      },
      {
        '@type': 'Organization',
        name: 'The Breakdown',
        url: SITE_URL,
        logo: `${SITE_URL}/og-image.svg`,
        description: "India's first Visual Intelligence Platform. Evidence-driven intelligence reports, data lab, policy analysis, accountability tracking, and global situational awareness.",
        foundingDate: '2025',
      },
    ],
  })
}

function getRelatedStories(report: IntelligenceReport | null, count = 4): (IntelligenceReport & { body?: string })[] {
  if (!report) return []
  return [...ALL_STORIES]
    .filter(s => s.slug !== report.slug && s.tags?.some(t => report.tags?.includes(t)))
    .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))
    .slice(0, count)
}

function getPrevNextStories(currentSlug: string): {
  prevStory: { slug: string; title: string } | null
  nextStory: { slug: string; title: string } | null
} {
  const sorted = [...ALL_STORIES]
    .filter(s => s.publishedAt)
    .sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0))

  const idx = sorted.findIndex(s => s.slug === currentSlug)
  if (idx === -1) return { prevStory: null, nextStory: null }

  return {
    prevStory: idx < sorted.length - 1 ? { slug: sorted[idx + 1].slug, title: sorted[idx + 1].title } : null,
    nextStory: idx > 0 ? { slug: sorted[idx - 1].slug, title: sorted[idx - 1].title } : null,
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const report = await getReport(slug)
  if (!report) notFound()
  const relatedStories = getRelatedStories(report)
  const { prevStory, nextStory } = getPrevNextStories(slug)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: storyJsonLd(report) }}
      />
      <ReportLayout report={report} relatedStories={relatedStories} prevStory={prevStory} nextStory={nextStory} />
    </>
  )
}
