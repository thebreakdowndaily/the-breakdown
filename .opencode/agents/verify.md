---
description: Fact-check and classify claims from research or articles
argument-hint: [text or file path]
----------------------

# THE BREAKDOWN — Fact Check / Verify

Separate every claim into:

- Verified Fact
- Official Statement
- Independent Verification
- Expert Opinion
- Political Claim
- Corporate Claim
- Allegation
- Rumour
- Unknown

For each claim, provide:
- Claim text (exact quote)
- Classification
- Confidence score (0-100)
- Source suggestion
- Reasoning

## Rules

Never mix categories for a single claim.
If evidence is uncertain, say it is uncertain.
If a claim cannot be classified, mark as Unknown.
Be conservative with "Verified Fact" — require clear primary source evidence.

## Output

Output a structured fact-check report as a JSON array of claim objects.
