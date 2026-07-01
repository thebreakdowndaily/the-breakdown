'use client'

import { useState, useEffect, useCallback } from 'react'
import { CheckSquare, Square, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CitizenActionItem } from '@/lib/content/fix'

interface CitizenChecklistProps {
  citizenActions: CitizenActionItem[]
  slug: string
}

const ROLE_ICONS: Record<string, string> = {
  'Local Resident': '🏠',
  'Near-Site Resident': '🏭',
  'Policy Professional': '📋',
  'Engineer': '🔧',
  'Community Member': '👥',
  'Consumer': '🛒',
  'Parent': '👨‍👩‍👧‍👦',
  'Student': '🎓',
  'Teacher': '📚',
  'Daily Commuter': '🚇',
  'Resident': '🏘️',
  'Farmer': '🌾',
  'Homeowner': '🏡',
  'Village Resident': '🏘️',
  'Patient': '🏥',
  'Donor': '💉',
  'Litigant': '⚖️',
  'Disputant': '🤝',
  'Filer': '📄',
  'Underserved': '🤲',
  'Buyer': '🚗',
  'Owner': '🔌',
  'Shopper': '🛍️',
  'Fleet Operator': '🚌',
}

export function CitizenChecklist({ citizenActions, slug }: CitizenChecklistProps) {
  const storageKey = `fix-checklist-${slug}`
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [mounted, setMounted] = useState(false)

  // Load saved state on mount
  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        setChecked(JSON.parse(saved))
      }
    } catch { /* ignore */ }
  }, [storageKey])

  const toggle = useCallback((index: number) => {
    setChecked(prev => {
      const next = { ...prev, [index]: !prev[index] }
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch { /* ignore */ }
      return next
    })
  }, [storageKey])

  const completedCount = Object.values(checked).filter(Boolean).length
  const totalCount = citizenActions.length
  const allDone = completedCount === totalCount && totalCount > 0

  const handleReset = useCallback(() => {
    setChecked({})
    try {
      localStorage.removeItem(storageKey)
    } catch { /* ignore */ }
  }, [storageKey])

  if (!citizenActions?.length) return null

  return (
    <div className="space-y-4">
      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {mounted ? `${completedCount}/${totalCount} done` : `${totalCount} actions`}
          </span>
          {allDone && mounted && (
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              ✓ All done
            </span>
          )}
        </div>
        {mounted && completedCount > 0 && (
          <button
            onClick={handleReset}
            className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            allDone ? 'bg-green-500' : 'bg-primary'
          )}
          style={{
            width: mounted ? `${(completedCount / totalCount) * 100}%` : '0%',
          }}
        />
      </div>

      {/* Action items */}
      <div className="space-y-2">
        {citizenActions.map((item, i) => {
          const isChecked = mounted && checked[i]
          const emoji = ROLE_ICONS[item.role] || '👤'

          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={cn(
                'w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-all',
                isChecked
                  ? 'border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20'
                  : 'border-border hover:border-foreground/20 hover:bg-muted/30'
              )}
            >
              <span className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-green-500" />
                ) : (
                  <Square className="w-4 h-4 text-muted-foreground/40" />
                )}
              </span>
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground mb-0.5">
                  <span className="text-[11px]">{emoji}</span>
                  {item.role}
                </span>
                <p className={cn(
                  'text-sm leading-snug',
                  isChecked ? 'text-muted-foreground/60 line-through' : 'text-foreground'
                )}>
                  {item.action}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
