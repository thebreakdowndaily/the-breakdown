import type { Metadata } from 'next'

const SITE_NAME = 'The Breakdown OS'
const SITE_URL = process.env.SITE_URL || 'https://thebreakdown.in'
const DEFAULT_DESCRIPTION = "India's first Visual Intelligence Platform. Intelligence Reports, Data Lab, The Fix, Accountability, and global situation analysis."
const DEFAULT_IMAGE = '/og-image.svg'

interface PageMetadataParams {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

export function generatePageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
}: PageMetadataParams): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = `${title} — ${SITE_NAME}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    authors: [{ name: 'The Breakdown Desk' }],
    publisher: SITE_NAME,
    alternates: { canonical: url },
  }
}
