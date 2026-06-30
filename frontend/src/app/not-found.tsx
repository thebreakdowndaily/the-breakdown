import Link from 'next/link'
import { ALL_STORIES } from '@/lib/content/generated/stories'

const POPULAR_SECTIONS = [
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Data Lab', href: '/data-lab' },
  { label: 'Accountability', href: '/accountability' },
  { label: 'India', href: '/india' },
  { label: 'The Fix', href: '/the-fix' },
]

export default function NotFoundPage() {
  // Pick 4 random stories for suggestions
  const suggestions = [...ALL_STORIES]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg w-full">
        <div className="w-20 h-20 rounded-2xl bg-saffron/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-saffron font-heading">404</span>
        </div>
        <h1 className="text-3xl font-bold font-heading mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved. Here are some stories you might find interesting instead.
        </p>

        {/* Story suggestions */}
        <div className="grid sm:grid-cols-2 gap-3 mb-8 text-left">
          {suggestions.map((s) => (
            <Link
              key={s.slug}
              href={`/story/${s.slug}`}
              className="block p-4 rounded-xl border border-border/50 hover:border-primary/20 hover:bg-muted/50 transition-all"
            >
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block">
                {s.category}
              </span>
              <span className="text-sm font-medium leading-snug line-clamp-2">
                {s.title}
              </span>
              {s.readTime && (
                <span className="text-[11px] text-muted-foreground mt-2 block">
                  {s.readTime} min read
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {POPULAR_SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="inline-flex items-center rounded-4xl px-3 py-1 text-xs font-medium h-7 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors"
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  )
}
