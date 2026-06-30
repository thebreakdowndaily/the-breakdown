# Story Workflow Commands

## AI-Generate a Story Package
```powershell
node scripts/ai/generate-story.mjs --topic "..." --sources "url1, url2" [--publish]
```

Creates `stories/[slug]/` with `[slug].md`, `images.md`, `charts.md`, `videos.md`, `seo.md`, `references.md`, and `[slug].html`.

Uses the **Editorial Engine** as system prompt (`scripts/ai/editorial-engine.md`):
10-phase process (Intelligence → Fact Check → Discovery → Narrative → Viewpoints → Data → Visuals → HTML → SEO → Quality), writing like The Economist/Bloomberg/FT.

Flags:
- `--topic` — story headline (required)
- `--sources` — comma-separated URLs
- `--category` — override auto-detect
- `--publish` — also add entry to `publish-all-beats.js`

Requires `OPENAI_API_KEY` in `.env` at project root.

## Editorial Engine Reference
The full editorial playbook is at `scripts/ai/editorial-engine.md`. Every story must answer:
- What happened? Why did it happen? Why should I care? What happens next? What am I missing?

## Generate SVG Charts via ChatGPT
Open and copy the full file:
```powershell
notepad scripts/ai/svg-prompts-for-stories.md
```
Ctrl+A → Ctrl+C → paste into ChatGPT. Raw SVG code returned per chart. Insert into `<div class="chart-container">` in the story's HTML.

Standalone SVG prompt reference: `scripts/ai/svg-prompt.md`

## Publish All Stories to Supabase
```powershell
node fact-check-cms/scripts/publish-all-beats.js
```

Upserts all stories from the `stories` array into Supabase `stories` table. Sets `fact_check_image` (hero bg) and `og_image` per category.

## Deploy to Production
Full deploy (Cloudflare + CMS push to Render):
```powershell
.\scripts\deploy.ps1 -PushCMS
```

Cloudflare only:
```powershell
.\scripts\deploy.ps1 -CloudflareOnly
```

Dry run:
```powershell
.\scripts\deploy.ps1 -DryRun
```

Rollback:
```powershell
.\scripts\deploy.ps1 -Rollback
.\scripts\deploy.ps1 -Rollback -RollbackTo <deployment-id>
```

## Anatomy of a Story

```
stories/[slug]/
├── [slug].md          # YAML frontmatter + markdown article
├── [slug].html        # HTML body (injected into story template via Supabase)
├── images.md          # Hero + supporting image specs
├── charts.md          # Data viz specs (tables, chart types, sources)
├── videos.md          # YouTube/embed recommendations
├── seo.md             # Meta tags, OG, Twitter, Schema.org JSON-LD
└── references.md      # Source URLs with attribution
```

`publish-all-beats.js` reads `[slug].html` and upserts to Supabase. The Render server renders `story.html` template with the Supabase record.

## Hero Images
- Set per-story via `fact_check_image` field in `publish-all-beats.js` entries
- Falls back to category-based gradient if not set (defined in `story.html:508`)
- Falls back to `/og-image.png` if no hero and no gradient match
- `og_image` is set to the same URL for social share cards

## CSP & Service Worker
- CSP is set in `_worker.js:6` (hardcoded) and `_headers:6`
- Always update BOTH files when changing CSP
- SW cache version in `sw.js:1` — bump `tb-vN` to force reinstall
- Deploy worker changes via `.\scripts\deploy.ps1 -CloudflareOnly`
