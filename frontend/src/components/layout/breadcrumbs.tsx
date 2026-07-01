'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname()

  const breadcrumbs: BreadcrumbItem[] = items ?? (() => {
    const segments = pathname.split('/').filter(Boolean)
    const crumbs: BreadcrumbItem[] = [{ label: 'The Breakdown', href: '/' }]
    segments.forEach((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      const label = segment
        .split('-')
        .map(w => /^[a-z]{2,3}$/.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      crumbs.push({
        label,
        href: index < segments.length - 1 ? href : undefined,
      })
    })
    return crumbs
  })()

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="size-3 shrink-0" />}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-foreground transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
