'use client'

import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react'
import type { FixMilestone } from '@/lib/content/fix'

interface FixTimelineProps {
  milestones: FixMilestone[]
}

const STATUS_CONFIG = {
  'achieved': { icon: CheckCircle2, className: 'text-green-500', label: 'Achieved' },
  'in-progress': { icon: Clock, className: 'text-amber-500', label: 'In Progress' },
  'upcoming': { icon: Circle, className: 'text-muted-foreground/40', label: 'Upcoming' },
  'missed': { icon: AlertCircle, className: 'text-red-500', label: 'Missed' },
}

export function FixTimeline({ milestones }: FixTimelineProps) {
  if (!milestones?.length) return null

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />

      <div className="space-y-6">
        {milestones.map((m, i) => {
          const config = STATUS_CONFIG[m.status]
          const Icon = config.icon

          return (
            <div key={i} className="relative pl-10">
              {/* Icon */}
              <div className={cn(
                'absolute left-2.5 -translate-x-1/2 w-5 h-5 rounded-full bg-background flex items-center justify-center z-10',
                m.status === 'achieved' ? 'text-green-500' :
                m.status === 'in-progress' ? 'text-amber-500' :
                m.status === 'missed' ? 'text-red-500' : 'text-muted-foreground/40'
              )}>
                <Icon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold font-heading text-muted-foreground uppercase tracking-wider">
                    {m.date}
                  </span>
                  <span className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full font-medium border',
                    m.status === 'achieved' && 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400',
                    m.status === 'in-progress' && 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400',
                    m.status === 'upcoming' && 'border-muted-foreground/20 text-muted-foreground/60',
                    m.status === 'missed' && 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400',
                  )}>
                    {config.label}
                  </span>
                </div>
                <p className={cn(
                  'text-sm leading-relaxed',
                  m.status === 'upcoming' ? 'text-muted-foreground/60' : 'text-foreground'
                )}>
                  {m.event}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
