'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MAIN_NAV } from '@/lib/navigation'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { PushSubscribeButton } from '@/components/pwa/push-subscribe'
import { Menu, ChevronDown, Search, Globe, BookOpen, BarChart3, BrainCircuit, Map, Timer, UserCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'

const TOP_NAV = MAIN_NAV.slice(0, 5)
const MORE_NAV = MAIN_NAV.slice(5)

const NAV_ICONS: Record<string, typeof Search> = {
  'Intelligence': Sparkles,
  'Explained': BookOpen,
  'The Fix': UserCheck,
  'Data Lab': BarChart3,
  'Accountability': UserCheck,
  'India': Globe,
  'World': Map,
  'AI & Technology': BrainCircuit,
  'Policy Lab': BookOpen,
  'Timelines': Timer,
  'Country Profiles': Globe,
  'Search': Search,
}

const CATEGORIES: { title: string; items: typeof MAIN_NAV }[] = [
  { title: 'Core', items: MAIN_NAV.slice(0, 5) },
  { title: 'Topics', items: MAIN_NAV.slice(5, 9) },
  { title: 'Tools', items: MAIN_NAV.slice(9) },
]

export function TopBar() {
  const router = useRouter()
  const [time, setTime] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [mobileSearch, setMobileSearch] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }))
    tick()
    const ti = setInterval(tick, 1000)
    const si = setInterval(() => setScrolled(window.scrollY > 40), 200)
    return () => { clearInterval(ti); clearInterval(si) }
  }, [])

  const handleMobileSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (mobileSearch.trim()) {
      setSheetOpen(false)
      router.push(`/search?q=${encodeURIComponent(mobileSearch.trim())}`)
    }
  }, [mobileSearch, router])

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full border-b transition-all duration-200',
      scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background'
    )}>
      <div className="flex items-center justify-between px-4 h-9 text-xs text-muted-foreground border-b">
        <div className="flex items-center gap-4">
          <span className="tabular-nums font-mono">{time} IST</span>
          <span className="hidden sm:inline">Markets ▼</span>
          <span className="hidden md:inline">AI Watch</span>
          <span className="hidden md:inline">Conflict Tracker</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Weather</span>
          <span className="font-medium text-foreground/80">Breaking</span>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 h-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight font-heading">THE BREAKDOWN</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:inline">OS</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium" aria-label="Main navigation">
          {TOP_NAV.map(item => (
            <Link key={item.href} href={item.href} className="hover:text-foreground/80 transition-colors">
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground/80 transition-colors cursor-default text-sm font-medium">
              More <ChevronDown className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {MORE_NAV.map(item => (
                <DropdownMenuItem key={item.href} className="p-0">
                  <Link href={item.href} className="block w-full px-1.5 py-1 text-sm">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
            Search
          </Link>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
              <SheetHeader className="border-b px-4 py-3">
                <SheetTitle className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight font-heading">THE BREAKDOWN</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">OS</span>
                </SheetTitle>
              </SheetHeader>
              <div className="px-4 pt-3 pb-2">
                <form onSubmit={handleMobileSearch} className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                    placeholder="Search..."
                    className="pl-8 h-9 text-sm"
                  />
                </form>
              </div>
              <ScrollArea className="flex-1 px-4 pb-4">
                {CATEGORIES.map((cat, ci) => (
                  <div key={cat.title} role="group" aria-label={cat.title}>
                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground mt-4 mb-1.5">{cat.title}</h4>
                    <div className="flex flex-col gap-0.5">
                      {cat.items.map(item => {
                        const Icon = NAV_ICONS[item.label]
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSheetOpen(false)}
                            className="flex items-center gap-2.5 py-2 text-sm font-medium hover:text-foreground/80 transition-colors rounded-md hover:bg-muted px-2 -mx-2"
                          >
                            {Icon && <Icon className="size-4 text-muted-foreground shrink-0" />}
                            <span>{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="border-t px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <PushSubscribeButton />
                </div>
                <span className="text-[11px] text-muted-foreground">{time} IST</span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
