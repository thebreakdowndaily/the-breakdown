import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { ArrowUpRight, Mail, Globe } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description: 'India\'s first Visual Intelligence Platform. Intelligence Reports, Data Lab, The Fix, Accountability, and global situation analysis.',
  path: '/about',
})

const PRODUCTS = [
  {
    name: 'Intelligence',
    href: '/intelligence',
    desc: 'Real-time situational awareness on India and the world, delivered as structured intelligence reports.',
  },
  {
    name: 'Explained',
    href: '/explained',
    desc: 'Complex topics in policy, science, and geopolitics, broken down with timelines and data.',
  },
  {
    name: 'Data Lab',
    href: '/data-lab',
    desc: 'Interactive visualizations on GDP, inflation, budget, military, trade, energy, and more.',
  },
  {
    name: 'The Fix',
    href: '/the-fix',
    desc: 'Evidence-based solutions to India\'s toughest problems, with actionable recommendations.',
  },
  {
    name: 'Accountability',
    href: '/accountability',
    desc: 'Track government promises, scheme performance, and institutional outcomes.',
  },
  {
    name: 'Knowledge Graph',
    href: '/knowledge',
    desc: 'Connected intelligence — explore entities, relationships, and timelines across our coverage.',
  },
  {
    name: 'Timelines',
    href: '/timelines',
    desc: 'Every story has a history. Chronological timelines of key events, policies, and conflicts.',
  },
  {
    name: 'Country Profiles',
    href: '/country-profiles',
    desc: 'Every country, quantified — economic, military, demographic, and energy profiles at a glance.',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12 pb-12 border-b">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
          <span className="text-xl font-bold font-heading text-primary">TB</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
          The Breakdown OS
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          India&rsquo;s first Visual Intelligence Platform. We help you{' '}
          <strong className="text-foreground">understand the world, not just follow the news</strong>.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold font-heading mb-4">Mission</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            The information age has become the misinformation age. The Breakdown exists to reverse that — by treating every article as an Intelligence Report, every topic as a dashboard, every policy as a timeline, and every country as a quantified profile.
          </p>
          <p>
            We combine journalistic rigour with data science to deliver evidence-based analysis of India&rsquo;s most consequential stories — from nuclear energy and AI governance to infrastructure and electoral politics. No punditry. No partisan framing. No editorial shortcuts.
          </p>
          <p>
            In an age of algorithmic noise, our mission is to restore clarity through structure, verification, and visual intelligence.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold font-heading mb-4">Coverage</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'Geopolitics', pct: '35%', desc: 'Diplomacy, conflict, alliances' },
            { name: 'Tech / AI', pct: '25%', desc: 'Platforms, privacy, regulation' },
            { name: 'Economy', pct: '20%', desc: 'Trade, tariffs, markets' },
            { name: 'Media', pct: '12%', desc: 'Press freedom, platform bans' },
          ].map(p => (
            <div key={p.name} className="p-4 rounded-xl border border-border/50 bg-card text-center">
              <p className="text-2xl font-bold font-heading text-primary mb-1">{p.pct}</p>
              <p className="text-sm font-semibold mb-0.5">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Remaining 8% covers cross-cutting topics and special investigations.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold font-heading mb-4">Editorial Team</h2>
        <div className="p-4 rounded-xl border border-border/50 bg-card space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            The Breakdown is currently a small editorial operation. All stories are reported, analysed, and published under the collective byline <strong className="text-foreground">The Breakdown Desk</strong>, which reflects shared editorial responsibility for every story we publish.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We believe in byline transparency. As the team grows, named bylines will be introduced so that each story carries individual attribution for reporting, analysis, and editorial judgment.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold font-heading mb-4">Methodology</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: 'Multi-Source', desc: 'Every claim is sourced from 2+ independent sources — government data, verified reports, and primary documents.' },
            { title: 'Data-First', desc: 'Every number is verified against official datasets — RBI, NSO, IMF, World Bank, IEA, and more.' },
            { title: 'Contextualized', desc: 'Every comparison includes historical baselines, global benchmarks, and caveats where data is uncertain.' },
          ].map(m => (
            <div key={m.title} className="p-4 rounded-xl border border-border/50 bg-card">
              <h3 className="font-semibold text-sm mb-2">{m.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold font-heading mb-4">Transparency &amp; Ethics</h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <h3 className="font-semibold text-foreground mb-2">Funding &amp; Independence</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The Breakdown is a self-funded, independent editorial project. It carries no advertising, has no paywall, accepts no sponsored content, and is not affiliated with any political party, government body, corporation, or foundation. All editorial decisions are made independently by the editorial team. This disclosure will be updated if the funding model changes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <h3 className="font-semibold text-foreground mb-2">Corrections Policy</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We are committed to correcting errors promptly and transparently. If you believe a story contains a factual error, please email{' '}
              <a href="mailto:corrections@thebreakdown.in" className="text-primary hover:underline">corrections@thebreakdown.in</a>.
              Confirmed errors will be corrected in the story with a visible &#91;Correction&#93; note at the top stating the date, nature of the correction, and the original error.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <h3 className="font-semibold text-foreground mb-2">AI Use Policy</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use AI tools to surface patterns across data points, verify source citations, and assist with research. All content — including analysis, framing, claims, and editorial judgment — is produced and approved by human editors. No story is published without human review. The &ldquo;Ask AI&rdquo; feature on the homepage is a demonstration interface and does not generate editorial content.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <h3 className="font-semibold text-foreground mb-2">Conflict of Interest</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Members of the editorial team are required to disclose any personal, financial, or professional relationships that could reasonably be perceived as a conflict of interest with respect to stories they work on. No member of the editorial team holds elected office, serves as a political party functionary, or accepts compensation from any government or political organisation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <h3 className="font-semibold text-foreground mb-2">Right of Reply &amp; Grievance Redressal</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Subjects of our stories have a right to reply. If you are mentioned in a story and believe any factual claim is inaccurate, please contact our Grievance Officer at{' '}
              <a href="mailto:grievance@thebreakdown.in" className="text-primary hover:underline">grievance@thebreakdown.in</a>.
              We will acknowledge receipt within 48 hours and respond substantively within 7 working days.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold font-heading mb-4">Privacy</h2>
        <div className="p-4 rounded-xl border border-border/50 bg-card">
          <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Data collection:</strong> The Breakdown does not use tracking cookies, analytics scripts, advertising pixels, or behavioural profiling. We do not collect, store, or process any personal data beyond what you voluntarily provide (e.g., email address via the newsletter form).
            </p>
            <p>
              <strong className="text-foreground">Newsletter:</strong> If you subscribe to the newsletter, your email address is stored locally for demonstration purposes. Full backend integration with a privacy-compliant email provider is coming soon.
            </p>
            <p>
              <strong className="text-foreground">Third-party services:</strong> We use Cloudflare (CDN and DNS), Unsplash (stock imagery), and open-source libraries (Leaflet, ECharts). These services may process data per their own privacy policies. We use no social media tracking pixels.
            </p>
            <p>
              <strong className="text-foreground">Contact:</strong> For privacy-related inquiries, write to{' '}
              <a href="mailto:privacy@thebreakdown.in" className="text-primary hover:underline">privacy@thebreakdown.in</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold font-heading mb-4">Legal &amp; Registration</h2>
        <div className="p-4 rounded-xl border border-border/50 bg-card">
          <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Publisher:</strong> The Breakdown Media</p>
            <p><strong className="text-foreground">Registered address:</strong> Mumbai, Maharashtra, India (registration details available upon request)</p>
            <p><strong className="text-foreground">Copyright:</strong> &copy; 2026 The Breakdown Media. All rights reserved.</p>
            <p><strong className="text-foreground">Grievance Officer:</strong> The Editorial Team,{' '}
              <a href="mailto:grievance@thebreakdown.in" className="text-primary hover:underline">grievance@thebreakdown.in</a>
            </p>
            <p className="mt-3 text-[11px] text-muted-foreground/60 italic">
              Registration as a digital news publisher under the IT Rules 2021 is in process. This page will be updated with registration details once confirmed.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold font-heading mb-4">Products</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {PRODUCTS.map(p => (
            <Link
              key={p.name}
              href={p.href}
              className="group flex items-start gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/20 hover:bg-muted/50 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">
                    {p.name}
                  </span>
                  <ArrowUpRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="p-6 rounded-xl border border-border/50 bg-muted/30">
        <h2 className="text-xl font-bold font-heading mb-2">Get in touch</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Have a story tip, data request, feedback, or correction? We&rsquo;d like to hear from you.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:hello@thebreakdown.in"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Mail className="size-3.5" />
            hello@thebreakdown.in
            <ArrowUpRight className="size-3" />
          </a>
          <a
            href="mailto:corrections@thebreakdown.in"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            corrections@thebreakdown.in
            <ArrowUpRight className="size-3" />
          </a>
          <a
            href="mailto:grievance@thebreakdown.in"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            grievance@thebreakdown.in
            <ArrowUpRight className="size-3" />
          </a>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
          <a href="https://x.com/thebreakdownin" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            X / Twitter
          </a>
          <a href="https://youtube.com/@thebreakdownin" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            YouTube
          </a>
          <a href="https://linkedin.com/company/thebreakdownin" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            LinkedIn
          </a>
          <a href="https://instagram.com/thebreakdownin" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Instagram
          </a>
        </div>
      </section>
    </div>
  )
}
