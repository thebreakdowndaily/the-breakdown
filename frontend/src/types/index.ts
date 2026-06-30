export interface IntelligenceReport {
  slug: string
  title: string
  summary: string
  category: Category
  tags: string[]
  publishedAt: string
  readTime: number
  hero: string
  caption: string
  author: string
  content: ReportSection[]
  metadata: ReportMetadata
  /** Raw HTML body for reports without structured sections (e.g., live stories) */
  body?: string
}

export interface ReportSection {
  type: 'hero' | 'executive-summary' | 'quick-facts' | 'key-numbers' | 'timeline' | 'evidence' | 'root-cause' | 'system-map' | 'debate' | 'the-fix' | 'global-comparison' | 'whats-next' | 'sources' | 'knowledge' | 'body' | 'explained'
  title: string
  body: string
  data?: Record<string, unknown>
}

export interface ReportMetadata {
  keyNumbers: KeyNumber[]
  timeline: TimelineEvent[]
  sources: Source[]
}

export interface KeyNumber {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
}

export interface TimelineEvent {
  date: string
  title: string
  description: string
}

export interface Source {
  name: string
  url: string
  type: 'official' | 'news' | 'academic' | 'primary'
}

export type Category =
  | 'Intelligence'
  | 'Explained'
  | 'The Fix'
  | 'Data Lab'
  | 'Accountability'
  | 'India'
  | 'World'
  | 'AI & Technology'
  | 'Tech / AI'
  | 'Tech / Policy'
  | 'Policy Lab'
  | 'Timelines'
  | 'Country Profile'
  | 'Incredible India'
  | 'Economy'
  | 'Science'
  | 'Technology'
  | 'Environment'
  | 'Climate'
  | 'Geopolitics'
  | 'Politics'

export interface DashboardWidget {
  id: string
  title: string
  type: 'chart' | 'map' | 'ticker' | 'list' | 'timeline' | 'numbers'
  data: unknown
  span: 1 | 2 | 3 | 4
}

export interface CountryProfile {
  code: string
  name: string
  flag: string
  capital: string
  population: number
  gdp: number
  gdpGrowth: number
  inflation: number
  militarySpending: number
  educationIndex: number
  healthIndex: number
  aiIndex: number
  aiRanking: number
  militaryRank: number
  educationRank: number
  healthRank: number
  description: string
  topExports: string[]
  topImports: string[]
  energyMix: EnergySource[]
  tradePartners: TradePartner[]
  timeline: TimelineEvent[]
}

export interface EnergySource {
  source: string
  percentage: number
}

export interface TradePartner {
  country: string
  exportValue: number
  importValue: number
}

export interface KnowledgeEntity {
  id: string
  type: 'person' | 'country' | 'company' | 'organization' | 'law' | 'scheme' | 'report' | 'event' | 'policy' | 'budget'
  name: string
  summary: string
  related: string[]
}
