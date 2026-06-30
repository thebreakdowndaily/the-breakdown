'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: string
  duration?: number
  suffix?: string
}

/**
 * Parses a formatted value string like "6.4%" or "24,812" or "₹1.87L Cr"
 * into a numeric part and a label suffix.
 * Animates the numeric part counting up from 0 on mount.
 */
export function AnimatedCounter({ value, duration = 1200 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  // Extract numeric parts: keep digits, dots, commas, minus
  const numericStr = value.replace(/[^0-9.,-]/g, '')
  // Extract non-numeric prefix/suffix (like ₹, %, Cr, B, pp)
  const prefix = value.match(/^[^0-9.,-]+/)?.[0] || ''
  const suffix = value.match(/[^0-9.,-]+$/)?.[0] || ''

  const targetNumber = parseFloat(numericStr.replace(/,/g, ''))
  const isInteger = !numericStr.includes('.')

  useEffect(() => {
    if (!ref.current || hasAnimated || isNaN(targetNumber)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            observer.disconnect()

            const startTime = performance.now()
            const startValue = 0

            function animate(currentTime: number) {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = startValue + (targetNumber - startValue) * eased

              if (isInteger) {
                setDisplayValue(Math.round(current).toLocaleString('en-US'))
              } else {
                // Preserve original decimal places
                const decimals = numericStr.split('.')[1]?.length || 1
                setDisplayValue(current.toFixed(decimals))
              }

              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }

            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [targetNumber, duration, hasAnimated, isInteger, numericStr])

  if (isNaN(targetNumber)) {
    return <span ref={ref}>{value}</span>
  }

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
