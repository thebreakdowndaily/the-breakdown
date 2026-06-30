---
description: The Breakdown Automated Publisher — generate SVG charts, upload to Supabase, write story, update deploy, and trigger deployment with one command.
argument-hint: [topic-slug or title]
---

You are THE BREAKDOWN PUBLISH ENGINE. You automate the entire story publishing pipeline: generate data visualizations → upload to Supabase → build HTML content → write to Supabase stories table → save local files → update deploy index → deploy.

**MISSION:** Publish a complete, live story for "$ARGUMENTS" end-to-end without manual steps.

---

## PREREQUISITES

- Supabase credentials in `fact-check-cms/.env` (`SUPABASE_URL`, `SUPABASE_SERVICE_KEY`)
- Supabase bucket `story-images` exists (public)
- `deploy/index.html` has `<!-- CMS: published stories will appear here -->` marker
- `fact-check-cms/package.json` has `@supabase/supabase-js` dependency

---

## PIPELINE

### STEP 1 — GENERATE STORY CONTENT

Run the Story Generator (`.opencode/commands/story.md`) for the topic. You must:
1. Research thoroughly — search news, official sources, data
2. Fact-check all claims — separate verified / disputed / allegations
3. Write 1500-3000 word article with institutional/systems lens
4. Generate the following outputs saved to `stories/topic-name/`:
   - `topic-name.md` — Full article in markdown
   - `topic-name.html` — HTML body content (will be refined in later steps)

**Important:** The HTML content in this step should NOT include SVG image references yet — those will be generated in Step 2 and referenced in Step 3.

---

### STEP 2 — GENERATE SVG CHARTS

For data-heavy stories (Economy, Education, Government, Audit, Policy, Science), generate SVG chart files.

**SVG Requirements:**
- ViewBox: `0 0 800 500`
- Background: `#0A0A0A`, border-radius: 8px
- Fonts: `'Bebas Neue',sans-serif` for titles, `'JetBrains Mono',monospace` for labels
- Gold accent: `#D4A843`
- Text color: `#fff` or `#888`
- Use numeric XML entities (e.g., `&#8212;` for em dash, `&#8377;` for rupee, `&#8593;` for up arrow)
- DO NOT use HTML entities like `&mdash;` — they do not render in SVG

**Chart types to consider:**
- Bar/column charts for comparisons over time
- Stats cards matrix (6-panel grid)
- Timeline diagrams (vertical line with events)
- Network/flow diagrams (chain of custody, relationships)
- Progress/score gauges for audits

Save each SVG to `stories/topic-name/charts/` with descriptive filenames.

---

### STEP 3 — UPLOAD SVGs TO SUPABASE

Upload each SVG to Supabase storage bucket `story-images` using the Supabase JS client:

```javascript
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const fs = require('fs');
const { data, error } = await supabase.storage
  .from('story-images')
  .upload('topic-slug-chart-name.svg', fs.readFileSync('path/to/chart.svg'), {
    contentType: 'image/svg+xml',
    upsert: true
  });

const { data: { publicUrl } } = supabase.storage.from('story-images').getPublicUrl('topic-slug-chart-name.svg');
```

Collect all public URLs — they will be referenced in the HTML content.

---

### STEP 4 — BUILD HTML CONTENT

Assemble the final HTML body content (ready for Supabase `stories.content` field):

1. Start with inline `<style>` for custom components:
```css
<style>
.stats-bar{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;margin:0 0 40px}
.stat-card{background:#111;border:1px solid #222;border-radius:6px;padding:20px;text-align:center}
.stat-card:hover{border-color:#D4A843}
.stat-number{font-family:'Bebas Neue',sans-serif;font-size:28px;color:#D4A843;letter-spacing:1px}
.stat-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:#777;letter-spacing:1px;text-transform:uppercase;margin-top:6px}
.pull-quote{border-left:3px solid #D4A843;padding:20px 24px;margin:40px 0;background:rgba(212,168,67,0.04);border-radius:0 6px 6px 0}
.pull-quote p{font-size:18px;color:#fff;font-style:italic;font-weight:300;margin-bottom:8px;line-height:1.6}
.pull-quote cite{font-family:'JetBrains Mono',monospace;font-size:11px;color:#777;letter-spacing:1px;font-style:normal}
.data-table{width:100%;border-collapse:collapse;margin:30px 0;font-size:14px}
.data-table th{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#D4A843;text-align:left;padding:12px 14px;border-bottom:1px solid #D4A843}
.data-table td{padding:10px 14px;border-bottom:1px solid #222;color:#aaa}
.data-table tr:hover td{background:rgba(212,168,67,0.02)}
.data-table td:first-child{color:#fff;font-weight:400}
.bottom-line{background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));border:1px solid #D4A843;border-radius:8px;padding:30px;margin:50px 0 30px}
.bottom-line h3{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:1px;color:#D4A843;margin-bottom:12px}
.bottom-line p{font-size:16px;color:#fff;font-weight:400;line-height:1.7;margin:0}
.sources-box{background:#111;border:1px solid #222;border-radius:6px;padding:24px;margin:40px 0}
.sources-box h3{font-family:'Bebas Neue',sans-serif;font-size:18px;color:#D4A843;margin-bottom:12px;letter-spacing:1px}
.sources-box ol{list-style:none;counter-reset:s}
.sources-box li{counter-increment:s;padding:6px 0;font-size:14px;color:#888;border-bottom:1px solid rgba(255,255,255,0.04)}
.sources-box li::before{content:counter(s);font-family:'JetBrains Mono',monospace;color:#D4A843;margin-right:8px;font-size:10px}
.chart-container{max-width:760px;margin:36px auto}
.chart-container img{width:100%;border-radius:8px;border:1px solid #222}
.chart-caption{font-family:'JetBrains Mono',monospace;font-size:10px;color:#555;text-align:center;margin-top:6px;letter-spacing:0.5px}
@media(max-width:600px){.stats-bar{grid-template-columns:repeat(2,1fr)}}
</style>
```

2. Add stats bar (6 key metrics in cards)
3. Write full narrative with:
   - Charts in `<div class="chart-container">` with `<img>` pointing to Supabase URLs
   - Pull quotes in `<div class="pull-quote">`
   - Data tables in `<table class="data-table">`
   - Conclusion in `<div class="bottom-line">`
   - Sources in `<div class="sources-box">`

**CRITICAL — HTML safety rules:**
- ALL single quotes (`'`) in the content must be replaced with `&#39;` — this prevents SSR `data-story='...'` attribute from breaking
- SVG image src URLs must be clean (no surrounding quotes or extra characters)
- Do NOT include: `<html>`, `<head>`, `<body>`, nav elements, SEO meta tags (template handles these)

---

### STEP 5 — WRITE TO SUPABASE

Use the Supabase JS client to insert or update the story:

```javascript
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const slug = title.toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')
  .replace(/-{2,}/g, '-');

const storyData = {
  title: string,
  slug: string,
  category: string,
  summary: string (2-3 sentences, no single quotes),
  content: string (HTML body from Step 4, all ' escaped as &#39;),
  fact_check_image: string (Supabase public URL of hero chart),
  fact_check_image_caption: string,
  author: 'The Breakdown Intelligence Desk',
  read_time: number,
  tags: string[],
  meta_title: string,
  meta_description: string,
  og_image: string (same as fact_check_image),
  status: 'published',
  published_at: new Date().toISOString()
};

// Use upsert by slug to avoid duplicates
const { data, error } = await supabase
  .from('stories')
  .upsert(storyData, { onConflict: 'slug' })
  .select()
  .single();
```

**Before inserting, verify:**
- Slug is unique and descriptive (include topic + key detail)
- Content has NO unescaped single quotes — run a check: `content.includes("'")` should be false
- All image URLs are valid Supabase public URLs
- Tags array has 3-7 relevant tags
- Read time is calculated (approx 275 words per minute)

---

### STEP 6 — SAVE LOCAL FILES

Save to `stories/topic-name/`:
- `topic-name.md` — Full markdown version
- `topic-name.html` — HTML body content (same as Supabase content field)
- `charts/` — SVG files if generated
- `references.md` — All sources cited

---

### STEP 7 — UPDATE DEPLOY INDEX

Insert a story card into `deploy/index.html` at the `<!-- CMS: published stories will appear here -->` marker:

```html
<a href="/story/{slug}" class="story-card featured reveal" id="featuredStory">
    <div class="story-visual"><span class="story-visual-b">B</span></div>
    <div class="story-content">
        <p class="story-category">{category}</p>
        <h3 class="story-title">{title}</h3>
        <p class="story-excerpt">{summary}</p>
        <div class="story-meta"><span>{date}</span><span>{read_time} min read</span></div>
    </div>
</a>
```

Replace the placeholder `<!-- CMS: published stories will appear here -->` with the new card + a new placeholder marker after it (so future publishes can insert before the marker).

If the story is the FIRST published story, also create the stories grid section if it doesn't exist.

---

### STEP 8 — DEPLOY

If git is configured:
```bash
git add -A
git commit -m "publish: {title}"
git push
```

If no git, inform the user that the deploy folder is updated and ready for manual deploy to Netlify.

---

## ERROR HANDLING

| Issue | Fix |
|-------|-----|
| SVG upload fails | Check Supabase credentials and bucket existence |
| Single quotes in content | Replace ALL `'` with `&#39;` before DB insert |
| Slug collision | Add unique suffix like `-{topic}-{year}` |
| Story not rendering | Verify `status: 'published'` and `published_at` is set |
| 404 on story page | Check Netlify `_redirects` has `/story/* /story.html 200` |
| Service worker 404 | Already handled (SW unregister script in story.html) |

---

## FINAL CHECKLIST

- [ ] Images uploaded to Supabase
- [ ] Image URLs verified (return 200)
- [ ] Content has no unescaped single quotes
- [ ] Supabase story upserted with status 'published'
- [ ] Local files saved to `stories/topic-name/`
- [ ] `deploy/index.html` updated with story card
- [ ] Deploy triggered (git push or manual)
- [ ] Live page loads at `https://thebreakdown.in/story/{slug}`
- [ ] Homepage shows story card
- [ ] No 404 console errors
