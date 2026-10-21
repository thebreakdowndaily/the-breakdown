# The Breakdown — Newsroom Agency Operating Model

**Status:** Proposed implementation on a feature branch  
**Scope:** Agent role definitions and newsroom workflow  
**Authority:** This document does not grant agents new runtime permissions or constitute publication approval.

## Purpose

Organise The Breakdown's AI agents like a disciplined news agency with specialist desks, independent verification, clear handoffs and human accountability. This model extends the existing `.opencode/agents/` library; it is not a second parallel agent framework.

## Newsroom structure

```
Human Editor-in-Chief (accountable final decision)
              |
         Managing Editor
              |
       Assignment / News Desk
              |
      +-------+--------------------------+
      |                                  |
 Research Desk / Reporter          Live Desk
      |                                  |
 Investigations / Data Journalism (as needed)
      |
 Independent Verification (@verify)
      |
 Standards & Ethics ---- Legal Risk Triage (when triggered)
      |
 Copy Desk
      |
 Multimedia / Visuals / Website / QA
      |
 Editor-in-Chief decision brief
      |
 Human approval for public release
      |
 Publishing Producer
      |
 Audience Monitoring / Corrections / Follow-up
```

The chart describes responsibility boundaries; it does not imply that agents are running continuously or in parallel. An agent runs when invoked by a supported host workflow. Scheduling, durable state, queue delivery and enforced approval checks require implementation outside prompt files.

## Role catalogue

| Desk / role | Agent | Primary output |
|---|---|---|
| Coordination | `@managing-editor` | State board, routing, dependencies, stop conditions |
| Assignment | `@assignment-editor` | Commissioning brief and triage rationale |
| Research | `@desk-researcher` / existing `@research` | Annotated source ledger and evidence gaps |
| General reporting | `@reporter` | Draft, claim inventory, response log |
| Investigations | `@investigations-reporter` | Document index, chronology and risk memo |
| Data | `@data-journalist` | Reproducible calculations and chart methodology |
| Live desk | `@live-desk-editor` / existing `@breaking` | Timestamped updates and conflict log |
| Verification | Existing `@verify` | Independent claim classifications and checks |
| Standards & ethics | `@standards-editor` | Evidence, neutrality, harm and ethics review |
| Legal risk triage | `@legal-risk-reviewer` | Issue list for qualified human counsel |
| Copy desk | `@copy-editor` | Edited copy and editor queries |
| Multimedia | `@newsroom-producer` / existing `@visuals`, `@website` | Asset manifest, rights and accessibility checks |
| Final editorial decision support | `@editor-in-chief` | Version-specific decision memo for the human EIC |
| Release production | `@publishing-producer` | Release manifest and verified release report |
| Audience | `@audience-editor` | Prioritised feedback and freshness queue |
| Corrections | `@corrections-editor` | Correction investigation and proposed notice |
| Existing quality desk | Existing `@audit`, `@improve` | Audit findings and tracked remediation |

## Standard story lifecycle

`PITCHED → COMMISSIONED → REPORTING → DRAFTING → VERIFYING → IN_REVIEW → READY_FOR_HUMAN_APPROVAL → APPROVED_FOR_RELEASE → PUBLISHED → MONITORING`

Alternative states: `HOLD`, `REJECTED`, `CORRECTION_OPEN`. A status transition requires its stated evidence; status labels are not authorisation mechanisms.

## Handoff schema

Every substantive handoff must include:
- Story ID/slug and version identifier
- Current state, sending role and next owner
- Requested action and acceptance criteria
- Artifact paths, timestamps and tool/test results
- Source ledger: title, publisher, date, URL, access date, evidence pointer, limitations and source-independence note
- Claim inventory: ID, exact claim, category, support/counterevidence, confidence rationale and unresolved status
- Risk flags, unknowns, conflicts and right-of-reply state
- Human decision required, authorised role, and consequences
- Test/review result with explicit PASS/FAIL/NOT RUN status

## Mandatory human decisions

Require an authorised human decision for:
- Publication, external distribution or production release
- Investigations and serious allegations about identifiable people
- Anonymous sources, confidential/leaked records and source-protection risks
- Material privacy, minors, sensitive-location or foreseeable-harm concerns
- Legal ambiguity, active proceedings or unresolved rights/licensing
- Material corrections, clarifications that change meaning, and retractions
- Unresolved central evidence conflicts or decisions to waive editorial standards
- Destructive, costly or hard-to-reverse operational actions

Agents may recommend an outcome and prepare materials; they must not record a human decision on the human's behalf.

## Independence and evidence controls

1. Drafting and verification responsibilities must be separate for central claims.
2. Multiple outlets copying one wire report do not constitute independent corroboration.
3. Distinguish primary-source claims from independently verified facts.
4. Never invent outreach, interviews, sources, quotes, citations, statistics or test results.
5. Record source access failure as a gap, not as evidence of absence.
6. Preserve the distinction between fact, attributed claim, allegation, inference, opinion, forecast and unknown.
7. A score or model confidence estimate never overrides contradictory evidence or a missing source.
8. Any material content change after approval invalidates the approval for that version.

## Important existing integration risk

The current repo contains broad publishing instructions in `.opencode/commands/publish.md` and `.opencode/commands/breaking.md` that describe direct publication flows, while `editorial-operating-system.md` specifies human publication approval. This branch adds a newsroom workflow with an explicit approval gate, but prompt files alone cannot guarantee that other scripts or commands cannot bypass it. A follow-up engineering task must centralise publication behind a server-side/repository-side approval check and add tests proving unapproved releases fail closed.

## Acceptance criteria

- Every role has a bounded mandate, input, output, refusal/stop conditions and handoff.
- Research and writing are not allowed to approve their own factual claims.
- The final editor agent explicitly distinguishes recommendation from human sign-off.
- The publishing producer checks exact version, destination and verifiable approval before release.
- The workflow reports missing tools, skipped stages and unresolved evidence honestly.
- No agent claims to run continuously without a real scheduler or event trigger.
- A human can trace why each story was commissioned, held, released, corrected or rejected.

## Next engineering phase

Implement the durable task record, state transition validation, approval receipts tied to content hashes, role-based authorization, idempotent publish actions, audit events, recovery and negative tests. The current branch delivers the role/playbook layer only; it does not implement those runtime controls.
