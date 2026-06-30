import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.SITE_URL || 'https://thebreakdown.in'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/search/pagefind',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
