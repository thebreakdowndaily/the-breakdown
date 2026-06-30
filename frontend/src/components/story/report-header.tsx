import { Badge } from '@/components/ui/badge'

interface ReportHeaderProps {
  title: string
  category: string
  date: string
  author: string
  summary: string
  imageUrl?: string
  caption?: string
  readingTime?: number
}

export function ReportHeader({ title, category, date, author, summary, imageUrl, caption, readingTime }: ReportHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/90 to-secondary">
      {imageUrl && (
        <div className="absolute inset-0">
          <img src={imageUrl} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/60 to-transparent" />
        </div>
      )}
      <div className="relative z-10 p-8 md:p-12">
        <Badge className="mb-4">{category}</Badge>
        <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight text-primary-foreground mb-4">
          {title}
        </h1>
        <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-3xl mb-6">
          {summary}
        </p>
        <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
          <span>{date}</span>
          <span>·</span>
          <span className="font-medium">{author}</span>
          {readingTime && (
            <>
              <span>·</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </div>
        {caption && imageUrl && (
          <p className="mt-4 text-xs text-primary-foreground/50 leading-relaxed max-w-3xl italic">
            {caption}
          </p>
        )}
      </div>
    </header>
  )
}
