# The Breakdown — Comprehensive Website Audit

> Review Board: FT Product Lead, Economist Senior Editor, Reuters Digital Strategy Director, Bloomberg UX Lead, Investigative Journalist, Cognitive Psychologist, Information Architect, Accessibility Specialist, SEO Strategist, Performance Engineer
> Date: June 24, 2026
> Site: https://thebreakdown.in

---

# 1. Executive Summary

The Breakdown has a strong visual identity and the raw ingredients of a trusted news brand. The dark theme, gold accents, and cinematic typography signal seriousness. The CMS hydration, real-time polling, and search overlay demonstrate technical ambition.

**But the execution undermines the mission at every critical point.**

The site positions itself as "forensic," "evidence-based," and "transparent" — then hardcodes economic data without sources, labels every author as "The Breakdown," links all legal policies to the editorial policy page, and pre-renders generic AI analysis text that isn't actually AI-generated.

This is not a trust problem. It's a **credibility gap** between what the brand promises and what the code delivers. Every reader who scrolls past the beautifully art-directed hero and then lands on hardcoded dashboard numbers with no sources will feel the gap.

The good news: every problem is fixable. None require architectural changes. They are all execution gaps.

---

# 2. Brutal Truth Report

## 2.1 The Credibility Gap

| The Brand Says | The Site Does |
|----------------|---------------|
| "Traced to the source" | Dashboard, rankings, and tax data are hardcoded with zero source links |
| "Forensic news analysis" | No author names on any story card |
| "Reader-supported. Advertising-free." | No about page, no funding disclosure, no team page |
| "Transparency" | Privacy Policy, Terms of Service, and Cookie Policy all 404 to editorial-policy.html |
| "Evidence-based" | AI Analysis section on story pages generates generic placeholder text client-side, pretending to be intelligent analysis |
| "We show our work" | No methodology page, no fact-check pipeline visible to readers |

## 2.2 The Hardcoded Lie

The India Dashboard shows 6 metrics (GDP, Inflation, Sensex, Unemployment, Digital Payments, Renewable Energy) — **all hardcoded in HTML** with no API fetch, no source link, no last-updated timestamp. These numbers become less accurate with every market tick. If a reader checks Sensex against live data and finds a discrepancy, the entire site's credibility is lost.

## 2.3 The Legal Risk

The footer contains a "Legal" column with three links:
- Privacy Policy → `/editorial-policy.html`
- Terms of Service → `/editorial-policy.html`
- Cookie Policy → `/editorial-policy.html`

All three resolve to the editorial policy page. This is a legal liability in India under IT Act 2000 and GDPR if serving EU readers. You are representing to users that you have these policies when you do not.

## 2.4 The Dead Code

- **Page transition iris animation**: Full CSS/HTML implementation, zero JavaScript triggers. Never activates.
- **Flag CSS classes** in rankings: `.flag us`, `.flag cn`, `.flag in`, etc. have no CSS rules. Render as invisible empty spans.
- **Hero video poster** loads from Unsplash but the video source is from Pixabay CDN — `preload="none"` only defers, doesn't prevent mobile data usage.
- **SearchOverlay close button**: Inline `onclick` works, but Escape key handler is missing for the search overlay.

## 2.5 The Trust Destroyers

1. No author names on story cards
2. No author bios on story pages ("The Breakdown" is not an author)
3. No correction log (page exists, says "No corrections to date" — this is honest but incomplete without a system)
4. No "Report an error" link on story pages
5. No methodology disclosure anywhere
6. No team page
7. No funding page
8. No social media presence linked from the site
9. Dashboard data has no "last updated" timestamp, making it untrustworthy immediately
10. The AI Analysis section generates text like "This story covers [category] — a core beat of The Breakdown" — a vacuous placeholder passed off as intelligence

---

# 3. Biggest Weaknesses

## Critical (fix immediately)

| # | Issue | Impact | Fix time |
|---|-------|--------|----------|
| 1 | Footer legal links all point to editorial-policy.html | Legal liability, trust destruction | 2 hours |
| 2 | Dashboard data hardcoded with no sources | Direct contradiction of brand promise | 4 hours |
| 3 | World rankings data hardcoded, potentially outdated, flags broken | Credibility loss on first interaction | 3 hours |
| 4 | Tax explorer data hardcoded with no budget year or source | Same as above | 2 hours |
| 5 | No author attribution on story cards or story pages | Reduces accountability, hurts trust | 4 hours |
| 6 | No methodology / about / team / funding page | Readers cannot verify who you are | 8 hours |

## High Priority

| # | Issue | Impact |
|---|-------|--------|
| 7 | No social media icons on site | Missed growth and credibility signals |
| 8 | AI Analysis section generates fake intelligent content | If discovered, destroys trust permanently |
| 9 | Hero video adds 5MB+ on mobile data | High bounce rate on mobile |
| 10 | Body text contrast fails WCAG AA (#7A7A85 on #070708 ≈ 4.4:1) | Accessibility failure, readability issues |
| 11 | /my-stories returns 404 on direct navigation | Broken user experience |
| 12 | Search icon uses obscure unicode character (⌕) not recognizable as search | Poor UX |
| 13 | GSAP loaded on story pages for scroll animations — 50KB for visual sugar | Performance waste |

## Medium Priority

| # | Issue |
|---|-------|
| 14 | News ticker no retry on API failure — permanently shows "Loading headlines" |
| 15 | Stories API no retry on error — shows failure state until next poll |
| 16 | Section padding 120px creates excessive scroll distance on mobile |
| 17 | No "Skip to content" on policy pages or story pages |
| 18 | Mobile overlay menu has no backdrop-click-to-close |
| 19 | Tax chart canvas inaccessible — data not available in text to screen readers |
| 20 | Multiple `<main>` elements (homepage wraps footer inside `<main>`) |
| 21 | No reading progress on homepage |
| 22 | Preloader adds perceived latency even on fast connections |
| 23 | No self-hosted fallback analytics |
| 24 | Story page "Listen" uses browser SpeechSynthesis — unreliable quality |

---

# 4. Biggest Opportunities

## 4.1 The Trust Engine

The single biggest opportunity: **close the gap between brand promise and code reality** in 7 days.

If every dashboard number had a source link, every story had a named author, every legal page had its own content, and a methodology page existed — the site would instantly feel more credible than 95% of Indian news sites. This is a low-effort, high-impact differentiation.

## 4.2 The Evidence Explorer

The Source Explorer on story pages is genuinely innovative. Expand it:
- Show it on the homepage dashboard (click any metric → see sources)
- Add a site-wide source search page
- Let readers filter stories by source type (e.g., "show me all stories that use government documents as primary sources")

## 4.3 The Knowledge Graph

The architecture exists in the editorial-operating-system.md. The intelligence sidebar on story pages could show:
- Related entities mentioned in the story
- Timeline of events connected to this entity
- Other stories covering the same topic
- Key claims with confidence scores

This would make the site genuinely differentiated — not just another news site with a dark theme.

## 4.4 The Newsletter

There's one newsletter form and one newsletter product ("The Sunday Briefing"). The media blueprint calls for 9 newsletters. Start with one more — the "Morning Brief" — as the daily acquisition engine. A daily email is the single highest-leverage growth investment.

## 4.5 The Story Page

The story page template is actually excellent — reading progress, TOC, timeline, source explorer, share buttons, follow, listen, summarize, theme toggle, live clock, breadcrumbs. This is the best page on the site.

**Opportunity**: Make the homepage serve the story page better. The story page has all the trust features; the homepage has almost none.

---

# 5. Homepage Improvements

## 5.1 Section Reordering

**Current order:**
1. Hero
2. News Ticker
3. Stories
4. Dashboard
5. Rankings
6. Tax Explorer
7. Newsletter
8. Footer

**Recommended order:**
1. Hero (keep)
2. News Ticker (keep)
3. **Trust Strip** — NEW: "How we work" / "Our method" / "Source transparency" mini-section (3 cards: Our Methodology, Our Sources, Our Corrections)
4. **Dashboard** — Move up. The data dashboard is your differentiator. Lead with evidence.
5. **Stories** — Move down. Stories are expected. The dashboard is unique.
6. Rankings (keep position)
7. Tax Explorer (keep position)
8. Newsletter (keep position)
9. **Trust Strip 2** — NEW: Author credits, funding model, editorial charter links
10. Footer

## 5.2 Critical Additions

| Element | Where | Why |
|---------|-------|-----|
| Source links on every dashboard metric | Dashboard cards | "Evidence-based" demands it |
| "Last updated" timestamp on dashboard | Dashboard header | Without it, data is immediately suspect |
| Author names on story cards | Story card body | Accountability |
| "About" / "Methodology" page link | Primary nav | Trust |
| Social media icons | Footer + Nav | Growth + credibility |
| Proper Privacy/Terms/Cookie pages | Footer legal column | Legal compliance + trust |

## 5.3 Visual Improvements

| Issue | Fix |
|-------|-----|
| Hero headline vague ("INDIA Is Not for Beginners") | Add clarifying subtitle or swap for "Understand what matters" |
| Flags in rankings table not rendering | Add flag emoji CSS or replace with text abbreviations |
| Section padding 120px | Reduce to 80px on mobile, 100px on desktop |
| No visual connection between sections | Add subtle section dividers (gold line) |
| Search button icon | Replace ⌕ with 🔍 or SVG magnifying glass |

## 5.4 Story Card Improvements

| Issue | Fix |
|-------|-----|
| No author name | Add author line below summary |
| No reading time on card (it exists in data but formatting is inconsistent) | Add reading time consistently |
| 14px body text at 4.4:1 contrast | Bump to 15px and lighten to #8A8A95 or use bold #C0C0C8 |
| Card click targets entire card but no visual affordance | Add "Read more" always visible |

---

# 6. Article Improvements

## 6.1 The Story Page (Already Strong)

What works:
- Breadcrumbs
- Reading progress bar
- Table of contents (when 3+ h2s)
- Follow button
- Listen (TTS)
- Summarize (AI)
- Source explorer with grouping
- Timeline
- Related stories
- Theme toggle
- Live clock
- Reading estimate in nav

## 6.2 What's Missing

| Gap | Fix |
|-----|-----|
| Author name defaults to "The Breakdown" | Show real author name + bio link |
| No "Report an error" link | Add below every story |
| No correction history on story | If story has corrections, show them |
| No confidence score display | Add Composite Confidence Score badge per editorial-operating-system.md |
| AI Analysis is generic placeholder text | Either make it real AI or remove it. Fake intelligence is worse than no intelligence |
| No social share counts | Add minimal share count (X, LinkedIn) |
| No "fact check this" button | Let readers flag claims for fact-checking |
| No print stylesheet | Print layout is broken |
| No estimated reading time at top (exists in nav but not prominent) | Add near the date |
| No "Last updated" on stories without `story_status=updated` | Show last-modified date on all stories |

## 6.3 The AI Analysis Problem

Currently the AI Analysis section:
```javascript
analysis += '<p><strong>Why It Matters:</strong> This story covers ' + cat.toLowerCase() + ' — a core beat of The Breakdown.</p>';
analysis += '<p><strong>What To Watch:</strong> Follow-up developments, official responses, and how allied nations and markets react in the coming days.</p>';
```

This is **template text passed off as AI analysis**. It contains no story-specific insight. Every article in the same category gets identical text. A reader who reads two articles will notice the pattern.

**Options:**
1. Make it genuinely AI-generated (call the AI endpoint with story content)
2. Replace with human-written editor's note
3. Remove it entirely

Option 1 is best but requires the `/api/ai/chat` endpoint to be operational. Option 3 is safest until Option 1 is ready.

---

# 7. Design Improvements

## 7.1 Visual Hierarchy

| Issue | Fix |
|-------|-----|
| Dashboard numbers (38px Bebas) overwhelm the section | Keep size but add thin subtitle line with source |
| Stories section has no visual priority indicator | Add "New" badge on recently published stories |
| No visual distinction between free and premium content | Add subtle lock icon on premium (future) |
| Same card style for all stories | Use visual weight to indicate importance — larger card for lead story |
| News ticker is subtle (42px height) | Keep subtle. It's ambient, not primary |

## 7.2 Color System

| Issue | Fix |
|-------|-----|
| Body text contrast fails WCAG AA | Lighten text to #A0A0A8 or add text-shadow for readability |
| Only gold as accent color | Add secondary accent (teal/blue for verified facts, red for corrections) |
| Tax chart uses 9 shades of gold-brown | Hard to distinguish adjacent slices. Add more color variance |
| No category colors | Each category (Geopolitics/Economy/Tech/Policy) needs a subtle color distinction |

## 7.3 Typography

| Issue | Fix |
|-------|-----|
| Bebas Neue at 9vw hero is 120px+ on large screens | Cap at 7rem |
| No body font size distinction between story card (14px) and article body (16-19px) | Increase card text to 15px minimum |
| JetBrains Mono at 9px for labels is small | Minimum 10px for readability |
| No line-height adjustment for long-form | Article body line-height 1.85 is good — keep it |

## 7.4 Dark Theme Refinements

| Issue | Fix |
|-------|-----|
| `#070708` is pure black — can feel oppressive | Add 1-2% tint: `#0A0A0C` |
| Card backgrounds `#0D0D0F` barely distinguishable from page bg | Lighten to `#111114` or reduce border opacity |
| No dark theme on policy pages (they use different CSS) | Unify theme across all pages |
| Scanlines on story pages — GPU cost, some users dislike | Make it prefers-reduced-motion safe (already mostly done) |

---

# 8. Editorial Improvements

## 8.1 Trust Infrastructure

| Missing | Priority | Implementation |
|---------|----------|----------------|
| Author pages | High | `/author/{name}` with bio, all stories, contact |
| Methodology page | High | `/methodology` — how we research, verify, correct |
| Funding page | High | `/funding` — who pays for this |
| Team page | Medium | `/team` — names, roles, backgrounds |
| Story source count visible | Done | On story cards, show source count |
| Author bylines | High | Every story card and page |

## 8.2 Content Gaps

| Missing | Impact |
|---------|--------|
| No "Editor's Note" on stories | Readers don't know who to hold accountable |
| No correction log entries | No corrections is statistically suspicious for 20+ stories |
| No "Why this matters" on story cards | Summary exists but doesn't always answer the "why" |
| No story status explanation | Badges exist but no legend explaining "breaking/developing/updated" |
| No fact check methodology on site | The fact check pipeline is documented internally but invisible to readers |

---

# 9. SEO Improvements

## 9.1 Good

- `NewsMediaOrganization` + `WebSite` structured data
- Search action schema
- OG tags and Twitter cards
- Clean URL structure (`/story/{slug}`)
- Semantic HTML (nav, main, section, article)
- Meta descriptions on all pages
- Sitemap.xml exists
- Plausible analytics (privacy-friendly)

## 9.2 Missing

| Gap | Fix |
|-----|-----|
| No `Article` or `NewsArticle` schema on story pages | Add dynamically when story loads |
| No `BreadcrumbList` schema | Add to every page |
| No `FAQPage` schema on explainers | Add when content type is explainer |
| No `Person` schema for authors | Add when author attribution is live |
| No `Dataset` schema for data stories | Add when data stories publish |
| No `Organization` schema in footer | Already in head — add to footer as well |
| No `SiteNavigationElement` schema | Add for nav structure |
| Meta descriptions truncated (some over 160 chars) | Audit and trim |
| No keyword focus on individual story pages | Add SEO metadata to CMS |
| No internal linking strategy visible | Story pages don't link to related stories except via API |
| Topic clusters not reflected in site architecture | Create `/topic/{slug}` hub pages properly |

## 9.3 Quick Wins

| Task | Effort | Impact |
|------|--------|--------|
| Add `Article` schema to story page template | 1 hour | High |
| Add `BreadcrumbList` schema | 30 min | Medium |
| Fix meta description lengths | 1 hour | Medium |
| Add internal links in story body | Editorial process change | High |

---

# 10. Performance Improvements

## 10.1 Current State

Based on code review:

| Metric | Estimated | Target |
|--------|-----------|--------|
| HTML size | ~32KB (uncompressed) | Acceptable |
| CSS inline | ~15KB | Could externalize critical CSS |
| JS inline | ~20KB | Acceptable |
| Fonts | 3 Google Fonts (Bebas, JetBrains Mono, Source Sans 3) | Heavy — 4 font files |
| GSAP | 50KB loaded on story pages | Remove — use CSS animations |
| Hero video | 5MB+ on mobile | Major problem |

## 10.2 Critical Fixes

| Issue | Fix | Impact |
|-------|-----|--------|
| Hero video on mobile | Replace video with static image on mobile, or use `<picture>` with mobile-sized source | High — saves 5MB+ per visit |
| GSAP on story pages | Replace with IntersectionObserver + CSS transitions | Medium — saves 50KB |
| Google Fonts critical path | Add `font-display: swap` to all | Medium — prevents FOIT |
| Preloader always shows | Only show if page load > 800ms, else skip | Medium — reduces perceived latency |
| Inline styles on dynamic elements | Search overlay, story cards, etc. use inline styles | Low — move to CSS classes |
| No resource hints | Add `preconnect` to Render API, `preload` critical above-fold images | Medium — improves perceived speed |

## 10.3 Mobile Performance

| Issue | Fix |
|-------|-----|
| Hero video on mobile 3G/4G | `preload="none"` is not enough — use `<picture>` with static image on mobile |
| Section padding 120px | Reduce to 80px — saves scroll time |
| Story card images not optimized | Add `sizes` attribute, use WebP/AVIF |
| Font loading blocks render | Add `font-display: swap` |
| JS at bottom of body | Already in correct position |
| No service worker caching | Add SW for offline fallback (already in deploy root? Check) |

---

# 11. Mobile Improvements

## 11.1 Navigation

| Issue | Fix |
|-------|-----|
| Menu overlay has no backdrop-click-to-close | Add click handler on overlay background |
| Menu links animate in beautifully but menu close has no animation | Add exit animation (current: instant hide) |
| Search button: `⌕` is unrecognizable | Use magnifying glass SVG or "Search" label on mobile |
| Nav items "Dispatch", "Data", "Scoreboard" are brand-ambiguous | Add brief subtitle or use clearer labels |

## 11.2 Reading Experience

| Issue | Fix |
|-------|-----|
| Story card text 14px at 4.4:1 contrast | 15px minimum, lighter color |
| Dashboard cards stack single column on mobile (good) | But numbers are 28px on mobile — could be 32px for readability |
| Rank table becomes unreadable on <400px screens | Switch to horizontal scroll or simplified view |
| Tax chart legend becomes single column on mobile (good) | But swatches are only 10px — increase touch target |

## 11.3 Touch Targets

| Issue | Fix |
|-------|-----|
| Filter buttons at 6px 16px with 10px font | Increase padding: 8px 20px minimum |
| Tax legend items have `tabindex="0"` but no interactive behavior | Add click handler to highlight chart segment |
| Share buttons 40x40px on story page (good) | Keep |
| Follow button 6px 14px font 11px | Increase to 8px 16px |

## 11.4 Mobile Data

| Issue | Fix |
|-------|-----|
| Hero video loads on mobile | Use server-side detection or CSS media query to swap for image |
| Google Fonts adds ~100KB+ on first load | Self-host fonts or use system font stack on slow connections |
| No offline support | Add service worker for previously viewed stories |

---

# 12. Reader Retention Strategy

## 12.1 Current State

The site has strong retention hooks:
- Newsletter signup
- Follow stories (localStorage)
- Real-time polling for updates (30s)
- Scroll-triggered reveal animations
- Reading progress on story pages

## 12.2 What's Missing

| Hook | Why It Matters | Implementation |
|------|----------------|----------------|
| No "Read Next" at bottom of stories | Reader finishes, leaves | Add 3 related story cards after article |
| No reading history | No "resume reading" | Store read story IDs in localStorage, show "Continue Reading" section |
| No streak or habit system | No reason to return daily | "You've read X days in a row" |
| No personalized recommendations | All readers see the same content | Category-based recommendations from reading history |
| No notification system | Reader must check manually | Push notification for followed story updates |
| No save/bookmark for later | Reader can only follow, not bookmark | Add "Read Later" separate from "Follow" |
| No "You haven't read this" label | No way to find new content | Mark stories published since last visit |
| No weekly digest | Catch up on missed stories | Newsletter already covers this |
| No gamification | No progression feeling | Reading streaks, stories read count |

## 12.3 Quick Retention Wins

| Tactic | Effort | Impact |
|--------|--------|--------|
| "Read Next" 3 cards at bottom of story | 2 hours | High |
| Reading history (localStorage) | 2 hours | Medium |
| "New since your last visit" indicator | 1 hour | High |
| Personalized recommendations from history | 4 hours | Medium |

---

# 13. Growth Strategy (from code review)

## 13.1 Current Growth Infrastructure

| Channel | Status |
|---------|--------|
| SEO | Basic — structured data, sitemap, meta tags. No topic clusters yet |
| Newsletter | One form. No evidence of automation (welcome sequence, etc.) |
| Social | Zero social links on site. No sharing infrastructure beyond story page buttons |
| Referrals | Share buttons on story pages (X, WhatsApp, LinkedIn, Copy) |
| Direct | No brand recognition yet |

## 13.2 What's Missing

| Growth Lever | Gap |
|--------------|-----|
| Social proof | No share counts, no subscriber counts, no "Join 1,000+ readers" |
| Referral program | No "Share and get access" or forward-to-friend tracking |
| Lead magnets | No PDF download, no report-for-email |
| Social media presence | No links to X/Instagram/YouTube/Telegram from site |
| Content upgrade | No "Get the PDF version" on long-form articles |
| Exit intent | No popup when reader is about to leave |
| Welcome sequence | Newsletter signup gets no onboarding emails |
| SEO topic clusters | Site architecture doesn't reflect clusters |
| Author branding | No personal brands to attract followings |

## 13.3 Highest-Impact Growth Moves

| Move | Timeline | Expected impact |
|------|----------|-----------------|
| Add social media links to header + footer | 1 hour | Medium |
| Share button tracking (Plausible goals) | 2 hours | Low (measurement) |
| Newsletter welcome sequence | 4 hours | High (retention) |
| Exit-intent newsletter popup | 3 hours | Medium (acquisition) |
| Topic cluster architecture | 2 weeks | High (SEO) |
| Social accounts active + linked | Ongoing | High |

---

# 14. 30-Day Action Plan

## Week 1: Trust & Legal (Foundation)

| Day | Task | Who |
|-----|------|-----|
| 1 | Create Privacy Policy page (unique content) | Legal + Editorial |
| 2 | Create Terms of Service page (unique content) | Legal + Editorial |
| 3 | Create Cookie Policy page (unique content) | Legal |
| 4 | Add source links to all 6 dashboard metrics + "Last updated" | Dev |
| 5 | Fix world rankings data: update to current, add source, fix flags | Dev + Editorial |
| 6 | Add budget year and source link to Tax Explorer | Dev |
| 7 | Create /methodology page: how we research, verify, correct | Editorial |

**Week 1 outcome**: No broken legal links. Dashboard, rankings, tax data have sources. Trust infrastructure begins.

## Week 2: Authors & Identity

| Day | Task |
|-----|------|
| 8-9 | Add author names to story cards (from CMS data) |
| 10 | Add author names to story pages (from CMS data) |
| 11 | Create /team page with editor names, backgrounds |
| 12 | Create /funding page — revenue model, no conflicts |
| 13 | Add author bios on story pages (expandable) |
| 14 | Add social media icons to footer: X, YouTube, Instagram, LinkedIn, Telegram |

**Week 2 outcome**: Every story has a named human author. Team exists publicly. Social presence begins.

## Week 3: Trust Signals

| Day | Task |
|-----|------|
| 15 | Add "Report an error" link to all story pages |
| 16 | Fix AI Analysis section — either make it real AI-generated or remove it |
| 17 | Add Composite Confidence Score display to story pages |
| 18 | Add story status legend (what "breaking/developing/updated" means) |
| 19 | Replace search icon unicode ⌕ with 🔍 SVG |
| 20 | Add "Read Next" section on story pages |
| 21 | Add body text contrast fix: #7A7A85 → #A0A0A8 on #070708 |

**Week 3 outcome**: Trust signals visible on every page. Readers can report errors, see confidence, understand status badges.

## Week 4: Polish & Performance

| Day | Task |
|-----|------|
| 22 | Replace hero video with static image on mobile (CSS media query) |
| 23 | Remove GSAP dependency — replace with CSS + IntersectionObserver |
| 24 | Add Article schema + BreadcrumbList schema to story pages |
| 25 | Fix /my-stories to render on direct navigation (server-side or SW) |
| 26 | Add reading history + "Continue Reading" section |
| 27 | Mobile: increase touch targets, fix section padding |
| 28 | Add newsletter welcome email sequence |
| 29 | Add exit-intent newsletter popup |
| 30 | Deploy all changes. Audit again. |

**Week 4 outcome**: Performance improved. Mobile experience refined. Growth infrastructure in place.

---

# 15. 90-Day Action Plan

## Month 2: Intelligence Features

| Feature | Description |
|---------|-------------|
| Intelligence sidebar on story pages | Entities, timeline, key players, related stories |
| Confidence score on all stories | Composite Confidence Score per editorial-operating-system.md |
| Author pages | `/author/{name}` — bio, all stories, contact, follow |
| Topic hub pages | `/topic/{slug}` — curated story collections, explained |
| Morning Brief newsletter | Daily 7 AM newsletter — 5-7 story digest |
| Social media distribution pipeline | Every article → X thread + LinkedIn post + Telegram message |

## Month 3: Growth & Community

| Feature | Description |
|---------|-------------|
| Telegram channel growth campaign | Cross-promotion, exclusive content |
| YouTube channel launch | 1 video/week minimum |
| Instagram presence | 3 posts/week minimum |
| Community launch | Discord/Telegram community for supporters |
| Supporter membership tier | ₹199/month — ad-free, AMA, early access |
| SEO topic clusters | 10 pillar pages, 100 cluster articles |
| Correction log automation | When a story is corrected, log appears automatically |

## Month 3 End State

- All legal pages proper
- Every story has named author
- Dashboard, rankings, tax data sourced and timestamped
- AI Analysis either real or removed
- Newsletter with welcome sequence
- Social media presence active and linked
- Morning Brief newsletter live
- Story pages have intelligence sidebar
- Author pages live
- Topic hubs live
- Supporter membership accepting payments
- Body text contrast fixed
- Hero video mobile-fixed
- Performance improved (no GSAP, smaller fonts, proper caching)

---

# 16. 1-Year Vision

## Site

- Every page meets WCAG AA at minimum, AAA preferred
- Full knowledge graph queryable on site
- 500+ articles with full source transparency
- Composite Confidence Score on every story
- Fact check pipeline visible to readers
- Real-time dashboard with live data + sources
- Mobile app (progressive web app first, native later)

## Trust

- Named authors on every story with public bios
- Full correction log with version history
- Methodology page linked from every story
- Funding and ownership transparent
- External audit of editorial process published
- Reader trust survey conducted and published

## Audience

- 50,000 newsletter subscribers (all editions)
- 10,000 daily active readers
- 500+ paid members
- 100+ institutional subscribers
- Social media: 100,000+ cross-platform

## Revenue

- ₹2,00,000/month recurring
- Membership: 60% of revenue
- Institutional: 20%
- Other streams: 20%
- Path to break-even clear

## Team

- Editor-in-Chief + Managing Editor + Research Editor + Fact Checker
- 2-3 writers with named beats
- Audience Editor + SEO Editor
- Part-time: AI Editor, Video Editor, Community Manager

---

# Appendix: Competitive Comparison

| Factor | The Breakdown (today) | The Breakdown (post-fix) | The Economist | Reuters | Best in class |
|--------|----------------------|------------------------|--------------|---------|--------------|
| Source transparency | ❌ Hardcoded data | ✅ Every data point sourced | ❌ Opaque | ❌ Wire-style | Our World In Data — full source at every point |
| Author attribution | ❌ "The Breakdown" | ✅ Named authors | ✅ Bylines | ✅ Bylines | FT — author bios, story count, topics |
| Methodology disclosure | ❌ None | ✅ /methodology page | ❌ Limited | ❌ None | Our World In Data — full methodology per article |
| Correction transparency | ❌ "No corrections" | ✅ Live correction log | ✅ Corrections published | ✅ Corrections published | Guardian — corrections with version history |
| Data accessibility | ❌ Hardcoded numbers | ✅ Sourced, timestamped | ❌ Paywalled charts | ✅ Some data | Our World In Data — downloadable CSVs |
| AI disclosure | ⚠️ Generic placeholder | ✅ Real AI or removed | ❌ No AI disclosure | ❌ No AI | The Breakdown could lead here |
| Design consistency | ⚠️ Split (homepage vs policy pages) | ✅ Unified | ✅ Unified | ✅ Boring but consistent | FT — distinctive, consistent |
| Mobile performance | ⚠️ Video heavy | ✅ Optimized | ✅ Fast | ✅ Fast | Bloomberg — text-first, instant load |
| SEO | ⚠️ Basic | ✅ Topic clusters, schema | ✅ Excellent | ✅ Excellent | Wikipedia — dominates informational queries |
| Trust signals | ❌ Weak | ✅ Strong | ✅ High (established brand) | ✅ High | Ground News — bias labels (but flawed) |

---

# Final Assessment

**The Breakdown has a better design system than most Indian news sites. It has a more ambitious editorial vision than most. But the execution has a trust gap that must be closed before any growth investment pays off.**

The hierarchy of fixes:

1. **Legal & Trust** (Week 1) — Fix broken policies, add sources to data
2. **Identity** (Week 2) — Named authors, team page, social presence  
3. **Signals** (Week 3) — Report error, confidence score, contrast fix
4. **Performance** (Week 4) — Video on mobile, remove GSAP, schema
5. **Intelligence** (Month 2) — Sidebar, author pages, topic hubs
6. **Growth** (Month 3) — Newsletters, social pipeline, community

The site does not need a redesign. It needs **completion** — every feature that the brand promises must be reflected in the code. Right now there are too many places where a curious reader will find the gap between what you say and what you deliver.

Close the gap. Then grow.

---

> *"A reader's trust is lost in an instant and earned over years. You have 3 seconds on the homepage. You have 30 seconds on a story page. Every hardcoded number, every missing source, every 'we' without a name — each one is a small betrayal of the promise you're making."*
>
> — Review Board, June 2026
