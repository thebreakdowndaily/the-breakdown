# The Breakdown — Editorial Operating System

> Version 1.0 · June 2026
> Classification: Internal — Core Operations

---

## Table of Contents

1. [Editorial Handbook](#1-editorial-handbook)
2. [Newsroom Workflow](#2-newsroom-workflow)
3. [Fact Check Pipeline](#3-fact-check-pipeline)
4. [Research Manual](#4-research-manual)
5. [AI Governance Framework](#5-ai-governance-framework)
6. [Correction Policy](#6-correction-policy)
7. [Editorial Ethics Charter](#7-editorial-ethics-charter)
8. [Content Lifecycle](#8-content-lifecycle)
9. [Team Structure](#9-team-structure)
10. [Future Expansion Plan](#10-future-expansion-plan)

---

# 1. Editorial Handbook

## 1.1 Mission

The Breakdown exists to produce forensic news analysis that goes beyond headlines. We break down complex stories in geopolitics, technology, economy, and media with precision, context, and clarity — building an institution readers can trust for decades.

## 1.2 Core Principles

| Principle | Definition |
|-----------|------------|
| Accuracy | Every claim is verified against multiple credible sources before publication |
| Context | No fact exists in isolation — every story explains the forces, history, and stakes |
| Evidence | Every assertion is traceable to a verifiable source, linked and labelled |
| Transparency | We disclose methods, sources, uncertainties, and conflicts of interest |
| Understanding | We write for an intelligent non-expert — clarity without dumbing down |
| Independence | No political party, corporation, or advocacy group influences our coverage |
| Reader-first | We optimize for trust and comprehension, not outrage or clicks |

## 1.3 The Nine Questions

Every piece of content must answer:

1. **What happened?** — The factual event, statement, or development
2. **Why did it happen?** — Causal factors, background context, historical precedent
3. **Why does it matter?** — Significance, stakes, consequences
4. **Who benefits?** — Winners, beneficiaries, power dynamics
5. **Who is affected?** — Impacted populations, sectors, communities
6. **What evidence exists?** — Sources, data, documents, testimony
7. **What are experts saying?** — Informed perspectives, dissenting views
8. **What is the uncertainty?** — What we know, what we don't, confidence level
9. **What happens next?** — Forward-looking analysis, scenarios, timelines

## 1.4 Content Type Definitions

### 1.4.1 Breaking News
- **Purpose**: Rapid, accurate notification of developing events
- **Length**: 300-800 words
- **Format**: Inverted pyramid — key facts first, context follows
- **Required**: Status badge (breaking/developing), update frequency commitment, source links
- **Timeline**: Publish within 2-4 hours of confirmation
- **Lifecycle**: Continuous updates until resolved, then archived or promoted to Analysis

### 1.4.2 Analysis
- **Purpose**: Deep contextual examination of a news event or trend
- **Length**: 1200-2500 words
- **Format**: Thematic — What Happened → Why It Matters → What's Next
- **Required**: Minimum 3 primary sources, expert quote or citation, data visualization where applicable
- **Timeline**: 24-72 hours from event
- **Lifecycle**: Core content — reviewed quarterly for freshness

### 1.4.3 Explainer
- **Purpose**: Make a complex topic understandable to a general reader
- **Length**: 1500-3000 words
- **Format**: Structured — Definition → History → How It Works → Current Relevance → Key Players
- **Required**: Glossary box, visual diagram or timeline, "The Bottom Line" summary
- **Timeline**: Planned, not reactive — can take 3-7 days
- **Lifecycle**: Evergreen — reviewed and updated quarterly

### 1.4.4 Fact Check
- **Purpose**: Verify the accuracy of a public claim
- **Length**: 600-1500 words
- **Format**: Claim → Context → Evidence → Verdict (True/Mostly True/Mixed/Mostly False/False/Pants on Fire)
- **Required**: Claim source (video/transcript/link), original context, independent verification, confidence level
- **Timeline**: 12-48 hours
- **Lifecycle**: Archived with permanent URL; updated if new evidence emerges

### 1.4.5 Investigation
- **Purpose**: Original reporting that reveals new information
- **Length**: 2000-5000 words
- **Format**: Narrative with evidence — Findings → Methodology → Sources → Timeline → Documents
- **Required**: Document archive, evidence board summary, methodology transparency, legal review
- **Timeline**: 2-8 weeks
- **Lifecycle**: Permanent — may receive updates if new information emerges; version history maintained

### 1.4.6 Timeline
- **Purpose**: Chronological mapping of events in a developing story
- **Length**: 800-2000 words
- **Format**: Date-ordered entries with brief descriptions, sources per entry
- **Required**: Interactive or scannable chronological format, source links per entry, update log
- **Timeline**: Created alongside ongoing coverage, updated as story develops
- **Lifecycle**: Living document — continuously updated

### 1.4.7 Data Story
- **Purpose**: Use data to reveal patterns, trends, or truths
- **Length**: 1000-2000 words + interactive elements
- **Format**: Question → Data → Visualization → Interpretation → Caveats
- **Required**: Raw data access link, methodology, visualization, uncertainty notes
- **Timeline**: 3-10 days
- **Lifecycle**: Updated when new data becomes available; year-over-year comparisons added

### 1.4.8 Opinion / Editorial
- **Purpose**: The Breakdown's institutional position on a matter
- **Length**: 800-1500 words
- **Format**: Position → Reasoning → Evidence → Counter-argument → Conclusion
- **Required**: Explicit "Opinion" label in headline, Editor-in-Chief approval, ethics check
- **Timeline**: As needed
- **Lifecycle**: Permanent — clearly distinct from reported content

### 1.4.9 Research Report
- **Purpose**: Comprehensive deep-dive on a topic, combining multiple methodologies
- **Length**: 3000-8000 words
- **Format**: Executive Summary → Methodology → Findings → Analysis → Recommendations → Appendices
- **Required**: Full source list, methodology section, peer review within team, external expert review
- **Timeline**: 2-6 weeks
- **Lifecycle**: Flagship content — annual review and update

### 1.4.10 Country Profile
- **Purpose**: Essential context for a country in the news
- **Length**: 2000-4000 words
- **Format**: Overview → Government & Politics → Economy → Military & Security → Foreign Relations → Human Rights → Key Players → Chronology
- **Required**: Data dashboard (GDP, population, freedom index, etc.), map, sources
- **Timeline**: 1-2 weeks initial; updated quarterly
- **Lifecycle**: Living document — continuous maintenance

### 1.4.11 Leader Profile
- **Purpose**: In-depth understanding of a political or institutional leader
- **Length**: 1500-3000 words
- **Format**: Background → Rise to Power → Key Decisions → Alliances → Controversies → Policy Positions → Assessment
- **Required**: Fact-checked biography, voting record or decision log, primary source quotes
- **Timeline**: 3-7 days
- **Lifecycle**: Updated on major developments

### 1.4.12 Policy Tracker
- **Purpose**: Monitor a specific policy area over time
- **Length**: 800-2000 words + database
- **Format**: Policy Area Overview → Current Status → Changes Log → Comparison → Impact Assessment
- **Required**: Structured database (DB table), update frequency defined, sources per change
- **Timeline**: Initial setup 1 week; ongoing updates
- **Lifecycle**: Living document — managed via dashboard

### 1.4.13 Conflict Tracker
- **Purpose**: Ongoing monitoring of a conflict or geopolitical crisis
- **Length**: 1000-3000 words + timeline
- **Format**: Overview → Parties → Stakes → Timeline → Casualties/Data → Diplomatic Status → Forecast
- **Required**: Casualty data sources, territorial change map, humanitarian context, update log
- **Timeline**: Initial setup 1 week; weekly updates minimum
- **Lifecycle**: Living document — updated throughout conflict lifecycle

## 1.5 Style Guide

### Voice
- Authoritative but not arrogant
- Clear but not simplistic
- Direct but not inflammatory
- Precise but not turgid

### Rules
- Use active voice: "The court ruled" not "It was ruled by the court"
- Attribute everything: "According to X" / "X told The Breakdown" / "Documents obtained by"
- Avoid anonymous sources — when unavoidable, explain why
- Use plain English for technical terms — define on first use
- Numbers: spell out one through nine, numerals for 10+
- Quotes: use quotation marks, preserve original wording, confirm context
- No editorializing in news pieces — let facts and sources do the work
- Hedge appropriately: use "suggests" not "proves" unless certain

### Prohibited
- Clickbait headlines
- Unsourced assertions
- Anonymous accusations
- Speculation presented as fact
- Emotional manipulation
- Loaded language in headlines

---

# 2. Newsroom Workflow

## 2.1 Story Lifecycle

```
PITCH → TRIAGE → RESEARCH → DRAFT → VERIFY → REVIEW → PUBLISH → MONITOR → UPDATE → ARCHIVE
```

### Stage 1: Pitch

**Who**: Any team member, freelance contributor, reader submission
**What**: Story idea submitted via pitch template
**Gate**: Managing Editor triages within 24 hours

**Pitch Template:**
```
Title: [Working title]
Type: [Breaking News / Analysis / Explainer / Fact Check / Investigation / Data Story / Opinion]
One-line summary: [What happened / what is the story]
Why it matters: [Significance to audience]
Sources available: [Known sources, gaps]
Timeline: [Hours to completion]
Risk assessment: [Sensitive topics, legal risk, verification difficulty]
```

### Stage 2: Triage

**Who**: Managing Editor + Editor-in-Chief
**When**: Daily at 10:00 AM and 4:00 PM

**Triage Matrix:**

| Criteria | Weight | Score (1-5) |
|----------|--------|-------------|
| News value/importance | 30% | |
| Reader interest/relevance | 20% | |
| Verification feasibility | 20% | |
| Resource required | 10% | (inverted — lower is better) |
| Competitive differentiation | 10% | |
| Alignment with editorial focus | 10% | |

**Decision outcomes:**
- **Greenlit**: Assigned to writer with deadline
- **Hold**: Revisit at specific trigger (event, document release, etc.)
- **Refer**: Better suited for collaboration/partnership
- **Reject**: Clear rationale provided to submitter

### Stage 3: Research

**Who**: Writer + Research Editor
**Process**: See [Research Manual — Section 4]
**Output**: Research brief with source list, evidence file, key questions
**Gate**: Research Editor signs off before drafting begins

### Stage 4: Draft

**Who**: Writer
**Process**:
1. Write to content type template (see Content Types §1.4)
2. Inline all source attributions as `[Source: URL/Label]`
3. Note confidence level for each major claim: `{High / Medium / Low — reason}`
4. Identify gaps with `[GAP: what's missing]` markers
5. Submit to Research Editor for fact-check pass

### Stage 5: Verify

**Who**: Research Editor + Fact Checker (independent of writer)
**Process**: See [Fact Check Pipeline — Section 3]
**Output**: Verification report with scored claims
**Gate**: All High/Medium confidence claims must have 2+ sources. Low confidence claims flagged for Editor-in-Chief decision.

### Stage 6: Review

**Required review layers:**

| Review | Who | Focus |
|--------|-----|-------|
| Accuracy | Research Editor | Facts, sources, numbers, quotes |
| Bias | Fact Checker | Framing, loaded language, omissions |
| Language | Managing Editor | Clarity, style, plain English |
| Evidence | Research Editor | Source quality, attribution completeness |
| Headline | Managing Editor | Accuracy, SEO, no clickbait |
| Legal | Legal advisor (external) | Defamation, privacy, copyright |
| Ethics | Editor-in-Chief | Independence, conflicts, sensitivity |
| Publication Approval | Editor-in-Chief | Final sign-off |

**Checklist for each review layer:**
```
Accuracy Review:
[ ] All factual claims double-sourced
[ ] Numbers cross-checked against original
[ ] Quotes verified against original source
[ ] Dates, names, titles confirmed
[ ] Location details verified

Bias Review:
[ ] No loaded language in body or headline
[ ] Multiple perspectives represented where relevant
[ ] Opposing views not straw-manned
[ ] No editorializing in news pieces

Language Review:
[ ] Active voice used throughout
[ ] Technical terms defined
[ ] Sentence length varies (not all complex)
[ ] Reading level: Grade 10-12
[ ] No unexplained jargon

Headline Review:
[ ] Accurately reflects story content
[ ] No exaggeration or clickbait
[ ] SEO-optimized (primary keyword in first 60 chars)
[ ] Under 90 characters
[ ] Works as social share title

Legal Review:
[ ] No defamatory statements about individuals
[ ] No claims that could constitute libel
[ ] All allegations supported by evidence
[ ] Sources appropriately protected
[ ] Copyright permissions obtained for images/data
```

### Stage 7: Publish

**Who**: Managing Editor
**Process**:
1. Final read-through
2. Metadata set: slug, tags, category, OG image, meta description
3. Publish to production
4. Social distribution initiated

**Metadata required:**
```
slug: [url-friendly-slug]
title: [SEO title - 60 chars max]
description: [meta description - 160 chars max]
category: [primary category tag]
tags: [comma-separated, max 8]
og_image: [1200x630px URL]
canonical_url: [if republished elsewhere]
status: [published / members-only / draft]
```

### Stage 8: Monitor

**Who**: Audience Editor
**Process**:
- Monitor for factual challenges in comments, social media, email
- Flag errors to Managing Editor within 1 hour of identification
- Monitor related developments for update triggers

**Update Triggers:**
- New official information
- Correction received
- Event development
- Data update
- Reader challenge that identifies error

### Stage 9: Update

**Who**: Original writer or assigned editor
**Process**:
1. Apply update to story
2. Add update note: `[Updated: Date — Brief description of change]`
3. Update status badge if applicable
4. Update last-modified timestamp
5. Push notification to subscribers if significant

**Update levels:**

| Level | Definition | Notification |
|-------|------------|--------------|
| Minor | Typo, formatting, link fix | None |
| Medium | Added context, new quote, clarification | Editor's note at top |
| Major | New facts, correction, significant development | Editor's note + push notification |
| Correction | Error correction per Correction Policy | Full correction notice |

### Stage 10: Archive

**Who**: Managing Editor
**When**: Story inactive for 30 days
**Process**:
1. Ensure all metadata is final
2. Verify all links still resolve (run link checker)
3. Confirm update history is complete
4. Set review date for freshness check
5. Move to archival storage
6. Update sitemap if needed

## 2.2 Daily Newsroom Cadence

### Morning (10:00-11:00)
- Stand-up: What happened, what we're covering, what's needed
- Triage new pitches and breaking events
- Assign stories for the day

### Midday (14:00-15:00)
- Progress check: drafting, verification, review status
- New developments since morning
- Resource reallocation if needed

### Evening (18:00-19:00)
- What's ready for publication
- Next day's priorities
- Evening handover notes

### Weekly (Monday 10:00)
- Editorial planning: week ahead
- Content calendar finalization
- Long-form project check-ins
- Performance review of previous week

---

# 3. Fact Check Pipeline

## 3.1 Overview

The Breakdown's fact check pipeline is a 7-stage verification system that every claim in every content type passes through. The pipeline applies regardless of content format — breaking news, analysis, investigations, and opinion pieces all undergo the same verification standards.

## 3.2 The 7-Stage Pipeline

```
CLAIM IDENTIFICATION → SOURCE COLLECTION → VERIFICATION → CORROBORATION → ASSESSMENT → REVIEW → PUBLICATION
```

### Stage 1: Claim Identification

Extract every verifiable factual claim from the draft.

**Checklist:**
- Identify all factual assertions (not opinions)
- Identify all numerical claims
- Identify all quotes
- Identify all historical references
- Identify all attributions

**Output:** Claim inventory — a numbered list of every verifiable claim in the piece.

**Example:**
```
C1: "Unemployment fell to 6.8% in Q1 2026"
C2: "The Ministry of Finance confirmed this in a March 15 press release"
C3: "This is the lowest rate since Q3 2019"
C4: "Economist Dr. Priya Sharma called it 'a significant improvement'"
```

### Stage 2: Source Collection

For every claim, collect the original source.

**Source hierarchy (best → acceptable):**

| Tier | Type | Description |
|------|------|-------------|
| 1 | Primary official | Government document, court ruling, law text, official data, press release |
| 2 | Primary original | Direct recording, transcript, photograph, document, report |
| 3 | Secondary official | Official summary, fact sheet, government spokesperson statement |
| 4 | Primary expert | Direct interview with subject matter expert |
| 5 | Secondary verified | Established media with original reporting, academic paper |
| 6 | Secondary referenced | Media citing primary sources |
| 7 | Contextual | Background information, widely accepted facts, general knowledge |
| 8 | Anonymous | Source identity unknown to public |

**Rules:**
- Tier 1-4 sources required for all claims in Investigations, Fact Checks, Research Reports
- Tier 1-6 sources required for all claims in Analysis, Explainers, Data Stories
- Tier 7-8 permitted only for contextual claims, never for central assertions
- Anonymous sources require Editor-in-Chief approval with written justification

**Output:** Source collection — each claim mapped to its source(s) with tier and date accessed.

### Stage 3: Verification

For each claim-source pair, determine:

| Dimension | Question | Check |
|-----------|----------|-------|
| Authenticity | Is the source what it claims to be? | Original URL, publication date, author |
| Integrity | Has the source been altered? | Compare with archive.org, other copies |
| Authority | Is the source in position to know? | Credentials, track record, jurisdiction |
| Accuracy | Does the source's claim match reality? | Cross-check with independent data |
| Timeliness | Is the information current? | Publication date, relevant to current context |
| Independence | Does the source have a vested interest? | Funding, affiliations, historical bias |

**Verification methods:**
- Direct access to original document
- Archive.org/Wayback Machine for web sources
- Official databases (government, UN, World Bank, etc.)
- Direct contact with source
- Expert consultation
- Statistical cross-check

**Output:** Verified claim- source pairs with verification notes.

### Stage 4: Corroboration

Each claim must have independent corroboration based on its criticality.

**Corroboration requirements:**

| Claim criticality | Definition | Minimum corroboration |
|-------------------|------------|----------------------|
| Critical | Central thesis, accusation, statistical claim | 3 independent sources from ≥2 tiers |
| High | Important supporting fact | 2 independent sources from ≥2 tiers |
| Medium | Contextual but verifiable | 2 sources from any tiers |
| Low | Background, widely accepted | 1 source sufficient |

**Independence definition:** Sources are independent if they do not share the same:
- Parent organization
- Funding source
- Author/originator
- Single event/press conference (multiple outlets reporting same event count as 1 source)

**Output:** Corroboration matrix — claims mapped to independent confirming sources with independence justification.

### Stage 5: Assessment

Assign each claim a verdict and confidence level.

**Verdicts (for Fact Check content type):**

| Verdict | Definition |
|---------|------------|
| True | The claim is accurate and supported by evidence |
| Mostly True | The claim is accurate but missing context or nuance |
| Mixed | The claim has elements of truth and falsehood |
| Mostly False | The claim contains some truth but is misleading |
| False | The claim is inaccurate |
| Pants on Fire | The claim is not only false but absurd or deliberately deceptive |

**Confidence levels (for all content types):**

| Level | Definition | Visual |
|-------|------------|--------|
| High | Multiple independent primary sources; no reasonable doubt | 🟢 |
| Medium | Good evidence but gaps remain; plausible alternative | 🟡 |
| Low | Limited evidence; single source; significant uncertainty | 🟠 |
| Insufficient | Cannot verify with available evidence | 🔴 |

**Rules:**
- Every claim in the inventory gets a confidence level
- Claims with Low or Insufficient confidence must be noted in the story
- The overall story gets a Composite Confidence Score (CCS) — percentage of claims rated High or Medium
- CCS must be disclosed at the bottom of Fact Checks and Investigations

### Stage 6: Review

**Who**: Independent reviewer (not the original writer or fact checker)
**Process**:
1. Review the claim inventory against the draft
2. Spot-check 20% of verified claims (random selection)
3. Verify all Low-confidence claims are flagged in draft
4. Confirm source collection is complete and accessible
5. Sign off or flag issues

### Stage 7: Publication with Transparency

**Every story must include:**

```
## Methodology & Sources

- Composite Confidence Score: [X%]
- Primary sources: [count]
- Secondary sources: [count]
- Claims verified: [count]
- Claims in pending verification: [count]
- Last updated: [date]

[Full source list with links and access dates]
```

**For Fact Check content type, additional display:**

```
### Verdict: [Verdict] (Confidence: [Level])

Original Claim: [verbatim claim]
Speaker: [who said it]
Date: [when]
Context: [original setting]

Evidence: [summary of evidence for]
Counter-evidence: [summary of evidence against]
Independent verification: [source names]
```

## 3.3 Fact Check Database Schema

Every fact check generates a structured record:

```json
{
  "story_id": "uuid",
  "claims": [
    {
      "claim_id": "C1",
      "claim_text": "Unemployment fell to 6.8% in Q1 2026",
      "speaker": null,
      "claim_date": null,
      "category": "economic_data",
      "verdict": "true",
      "confidence": "high",
      "sources": [
        {
          "url": "https://ministryoffinance.gov.in/...",
          "tier": 1,
          "type": "press_release",
          "date_accessed": "2026-04-01",
          "verification_notes": "Direct from Ministry website, confirmed on archive.org"
        },
        {
          "url": "https://rbi.org.in/data/...",
          "tier": 1,
          "type": "official_data",
          "date_accessed": "2026-04-01",
          "verification_notes": "RBI database cross-reference confirms figure"
        }
      ]
    }
  ],
  "composite_confidence_score": 92,
  "fact_checker": "name",
  "verified_date": "2026-04-02"
}
```

## 3.4 Source Quality Badges

Displayed publicly alongside each source in the Source Explorer:

| Badge | Color | Criteria |
|-------|-------|----------|
| Primary Source | Gold | Tier 1-2: Original document or official data |
| Verified | Blue | Independently confirmed via ≥2 sources |
| Contextual | Gray | Background information, general knowledge |
| Expert Opinion | Purple | Subject matter expert, Tier 4 |
| Government | Navy | Official government source |
| Academic | Teal | Peer-reviewed research, academic institution |
| Media Report | Slate | Journalistic source with original reporting |

---

# 4. Research Manual

## 4.1 Research Philosophy

The Breakdown operates on a **primary sources first** methodology. We go to the original document, data set, recording, or witness before consulting any secondary interpretation. Secondary sources are used for context, corroboration, and expert analysis — never as the sole basis for a factual claim.

## 4.2 Research Phases

### Phase 1: Scoping (Day 1)

**Output**: Research brief

**Questions to answer:**
1. What exactly are we trying to find out?
2. What do we already know?
3. What are the key questions?
4. What sources are likely to exist?
5. Where would those sources be?
6. Who would have the information?
7. What are the time and resource constraints?

**Deliverable:**
- Research question in 1-2 sentences
- Key sub-questions (3-7)
- Source typology (what types of sources should exist)
- Known sources already in hand
- Research timeline with milestones

### Phase 2: Collection (Day 1-3 for standard; up to 4 weeks for investigation)

**Output**: Source archive

**Systematic collection by source type:**

#### Government Documents
- Search official ministry websites
- Check parliament/congress records
- RTI/FOI filings or existing disclosures
- Public databases (budget, census, trade, etc.)
- Committee reports and transcripts
- International organization filings (UN, WTO, IMF, World Bank)

#### Court Judgments
- Court websites and legal databases
- Indian: Indiacode, Indian Kanoon, Supreme Court website
- International: ICJ, ICC, UNHRC databases
- Archive.org for historical judgments

#### Academic / Research
- Google Scholar, JSTOR, SSRN
- University research repositories
- Think tank publications (with funding disclosure check)
- Conference papers and proceedings

#### Media / Reports
- Original outlet (not aggregator)
- Wayback Machine for preserved versions
- Press releases from official sources
- Wire services (PTI, Reuters, AP, AFP) — note: these are secondary

#### Data Sets
- Government open data portals
- International organizations (World Bank, IMF, WHO, ILO, UN)
- Reputable third-party research (Pew, Gallup, Oxfam, etc.)
- Academic data repositories

#### Expert Sources
- Academic experts (check: relevant publications, no undisclosed conflicts)
- Former officials (check: current affiliations, motivations)
- Industry professionals (check: financial interests)
- Civil society organizations (check: funding, political alignment)
- Journalists covering the beat (check: their sources)

### Phase 3: Verification (Day 2-5)

**Output**: Verified source collection

**Verification protocol for each source:**

```
Source: [URL / document name]
Type: [Government / Academic / Media / Expert / Data]
Date obtained: [date]
Date published: [date]
Author/Organization: [name]
Verification steps:
1. [ ] Source authenticity confirmed (URL works, document unaltered)
2. [ ] Archive.org snapshot created (saved for records)
3. [ ] Author/organization credentials checked
4. [ ] Funding/affiliation disclosed (where applicable)
5. [ ] Cross-referenced with [number] independent sources
6. [ ] Expert consulted (where applicable)
Verification result: [Authentic / Authentic with caveats / Questionable / Rejected]
Caveats: [any limitations, uncertainties, or flags]
```

### Phase 4: Analysis (Day 3-7)

**Output**: Research brief with findings

**Analysis framework for each sub-question:**

```
Sub-question: [the question]
Answer: [what the sources say]
Confidence: [High / Medium / Low / Insufficient]
Sources supporting: [list]
Sources contradicting: [list]
Gaps: [what we don't know]
Next steps: [what to do about gaps]
```

**Final deliverable to writer:**
- Answered questions with source trail
- Unanswered questions with gap assessment
- Recommended experts to interview
- Data sets ready for visualization
- Key quotes extracted with context
- Timeline of events if applicable

## 4.3 Source Collection Standards

### Minimum requirements per story:

| Content type | Primary sources | Total sources | Expert sources (ideal) |
|-------------|----------------|---------------|----------------------|
| Breaking News | 2 | 3 | 0 |
| Analysis | 3 | 5 | 1 |
| Explainer | 3 | 6 | 1 |
| Fact Check | 3 | 4 | 0 |
| Investigation | 5 | 8 | 2 |
| Data Story | 2 data sources | 4 | 1 |
| Research Report | 8 | 12 | 3 |

### Source documentation for archive:

Each source in the system must have:
- URL or physical location
- Title
- Author/Organization
- Publication date
- Date accessed
- Archive.org snapshot (for web sources)
- Access method (public, FOI, purchased, leaked, etc.)
- Verification tier
- Reliability notes

## 4.4 Expert Interview Protocol

### Before the interview:
1. Research the expert — their work, positions, funding, potential biases
2. Prepare questions in advance — open-ended, specific, evidence-informed
3. Verify the expert's credentials for this specific topic
4. Disclose: "We're working on a story about X. Here's what we know so far..."

### During the interview:
1. Record (with permission) and take notes
2. Ask for specific evidence: "Can you point me to the data on that?"
3. Ask about uncertainty: "How confident are you in that assessment?"
4. Ask about alternatives: "What would someone who disagrees say?"
5. Get it on the record — if they want off-record, establish ground rules upfront

### After the interview:
1. Transcribe within 24 hours
2. Send quotes for review (factual accuracy, not editorial approval)
3. Archive recording and transcript
4. Add to source archive with tier and verification notes
5. Follow up on any promised documents or referrals

## 4.5 Anonymous Source Protocol

**When to use:**
- Source would face retaliation, legal jeopardy, or professional harm
- Information is of significant public interest
- Information cannot be obtained through other means
- Source's credibility can be independently verified

**Before accepting:**
1. Verify source's identity (government ID, official email, organizational affiliation)
2. Verify source's access to the information
3. Assess source's motivation: whistleblower, disgruntled employee, political opponent, etc.
4. Editor-in-Chief must approve in writing

**In the story:**
- Explain why anonymity is needed (without identifying the source)
- Describe the source's position/access (without identifying them)
- Corroborate with other sources

**Records:**
- Editor-in-Chief knows the source's identity
- Written record of source identity kept securely
- Legal review recommended

---

# 5. AI Governance Framework

## 5.1 Principles

1. **Human accountability**: A human editor is ultimately responsible for every piece of content
2. **Transparency**: AI involvement is always disclosed to readers
3. **Truth preservation**: AI never invents facts, quotes, or sources
4. **Editorial control**: AI assists; humans decide
5. **Safety**: AI systems are tested for bias, accuracy, and reliability

## 5.2 What AI Can Do

| Function | Description | Human oversight |
|----------|-------------|-----------------|
| Summarization | Condense long documents, transcripts, or reports | Editor reviews for accuracy and framing |
| Organization | Structure notes, chronologies, evidence boards | Editor validates structure |
| Timeline suggestion | Extract dates and events from documents | Editor verifies each entry |
| Entity extraction | Identify people, organizations, locations, dates | Editor reviews for completeness |
| Source recommendation | Suggest related sources based on topic | Editor evaluates relevance and quality |
| Related story identification | Find connections between stories in our archive | Editor confirms relevance |
| Metadata generation | Suggest tags, categories, SEO descriptions | Editor approves before use |
| Transcription | Convert audio/video to text | Editor checks for accuracy |
| Translation | Convert source material between languages | Editor verifies for nuance |
| Data formatting | Structure data for visualization | Editor validates numbers |
| Draft structuring | Suggest outline based on content type template | Editor uses or discards |
| Clarity check | Flag complex sentences, jargon, passive voice | Editor decides on changes |
| Fact-check assistance | Flag claims that need verification | Editor does the actual verification |
| Pattern analysis | Identify trends in data sets | Editor interprets findings |

## 5.3 What AI Cannot Do

| Prohibited | Reason |
|------------|--------|
| Invent facts | Violates accuracy principle |
| Invent quotes | Violates truth and transparency |
| Invent sources | Violates evidence principle |
| Generate anonymous sources | Cannot verify identity or motivation |
| Hide uncertainty | Must always express confidence levels |
| Replace editorial judgment | Human editor decides what to publish |
| Make publish decisions | Editor-in-Chief approves all content |
| Write without human review | All AI-assisted content reviewed before publication |

## 5.4 Disclosure Requirements

**Every AI-assisted piece must include:**

```
## AI Disclosure

This story was [researched with / drafted with / partially generated using] AI assistance.
The following tasks were AI-assisted: [list specific functions used].
All claims have been verified by human editors.
The human editor responsible for this content: [name]
```

**Labeling on story cards:**
```
[AI-Assisted Research] or [Human-Reported] or [Human-Only]
```

## 5.5 AI System Testing Protocol

Before deploying any new AI tool or prompt:

1. **Accuracy test**: Run 50 known-fact queries — measure accuracy rate (target: >95%)
2. **Hallucination test**: Run 20 trick queries designed to elicit falsehoods — measure hallucination rate (target: <3%)
3. **Bias test**: Run 20 politically/socially sensitive queries — evaluate framing
4. **Edge case test**: Run 20 ambiguous or incomplete queries — evaluate refusal behavior
5. **Comparison test**: Compare output with human-produced equivalent

**Test results must be documented and reviewed by the AI Editor before deployment.**

## 5.6 AI-Assisted Workflow (Standard)

```
1. Human identifies need (story idea, research question, data analysis)
2. Human drafts prompt with specific instructions, constraints, sources
3. AI generates output
4. Human reviews output for accuracy, completeness, bias
5. Human edits, fact-checks, supplements
6. AI Disclosure statement added
7. Standard editorial review process applies (Section 2, Stage 6)
8. Publication with disclosure
```

## 5.7 AI Training Prohibitions

- The Breakdown's content will not be used to train external AI models without explicit license
- Reader data will not be used for AI training
- Confidential source information will never be input into third-party AI systems
- Any AI system we develop will be trained only on our own verified content and public domain sources

---

# 6. Correction Policy

## 6.1 Core Principle

**We never silently change content.**

Every correction, update, or clarification is transparently documented and permanently visible to readers.

## 6.2 Correction Types

| Type | Definition | Response time |
|------|------------|---------------|
| Minor error | Typo, formatting, broken link, grammatical error | Fix immediately, no correction notice |
| Factual error | Incorrect data, name, date, quote, or claim | Fix within 24 hours + correction notice |
| Omission | Missing context that changes understanding | Add within 48 hours + editor's note |
| Clarification | Ambiguous wording that could mislead | Add within 24 hours + clarification note |
| Retraction | Story cannot be substantiated | Immediately + full retraction notice |
| Update | New information that changes the story | Add immediately + update notice |

## 6.3 Correction Process

### When an error is identified (via any channel):

1. **Log the report** in the corrections database with:
   - Date/time received
   - Reported by (name optional)
   - URL of the story
   - Description of the alleged error
   - Supporting evidence (if provided)

2. **Investigate** within 4 hours:
   - Assign to the original writer or a different editor for independence
   - Consult sources and verify the claim
   - Determine if correction is needed

3. **If confirmed error**:
   - Apply correction to the story
   - Add correction notice at the top of the story
   - Log in the Correction Archive
   - Notify the person who reported it
   - If significant, issue a social media correction

4. **If disputed but not confirmed**:
   - Add editor's note acknowledging the dispute
   - Continue investigation
   - Update when resolved

### Correction Notice Format (displayed at top of story):

```
┌─────────────────────────────────────────────┐
│ Correction · [Date]                          │
│                                              │
│ [Original error description]                 │
│ [Corrected information]                      │
│ [Source of correction]                       │
│                                              │
│ View full correction history →               │
└─────────────────────────────────────────────┘
```

## 6.4 Correction Archive

Permanent, publicly accessible page at `/corrections` containing:

| Story | Original error | Correction | Date | Editor |
|-------|---------------|------------|------|--------|
| [link] | Description | Description | [date] | [name] |

The archive is searchable and sorted by date (most recent first).

## 6.5 Version History

Every story maintains a version history visible at `/story/{slug}/versions`:

| Version | Date | Editor | Change summary |
|---------|------|--------|----------------|
| v1 | 2026-06-15 | John | Original publication |
| v2 | 2026-06-16 | Priya | Added official response from ministry |
| v3 | 2026-06-17 | John | Correction: Updated election date from March 2 to March 5 |

## 6.6 Retraction Policy

A retraction is issued when:
- A story cannot be substantiated by available evidence
- A source recants or is proven unreliable
- An error is fundamental to the story's thesis
- Legal or ethical reasons require removal

**Retraction notice format:**

```
┌─────────────────────────────────────────────┐
│ Retraction · [Date]                          │
│                                              │
│ "Original Headline" published on [date] has  │
│ been retracted.                              │
│                                              │
│ Reason: [clear explanation]                  │
│                                              │
│ The original story remains available in the  │
│ archive for transparency, with this notice   │
│ displayed prominently.                       │
│                                              │
│ We apologize to our readers.                 │
└─────────────────────────────────────────────┘
```

**Note:** Retracted stories are not deleted. They remain at their original URL with the retraction notice displayed prominently. This ensures transparency and prevents link rot.

## 6.7 Reader Reporting

Every story has a visible "Report an error" link that opens a form:

```
Report an error in this story

Story URL: [auto-filled]
Your name: (optional)
Your email: (optional — for follow-up)
What is the error?
[free text field with guidelines: "Please include what you believe is incorrect and what the correct information should be, with supporting evidence if possible."]
```

## 6.8 Commitment to Speed

- Minor errors: fixed immediately
- Factual errors: correction within 24 hours
- Complex corrections: interim editor's note within 24 hours, full correction within 72 hours
- Retractions: immediately upon determination

---

# 7. Editorial Ethics Charter

## 7.1 Preamble

The Breakdown is an independent news intelligence organization. Our only allegiance is to the truth — arrived at through rigorous methodology, transparent practices, and editorial independence. This charter binds every person who contributes to The Breakdown.

## 7.2 The Ten Articles

### Article 1: Truth and Accuracy

We are committed to the truth — verifiable, contextual, and complete within the limits of what can be known. We acknowledge uncertainty where it exists. We correct errors promptly and transparently.

### Article 2: Independence

We are not affiliated with any political party, corporation, government, or advocacy organization. Our coverage is determined by editorial judgment alone. No external entity has editorial control over our content. All funding sources are disclosed.

### Article 3: Transparency

We disclose our methods, sources, uncertainties, and conflicts of interest. We explain how we know what we know. We make our correction log public. We name our editors and writers. We reveal our funding model.

### Article 4: Fairness

We represent opposing views accurately and in good faith. We do not straw-man arguments. We seek comment from those we criticize before publication. We treat subjects and readers with respect.

### Article 5: Accountability

Every piece of content has a named human editor who is responsible for its accuracy. We respond to errors immediately. We take reader concerns seriously. We hold ourselves to the same standards we apply to others.

### Article 6: Source Protection

We protect confidential sources. We do not reveal information that could endanger sources. We verify source credibility before promising anonymity. We explain why anonymity was granted.

### Article 7: Avoiding Harm

We consider the consequences of our reporting. We avoid publishing information that could cause disproportionate harm without commensurate public benefit. We are especially careful with vulnerable populations, minors, victims of crime, and whistleblowers.

### Article 8: Diversity of Perspective

We seek out and include perspectives from different regions, backgrounds, and viewpoints. We recognize that whose story is told and who tells it shapes understanding. We actively work against our own blind spots.

### Article 9: AI as Tool, Not Replacement

AI assists our journalism. It does not replace editorial judgment. AI-generated content is disclosed. AI never invents. AI never makes publishing decisions. Humans remain accountable for everything we publish.

### Article 10: Institutional Integrity

The Breakdown exists to serve the public's right to understand. We will not compromise our standards for traffic, revenue, or political favor. We will not optimize for outrage. We will not publish what we cannot verify. We will remain independent or we will cease to exist.

## 7.3 Conflict of Interest Policy

### Disclosure requirements:
- Writers and editors must disclose any financial interest in subjects they cover
- Writers and editors must disclose any personal relationships with subjects
- Writers and editors must disclose any political affiliations or donations
- Writers and editors must disclose any board memberships or advisory roles
- Freelance writers must disclose any other clients whose interests overlap

### Prohibitions:
- No staff member may accept gifts, travel, or payments from subjects they cover
- No staff member may engage in political campaigning while employed
- No staff member may trade securities based on non-public information obtained through their work
- No staff member may write about organizations where they have a financial interest

### Enforcement:
- All disclosures reviewed by Editor-in-Chief
- Conflicts result in reassignment of the story
- Policy violations are grounds for discipline up to termination

## 7.4 Funding Transparency

The Breakdown will disclose:
- All sources of revenue
- Any funding from foundations, grants, or donors
- Any advertising or sponsorship arrangements
- Any affiliate or commission relationships
- Any paid memberships or subscriptions

**Published at:** `/funding`

## 7.5 Reader Communication

We respond to:
- Error reports: within 24 hours
- Questions about methodology: within 48 hours
- Interview requests: within 72 hours
- Source protection concerns: immediately
- General inquiries: within 5 business days

---

# 8. Content Lifecycle

## 8.1 Complete Lifecycle Diagram

```
IDEA → PITCH → APPROVED → RESEARCH → DRAFT → FACT-CHECK → 
  → EDITORIAL REVIEW → LEGAL REVIEW → EIC APPROVAL → 
  → PUBLISH → PROMOTE → MONITOR → UPDATE → 
  → FRESHNESS CHECK → REVIEW → UPDATE/ARCHIVE
```

## 8.2 Stage Details

### 1. IDEA
- Source: News monitoring, reader submission, team brainstorm, data analysis, expert tip
- Capture: Content management system idea queue
- Status: `unprocessed`

### 2. PITCH
- Format: Pitch template (see §2.1)
- Submitted by: Any team member
- Status: `submitted`

### 3. APPROVED
- Decision: Managing Editor + EIC at triage
- Assignment: Writer + Research Editor + Fact Checker assigned
- Deadline: Set
- Status: `assigned`

### 4. RESEARCH
- Duration: Per content type standards (see §4.3)
- Output: Research brief → approved by Research Editor
- Status: `researching`

### 5. DRAFT
- Duration: Per content type standards
- Writer produces draft with inline source tags and confidence markers
- Status: `drafting`

### 6. FACT-CHECK
- Duration: 1-2 days standard
- Fact Checker runs 7-stage pipeline (see §3.2)
- Claim inventory + verification report produced
- Status: `fact-checking`

### 7. EDITORIAL REVIEW
- Review layers: Accuracy → Bias → Language → Evidence → Headline (see §2.1 Stage 6)
- Each layer must sign off
- Status: `in-review`

### 8. LEGAL REVIEW
- Required for: Investigations, sensitive topics, allegations, anonymous sources
- External legal advisor reviews
- Status: `legal-review`

### 9. EIC APPROVAL
- Editor-in-Chief final read
- Publication decision
- Status: `approved`

### 10. PUBLISH
- Metadata set, OG image added
- Published to production
- Status: `published`

### 11. PROMOTE
- Social distribution (per platform playbook)
- Newsletter inclusion if applicable
- Push notification if breaking
- Status: `published`

### 12. MONITOR
- Audience Editor monitors for:
  - Factual challenges
  - New developments
  - Reader feedback
- Status: `live`

### 13. UPDATE
- Apply updates per update levels (see §2.1 Stage 9)
- Update notice added
- Version history updated
- Status: `updated`

### 14. FRESHNESS CHECK
- Scheduled based on content type:
  - Breaking News: 1 week
  - Analysis: 1 month
  - Explainer: 3 months
  - Fact Check: 1 month
  - Investigation: 6 months
  - Data Story: 3 months
  - Research Report: 6 months
  - Country Profile: 1 month
  - Leader Profile: 3 months
  - Policy Tracker: 2 weeks
  - Conflict Tracker: 1 week
- Status: `freshness-check-due`

### 15. REVIEW
- Managing Editor reviews for freshness
- Decision: Update, Archive, or Retire
- Status: `under-review`

### 16. UPDATE/ARCHIVE
- If update: Go to Stage 13
- If archive: Set status to `archived`, move to archive storage
- If retire: Set status to `retired`, redirect if needed, preserve for records

## 8.3 Content Freshness Dashboard

The system tracks:

| Metric | Target | Alert when |
|--------|--------|------------|
| Days since last update | Varies by type | Exceeds freshness interval |
| Link rot count | 0 | Any broken links detected |
| Reader flag count | Fewer than 5 | 5+ flags for review |
| Source validity | 100% | Source link returns 404 |
| Fact check reminders | None | Past due |

**Automated checks:**
- Weekly: Link checker scans all published stories
- Monthly: Source URL validator checks all source links
- Quarterly: Full content audit for all evergreen content

---

# 9. Team Structure

## 9.1 Core Team (Year 1)

### Editor-in-Chief (EIC)
- **Role**: Final editorial authority, institutional voice, strategic direction
- **Responsibilities**:
  - Sets editorial priorities and coverage strategy
  - Final approval on all content
  - Represents The Breakdown publicly
  - Ensures adherence to Editorial Ethics Charter
  - Legal sign-off on sensitive stories
  - Approves anonymous sources
- **Reports to**: Board / Founder
- **Key metrics**: Trust score, correction rate, reader growth

### Managing Editor
- **Role**: Newsroom operations, daily workflow, editorial quality
- **Responsibilities**:
  - Daily editorial triage and assignment
  - Content calendar management
  - Editorial review coordination
  - Headline review and metadata quality
  - Freshness checks and content lifecycle management
  - Writer and editor scheduling
- **Reports to**: Editor-in-Chief
- **Key metrics**: Publication velocity, review turnaround, error rate pre-publication

### Research Editor
- **Role**: Research methodology, source verification, evidence standards
- **Responsibilities**:
  - Research brief sign-off for all stories
  - Source verification and tier classification
  - Expert interview coordination
  - Primary source collection oversight
  - Research manual maintenance and training
  - Source archive management
- **Reports to**: Managing Editor
- **Key metrics**: Source quality, primary source ratio, verification completeness

### Fact Checker
- **Role**: Claim verification, pipeline execution, confidence scoring
- **Responsibilities**:
  - Runs 7-stage fact check pipeline on every story
  - Produces claim inventories and verification reports
  - Composite confidence scoring
  - Correction investigation
  - Fact check database maintenance
  - Source quality badge assignment
- **Reports to**: Research Editor
- **Key metrics**: Claims verified per story, verification accuracy, correction rate post-publication

### Writer / Reporter
- **Role**: Draft creation, source collection, subject expertise
- **Responsibilities**:
  - Pitch and write stories per content type templates
  - Conduct research and interviews
  - Inline source attribution and confidence markers
  - Respond to fact checker queries
  - Update stories as needed
  - Maintain beat expertise
- **Reports to**: Managing Editor
- **Key metrics**: Stories published, source count per story, reader engagement

### Investigative Reporter
- **Role**: Deep-dive investigations, document analysis, whistleblower sourcing
- **Responsibilities**:
  - Long-form investigation management (2-8 week cycles)
  - Document collection and analysis
  - Evidence board construction
  - Anonymous source management
  - Whistleblower protection
  - Legal coordination
- **Reports to**: Editor-in-Chief
- **Key metrics**: Original documents obtained, scoops, impact

### Data Journalist
- **Role**: Data analysis, visualization, data-driven stories
- **Responsibilities**:
  - Data collection and cleaning
  - Statistical analysis
  - Visualization design and development
  - Data story authorship
  - Data dashboard maintenance
  - Interactive feature development
- **Reports to**: Managing Editor
- **Key metrics**: Data stories published, visualization quality, interactive engagement

### Visual Journalist
- **Role**: Photography, illustration, video, visual storytelling
- **Responsibilities**:
  - Story photography and illustration
  - Infographic creation
  - Video production for stories
  - Visual consistency across platform
  - Image sourcing and licensing
  - OG image creation per story
- **Reports to**: Managing Editor
- **Key metrics**: Visuals per story, visual engagement, brand consistency

### AI Editor
- **Role**: AI tool management, prompt engineering, governance enforcement
- **Responsibilities**:
  - AI system testing and deployment
  - Prompt engineering and optimization
  - AI governance enforcement
  - AI disclosure compliance
  - AI-assisted workflow training
  - Hallucination and bias monitoring
  - Knowledge graph development
- **Reports to**: Editor-in-Chief
- **Key metrics**: AI accuracy rate, hallucination rate, editor satisfaction with AI tools

### SEO Editor
- **Role**: Search optimization, metadata, topic clusters
- **Responsibilities**:
  - SEO metadata for every story
  - Topic cluster strategy
  - Keyword research
  - Content freshness for SEO
  - Sitemap management
  - Analytics monitoring
- **Reports to**: Managing Editor
- **Key metrics**: Organic traffic growth, keyword rankings, click-through rate

### Audience Editor
- **Role**: Reader engagement, distribution, community
- **Responsibilities**:
  - Social media distribution
  - Newsletter management
  - Reader feedback monitoring
  - Comment moderation
  - Reader trust metrics
  - Community building
  - Error report triage
- **Reports to**: Managing Editor
- **Key metrics**: Newsletter growth, returning visitors, social engagement, trust score

## 9.2 Expanded Team (Year 2-3)

Additions:
- **Deputy Editor** — Supports EIC and Managing Editor
- **Senior Writers (3-5)** — Beat specialists (Geopolitics, Technology, Economy, Policy, Investigations)
- **Editors (2-3)** — Section editors for quality control
- **Social Media Manager** — Dedicated to platform strategy
- **Membership Manager** — Reader revenue and community
- **Freelance Network** — Stringers, contributors, expert reviewers

## 9.3 Organizational Chart (Year 1)

```
                    ┌─────────────────┐
                    │  Editor-in-Chief │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
    ┌─────────┴──────┐     │    ┌──────────┴──────────┐
    │  Managing      │     │    │   AI Editor          │
    │  Editor        │     │    └──────────────────────┘
    └────────┬───────┘     │
             │             │
    ┌────────┼────────┐   │
    │        │        │   │
┌───┴──┐ ┌──┴───┐ ┌──┴───┐ │
│Writers│ │Data  │ │Visual│ │
│       │ │Jrnal │ │Jrnal │ │
│(2-3)  │ │ist   │ │ist   │ │
└───────┘ └──────┘ └──────┘ │
                             │
    ┌──────────────┬─────────┘
    │              │
┌───┴────────┐ ┌──┴──────────┐
│ Research   │ │ Audience    │
│ Editor     │ │ Editor      │
│ + Fact     │ │ + SEO Editor│
│  Checker   │ └─────────────┘
└────────────┘
```

## 9.4 Team Values

- **Ownership**: Every team member is responsible for quality
- **Collaboration**: Fact checkers and writers work as partners, not adversaries
- **Growth**: Everyone learns every role; cross-training is encouraged
- **Feedback**: Direct, respectful, evidence-based critique is expected
- **Support**: Mental health matters — journalism is demanding; we look out for each other

---

# 10. Future Expansion Plan

## 10.1 Phase 1: Foundation (Months 1-6)

**Goal**: Establish editorial operations, build audience trust, prove methodology

### Editorial
- [x] Editorial Operating System documented
- [ ] All content type templates created and tested
- [ ] Fact check pipeline operational on every story
- [ ] Correction policy live and active
- [ ] Editorial Ethics Charter published
- [ ] 3 writers hired and trained
- [ ] Research Editor + Fact Checker in place
- [ ] 20+ published stories demonstrating methodology

### Technology
- [x] Knowledge graph tables designed
- [ ] Entity extraction pipeline operational
- [ ] Story relationship mapping automated
- [ ] Fact check database integrated
- [ ] Source archive system operational
- [ ] Correction tracking system live

### Audience
- [ ] Newsletter launched (weekly)
- [ ] Twitter/X presence active
- [ ] Reader trust survey conducted (baseline)
- [ ] Error reporting form live on all stories
- [ ] Funding transparency page published

### Metrics targets
- Correction rate: <5% of published stories
- Composite Confidence Score: >85% average
- Reader trust score (survey): >7/10
- Newsletter subscribers: 1,000
- Stories published: 50+

## 10.2 Phase 2: Intelligence Platform (Months 7-12)

**Goal**: Activate AI-assisted intelligence features, scale content, deepen engagement

### Editorial
- [ ] Investigation team hired (Investigative Reporter + support)
- [ ] Data Journalism function operational
- [ ] Country profiles for top 10 most-covered countries
- [ ] Policy trackers for 5 key policy areas
- [ ] Conflict trackers for 3 active conflicts
- [ ] Expert network established (50+ verified experts)
- [ ] Freelance contributor network launched

### Technology
- [ ] Intelligence sidebar live on story pages
- [ ] Knowledge graph queries operational
- [ ] Claim detection and extraction automated
- [ ] Policy tracker data structures live
- [ ] Event timeline builder automated
- [ ] "Related Stories" powered by knowledge graph
- [ ] Research hub pages (entity, topic, claim pages)

### Audience
- [ ] Sunday Briefing newsletter established
- [ ] Instagram presence active
- [ ] YouTube channel launched (weekly analysis)
- [ ] Reader membership tier launched (₹199/month)
- [ ] Community discussion platform launched
- [ ] Reader trust metrics tracked and published

### Metrics targets
- Correction rate: <3%
- CCS average: >90%
- Trust score: >8/10
- Newsletter: 10,000 subscribers
- Membership: 500 paid members
- Monthly readers: 100,000
- Stories published: 200+

## 10.3 Phase 3: Ecosystem (Year 2-3)

**Goal**: Become the definitive intelligence source for the region, build sustainable institution

### Editorial
- [ ] Full editorial team as per Year 2-3 structure
- [ ] Beat system operational (Geopolitics, Technology, Economy, Policy, Investigations)
- [ ] Research Reports as flagship product (quarterly)
- [ ] International stringer network (10+ locations)
- [ ] Editorial fellowships and training program
- [ ] Partnerships with academic institutions

### Technology
- [ ] Personalized intelligence feed for members
- [ ] "Explain this" feature for any story/term/concept
- [ ] Daily intelligence brief (AI-curated + human-edited)
- [ ] AI voice summaries for audio listening
- [ ] Research collections (user-curated story collections)
- [ ] Debate simulator (multiple perspectives on issues)
- [ ] Researcher API for institutional subscribers

### Audience
- [ ] Podcast network (3+ shows)
- [ ] Live events (quarterly briefings, annual summit)
- [ ] Institutional subscriptions (universities, libraries, embassies)
- [ ] Syndication partnerships (other publications)
- [ ] Mobile app (iOS + Android)
- [ ] Membership tiers expanded (₹499/month premium)

### Business
- [ ] Advertising revenue (premium, limited)
- [ ] Grant funding for investigative projects
- [ ] Research and consulting services
- [ ] API access fees (institutional)
- [ ] Events revenue
- [ ] Syndication fees

### Metrics targets
- Correction rate: <1%
- CCS average: >95%
- Trust score: >9/10
- Newsletter: 100,000 subscribers
- Membership: 10,000 paid members
- Monthly readers: 1,000,000
- Annual revenue: ₹2Cr+
- Team size: 20-25 full-time

## 10.4 Institutional Safeguards

### As we scale, we must protect:
1. **Editorial independence** — Revenue growth never compromises editorial decisions
2. **Method quality** — Speed and scale never sacrifice verification standards
3. **Transparency** — As complexity grows, disclosure becomes more important
4. **Reader trust** — The primary asset; every decision measured against it
5. **Team culture** — The values that make The Breakdown unique must scale with the team
6. **Source protection** — As profile grows, source protection becomes more critical

## 10.5 Success Definition

The Breakdown is successful when:
- Readers trust us more than any other source
- Our methodology is studied and adopted by other newsrooms
- We have influenced policy through evidence-based reporting
- We are independently sustainable (reader-funded)
- We have trained the next generation of investigative journalists
- Our content stands as a historical record that future researchers rely on

---

> *"The truth is not a product of consensus. It is the outcome of method."*
>
> — The Breakdown Editorial Operating System, v1.0

---

*Document maintained by the Editor-in-Chief. Reviewed quarterly.*
*Last updated: June 24, 2026*
