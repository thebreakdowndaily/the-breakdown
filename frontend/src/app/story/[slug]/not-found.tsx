import Link from 'next/link'

export default function StoryNotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold font-heading mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Report not found</p>
      <Link
        href="/story"
        className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-8 gap-1.5 px-2.5 bg-primary text-primary-foreground hover:bg-primary/80"
      >
        Browse Reports
      </Link>
    </div>
  )
}
