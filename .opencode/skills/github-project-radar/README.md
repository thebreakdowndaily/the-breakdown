# GitHub Project Radar — The Breakdown OS

Project-local OpenCode skill for discovering and evaluating GitHub repositories against The Breakdown OS's actual engineering needs. It searches in a bounded way, inspects primary repository evidence, scores candidates, checks license/security/maintenance/integration risks, and produces a ranked report.

## Location

The skill lives at .opencode/skills/github-project-radar/ so OpenCode can discover it as a project-local skill. The main workflow is in SKILL.md; the evaluation rubric and repeatable context form live in references/.

## Use

Prompt OpenCode with @github-project-radar and the capability gap you want to investigate. For example: "Use @github-project-radar to find tools that improve newsroom agent evaluation and fact-checking evidence trails in The Breakdown OS." You can also ask the agent to identify high-value open-source improvements across the project.

For metadata-only discovery, run the included crawler from the repository root:

    python .opencode/skills/github-project-radar/scripts/crawl_github.py \
      --project-repo thebreakdowndaily/the-breakdown \
      --query "LLM agent evaluation harness regression tests" \
      --query "news fact checking source provenance evidence ledger" \
      --query "Next.js accessibility SEO regression testing" \
      --query "open source dependency security scanning" \
      --top 15

Set GITHUB_TOKEN or GH_TOKEN in the environment if available to increase API limits. Never place a token in a command argument, query, or report.

The skill is discovery and assessment only. It does not automatically install third-party code, open PRs, merge changes, or deploy anything. Search scores are triage heuristics; source, license, security, compatibility, and maintenance must be verified separately.