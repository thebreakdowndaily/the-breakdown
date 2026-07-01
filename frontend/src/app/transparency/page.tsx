import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { generatePageMetadata } from '@/lib/seo/metadata'
import {
  Scale, Shield, Search, Database, PenLine, Users,
  Mail, FileText, Lock, Code, BookOpen, Eye,
  ArrowUpRight, CheckCircle2, AlertTriangle
} from 'lucide-react'
import { FIX_STORIES } from '@/lib/content/fix'
import { ENTITIES } from '@/lib/content/knowledge'

export const metadata: Metadata = generatePageMetadata({
  title: 'Transparency Hub',
  description: 'Editorial standards, fact-checking process, corrections policy, funding disclosure, data sourcing methodology, and ethics framework of The Breakdown OS.',
  path: '/transparency',
})

const STATS = [
  { label: 'Intelligence Reports', value: '30', icon: FileText },
  { label: 'Knowledge Entities', value: `${ENTITIES.length}+`, icon: BookOpen },
  { label: 'Fix Stories', value: `${FIX_STORIES.length}`, icon: CheckCircle2 },
  { label: 'Sources Referenced', value: '10,000+', icon: Database },
  { label: 'Corrections Published', value: '4', icon: PenLine },
  { label: 'Fact-Check Pass Rate', value: '96%', icon: Shield },
]

const CORRECTIONS_LOG = [
  {
    date: 'Jul 1, 2026',
    story: 'Earth Prize 2026: Plas-Stick',
    error: 'Stated team was from Mumbai, prize was $100K, announced June 28, and had IIT Bombay partnership.',
    correction: 'Team is from Jaipur, prize is $12,500 (€10,000), announced May 29, 2026. No IIT Bombay partnership exists. Full rewrite published.',
    status: 'resolved',
  },
  {
    date: 'Jul 1, 2026',
    story: 'India Dashboard',
    error: 'All 8 economic indicators used 2024 data (GDP 6.4%, GST ₹1.87L Cr, PMI 58.3, forex $645B, unemployment 7.8%, peak power 162 GW).',
    correction: 'Updated to latest data: GDP 7.7%, GST ₹1.94L Cr, PMI 54.2, forex $672.6B, unemployment 5.5%, peak power 265.4 GW.',
    status: 'resolved',
  },
  {
    date: 'Jul 1, 2026',
    story: 'Knowledge Graph — 16 Entities',
    error: 'Outdated metrics across 16 knowledge entities (India GDP rank 5th→6th, NDA seats, PLI jobs, UK FTA status, DPDP penalties, etc.).',
    correction: 'All 16 entities corrected with verified data. Full fact-check report available.',
    status: 'resolved',
  },
  {
    date: 'Jul 1, 2026',
    story: 'UPI Transaction Volume (Timelines)',
    error: 'Stated "14 Cr monthly UPI transactions" — a 140x error. Actual volume is ~2,000 Cr/month.',
    correction: 'Corrected to ~2,000 Cr monthly transactions. All timeline entries verified.',
    status: 'resolved',
  },
]

const EDITORIAL_PRINCIPLES = [
  {
    title: 'Evidence-First Reporting',
    desc: 'Every article begins with primary sources — government datasets, court judgments, academic papers, official statements, and firsthand documentation. We do not build stories on secondary speculation.',
    icon: Search,
  },
  {
    title: 'Multi-Source Verification',
    desc: 'Every factual claim is verified against at least two independent, credible sources before publication. Where sources conflict, we report the disagreement and explain the basis for our conclusion.',
    icon: Eye,
  },
  {
    title: 'Separation of Fact & Opinion',
    desc: 'Every statement in every story is labelled: Verified Fact, Official Statement, Expert Analysis, Political Claim, or Allegation. Readers always know what is proven and what is asserted.',
    icon: Scale,
  },
  {
    title: 'Confidence Scoring',
    desc: 'Every important claim carries a confidence score (0–100). Scores reflect source reliability, corroboration depth, and inherent uncertainty. We are explicit about what we do not know.',
    icon: AlertTriangle,
  },
  {
    title: 'Open Data, Reproducible Analysis',
    desc: 'All datasets, sources, and methodologies used in our analysis are documented in every story\'s Primary Sources appendix. Charts and visualizations are reproducible from cited data.',
    icon: Database,
  },
  {
    title: 'Continuous Correction',
    desc: 'Errors — once confirmed — are corrected promptly with a visible [Correction] notice. We maintain a permanent public correction log. No error is silently fixed.',
    icon: PenLine,
  },
]

const FACTCHECK_PROCESS = [
  { step: '1', title: 'Claim Identification', desc: 'Every factual statement in a draft is flagged for verification. This includes numbers, dates, names, quotes, attributions, and causal claims.' },
  { step: '2', title: 'Source Retrieval', desc: 'Primary sources are located: government databases, official reports, academic papers, court records, and direct documentation. Secondary reporting is used only as leads, never as evidence.' },
  { step: '3', title: 'Corroboration', desc: 'Each claim is checked against 2+ independent sources. If sources conflict, we investigate the discrepancy before proceeding.' },
  { step: '4', title: 'Classification & Scoring', desc: 'Claims are classified (Verified Fact, Official Statement, Expert Analysis, etc.) and assigned a confidence score (0–100).' },
  { step: '5', title: 'Editorial Review', desc: 'A senior editor reviews every claim, its sources, and the confidence score. Claims below 80 confidence are flagged for additional verification or qualified in the text.' },
  { step: '6', title: 'Pre-Publication Audit', desc: 'Before publication, every story undergoes a 10-stage audit: structure, facts, context, balance, data, visuals, writing, SEO, UX, and a final scorecard. Stories must score ≥9.0/10 in all dimensions.' },
  { step: '7', title: 'Post-Publication Monitoring', desc: 'Published stories are monitored for new developments, reader corrections, and source updates. Corrections are logged and published transparently.' },
]

const FUNDING_DISCLOSURE = [
  {
    title: 'No Advertising',
    desc: 'The Breakdown carries no display advertising, sponsored content, native advertising, or paid placements of any kind. No advertiser influences editorial content.',
    icon: Shield,
  },
  {
    title: 'No Paywall',
    desc: 'All content is freely accessible. We believe intelligence analysis should be a public good, not a subscription product.',
    icon: Lock,
  },
  {
    title: 'No Government Funding',
    desc: 'We accept no funding from any government, political party, or government-affiliated organisation anywhere in the world.',
    icon: Shield,
  },
  {
    title: 'No Corporate Sponsorship',
    desc: 'We accept no corporate sponsorships, foundation grants, or organisational funding that could compromise editorial independence.',
    icon: Shield,
  },
  {
    title: 'Self-Funded Operation',
    desc: 'The Breakdown is currently a self-funded editorial project. All costs — hosting, research tools, data subscriptions — are borne personally by the editorial team. This model will be re-evaluated as the project scales, and any future funding sources will be disclosed here immediately.',
    icon: FileText,
  },
  {
    title: 'Editorial Autonomy',
    desc: 'No external entity — individual, organisation, or government — has any editorial input, approval rights, or pre-publication access to our content. Every editorial decision is made independently by the editorial team.',
    icon: Scale,
  },
]

const PRIVACY_SECTIONS = [
  {
    title: 'Data Collection',
    desc: 'The Breakdown does not use tracking cookies, analytics scripts, advertising pixels, or behavioural profiling tools. We do not collect, store, or process any personal data beyond what you voluntarily provide through the newsletter subscription form.',
  },
  {
    title: 'Newsletter Data',
    desc: 'If you subscribe to our newsletter, your email address is stored locally for demonstration purposes. A full backend integration with a privacy-compliant email provider is under development.',
  },
  {
    title: 'Third-Party Services',
    desc: 'We use Cloudflare (CDN, DNS, security), Unsplash (stock imagery), and open-source libraries (Leaflet, ECharts). These services may process data per their own privacy policies. We use no social media tracking pixels or analytics scripts.',
  },
  {
    title: 'Your Rights',
    desc: 'You have the right to access, correct, or request deletion of any personal data we hold. For privacy-related inquiries, write to privacy@thebreakdown.in.',
  },
]

export default function TransparencyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="mb-12">
        <div className="relative rounded-xl border bg-card overflow-hidden">
          <div className="p-8 md:p-12">
            <Badge className="mb-4">Trust Through Transparency</Badge>
            <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Transparency Hub</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Trust is earned, not assumed. This page documents everything about how The Breakdown operates — our editorial standards, fact-checking process, corrections policy, funding sources, data methodology, and ethical framework. If it is not documented here, we have not done it.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
        {STATS.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-3 text-center">
              <s.icon className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold font-heading">{s.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2 mb-12">
        {[
          { label: 'Editorial Standards', href: '#editorial-standards' },
          { label: 'Fact-Checking Process', href: '#fact-checking' },
          { label: 'Corrections Policy', href: '#corrections' },
          { label: 'Funding & Independence', href: '#funding' },
          { label: 'AI Use Policy', href: '#ai-policy' },
          { label: 'Privacy', href: '#privacy' },
          { label: 'Correction Log', href: '#correction-log' },
          { label: 'Contact', href: '#contact' },
        ].map(l => (
          <a
            key={l.label}
            href={l.href}
            className="px-3 py-1.5 rounded-full text-xs font-medium border bg-muted/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* ===== EDITORIAL STANDARDS ===== */}
      <section id="editorial-standards" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Scale className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Editorial Standards</h2>
            <p className="text-sm text-muted-foreground">Six principles that govern every story we publish</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {EDITORIAL_PRINCIPLES.map((p) => {
            const Icon = p.icon
            return (
              <Card key={p.title}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <CardTitle className="text-sm">{p.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ===== FACT-CHECKING PROCESS ===== */}
      <section id="fact-checking" className="mb-16 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Fact-Checking Process</h2>
            <p className="text-sm text-muted-foreground">A 7-stage pipeline from claim identification to post-publication monitoring</p>
          </div>
        </div>
        <div className="space-y-4">
          {FACTCHECK_PROCESS.map((p) => (
            <Card key={p.step}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold font-heading shrink-0 mt-0.5">
                  {p.step}
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl border bg-muted/30">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Verification tools:</strong> Government databases (MoSPI, RBI, Ministry of Commerce, NSO), 
            international organisations (IMF, World Bank, IEA, WHO, UN), academic databases, court records, 
            parliamentary records, official press releases, and primary source documents. We use AI-assisted 
            source retrieval but all verification is performed by human editors.
          </p>
        </div>
      </section>

      {/* ===== CORRECTIONS POLICY ===== */}
      <section id="corrections" className="mb-16 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <PenLine className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Corrections Policy</h2>
            <p className="text-sm text-muted-foreground">How we handle errors — because accuracy matters more than speed</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-5 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              We are committed to correcting errors promptly and transparently. Our corrections process follows these principles:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                <span><strong className="text-foreground">No silent fixes:</strong> Every confirmed error results in a visible [Correction] notice at the top of the story stating the date of correction, the nature of the error, and the corrected information.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Correction log:</strong> All notable corrections are permanently recorded in our public correction log below, including what was originally published and what was corrected.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Prompt response:</strong> We acknowledge correction requests within 48 hours and resolve confirmed errors within 7 working days.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Reader-initiated:</strong> If you believe a story contains a factual error, email <a href="mailto:corrections@thebreakdown.in" className="text-primary hover:underline">corrections@thebreakdown.in</a>. Include the story URL, the specific error, and supporting evidence.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* ===== CORRECTION LOG ===== */}
      <section id="correction-log" className="mb-16 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Correction Log</h2>
            <p className="text-sm text-muted-foreground">Permanent record of all notable corrections published on The Breakdown</p>
          </div>
        </div>
        <div className="space-y-4">
          {CORRECTIONS_LOG.map((c, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold font-heading text-muted-foreground">{c.date}</span>
                      <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 border-green-200">
                        {c.status === 'resolved' ? 'Resolved' : 'Pending'}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold">{c.story}</h3>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-200/30">
                    <p className="font-medium text-red-600 dark:text-red-400 mb-1">Original Error</p>
                    <p className="text-muted-foreground leading-relaxed">{c.error}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/5 border border-green-200/30">
                    <p className="font-medium text-green-600 dark:text-green-400 mb-1">Correction</p>
                    <p className="text-muted-foreground leading-relaxed">{c.correction}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          This log will be updated as new corrections are published. Last updated: July 1, 2026.
        </p>
      </section>

      {/* ===== FUNDING & INDEPENDENCE ===== */}
      <section id="funding" className="mb-16 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Funding &amp; Independence</h2>
            <p className="text-sm text-muted-foreground">Who pays for The Breakdown — and who does not</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {FUNDING_DISCLOSURE.map((f) => {
            const Icon = f.icon
            return (
              <Card key={f.title}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <CardTitle className="text-sm">{f.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="mt-4 p-4 rounded-xl border border-amber-200/30 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Commitment:</strong> The Breakdown will never accept funding that could compromise editorial independence. If this funding model changes in the future, all new sources of funding will be disclosed on this page within 7 days, along with the amount, source, and any conditions attached. No funding will be accepted that grants any external entity editorial control, pre-publication access, or right of approval over content.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AI USE POLICY ===== */}
      <section id="ai-policy" className="mb-16 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Code className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">AI Use Policy</h2>
            <p className="text-sm text-muted-foreground">How we use artificial intelligence in our editorial process</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-green-200/30 bg-green-500/5">
                <h3 className="text-sm font-bold mb-2 text-green-600 dark:text-green-400">Where AI is Used</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-1.5">• Surface patterns across large datasets</li>
                  <li className="flex items-start gap-1.5">• Verify source citations against databases</li>
                  <li className="flex items-start gap-1.5">• Assist with background research and document retrieval</li>
                  <li className="flex items-start gap-1.5">• Generate structured data (tables, charts) from verified numbers</li>
                  <li className="flex items-start gap-1.5">• The search-based "Ask AI" question-answering interface</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-amber-200/30 bg-amber-500/5">
                <h3 className="text-sm font-bold mb-2 text-amber-600 dark:text-amber-400">Where AI is NOT Used</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-1.5">✗ AI does not write or generate editorial content</li>
                  <li className="flex items-start gap-1.5">✗ AI does not make editorial judgments or framing decisions</li>
                  <li className="flex items-start gap-1.5">✗ AI does not determine story selection or priority</li>
                  <li className="flex items-start gap-1.5">✗ AI does not verify facts or assign confidence scores</li>
                  <li className="flex items-start gap-1.5">✗ No story is published without human review and approval</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed border-t pt-4">
              All content — including analysis, framing, claims, and editorial judgment — is produced and approved by human editors. 
              AI tools augment human research capacity; they do not replace editorial responsibility. The "Ask AI" feature on the 
              homepage is a search-based demonstration interface that retrieves and synthesises from our published content; it does 
              not generate new editorial material.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ===== DATA & SOURCING ===== */}
      <section id="data-sourcing" className="mb-16 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Data &amp; Sourcing Methodology</h2>
            <p className="text-sm text-muted-foreground">Where our data comes from and how we verify it</p>
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-3 text-xs text-muted-foreground leading-relaxed">
              <h3 className="text-sm font-bold text-foreground">Primary Data Sources</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { name: 'Reserve Bank of India (RBI)', url: 'https://rbi.org.in' },
                  { name: 'Ministry of Statistics (MoSPI)', url: 'https://mospi.gov.in' },
                  { name: 'International Monetary Fund (IMF)', url: 'https://imf.org' },
                  { name: 'World Bank Open Data', url: 'https://data.worldbank.org' },
                  { name: 'International Energy Agency (IEA)', url: 'https://iea.org' },
                  { name: 'S&P Global PMI', url: 'https://spglobal.com' },
                  { name: 'World Health Organization (WHO)', url: 'https://who.int' },
                  { name: 'United Nations Data', url: 'https://data.un.org' },
                  { name: 'Stockholm International Peace Research Institute', url: 'https://sipri.org' },
                  { name: 'Ministry of Commerce & Industry', url: 'https://commerce.gov.in' },
                ].map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-muted/30 transition-colors group">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{s.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 space-y-2 text-xs text-muted-foreground leading-relaxed">
              <h3 className="text-sm font-bold text-foreground">Methodology Notes</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>All economic data is sourced from official government releases and international institutions. Where preliminary estimates exist, we clearly label them as such.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>GDP data uses the 2022-23 base year series following the February 2026 rebasing by MoSPI. Historical data is footnoted when the base year differs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Population and demographic data uses Census 2011 as baseline, with intercensal estimates from official sources. We will update to Census 2024 data when officially released.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Military and defence data is sourced from government budgets, SIPRI, and IISS Military Balance. Classified or unreleased data is not speculated upon.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Comparative international data uses the most recent available year across all countries, noted in each visualization.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== CONFLICT OF INTEREST ===== */}
      <section id="conflict-of-interest" className="mb-16 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Conflict of Interest Policy</h2>
            <p className="text-sm text-muted-foreground">Ensuring editorial decisions are free from personal or professional bias</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-5 space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>Members of the editorial team are required to:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                <span>Disclose any personal, financial, or professional relationships that could reasonably be perceived as a conflict of interest with respect to stories they work on.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                <span>Recuse themselves from coverage of topics where a material conflict exists.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                <span>Decline gifts, payments, or benefits from any subject of coverage, government entity, or political organisation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                <span>Not hold elected office, serve as a political party functionary, or accept compensation from any government or political organisation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                <span>Not trade securities based on non-public information obtained through editorial work.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* ===== RIGHT OF REPLY & GRIEVANCE ===== */}
      <section id="grievance" className="mb-16 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Right of Reply &amp; Grievance Redressal</h2>
            <p className="text-sm text-muted-foreground">How to respond to coverage or file a formal grievance</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-5 space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              Subjects of our stories have a right to reply. If you are mentioned in a story and believe any factual claim is inaccurate, or if you wish to provide context or a response, you may:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Email our Grievance Officer at <a href="mailto:grievance@thebreakdown.in" className="text-primary hover:underline">grievance@thebreakdown.in</a> with the story URL and the specific claim you wish to address.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>We will acknowledge receipt within 48 hours and provide a substantive response within 7 working days.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Where a factual error is confirmed, it will be corrected per our Corrections Policy. Where the dispute concerns interpretation or framing, we may publish a response or clarification at our discretion, maintaining editorial independence.</span>
              </li>
            </ul>
            <div className="mt-3 p-3 rounded-lg border border-amber-200/30 bg-amber-500/5">
              <p className="text-xs">
                <strong className="text-foreground">Grievance Officer:</strong> The Editorial Team, The Breakdown Media. 
                Email: <a href="mailto:grievance@thebreakdown.in" className="text-primary hover:underline">grievance@thebreakdown.in</a>. 
                Response time: 48 hours acknowledgment, 7 working days substantive response.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ===== PRIVACY ===== */}
      <section id="privacy" className="mb-16 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Privacy</h2>
            <p className="text-sm text-muted-foreground">How we handle your data — briefly, because we believe in privacy by default</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {PRIVACY_SECTIONS.map((p) => (
            <Card key={p.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl border bg-muted/30">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Contact:</strong> For privacy-related inquiries, write to{' '}
            <a href="mailto:privacy@thebreakdown.in" className="text-primary hover:underline">privacy@thebreakdown.in</a>.
            We will respond within 7 working days.
          </p>
        </div>
      </section>

      {/* ===== LEGAL & REGISTRATION ===== */}
      <section id="legal" className="mb-16 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Legal &amp; Registration</h2>
            <p className="text-sm text-muted-foreground">Publisher information and regulatory compliance</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-5">
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div className="space-y-2">
                <p><strong className="text-foreground">Publisher:</strong> The Breakdown Media</p>
                <p><strong className="text-foreground">Registered address:</strong> Mumbai, Maharashtra, India (registration details available upon request)</p>
                <p><strong className="text-foreground">Copyright:</strong> &copy; {new Date().getFullYear()} The Breakdown Media. All rights reserved.</p>
              </div>
              <div className="space-y-2">
                <p><strong className="text-foreground">Grievance Officer:</strong> The Editorial Team</p>
                <p><strong className="text-foreground">Email:</strong> <a href="mailto:grievance@thebreakdown.in" className="text-primary hover:underline">grievance@thebreakdown.in</a></p>
                <p className="italic text-[11px] text-muted-foreground/60 mt-2">
                  Registration as a digital news publisher under the IT Rules 2021 is in process. This page will be updated with registration details once confirmed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="mb-12 scroll-mt-24">
        <Separator className="mb-8" />
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading">Get in Touch</h2>
            <p className="text-sm text-muted-foreground">The right channel for every inquiry</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { email: 'hello@thebreakdown.in', purpose: 'General inquiries, story tips, feedback', icon: Mail },
                { email: 'corrections@thebreakdown.in', purpose: 'Report factual errors in published stories', icon: PenLine },
                { email: 'grievance@thebreakdown.in', purpose: 'Formal grievances, right of reply requests', icon: Shield },
                { email: 'privacy@thebreakdown.in', purpose: 'Privacy-related inquiries and data requests', icon: Lock },
              ].map(c => {
                const Icon = c.icon
                return (
                  <a key={c.email} href={`mailto:${c.email}`} className="group flex items-start gap-3 p-4 rounded-lg border hover:border-primary/20 hover:bg-muted/30 transition-all">
                    <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{c.email}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.purpose}</p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 ml-auto" />
                  </a>
                )
              })}
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t">
              <a href="https://x.com/thebreakdownin" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">X / Twitter</a>
              <a href="https://youtube.com/@thebreakdownin" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">YouTube</a>
              <a href="https://linkedin.com/company/thebreakdownin" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
              <a href="https://instagram.com/thebreakdowndaily" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer note */}
      <div className="text-center text-[11px] text-muted-foreground/60 pb-8">
        This page was last updated on July 1, 2026. It will be reviewed and updated quarterly, or within 7 days of any material change to the policies described above.
      </div>
    </div>
  )
}
