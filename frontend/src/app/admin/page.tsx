'use client'

import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading')

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(() => setStatus('online'))
      .catch(() => setStatus('offline'))
  }, [])

  if (status === 'online') {
    // Redirect to the admin SPA served from Cloudflare Pages static files
    window.location.href = '/admin-spa/'
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="rounded-xl border bg-card p-8">
          <div className="text-3xl mb-3">
            {status === 'loading' ? '⏳' : '🔌'}
          </div>
          <h1 className="text-lg font-bold font-heading mb-1">The Breakdown Admin</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {status === 'loading' && 'Connecting to admin API...'}
            {status === 'offline' && 'Admin API is not responding.'}
          </p>

          {status === 'offline' && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                The API server at /api/ is not reachable. Make sure you are on the
                deployed site with the Pages Functions active.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs text-primary hover:underline"
              >
                Retry connection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
