# Repository Evaluation Scorecard

Score a candidate against a named, current gap in The Breakdown OS. Provide a short evidence note for every dimension scored above half credit. This is a decision aid, not an objective quality rating.

| Dimension | Points | Full-credit evidence | Reasons to lower the score |
|---|---:|---|---|
| Fit to an unmet need | 0–30 | Directly solves a documented problem or capability gap | Broadly related, duplicates current functionality, or lacks a use case |
| Stack and architecture fit | 0–15 | Fits Next.js/React, existing API/data model, deployment, and actual runtime constraints | Requires a rewrite, incompatible platform, or prohibited additional service |
| Maintenance and project health | 0–15 | Credible releases, supported dependencies, responsive maintainer activity | Archived, abandoned, broken release process, or unsupported stack |
| Engineering quality and security evidence | 0–15 | Relevant tests/CI, security practices, transparent dependencies and limitations | No meaningful tests, opaque supply chain, or credible unresolved security risk |
| License and operating constraints | 0–10 | License is known and compatible; data flows, telemetry, hosting, and cost are acceptable | Unknown/incompatible license or unacceptable privacy/hosting obligations |
| Integration cost and reversibility | 0–10 | Isolated adoption, small migration, obvious rollback, sustainable ownership | Deep coupling, large migration, high recurring cost, or no exit path |
| Evidence quality | 0–5 | Claim confirmed in source/docs/releases/tests | README/search-snippet-only or key behavior not inspected |
| **Total** | **0–100** | | |

## Decision bands

- 85–100: strong candidate only if no hard gate fails; still run a proof of concept.
- 70–84: worth prototyping; write down unknowns and test them.
- 50–69: learn from or watch; adoption case is weak.
- Below 50: usually reject unless it solves a unique, critical niche.

## Hard gates

Do not recommend code adoption while any of these remains unresolved:

1. License is unknown or appears incompatible with the intended reuse.
2. A credible relevant security issue may affect the intended use and has no mitigation plan.
3. It violates a hard project requirement, including deployment, data privacy, operating cost, or platform support.
4. The main claimed capability has not been verified in source or authoritative documentation.

A hard gate can mean learn from, watch, or send for legal/security review rather than immediate rejection.

## Confidence labels

- **High:** relevant source and docs inspected; license, maintenance, and main integration assumptions checked.
- **Medium:** strong metadata and documentation, but one major source behavior or integration constraint remains unverified.
- **Low:** README/snippets only, very new or inactive repository, uncertain license, or material unknowns.

Report confidence separately from score. High score with low confidence means investigate, not adopt.