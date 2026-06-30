import { SVGProps } from 'react'
import { cn } from '@/lib/utils'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string
  size?: number
}

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', className)}
      {...props}
    >
      <use href={`/assets/icons/sprite.svg#${name}`} />
    </svg>
  )
}

// Inline SVG components for common icons (no fetch needed)
export const IconIndia = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="7" width="18" height="10" rx="1" fill="#FF9933" />
    <rect x="3" y="7" width="18" height="3.33" fill="#FF9933" />
    <rect x="3" y="10.33" width="18" height="3.33" fill="#FFFFFF" />
    <rect x="3" y="13.66" width="18" height="3.33" fill="#138808" />
  </svg>
)

export const IconHydrogen = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M11 12l2 0" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8v8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
)

export const IconNuclear = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
)
