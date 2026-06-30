'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground font-sans antialiased">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-saffron/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-saffron">!</span>
          </div>
          <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            A critical error occurred. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground h-8 gap-1.5 px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-primary/80"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
