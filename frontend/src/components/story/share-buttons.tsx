'use client'

import { useState } from 'react'
import { Link, Check, MessageCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

interface ShareButtonsProps {
  title: string
  url: string
  summary: string
}

const XIcon = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export function ShareButtons({ title, url, summary }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard not available */
    }
  }

  const shareLinks = [
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: XIcon,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: LinkedInIcon,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: MessageCircle,
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${summary}\n\n${url}`)}`,
      icon: Mail,
    },
  ]

  return (
    <div className="flex items-center gap-1.5 print:hidden">
      <span className="text-xs text-muted-foreground mr-1">Share</span>
      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={copyLink}
            aria-label={copied ? 'Copied' : 'Copy link'}
          >
            {copied ? <Check className="size-3.5 text-green-india" /> : <Link className="size-3.5" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{copied ? 'Copied!' : 'Copy link'}</TooltipContent>
      </Tooltip>
      {shareLinks.map((s) => (
        <Tooltip key={s.name}>
          <TooltipTrigger>
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => window.open(s.href, '_blank', 'noopener,noreferrer')}
              aria-label={`Share on ${s.name}`}
            >
              <s.icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{s.name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
