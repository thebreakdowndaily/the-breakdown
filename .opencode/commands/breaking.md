---
description: Rapid-response breaking-news desk; prepare verified updates without bypassing editorial approval
argument-hint: [news agency URL, headline, or topic]
---

# THE BREAKDOWN — Rapid Response Desk

## Mission
Process "$ARGUMENTS" into an accurate, attributed breaking-news brief or live-update package. Speed matters, but no public release is permitted without the same independent verification and human approval as any other story.

## 1 — Ingest
- If given a URL, fetch the accessible page and capture headline, publisher, byline, event time, publication/update time, claims, quotations and source links.
- If given a headline/topic, search current primary records and reputable reporting. Record the actual time of access.
- Distinguish the event time from the report time and include timezone when material.
- If sources cannot be accessed, say so rather than implying the source was checked.

## 2 — Verify
- Separate confirmed facts, attributed statements, preliminary reports, allegations, disputed claims and unknowns.
- Cross-check central facts with primary evidence and independent reporting. Several articles copying the same wire report are not independent corroboration.
- Track conflicting counts or official accounts with publisher and timestamp. Do not average conflicting figures or pick the most dramatic.
- For casualties, identities, public safety, allegations, elections, health or active conflict, use conservative wording and escalate uncertainty.
- Preserve exact quote wording and context; never invent eyewitnesses, interviews or right-of-reply outreach.

## 3 — Draft
Create an 800–1,500 word draft where justified, containing:
- Lede: what happened, where and when, and what is confirmed
- What we know / do not yet know
- Relevant background and evidence
- The Breakdown analysis: why it matters, what evidence supports competing explanations and what is still uncertain
- What to watch next, with specific evidence/events that would change the assessment
- Sources with dates, links and claim-level attribution
- Last checked/updated timestamp and a concise update log for continuing events

Do not pad a brief to meet a word count. If evidence supports only a short alert, say so.

## 4 — Visuals and website
- Reuse `@visuals` and `@website` where useful.
- Use images only when provenance, publication rights and caption are documented.
- Label illustrative or AI-generated visuals honestly; never present them as documentary evidence.
- For charts, show units, timeframe, source and caveats.

## 5 — Independent newsroom review
Hand off to `@verify`, `@standards-editor`, `@copy-editor` and, when triggered, `@legal-risk-reviewer`. The reporter cannot approve their own central claims. Escalate unresolved facts or sensitive allegations to the human Editor-in-Chief.

## 6 — Publication gate
- Save as a draft/local package and route via `/newsroom`.
- Do NOT directly upsert the story into Supabase, set `status: 'published'`, modify `deploy/index.html` to announce a live story, or trigger a production deployment.
- Public release requires an explicit human Editor-in-Chief approval bound to the exact content version and publication destination.
- If the authenticated approval API or durable audit log is not configured, report HOLD/BLOCKED and provide the prepared package instead of bypassing the gate.

## 7 — Update and correct
For each verified development, record what changed, when, the source, and its effect on prior conclusions. Route potential errors to `@corrections-editor`. Material corrections and retractions require an authorised human decision.

## Final output
Return a source-led brief or draft, claim inventory, update log, unresolved facts, risk flags, artifact paths, QA status, and exactly what human decision remains. Use `PREPARED`, `BLOCKED`, or `RELEASED`; only report RELEASED when the authorised release was actually verified.
