'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SUGGESTED_QUESTIONS } from '@/lib/search/suggestions'
import { ALL_STORIES } from '@/lib/content/generated/stories'
import {
  Search,
  Trash2,
  Sparkles,
  ChevronRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react'

type Role = 'user' | 'ai'

interface Message {
  id: string
  role: Role
  content: string
  citations?: { label: string; url: string }[]
  followUps?: string[]
}

interface Conversation {
  id: string
  messages: Message[]
}

const ACTIONS = [
  'Explain',
  'Compare',
  'Summarize',
  'Visualize',
  'Generate Timeline',
  'Find Sources',
] as const

const ACTION_RESPONSES: Record<string, string> = {
  Explain:
    'Here is a detailed explanation of your query, breaking down the key concepts, historical context, and current relevance.',
  Compare:
    'Here is a comparative analysis highlighting the similarities, differences, and key metrics across the dimensions you asked about.',
  Summarize:
    'Here is a concise summary covering the most important points, key takeaways, and essential context.',
  Visualize:
    'Here is a visual representation of the data, showing trends, distributions, and relationships in an intuitive format.',
  'Generate Timeline':
    'Here is a chronological timeline of key events, milestones, and developments related to your query.',
  'Find Sources':
    'Here are curated sources from official documents, credible news organizations, and expert analysis.',
}

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
        <Sparkles className="size-3.5 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
      </div>
    </div>
  )
}

function EmptyState({ onSelect }: { onSelect: (q: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
        <Search className="size-7 text-primary" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Ask The Breakdown</h2>
      <p className="mb-8 max-w-md text-sm text-muted-foreground">
        Get answers with sources, timelines, comparisons, and
        visualizations — powered by intelligence analysis.
      </p>
      <div className="flex max-w-lg flex-col gap-2">
        {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="group flex items-center gap-2 rounded-xl border border-border/50 px-4 py-2.5 text-left text-sm transition-colors hover:border-primary/30 hover:bg-muted/50"
          >
            <ChevronRight className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            <span>{q}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function MessageBubble({ message, onFollowUp }: { message: Message; onFollowUp?: (q: string) => void }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex w-full gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {isUser ? 'U' : 'AI'}
      </div>
      <div className={cn('flex max-w-[85%] flex-col gap-2', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line',
            isUser
              ? 'rounded-br-md bg-primary text-primary-foreground'
              : 'rounded-bl-md bg-muted text-foreground'
          )}
        >
          {message.content}
        </div>
        {message.citations && message.citations.length > 0 && (
          <div className={cn('flex flex-wrap gap-1.5 max-w-full', isUser && 'justify-end')}>
            {message.citations.map((c, i) => (
              c.url && c.url !== '#' ? (
                <Link key={i} href={c.url}>
                  <Badge variant="outline" className="gap-1 text-xs hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
                    <BookOpen className="size-2.5 shrink-0" />
                    <span className="truncate max-w-[180px] sm:max-w-[240px]">{c.label}</span>
                  </Badge>
                </Link>
              ) : (
                <Badge key={i} variant="outline" className="gap-1 text-xs">
                  <ExternalLink className="size-2.5 shrink-0" />
                  <span className="truncate max-w-[180px] sm:max-w-[240px]">{c.label}</span>
                </Badge>
              )
            ))}
          </div>
        )}
        {message.followUps && message.followUps.length > 0 && (
          <div className={cn('mt-1 flex flex-col gap-1', isUser && 'items-end')}>
            <span className="text-[11px] text-muted-foreground">
              Suggested questions:
            </span>
            {message.followUps.map((f, i) => (
              <button
                key={i}
                onClick={() => onFollowUp?.(f)}
                className="text-left text-xs text-primary/80 transition-colors hover:text-primary cursor-pointer"
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function AISearch() {
  const [conversation, setConversation] = useState<Conversation>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ats-conversation')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          /* empty */
        }
      }
    }
    return { id: generateId(), messages: [] }
  })
  const [input, setInput] = useState('')
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    localStorage.setItem('ats-conversation', JSON.stringify(conversation))
  }, [conversation])

  useEffect(() => {
    if (scrollRef.current) {
      const vp = scrollRef.current.querySelector('[data-slot="scroll-area-viewport"]')
      if (vp) {
        vp.scrollTop = vp.scrollHeight
      }
    }
  }, [conversation.messages, isTyping])

  const clearConversation = useCallback(() => {
    setConversation({ id: generateId(), messages: [] })
    setActiveAction(null)
    inputRef.current?.focus()
  }, [])

  function addMessage(role: Role, content: string, extra?: Partial<Message>) {
    setConversation((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: generateId(),
          role,
          content,
          ...extra,
        },
      ],
    }))
  }

  function searchStories(query: string): { stories: typeof ALL_STORIES; score: number }[] {
    const q = query.toLowerCase()
    const words = q.split(/\s+/).filter(Boolean)

    return ALL_STORIES
      .map((s) => {
        const title = (s.title || '').toLowerCase()
        const summary = (s.summary || '').toLowerCase()
        const tags = (s.tags || []).map(t => t.toLowerCase())
        const category = (s.category || '').toLowerCase()
        const body = (s.body || '').toLowerCase()
        const searchable = [title, summary, category, ...tags, body].join(' ')

        let score = 0

        // Exact phrase match gets highest weight
        if (searchable.includes(q)) score += 20

        // Individual word matches
        for (const word of words) {
          if (word.length < 2) continue
          if (title.includes(word)) score += 8
          else if (summary.includes(word)) score += 5
          else if (tags.some(t => t.includes(word))) score += 4
          else if (category.includes(word)) score += 3
          else if (body.includes(word)) score += 1
        }

        return { stories: [s], score }
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
  }

  function generateResponseSummary(query: string, results: { stories: typeof ALL_STORIES; score: number }[], action: string | null): string {
    const preamble = ACTION_RESPONSES[action || 'Explain']
    const count = results.length

    if (count === 0) {
      return `${preamble}\n\nI searched The Breakdown OS for "${query}" but couldn't find any matching intelligence reports. Try rephrasing your question or searching for a related topic.`
    }

    const topResult = results[0].stories[0]
    const categories = [...new Set(results.map(r => r.stories[0].category))]

    let response = `${preamble}\n\nI found ${count} intelligence report${count > 1 ? 's' : ''} matching your query "${query}".\n\n`
    response += `**Top Match:** "${topResult.title}"`
    if (topResult.summary) {
      response += ` — ${topResult.summary}`
    }
    response += `\n\n**Categories:** ${categories.join(', ')}`
    response += `\n\nHere are the most relevant reports, ranked by relevance to your question (scroll to see all):`

    return response
  }

  function generateFollowUps(results: { stories: typeof ALL_STORIES; score: number }[]): string[] {
    if (results.length === 0) {
      return [
        'Try searching for a different topic',
        'Browse all intelligence reports',
        'What are the latest stories?',
      ]
    }

    const topics = results.slice(0, 3).map(r => r.stories[0])
    const questions = new Set<string>()

    for (const t of topics) {
      if (t.tags && t.tags.length > 0) {
        questions.add(`Tell me more about ${t.tags[0]}`)
      }
      if (t.category) {
        questions.add(`What other stories are in ${t.category}?`)
      }
    }

    questions.add('What are the latest developments?')
    questions.add('Summarise the key findings')

    return Array.from(questions).slice(0, 4)
  }

  function generateAIResponse(userQuery: string, action: string | null) {
    setIsTyping(true)

    const results = searchStories(userQuery)
    const responseText = generateResponseSummary(userQuery, results, action)
    const followUpData = generateFollowUps(results)
    const citationData = results.slice(0, 4).map(r => ({
      label: r.stories[0].title,
      url: `/story/${r.stories[0].slug}`,
    }))

    const delay = 600 + Math.random() * 400

    setTimeout(() => {
      setIsTyping(false)
      addMessage('ai', responseText, {
        citations: citationData,
        followUps: followUpData,
      })
    }, delay)
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isTyping) return

    addMessage('user', trimmed)
    setInput('')
    const action = activeAction
    setActiveAction(null)
    generateAIResponse(trimmed, action)
  }

  function handleAction(action: string) {
    setActiveAction((prev) => (prev === action ? null : action))
    inputRef.current?.focus()
  }

  function handleSuggestedQuery(q: string) {
    setInput(q)
    inputRef.current?.focus()
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-12rem)] w-full max-w-3xl flex-col">
      <Card className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Search className="size-4 text-primary" />
            <span className="text-sm font-medium">Ask The Breakdown</span>
          </div>
          {conversation.messages.length > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={clearConversation}
              className="gap-1.5 text-muted-foreground"
            >
              <Trash2 className="size-3.5" />
              Clear
            </Button>
          )}
        </div>

        <ScrollArea ref={scrollRef} className="flex-1">
          <div className="flex flex-col gap-4 px-4 py-4">
            {conversation.messages.length === 0 && !isTyping ? (
              <EmptyState onSelect={handleSuggestedQuery} />
            ) : (
              <>
                {conversation.messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} onFollowUp={(q) => { setInput(q); inputRef.current?.focus() }} />
                ))}
                {isTyping && (
                  <TypingIndicator />
                )}
              </>
            )}
          </div>
        </ScrollArea>

        <Separator />

        <div className="px-4 py-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {ACTIONS.map((action) => (
              <Badge
                key={action}
                variant={activeAction === action ? 'default' : 'secondary'}
                className={cn(
                  'cursor-pointer transition-all',
                  activeAction === action && 'bg-primary text-primary-foreground'
                )}
                onClick={() => handleAction(action)}
              >
                {action}
              </Badge>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask The Breakdown..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" disabled={!input.trim() || isTyping}>
              Ask
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
