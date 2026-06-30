import type { ReactNode } from 'react'
import { Lightbulb, AlertCircle, Info } from 'lucide-react'

interface LabContextProps {
  title: string
  children: ReactNode
  variant?: 'insight' | 'warning' | 'info'
}

const icons = {
  insight: Lightbulb,
  warning: AlertCircle,
  info: Info,
}

const styles = {
  insight: 'border-amber-500/30 bg-amber-50/10',
  warning: 'border-red-500/30 bg-red-50/10',
  info: 'border-blue-500/30 bg-blue-50/10',
}

const iconStyles = {
  insight: 'text-amber-400',
  warning: 'text-red-400',
  info: 'text-blue-400',
}

export function LabContext({ title, children, variant = 'insight' }: LabContextProps) {
  const Icon = icons[variant]
  return (
    <div className={`rounded-xl border ${styles[variant]} p-5 mb-6`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconStyles[variant]}`} />
        <div>
          <h3 className="font-heading font-semibold text-sm mb-1">{title}</h3>
          <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
