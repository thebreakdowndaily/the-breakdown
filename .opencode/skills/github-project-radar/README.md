# GitHub Project Radar — The Breakdown OS

Project-local OpenCode skill for discovering and evaluating GitHub repositories against The Breakdown OS's actual engineering needs. It searches in a bounded way, inspects primary repository evidence, scores candidates, checks license/security/maintenance/integration risks, and produces a ranked report.

## Location

Installed at .opencode/skills/github-project-radar/ so OpenCode can discover it as a project-local skill. The main workflow is in SKILL.md; the evaluation rubric and repeatable context form live in references/.

## Use

Ask the agent to use @github-project-radar to scan GitHub for a stated capability gap, or to identify the most valuable open-source improvements for The Breakdown OS. The agent should inspect current repository architecture before selecting searches. For standalone metadata crawling, use scripts/crawl_github.py with a GitHub token in GITHUB_TOKEN or GH_TOKEN when available; never place the token in commands, query strings, or reports.

The skill is discovery and assessment only. It does not automatically install third-party code, open PRs, merge changes, or deploy anything. Search scores are triage heuristics; source, license, security, compatibility, and maintenance must be verified separately.