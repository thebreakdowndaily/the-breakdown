# THE BREAKDOWN — Session Summary

## Goal
Build and maintain the Breakdown OS — a visual intelligence platform with Supabase-backed API, admin panel, content pipeline, custom domain, static site deployment via Cloudflare Pages, GitHub-based CI/CD, fact-checked content, interactive "The Fix" section, Transparency Hub, tag archive system, story explainers, deploy hook auto-trigger on CMS publish, and a complete `.opencode/templates/` editorial engine library plus `.opencode/commands/` publishing command library.

## Constraints & Preferences
- Cloudflare API token has **Pages:Write only** — cannot manage DNS zones, D1, KV, or Workers from CLI
- Render free plan: only 1 web service slot occupied by CMS — no second backend possible
- Admin credentials: `admin` + production `ADMIN_PASSWORD` secret (set in Cloudflare)
- Instagram: `@thebreakdowndaily` (unique); X, YouTube, LinkedIn: `@thebreakdownin`
- Supabase project: `lvfovvidtowadmnggzzf.supabase.co` — has `stories` (48), `admin_users`, `story_sources`, `publish_log`, `pipeline_log` tables
- GitHub repo: `github.com/thebreakdowndaily/the-breakdown` (public, master branch)
- Cloudflare Pages connected to GitHub with root dir `frontend`, build cmd `npm run build`, output `out`
- Build: 361 static pages, 35 stories, TypeScript clean, Pagefind indexed (5,809 words, 43 pages)
- `.opencode/templates/` files are canonical editorial engines — rewrites must use these as the standard
- `.opencode/commands/` files are publishing command templates for social, newsletter, etc.

## Progress
### Done
- **Supabase adapter built** — pure REST fetch, reuses existing `stories` table, maps CMS column names
- **Shared types extracted** to `functions/api/types.ts` — Story, User, PipelineLog, DbBackend
- **Factory updated** (`functions/api/db.ts`) — priority: Supabase → Turso → In-Memory
- **Supabase env vars set** as Cloudflare Pages production secrets: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`
- **Production secrets set**: `JWT_SECRET` (64-char random), `ADMIN_PASSWORD` (24-char random), `DEPLOY_HOOK_URL`
- **Custom domain `thebreakdown.in`** CNAME → `the-breakdown.pages.dev` — site live, API health returns 200
- **Open Graph + Twitter Card metadata** in `layout.tsx` with `@thebreakdownin` handles
- **JSON-LD Schema.org** in `layout.tsx` — `WebSite` + `Organization` with `logo` (PNG), `image` (PNG), `sameAs` updated to 4 profiles
- **Logo + OG images** — `public/logo.png` (512×512), `public/og-image.png` (1200×630)
- **Google Search Console** verified at domain level
- **GitHub repo + Cloudflare Pages** connected — root dir `frontend`, build cmd `npm run build`, output dir `out`, branch `master`
- **Deploy hook created** — `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/d6183b30-6c65-43eb-b41f-641ac634e763`
- **Deploy hook auto-trigger integrated** — `[[path]].ts` now POSTs to `DEPLOY_HOOK_URL` when a CMS story is published (fire-and-forget)
- **Supabase CMS build integration** — `build-content.mjs` fetches published stories from Supabase during Cloudflare builds, merges with static stories (slug dedup, static wins); graceful skip when env vars absent
- **Broken `fact-check-cms` submodule removed** — added to `.gitignore`
- **Node v22 set** as build env var on Cloudflare Pages
- **Build failure fixed** — `postbuild.mjs` uses `npx pagefind` instead of hardcoded Windows binary path
- **UI stability fixes** across 9 files — try/catch on localStorage, ErrorBoundary, guarded empty states, dynamic imports with fallbacks, null guards, acronym fixes
- **Design refinements** — `globals.css` with `scroll-smooth`, `::selection`, custom scrollbar (6px), `card-hover` utility, `link-underline` utility; `FadeIn` scroll-triggered animation component
- **Full site audit** — fetched all pages, CSS, robots.txt, sitemap.xml
- **Accessibility audit** — 13-point check: 44 images with alt text, 1 h1, 36 `role="article"` fixed, ARIA comprehensive, skip nav present, form labels fixed
- **Security header audit** — missing HSTS, XFO, Permissions-Policy now fixed in `_headers`
- **7 fixes deployed** (commit `0ef752c`): `_headers` with HSTS/XFO/Permissions-Policy/caching, newsletter `<label>` added, homepage single h1, `role="article"` on 36 cards, JSON-LD `sameAs` updated, social handles consolidated
- **Massive content rewrite** via Editorial Intelligence Engine — all 15 hub pages, 10 data-lab sections, 35 knowledge entities, 23 policy/fix/timeline items, 15 dashboard/layout components, 30 story markdown files rewritten
- **Brand alignment deployed** (commit `05bf4dc`): Primary color to `oklch(0.75 0.15 77)` gold, Bebas Neue + Source Sans 3 fonts, B watermark, CSP header in `_headers`
- **Instagram handle corrected** (commit `9eb783c`): all 7 references from `thebreakdownin` to `thebreakdowndaily`
- **Earth Prize 2026 fact-checked and rewritten**: Jaipur (not Mumbai), $12,500 (not $100K), May 29 (not June 28), no IIT Bombay partnership
- **Comprehensive fact-check completed** — all 30 stories, 35 knowledge entities, 23 policy/fix/timeline items, 15+ hub pages verified via 8 parallel verification agents
- **All fact-check errors fixed across 21 files** (commit `c571165`)
- **The Fix section transformed** (commit `2eb3df7`): interactive progress bars, milestone timelines, citizen checklists, filter/sort index
- **Transparency Hub created** (`/transparency` page) — full editorial methodology, correction log (4 entries), funding disclosure, AI policy, data sourcing, conflict of interest, grievance, privacy, legal, contact
- **5 UX gaps fixed** (commit `066f558`): tag archive pages (197 tags), clickable category badges, clickable tag pills below story headers, reading list in nav, newsletter CTA on story pages
- **`.opencode/templates/` library built** — 9 canonical editorial engine files (editorial-style v6.0, editorial-thinking v7.0, investigative-engine v8.0, intelligence-synthesis v9.0, decision-intelligence v10.0, intelligence-memory v11.0, data-journalism-engine v1.0, story-architecture v2.0, integration-pipeline v1.0)
- **3 stories rewritten** (commit `acc8e4b`) using editorial-style v6.0 + story-architecture v2.0
- **European Heatwave Crisis 2026** — full 12-step editorial pipeline completed (deployed at commit `3f28e50`): 517 lines, 7 sections, 30-asset visual plan, 34 primary sources, 4 inline SVG charts, knowledge graph, editorial review (9.30/10), slug `europe-heatwave-2026`
- **E20 Supreme Court ethanol story** — written and deployed (commit `95ed567`): 19 primary sources, 7 sections, "experiment" controversy, allocation dispute, vehicle compatibility debate; ticker updated; slug `e20-sc-ethanol-status-quo-2026`
- **India's Monsoon Crisis 2026** — full editorial pipeline executed (commit `7f9abcb`): 20.5 KB story, 12 evidence cards, 6 data tables, 42 primary sources, visual plan, 7 chart specs, production HTML, knowledge graph; ticker updated; slug `india-monsoon-crisis-2026`
- **E20 story rewritten** — structural fix applied: tighter 7-section flow, 3 inline SVG charts (blending trajectory, Vinp gap, crude savings), visual stats cards (6-metric grid), comparison grid (India vs Brazil vs USA), scenario cards (Best/Most Likely/Worst), timeseries timeline component
- **E20 HTML regenerated, built, committed, deployed** (commit `01e1fb5`): `index.html` fully rewritten to match rewritten markdown — inline SVG charts, compact timeline with confidence column, 4-country comparison grid, 3-scenario cards with probability and key dates, 19 primary sources table, restructured 6-section architecture (Evidence → Data → Debate → Bigger Picture → What's Next → Sources), deploy hook triggered and Cloudflare build running
- **India's Transparency Paradox story** — full editorial pipeline executed (commit `f0ef142`): 459-line markdown (35KB), 7 evidence sections, 17 primary sources, production `index.html` with inline SVG CPI trend chart (2012-2025), global CPI comparison bar chart (20 countries), penalty enforcement comparison panel (₹453 vs ₹1.5Cr), state backlog data tables, transparency scorecard (9 indicators), scenario probability table (5 scenarios), evidence-tagged claims, full SEO metadata
- **VB-G RAM G story package** — full editorial pipeline executed (commit `f6ed452`): researched via PIB, official Act text, MoRD notifications, Scroll.in, Indian Express; 450+ line markdown, 7 sections (Evidence → Data → Debate → Bigger Picture → What's Next → Bottom Line → Sources); production `index.html` with inline SVG comparison table, state-wise wage bar chart (10 states + 21-state floor), 21-year timeline chart, funding comparison panels (60:40 split), scenario probability table (5 scenarios); 17 primary sources with Very High/High reliability
- **Instagram carousel post created** for VB-G RAM G — 7 slides (1080×1350 px, 4:5) saved to `stories/vb-g-ram-g-2026/carousel-post.md` with cover, old vs new comparison, state wage table, funding model, political fight map, bottom line, save-and-share CTA
- **`.opencode/commands/instagram.md` created** — canonical Instagram publishing command file with brand identity (colours #D4A843, fonts, tone), 4 post types (Story Promotion, Data Carousel, Weekly Roundup, Explainer Thread), visual specs for images (4:5/1:1), carousels (4:5) and reels (9:16), caption style guide (do/don't, voice examples), hashtag strategy (8-12 per post, primary + category-specific), 5-step publishing workflow, final review checklist, standardised output format
- **Earth Prize 2026 Instagram post written** — 6-slide carousel for Indian teenagers winning The Earth Prize; fact-checked ($12,500 not $100K, still in development, May 29 Geneva); pride + hope + accuracy framing
- **First Instagram post diagnostic** — user's first post: 48 views, 3 likes, 2 comments, 2 reposts; analysis: share rate strong (4.2%), comment rate good (4.2%), like rate below benchmark (6.2%); recommendations: improve cover slide, post VB-G RAM G carousel at 7 PM IST, create reel version, use story polls
- **Build: 361 static pages**, 35 stories, TypeScript clean, Pagefind re-indexed (5,809 words, 43 pages)
- **Story categories identified**: 13 unique — Explained (4), Climate (2), Accountability (1), India (6), Incredible India (1), Geopolitics (5), Politics (2), Economy (3), Technology (6), World (2), Tech / AI (1), Tech / Policy (1), AI & Technology (1)
- **Explainers page fixed** — `/explained` now shows all 35 stories grouped by topic category with section headers, featured hero section, aggregate stats, and improved card design (consistent with India dashboard pattern)

### In Progress
- **User to run** `npx psi https://thebreakdown.in` locally for official Lighthouse scores
- **User to share Facebook Page URL** — add to Schema.org `sameAs`

### Blocked
- Facebook Page URL still needed for Schema.org `sameAs`
- Lighthouse scores (user needs to run `npx psi https://thebreakdown.in` locally)

## Key Decisions
- All editorial engines live as `.md` files in `.opencode/templates/` — versioned, referenced by agents in the pipeline
- All publishing commands live as `.md` files in `.opencode/commands/` — standardised output formats per platform
- Templates follow a common format: `# THE BREAKDOWN\n## [Engine Name] v[X.0]` with mission, steps, quality gates
- Integration pipeline uses 12-stage sequence with quality gates between each stage, referencing specific template files by version
- User provides updated engine content as `# THE BREAKDOWN\n## [Engine Name] v[X.0]\n\n[full body]` — file replaced wholesale
- Story files live as `stories/<slug>/<slug>.md` with companion `images.md`, `charts.md`, `seo.md`, `carousel-post.md` files — auto-discovered by `build-content.mjs`
- Confidence scoring: 0-100 scale, labelled by type (Verified Fact, Official Statement, Independent Verification, Expert Opinion, Political Claim, Allegation, Unknown)
- CMS publish pipeline now auto-triggers Cloudflare deploy via `DEPLOY_HOOK_URL` — closes the loop between admin panel and static site
- `build-content.mjs` fetches CMS-published stories from Supabase during Cloudflare builds and merges them into static output — static stories take priority on slug collision
- Inline SVG charts preferred over external image dependencies — renders reliably in dark theme, no network fetch, no image CDN needed
- Instagram carousel posts saved inside story directories as `carousel-post.md` for version-controlled reference alongside editorial content
- VB-G RAM G is the biggest story of July 1, 2026 (Score: 96/100) — 15 Cr households affected, 21-year policy shift, ₹300 wage floor, 40% state cost share
- Explainers page: all 35 stories shown grouped by category — each category gets a section header, stories sorted newest-first within groups, featured hero for top story, aggregate stats (35 stories, 13 topics, ~X min total reading)

## Next Steps
1. User to run `npx psi https://thebreakdown.in` locally for official Lighthouse scores
2. User to share Facebook Page URL — add to Schema.org `sameAs`

## Critical Context
- Supabase URL: `https://lvfovvidtowadmnggzzf.supabase.co`
- Service role key saved in Cloudflare Pages secrets (not in code)
- Custom domain CNAME: `thebreakdown.in` → `the-breakdown.pages.dev` (proxied)
- GitHub: `github.com/thebreakdowndaily/the-breakdown` (public, master branch)
- Deploy hook URL: `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/d6183b30-6c65-43eb-b41f-641ac634e763`
- Build: 361 static pages, 35 stories, TypeScript clean, Pagefind re-indexed (5,809 words, 43 pages)
- Brand: `--primary: oklch(0.75 0.15 77)` (#e4a11d gold), `--saffron: oklch(0.72 0.16 60)`
- Fonts: Bebas Neue (headings) + Source Sans 3 (body) + Geist Mono (code)
- Instagram: `@thebreakdowndaily`; X, YouTube, LinkedIn: `@thebreakdownin`
- Content pipeline: `stories/<slug>/<slug>.md` → `build-content.mjs` (also fetches Supabase CMS stories) → `src/lib/content/generated/stories.ts`
- `.opencode/templates/` is the canonical editorial engine library — 9 files
- `.opencode/commands/` is the publishing command library — `instagram.md` created; more to follow
- Deploy hooks: API `[[path]].ts` auto-POSTs to `DEPLOY_HOOK_URL` on publish action
- 14 stories with editorial pipeline deployed: European Heatwave (34 sources), E20 SC (19 sources, rewritten with inline SVGs + compact timeline), Monsoon Crisis (42 sources), Transparency Paradox (17 sources, 7 evidence sections + 8 data tables), VB-G RAM G (17 sources, 3 inline SVG charts + 7 data tables), plus 9 others
- State-wise wage data verified: Sikkim ₹450 (high-altitude), Haryana ₹409, Goa ₹406, Kerala ₹401, Karnataka ₹382, Punjab ₹360, TN ₹345, Maharashtra ₹317, AP ₹312, Telangana ₹308, 21 states at ₹300 floor
- VB-G RAM G: Act passed Dec 2025 amid protests, presidential assent Dec 21, 2025, effective July 1, 2026; budget ₹95,692 Cr FY27 (highest ever BE); 5 opposition states passed resolutions; 25 states allocated funds
- First Instagram post (48 views, 3 likes, 2 comments, 2 reposts) — share rate 4.2% strong, like rate 6.2% below benchmark; recommendations given for next post
- Story categories: Explained (4), Climate (2), Accountability (1), India (6), Incredible India (1), Geopolitics (5), Politics (2), Economy (3), Technology (6), World (2), Tech / AI (1), Tech / Policy (1), AI & Technology (1)

## Relevant Files
- `.opencode/templates/`: 9 editorial engine files — editorial-style v6.0, editorial-thinking v7.0, investigative-engine v8.0, intelligence-synthesis v9.0, decision-intelligence v10.0, intelligence-memory v11.0, data-journalism-engine v1.0, story-architecture v2.0, integration-pipeline v1.0
- `.opencode/commands/instagram.md`: Canonical Instagram publishing command — brand identity, 4 post types, visual specs, caption style guide, hashtag strategy (10 categories), 5-step workflow, review checklist, standardised output format
- `stories/vb-g-ram-g-2026/`: VB-G RAM G story — 450+ line markdown, production `index.html` (3 inline SVG charts, 7 data tables, 17 sources), carousel post (7 slides), charts spec (8 chart types), images spec (6 infographics), SEO metadata with JSON-LD
- `stories/vb-g-ram-g-2026/vb-g-ram-g-2026.md`: 450+ line 7-section markdown — Act changes, wage floor analysis (10-state impact table), 60:40 funding shift, budget ₹95,692 Cr, 21-year timeline, MGNREGA final year stats, political debate (govt vs critics 5-point comparison), global comparison, scenario probabilities (5 scenarios), 17 primary sources
- `stories/vb-g-ram-g-2026/carousel-post.md`: 7-slide Instagram carousel (1080×1350, 4:5) — cover, old vs new, state wage table, 60:40 funding, political fight map, bottom line, save-and-share
- `stories/india-transparency-paradox-2026/`: India's Transparency Paradox story — 459-line/35KB markdown, production `index.html` with inline SVG CPI chart, global comparison bar chart, penalty enforcement panel (₹453 vs ₹1.5Cr), state backlog tables, 17 primary sources, transparency scorecard
- `stories/e20-sc-ethanol-status-quo-2026/index.html`: E20 production HTML with inline SVGs, compact timeline, 4-country comparison grid, scenario cards (commit `01e1fb5`, deployed)
- `stories/india-monsoon-crisis-2026/`: Monsoon crisis — 269 lines, 12 evidence cards, 6 data tables, 42 sources, production HTML, knowledge graph
- `stories/europe-heatwave-2026/`: European heatwave — 330 lines, 34 sources, 7 sections, inline SVG charts
- `frontend/src/app/explained/page.tsx`: Explainers page — now shows all 35 stories grouped by topic category, featured hero section, aggregate stats
- `frontend/src/app/story/page.tsx`: All Reports index — full filter/sort grid with bookmarks
- `frontend/src/app/india/page.tsx`: India dashboard — metrics grid + India-related stories
- `frontend/functions/api/[[path]].ts`: API catch-all — now triggers deploy hook on `publish` action
- `frontend/scripts/build-content.mjs`: Content pipeline — auto-discovers story folders, fetches CMS stories from Supabase if env vars present
- `frontend/src/lib/content/generated/stories.ts`: Generated story index — 35 entries
- `frontend/src/app/globals.css`: Brand tokens — `--primary: oklch(0.75 0.15 77)`
- `frontend/public/_headers`: Security headers — HSTS, XFO, Permissions-Policy, CSP with 14 directives
- `content/ticker.json`: Ticker with 7 headlines — including VB-G RAM G rollout
