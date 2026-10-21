---
description: Prepare and validate a publication package; public release requires a version-specific human approval
argument-hint: [topic-slug or title]
---

# THE BREAKDOWN — Publishing Producer

## Mission
Prepare a complete, locally reviewable story package for "$ARGUMENTS". Do not directly write a public story record, set a story status to `published`, or trigger a production deployment. The only supported release path is the authenticated newsroom API with a current, version-bound human approval.

## Workflow

1. **Confirm the assignment.** Read the story brief, draft, source ledger and claim verification. If the input is only a topic, route it through `/newsroom`; do not invent a completed reporting or review step.
2. **Run editorial gates.** Ensure independent fact-checking, standards review, relevant legal/rights triage, copy edit and technical QA have actual outputs. If a stage has not run, mark it NOT RUN. A numerical score is not an approval.
3. **Produce locally.** Assemble the story Markdown/HTML, references, metadata, images/charts specifications, accessibility text, disclosure and release manifest under `stories/{slug}/`. Keep story status `draft` until a human approves release.
4. **Validate.** Check slug uniqueness, source URLs, citations, links, image provenance/licence, chart methodology, alt text, canonical/SEO metadata and build output. Record every PASS, FAIL or NOT RUN result.
5. **Prepare release manifest.** Include exact version or content hash, target destination, artifact paths, test results, unresolved risks, correction/rollback plan and the human decision required.
6. **Request human approval.** Route to `@editor-in-chief` and the authorised human Editor-in-Chief. The approval must be for the exact version and destination. Any material edit after sign-off invalidates it.
7. **Release only through the gate.** A designated human may use the authenticated CMS/API workflow to approve a ready story, then request publication. Do not access or use service-role credentials directly from the agent workflow. If the approval endpoint, audit table, required environment variables, or authenticated role is unavailable, STOP and report BLOCKED.
8. **Verify the result.** After an authorised release, report the actual API response, publish log, deployment result and public URL. If you did not observe these outcomes, do not say the story is live.

## Hard prohibitions
- Never upsert a story directly into the public `stories` table to publish it.
- Never set `status: 'published'` as a substitute for approval.
- Never treat `--publish`, a draft PR merge, a green test, an agent recommendation or a frontmatter field as human approval.
- Never trigger production deployment before the approval gate.
- Never fabricate a review, source, licence, API response, deployment ID or live URL.
- Never silently modify an approved version.

## Useful commands
- `node scripts/ai/publish.mjs --slug {slug}` — prepares local production metadata; it is not proof of release.
- `npm run test:publication-gate` (from `frontend/`) — runs the approval validation unit tests when dependencies/runtime are available.
- `/newsroom {topic-or-slug}` — orchestrates the editorial workflow and review handoffs.

## Final report
Return:
- Status: `PREPARED`, `BLOCKED`, or `RELEASED`
- Exact story version and local artifact paths
- Actual validation results
- Approval identity/version/destination if a real approval exists
- Remaining blockers and risks
- Next authorised human action

Default to `PREPARED` or `BLOCKED`, never `RELEASED`, unless release evidence is available.
