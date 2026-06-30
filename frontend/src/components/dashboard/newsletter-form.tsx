'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'subscribed' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('tbd-newsletter-email')
    if (saved) {
      setStatus('subscribed')
      setMessage('You are already subscribed.')
    }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }
    try {
      localStorage.setItem('tbd-newsletter-email', trimmed)
      setStatus('subscribed')
      setMessage('Thanks for subscribing! You\'ll hear from us soon.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Could not save. Please try again.')
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-bold font-heading mb-2">Get The Breakdown In Your Inbox</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Complex stories. Clear analysis. Delivered every Tuesday and Friday. No spam. No fluff. Just the analysis that matters.
        </p>
        {status === 'subscribed' ? (
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
              aria-label="Email address"
            />
            <Button type="submit" variant="default">Subscribe</Button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-xs text-red-500 mt-2">{message}</p>
        )}
        <p className="text-xs text-muted-foreground mt-3">
          Front-end demo — data stored locally. Full backend integration coming soon.
        </p>
      </CardContent>
    </Card>
  )
}
