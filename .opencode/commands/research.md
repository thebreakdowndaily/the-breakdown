# Research Workflow Commands

## Pipeline (Full Autonomous Flow)
```powershell
node scripts/pipeline.mjs --topic <topic>
```
Runs research → verify → discover → write → visuals → website → publish.

## Run Research via Agent
```powershell
@research <topic>
```
Invokes the **Research Intelligence Engine** (`.opencode/agents/research.md`).
11-phase dossier: 20+ questions, sources, timeline, people, data, facts, viewpoints, gaps.

## Phase 2 — Fact Check
```powershell
node scripts/ai/fact-check.mjs --claim "statement to verify"
node scripts/ai/fact-check.mjs --file path/to/article.md
node scripts/ai/fact-check.mjs   # paste text interactively
```

Classifies each claim: `Verified Fact | Official Statement | Independent Verification | Expert Opinion | Political Claim | Corporate Claim | Allegation | Rumour | Unknown`

Outputs JSON with per-claim confidence and source suggestions. Saved to `research/fact-check-*.json`.

## Phase 3 — Discover Story Angles
```powershell
node scripts/ai/discover-story.mjs --topic "..." --dossier content/[slug]/research.md
node scripts/ai/discover-story.mjs --topic "..." --fact-check content/[slug]/fact-check.json
```

Outputs discovery brief with hook, protagonists, hidden story, narrative arc, recommended angle.

## Trending / Breaking Discovery
```powershell
node scripts/ai/trending.mjs                           # discover trending stories
node scripts/ai/trending.mjs --topics "t1, t2, t3"    # score specific topics
```

Ranks stories by search volume, virality, importance, evergreen value, data availability, visual potential.

## Visual Asset Generation
```powershell
node scripts/ai/visuals.mjs --slug <slug>
node scripts/ai/visuals.mjs --topic "..." --content "article text"
```

Generates hero image prompts, supporting images, SVG chart data, infographic ideas, video suggestions.

## Production HTML
```powershell
node scripts/ai/website.mjs --slug <slug>
```

Generates production-ready full HTML page with inline SVGs, structured data, responsive design.

## Production Package
```powershell
node scripts/ai/publish.mjs --slug <slug>
```

Prepares complete deploy package: copies files, generates SEO JSON, sitemap, RSS, metadata.

## Quality Audit & Improvement
```powershell
node scripts/ai/improve.mjs --slug <slug>                   # audit + rewrite
node scripts/ai/improve.mjs --slug <slug> --mode audit       # audit only
node scripts/ai/improve.mjs --slug <slug> --mode rewrite     # rewrite only
```

Scores 11 dimensions (1-10). Rewrites any dimension below 8/10.

## Homepage Generator
```powershell
node scripts/ai/homepage.mjs
node scripts/ai/homepage.mjs --featured <slug>
```

Auto-generates homepage from all stories in `stories/` directory.

## UGC NET Notes Engine
```powershell
node scripts/ai/net-notes.mjs --subject "Political Science"
node scripts/ai/net-notes.mjs --subject "Education" --mode war-notes
node scripts/ai/net-notes.mjs --subject "Economics" --mode prediction
```

Analyzes PYQs, theory frequency, scholar frequency. Generates war notes, memory tricks, predicted questions.

## Research Agent Pipeline
1. `@research <topic>` — deep intelligence dossier
2. `node scripts/ai/fact-check.mjs --file content/[slug]/research.md` — verify
3. `node scripts/ai/discover-story.mjs --topic "..."` — story angles
4. `node scripts/ai/generate-story.mjs --topic "..."` — generate story
5. `node scripts/ai/visuals.mjs --slug <slug>` — visual assets
6. `node scripts/ai/website.mjs --slug <slug>` — production HTML
7. `node scripts/ai/publish.mjs --slug <slug>` — deploy package

## Research Dossier Anatomy
```
research/[topic]/
├── trending-*.json    # Trending story scores
├── fact-check-*.json  # Fact-check results
└── discovery-*.json   # Story discovery brief

content/[slug]/
├── research.md        # Intelligence dossier
├── fact-check.json    # Claim classifications
└── discovery.json     # Story angles
```

## Source Evaluation
- **Reliability (1-10)**: Official = 9-10, Media = 7-8, Social = 1-4
- **Bias**: Left/Center/Right/Government/Corporate/Independent
- **Type**: Primary vs Secondary
