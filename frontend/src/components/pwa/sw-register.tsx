'use client'

import { useEffect } from 'react'

/**
 * Registers the service worker on mount.
 * Safe to include — only runs in the browser and bails if unsupported.
 */
export function SWRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Wait until the page is fully loaded before registering
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Silently fail — service worker is non-critical
        })
      })
    }
  }, [])

  return null
}
