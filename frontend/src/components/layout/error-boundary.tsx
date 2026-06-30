'use client'

import { Component, type ReactNode } from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-saffron/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-saffron">!</span>
            </div>
            <h1 className="text-2xl font-bold font-heading mb-3">Something went wrong</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              An unexpected error occurred. Please try again or return to the homepage.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="default" onClick={this.handleReset}>
                Try again
              </Button>
              <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>Go Home</Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
