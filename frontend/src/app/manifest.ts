import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Breakdown OS',
    short_name: 'Breakdown',
    description: 'Complex stories. Clear analysis. India\'s first Visual Intelligence Platform.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#0a0a0f',
    orientation: 'portrait-primary',
    categories: ['news', 'analysis', 'intelligence'],
    lang: 'en-IN',
    dir: 'ltr',
    prefer_related_applications: false,
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/og-image.svg',
        sizes: '1200x630',
        type: 'image/svg+xml',
        form_factor: 'wide',
        label: 'The Breakdown OS — Homepage',
      },
    ],
  }
}
