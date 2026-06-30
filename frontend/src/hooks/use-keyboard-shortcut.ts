'use client'

import { useEffect } from 'react'

export function useKeyboardShortcut(
  key: string,
  callback: (e: KeyboardEvent) => void,
  options?: { metaKey?: boolean; ctrlKey?: boolean; altKey?: boolean }
) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.repeat) return
      const meta = options?.metaKey ?? true
      const ctrl = options?.ctrlKey ?? false
      const alt = options?.altKey ?? false
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        e.metaKey === meta &&
        e.ctrlKey === ctrl &&
        e.altKey === alt
      ) {
        e.preventDefault()
        callback(e)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback, options])
}
