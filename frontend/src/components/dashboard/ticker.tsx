'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { TICKER_HEADLINES } from '@/lib/content/generated/site-config'

export function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null)

  const items = TICKER_HEADLINES.length > 0
    ? TICKER_HEADLINES
    : [
        { title: 'NIFTY 50: 24,812 ▲ +0.6%', link: '/data-lab' },
        { title: 'SENSEX: 81,456 ▲ +0.5%', link: '/data-lab' },
        { title: 'USD/INR: 83.42 ▼ -0.12%', link: '/data-lab' },
        { title: 'BRENT: $72.14 ▲ +1.2%', link: '/data-lab' },
        { title: 'GOLD: ₹71,250 ▲ +0.8%', link: '/data-lab' },
        { title: 'BITCOIN: $68,432 ▲ +2.1%', link: '/data-lab' },
      ]

  useEffect(() => {
    if (!trackRef.current) return
    const children = trackRef.current.children
    if (!children.length) return
    const totalWidth = Array.from(children).reduce((sum, el) => sum + (el as HTMLElement).offsetWidth + 32, 0)
    gsap.to(trackRef.current, {
      x: -totalWidth / 2,
      duration: 40,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  return (
    <div className="overflow-hidden bg-muted/30 border-y py-1.5">
      <div ref={trackRef} className="flex gap-8 text-xs tabular-nums text-muted-foreground w-max">
        {[...items, ...items].map((item, i) => (
          <Link key={i} href={item.link} className="whitespace-nowrap hover:text-foreground transition-colors">
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
