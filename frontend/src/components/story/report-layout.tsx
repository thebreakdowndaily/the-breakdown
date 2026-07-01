"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { IntelligenceReport, ReportSection } from '@/types'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ReportHeader } from './report-header'
import { ExecutiveSummary } from './executive-summary'
import { QuickFacts } from './quick-facts'
import { KeyNumbers } from './key-numbers'
import { ReportTimeline } from './report-timeline'
import { EvidenceBox } from './evidence-box'
import { RootCause } from './root-cause'
import { SystemMap } from './system-map'
import { DebateSection } from './debate-section'
import { FixSection } from './fix-section'
import { GlobalComparison } from './global-comparison'
import { WhatsNext } from './whats-next'
import { PrimarySources } from './primary-sources'
import { RelatedKnowledge } from './related-knowledge'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ReadingProgress } from '@/components/story/reading-progress'
import { ShareButtons } from '@/components/story/share-buttons'
import { BookmarkButton } from '@/components/story/bookmark-button'
import { NewsletterForm } from '@/components/dashboard/newsletter-form'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { slugifyTag } from '@/lib/utils'

const SECTION_LABELS: Record<string, string> = {
  'executive-summary': 'Executive Summary',
  'quick-facts': 'Fact Base',
  'key-numbers': 'Key Data Points',
  'timeline': 'Event Chronology',
  'evidence': 'Evidence Chain',
  'root-cause': 'Root-Cause Analysis',
  'system-map': 'Systemic Map',
  'debate': 'Policy Debate',
  'the-fix': 'Proposed Solutions',
  'global-comparison': 'Global Benchmark',
  'whats-next': 'Forward Outlook',
  'sources': 'Primary Sources & Attribution',
  'knowledge': 'Related Entity Intelligence',
  'body': 'Full Analysis',
  'explained': 'Explainer',
}

const VISIBLE_SECTION_TYPES = new Set(Object.keys(SECTION_LABELS))

interface ReportLayoutProps {
  report: IntelligenceReport
  relatedStories?: (IntelligenceReport & { body?: string })[]
  prevStory?: { slug: string; title: string } | null
  nextStory?: { slug: string; title: string } | null
}

export function ReportLayout({ report, relatedStories, prevStory, nextStory }: ReportLayoutProps) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<string>('')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  // Keyboard shortcuts: n = next story, p = previous story
  useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      // Don't trigger if user is typing in an input
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.key === 'n' && nextStory) {
        e.preventDefault()
        router.push(`/story/${nextStory.slug}`)
      } else if (e.key === 'p' && prevStory) {
        e.preventDefault()
        router.push(`/story/${prevStory.slug}`)
      }
    }
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [prevStory, nextStory, router])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const sorted = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aTop = a.boundingClientRect.top
            const bTop = b.boundingClientRect.top
            if (aTop >= 0 && bTop >= 0) return aTop - bTop
            if (aTop < 0 && bTop < 0) return bTop - aTop
            return aTop >= 0 ? -1 : 1
          })
        if (sorted.length > 0) {
          const section = sorted[0].target.getAttribute('data-section')
          if (section) setActiveSection(section)
        }
      },
      { threshold: 0.1, rootMargin: '-80px 0px -60% 0px' }
    )

    const refs = sectionRefs.current
    refs.forEach((el) => observer.observe(el))

    const handleScroll = () => setShowBackToTop(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const setRef = (type: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(type, el)
    else sectionRefs.current.delete(type)
  }

  const renderSection = (section: ReportSection) => {
    const d = section.data as Record<string, unknown> | undefined
    switch (section.type) {
      case 'executive-summary':
        return <ExecutiveSummary points={(d?.points as string[]) || []} />
      case 'quick-facts':
        return <QuickFacts facts={(d?.facts as { label: string; value: string; source?: string }[]) || []} />
      case 'key-numbers':
        return <KeyNumbers numbers={report.metadata.keyNumbers} />
      case 'timeline':
        return <ReportTimeline events={report.metadata.timeline} />
      case 'evidence':
        return <EvidenceBox evidence={(d?.evidence as { claim: string; source: string; sourceUrl?: string }[]) || []} />
      case 'root-cause':
        return (
          <RootCause
            title={section.title}
            description={section.body}
            causes={(d?.causes as { factor: string; impact: string }[]) || []}
          />
        )
      case 'system-map':
        return (
          <SystemMap
            title={section.title}
            factors={(d?.factors as { label: string; type: string; related?: string }[]) || []}
          />
        )
      case 'debate':
        return (
          <DebateSection
            title={section.title}
            positions={(d?.positions as { side: string; argument: string; source?: string }[]) || []}
          />
        )
      case 'the-fix':
        return (
          <FixSection
            solutions={(d?.solutions as { actor: string; action: string; status: string; budget?: string }[]) || []}
          />
        )
      case 'global-comparison':
        return (
          <GlobalComparison
            title={section.title}
            countries={(d?.countries as { name: string; flag: string; metric: string; value: string; rank: number }[]) || []}
          />
        )
      case 'whats-next':
        return (
          <WhatsNext
            events={(d?.events as { date: string; event: string; probability?: string }[]) || []}
          />
        )
      case 'sources':
        return <PrimarySources sources={report.metadata.sources} />
      case 'knowledge':
        return (
          <RelatedKnowledge
            entities={(d?.entities as { id: string; label: string; type: string; description?: string }[]) || []}
          />
        )
      default:
        // Unknown section types render as generic rich text
        return section.body ? (
          <div>
            {section.title && (
              <h2 className="text-2xl font-bold font-heading mb-4">{section.title}</h2>
            )}
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: section.body }}
            />
          </div>
        ) : null
    }
  }

  const contentSections = report.content.filter(
    (s) => s.type !== 'hero' && VISIBLE_SECTION_TYPES.has(s.type)
  )

  return (
    <div
      className="relative max-w-7xl mx-auto px-4 py-8 print:px-0 print:py-0"
      data-pagefind-body
    >
      <ReadingProgress />
      <Breadcrumbs />
      <ReportHeader
        title={report.title}
        category={report.category}
        date={report.publishedAt ? new Date(report.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) : ''}
        author={report.author || 'Editorial Intelligence Unit'}
        summary={report.summary}
        imageUrl={report.hero}
        caption={report.caption}
        readingTime={report.readTime}
      />

      <div className="flex items-center justify-end gap-1 mt-4 mb-2 print:hidden">
        <BookmarkButton
          story={{
            slug: report.slug,
            title: report.title,
            summary: report.summary,
            category: report.category,
            savedAt: new Date().toISOString(),
          }}
        />
        <ShareButtons
          title={report.title}
          url={typeof window !== 'undefined' ? window.location.href : `/story/${report.slug}`}
          summary={report.summary}
        />
      </div>

      {/* Tags */}
      {report.tags && report.tags.length > 0 && (
        <div className="max-w-4xl mx-auto mt-6 flex flex-wrap items-center gap-2 print:hidden">
          <span className="text-xs text-muted-foreground font-medium">Topics:</span>
          {report.tags.map(tag => (
            <Link
              key={tag}
              href={`/tag/${slugifyTag(tag)}`}
              className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[11px] hover:bg-muted hover:border-primary/30 transition-all"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      <div
        data-pagefind-meta="title"
        data-pagefind-meta-category={report.category}
        data-pagefind-meta-date={report.publishedAt}
        className="hidden"
      >
        {report.title}
      </div>

      {/* Table of Contents — sticky sidebar */}
      <div className={cn(
        'fixed z-40 print:hidden transition-all duration-300',
        'md:right-4 md:top-1/2 md:-translate-y-1/2',
        'bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0',
        showBackToTop ? 'md:opacity-100' : 'md:opacity-0 md:pointer-events-none'
      )}>
        <nav
          className={cn(
            'flex md:flex-col gap-1',
            'md:bg-card/80 md:backdrop-blur-md md:border md:rounded-xl md:p-2 md:shadow-lg',
            'bg-card/90 backdrop-blur-sm border rounded-full px-3 py-1.5 shadow-lg md:shadow-none'
          )}
          aria-label="Section navigation"
        >
          {contentSections.map((s, i) => (
            <button
              key={s.type}
              onClick={() => {
                const el = sectionRefs.current.get(s.type)
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={cn(
                'flex items-center gap-2 transition-all text-left',
                activeSection === s.type
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground/60 hover:text-foreground/80'
              )}
              aria-label={`Go to ${SECTION_LABELS[s.type] || s.title || 'section'}`}
            >
              {/* Dot indicator */}
              <span
                className={cn(
                  'md:w-2 md:h-2 w-1.5 h-1.5 rounded-full transition-colors shrink-0',
                  activeSection === s.type ? 'bg-saffron' : 'bg-border'
                )}
              />
              {/* Label — hidden on small screens (dots only on mobile) */}
              <span className="hidden md:inline text-[11px] leading-tight whitespace-nowrap max-w-[120px] truncate">
                {SECTION_LABELS[s.type] || s.title || `Section ${i + 1}`}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="max-w-4xl mx-auto mt-8 space-y-12 print:space-y-8">
        {contentSections.length > 0 ? (
          contentSections.map((section, index) => (
            <section
              key={section.type}
              ref={setRef(section.type)}
              data-section={section.type}
              className="scroll-mt-24"
            >
              {renderSection(section)}
              {index < contentSections.length - 1 && (
                <Separator className="mt-12 print:hidden" />
              )}
            </section>
          ))
        ) : report.body ? (
          <div
            className="prose dark:prose-invert max-w-none prose-headings:font-heading prose-headings:scroll-mt-24 prose-a:text-saffron prose-blockquote:border-saffron prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: report.body }}
          />
        ) : (
          <p className="text-muted-foreground text-center py-12">This intelligence report is being compiled. Sources verified, analysis pending.</p>
        )}
      </div>

      {/* Previous / Next Navigation */}
      {(prevStory || nextStory) && (
        <nav className="max-w-4xl mx-auto mt-16 pt-8 border-t print:hidden" aria-label="Story navigation">
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              {prevStory && (
                <Link
                  href={`/story/${prevStory.slug}`}
                  className="group flex flex-col gap-1 rounded-lg border p-4 hover:bg-muted/50 transition-colors relative"
                >
                  <span className="text-xs text-muted-foreground">&larr; Previous Report</span>
                  <span className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    {prevStory.title}
                  </span>
                  <span className="absolute top-2 right-2 text-[10px] text-muted-foreground/40 hidden sm:inline">p</span>
                </Link>
              )}
            </div>
            <div className="flex-1 text-right">
              {nextStory && (
                <Link
                  href={`/story/${nextStory.slug}`}
                  className="group flex flex-col gap-1 rounded-lg border p-4 hover:bg-muted/50 transition-colors relative"
                >
                  <span className="text-xs text-muted-foreground">Next Report &rarr;</span>
                  <span className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    {nextStory.title}
                  </span>
                  <span className="absolute top-2 left-2 text-[10px] text-muted-foreground/40 hidden sm:inline">n</span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Related Stories */}
      {relatedStories && relatedStories.length > 0 && (
        <section className="max-w-4xl mx-auto mt-16 pt-8 border-t print:hidden">
          <h2 className="text-xl font-bold font-heading mb-6">Related Intelligence Reports</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedStories.map(s => (
              <Link key={s.slug} href={`/story/${s.slug}`}>
                <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <Badge className="mb-2 w-fit text-[10px]" variant="secondary">{s.category}</Badge>
                    <h3 className="font-bold text-sm leading-snug mb-1 line-clamp-2">{s.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{s.summary}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="max-w-md mx-auto mt-16 pt-8 border-t print:hidden">
        <h2 className="text-lg font-bold font-heading text-center mb-2">Stay Informed</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Get notified when new intelligence reports are published.
        </p>
        <NewsletterForm />
      </section>

      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-50 shadow-lg print:hidden"
          aria-label="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </Button>
      )}
    </div>
  )
}
