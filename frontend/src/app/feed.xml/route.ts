import { ALL_STORIES } from '@/lib/content/generated/stories'
import type { IntelligenceReport } from '@/types'

export const dynamic = 'force-static'

const SITE_URL = process.env.SITE_URL || 'https://thebreakdown.in'
const SITE_NAME = 'The Breakdown OS'
const DESCRIPTION = "India's first Visual Intelligence Platform — Intelligence Reports, Data Lab, The Fix, Accountability, and global situation analysis."

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(): Promise<Response> {
  const stories = [...(ALL_STORIES as IntelligenceReport[])]
    .sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return db - da
    })
    .slice(0, 20)

  const items = stories
    .map(
      (s) => `
    <item>
      <title>${escapeXml(s.title)}</title>
      <link>${SITE_URL}/story/${s.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/story/${s.slug}</guid>
      <description>${escapeXml(s.summary || '')}</description>
      <category>${escapeXml(s.category || '')}</category>
      ${s.publishedAt ? `<pubDate>${new Date(s.publishedAt).toUTCString()}</pubDate>` : ''}
      <author>${escapeXml('desk@thebreakdown.in')} (The Breakdown Desk)</author>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/og-image.svg</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
