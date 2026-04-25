---
name: issues-workflow-orchestrator
description: (Gemini) Use the shared issue workflow runner to generate a ranked backlog or execute a ranked issue subset with an explicit target.
---

# Issues Workflow Orchestrator

Canonical prompt surface for issue-workflow operations.

Use this skill to generate a ranked backlog or execute a ranked issue subset.

## Inputs

- `repo`: project repository identifier (e.g. `owner/name` for GitHub).
- `issues`: optional comma-separated issue numbers (for example `1,2`); default `all open issues`.
- `mode`: `backlog` or `execute`; defaults to `backlog` when omitted.
<!-- TODO: if this project supports multiple execution targets (e.g. claude, codex, copilot), document them here. -->

## Constraints

<!-- TODO: if the project has a canonical workflow script, specify it here, e.g.:
  "Use `npm run issues:workflow -- --repo=<owner/name> [--mode=<backlog|execute>] [flags]` as the canonical runner."
  "Treat `docs/issues-workflow-shared-policy.md` and the workflow script as source of truth for mode behavior, ranking, queue processing, brief contract, and artifacts."
-->
- Backlog mode must not execute any work or create any issues.
- **Issue comments are authoritative.** Briefs include the full comment thread. Comments posted after the original issue body (e.g. review findings, blocker lists, updated acceptance criteria) supersede the original body. Treat them as binding updates to scope, constraints, and acceptance criteria before starting work on any issue.
- Keep this skill concise; do not restate orchestration semantics already defined in shared policy.

## Execution Loop

<!-- TODO: replace with this project's actual backlog and execute commands, e.g.:
  "1. Backlog mode: `npm run issues:workflow -- --repo=<owner/name> [--issues=1,2]`"
  "2. Execute mode: `npm run issues:workflow -- --mode=execute --repo=<owner/name> --target=<target> [flags]`"
  "3. Use run artifacts in `tmp/issues-orchestration/<run-id>/` for queue, briefs, and results."
-->

## Required Final Report

- issue_number
- issue_url
- terminal_status
- resolution_summary
- evidence_links
- issue_action (closed | commented_open)
- actions_taken
- blockers_if_any
