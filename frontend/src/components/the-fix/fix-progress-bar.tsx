'use client'

import { useEffect, useRef, useState } from 'react'
import type { FixProgress } from '@/lib/content/fix'

interface FixProgressBarProps {
  progress: FixProgress[]
}

export function FixProgressBar({ progress }: FixProgressBarProps) {
  if (!progress?.length) return null

  return (
    <div className="space-y-4">
      {progress.map((p, i) => (
        <SingleProgress key={i} {...p} />
      ))}
    </div>
  )
}

function SingleProgress({ current, target, label, unit }: FixProgress) {
  const barRef = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setAnimated(true), 200 + Math.random() * 300)
      return () => clearTimeout(timer)
    }
  }, [inView])

  const percent = target > 0 ? Math.min((current / target) * 100, 100) : 0
  const remaining = Math.max(target - current, 0)

  function formatValue(v: number, u: string): string {
    if (u === '%') return `${v.toFixed(1)}%`
    if (u === 'GW') return `~${v} GW`
    if (u === 'MMT') return `${v} MMT`
    if (u === '$/kg') return `$${v.toFixed(2)}/kg`
    if (u === 'reactors') return `${Math.round(v)} reactors`
    if (u === 'states') return `${Math.round(v)} states`
    if (u === 'µg/m³') return `${Math.round(v)} µg/m³`
    if (u === 'judges') return `${Math.round(v)} per million`
    if (u === 'stations') return v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${Math.round(v)}`
    if (u === 'Cr') return `${v} Cr`
    if (u === 'Lakh') return `${v} Lakh`
    return `${v} ${u}`
  }

  const isInverse = unit === '$/kg' || unit === 'µg/m³'

  return (
    <div ref={barRef}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className="text-xs font-bold font-heading">
          {formatValue(current, unit)}
          {target > 0 && (
            <span className="text-muted-foreground/60 font-normal">
              {' '}/ {formatValue(target, unit)}
            </span>
          )}
        </span>
      </div>
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out ${
            isInverse
              ? 'bg-amber-500'
              : percent >= 80
              ? 'bg-green-500'
              : percent >= 50
              ? 'bg-primary'
              : 'bg-amber-500'
          }`}
          style={{ width: animated ? `${isInverse ? Math.min(100 - percent, 100) : percent}%` : '0%' }}
        />
      </div>
      {remaining > 0 && (
        <p className="text-[10px] text-muted-foreground/60 mt-0.5">
          {formatValue(remaining, unit)} remaining to target
        </p>
      )}
    </div>
  )
}
