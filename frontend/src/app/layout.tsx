import type { Metadata } from 'next'
import { Bebas_Neue, Source_Sans_3, Geist_Mono } from 'next/font/google'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { TopBar } from '@/components/layout/top-bar'
import { Footer } from '@/components/layout/footer'
import { SWRegister } from '@/components/pwa/sw-register'
import { ErrorBoundary } from '@/components/layout/error-boundary'
import { FadeIn } from '@/components/ui/fade-in'

const sourceSans = Source_Sans_3({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const bebasNeue = Bebas_Neue({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: '400',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const SITE_URL = 'https://thebreakdown.in'
const SITE_NAME = 'The Breakdown OS'
const DEFAULT_DESC = "India's first Visual Intelligence Platform. Intelligence Reports, Data Lab, The Fix, Accountability, and global situation analysis."
const DEFAULT_IMAGE = '/og-image.png'

export const metadata: Metadata = {
  title: 'The Breakdown OS — Understand the world, not just the news',
  description: DEFAULT_DESC,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'The Breakdown OS — Understand the world, not just the news',
    description: DEFAULT_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_IN',
    images: [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Breakdown OS — Understand the world, not just the news',
    description: DEFAULT_DESC,
    images: [DEFAULT_IMAGE],
    site: '@thebreakdownin',
    creator: '@thebreakdownin',
  },
  other: {},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sourceSans.variable} ${bebasNeue.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {process.env.GOOGLE_SITE_VERIFICATION ? (
          <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var e=localStorage.getItem("theme");if(e==="dark"||(!e&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();`
          }}
        />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": "The Breakdown OS",
                  "url": "https://thebreakdown.in",
                  "description": "India's first Visual Intelligence Platform."
                },
                {
                  "@type": "Organization",
                  "name": "The Breakdown",
                  "url": "https://thebreakdown.in",
                  "logo": "https://thebreakdown.in/logo.png",
                  "image": "https://thebreakdown.in/og-image.png",
                  "description": "India's first Visual Intelligence Platform.",
                  "foundingDate": "2026",
                  "sameAs": [
                    "https://www.instagram.com/thebreakdownin",
                    "https://x.com/thebreakdownin",
                    "https://www.youtube.com/@thebreakdownin",
                    "https://www.linkedin.com/company/thebreakdownin"
                  ]
                }
              ]
            })
          }}
        />
        <TooltipProvider>
          {/* Skip-to-content link for keyboard users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:rounded-lg focus:text-sm focus:font-medium focus:outline-none"
          >
            Skip to main content
          </a>
          <TopBar />
          <SWRegister />
          <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
            <ErrorBoundary><FadeIn delay={50}>{children}</FadeIn></ErrorBoundary>
          </main>
          <Footer />
        </TooltipProvider>
        {/* Brand watermark — bottom-right B mark */}
        <div
          aria-hidden="true"
          className="fixed bottom-6 right-6 pointer-events-none select-none z-0"
          style={{ opacity: 0.07 }}
        >
          <span
            className="font-heading leading-none text-primary"
            style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}
          >
            B
          </span>
        </div>
      </body>
    </html>
  )
}
