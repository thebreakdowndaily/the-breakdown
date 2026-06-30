'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) {
      setTheme(saved)
      applyTheme(saved)
    } else {
      applyTheme('system')
    }
  }, [])

  function applyTheme(t: Theme) {
    if (t === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (t === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  function cycleTheme() {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    applyTheme(next)
  }

  const icon = theme === 'light' ? <Sun className="size-4" /> : theme === 'dark' ? <Moon className="size-4" /> : <Monitor className="size-4" />

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={cycleTheme}
      aria-label={`Theme: ${theme}. Click to cycle.`}
    >
      {icon}
    </Button>
  )
}
