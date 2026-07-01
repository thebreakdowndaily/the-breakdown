import type { MetadataRoute } from 'next'
import { getAllReportSlugs } from '@/lib/content/reports'
import { FIX_STORIES } from '@/lib/content/fix'
import { getAllPolicySlugs } from '@/lib/content/policies'
import { getAllTimelineSlugs } from '@/lib/content/timelines'
import { getAllCountryCodes } from '@/lib/content/countries'
import { ENTITIES } from '@/lib/content/knowledge'

export const dynamic = 'force-static'

const SITE_URL = process.env.SITE_URL || 'https://thebreakdown.in'

const staticRoutes: { path: string; priority: number; changeFreq: 'daily' | 'weekly' | 'monthly' }[] = [
  { path: '/', priority: 1.0, changeFreq: 'daily' },
  { path: '/intelligence', priority: 0.9, changeFreq: 'daily' },
  { path: '/explained', priority: 0.8, changeFreq: 'weekly' },
  { path: '/the-fix', priority: 0.8, changeFreq: 'weekly' },
  { path: '/data-lab', priority: 0.7, changeFreq: 'weekly' },
  { path: '/data-lab/gdp', priority: 0.6, changeFreq: 'monthly' },
  { path: '/data-lab/inflation', priority: 0.6, changeFreq: 'monthly' },
  { path: '/data-lab/budget', priority: 0.6, changeFreq: 'monthly' },
  { path: '/data-lab/military', priority: 0.6, changeFreq: 'monthly' },
  { path: '/data-lab/education', priority: 0.6, changeFreq: 'monthly' },
  { path: '/data-lab/health', priority: 0.6, changeFreq: 'monthly' },
  { path: '/data-lab/population', priority: 0.6, changeFreq: 'monthly' },
  { path: '/data-lab/ai', priority: 0.6, changeFreq: 'monthly' },
  { path: '/data-lab/energy', priority: 0.6, changeFreq: 'monthly' },
  { path: '/data-lab/trade', priority: 0.6, changeFreq: 'monthly' },
  { path: '/accountability', priority: 0.8, changeFreq: 'weekly' },
  { path: '/accountability/spending', priority: 0.7, changeFreq: 'weekly' },
  { path: '/accountability/projects', priority: 0.7, changeFreq: 'weekly' },
  { path: '/accountability/promises', priority: 0.7, changeFreq: 'weekly' },
  { path: '/accountability/rti', priority: 0.6, changeFreq: 'monthly' },
  { path: '/india', priority: 0.8, changeFreq: 'weekly' },
  { path: '/world', priority: 0.8, changeFreq: 'daily' },
  { path: '/ai-technology', priority: 0.8, changeFreq: 'weekly' },
  { path: '/policy-lab', priority: 0.7, changeFreq: 'weekly' },
  { path: '/timelines', priority: 0.7, changeFreq: 'weekly' },
  { path: '/country-profiles', priority: 0.7, changeFreq: 'weekly' },
  { path: '/search', priority: 0.5, changeFreq: 'monthly' },
  { path: '/knowledge', priority: 0.6, changeFreq: 'weekly' },
  { path: '/reading-list', priority: 0.4, changeFreq: 'monthly' },
  { path: '/about', priority: 0.4, changeFreq: 'monthly' },
  { path: '/transparency', priority: 0.5, changeFreq: 'monthly' },
  { path: '/story', priority: 0.8, changeFreq: 'daily' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }))

  let storyEntries: MetadataRoute.Sitemap = []
  try {
    const slugs = await getAllReportSlugs()
    const reportData = await import('@/lib/content/report-data').then(
      (m) => m.REPORT_STORIES
    )

    storyEntries = slugs.map((slug) => {
      const report = reportData.find((r) => r.slug === slug)
      return {
        url: `${SITE_URL}/story/${slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        lastModified: report?.publishedAt && report.publishedAt !== ''
          ? new Date(report.publishedAt).toISOString()
          : new Date().toISOString(),
      }
    })
  } catch {
    storyEntries = []
  }

  // Fix stories
  let fixEntries: MetadataRoute.Sitemap = []
  try {
    fixEntries = FIX_STORIES.map((story) => ({
      url: `${SITE_URL}/the-fix/${story.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    fixEntries = []
  }

  // Policy pages
  let policyEntries: MetadataRoute.Sitemap = []
  try {
    const policySlugs = getAllPolicySlugs()
    policyEntries = policySlugs.map((slug) => ({
      url: `${SITE_URL}/policy-lab/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    policyEntries = []
  }

  // Timeline pages
  let timelineEntries: MetadataRoute.Sitemap = []
  try {
    const timelineSlugs = getAllTimelineSlugs()
    timelineEntries = timelineSlugs.map((slug) => ({
      url: `${SITE_URL}/timelines/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    timelineEntries = []
  }

  // Country profile pages
  let countryEntries: MetadataRoute.Sitemap = []
  try {
    const countryCodes = getAllCountryCodes()
    countryEntries = countryCodes.map((code) => ({
      url: `${SITE_URL}/country-profiles/${code}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    countryEntries = []
  }

  // Knowledge Graph entity pages
  let knowledgeEntries: MetadataRoute.Sitemap = []
  try {
    knowledgeEntries = ENTITIES.map((e) => ({
      url: `${SITE_URL}/knowledge/${e.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch {
    knowledgeEntries = []
  }

  return [
    ...staticEntries,
    ...storyEntries,
    ...fixEntries,
    ...policyEntries,
    ...timelineEntries,
    ...countryEntries,
    ...knowledgeEntries,
  ]
}
