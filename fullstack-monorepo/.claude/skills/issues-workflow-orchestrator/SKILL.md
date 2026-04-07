---
name: issues-workflow-orchestrator
description: Use the shared issue workflow runner to generate a ranked backlog or execute a ranked issue subset with an explicit target.
---

# Issues Workflow Orchestrator

Canonical prompt surface for issue-workflow operations.

Use this skill to generate a ranked backlog or execute a ranked issue subset.

Apply shared policy from `docs/issues-workflow-shared-policy.md`.

## Inputs

- `repo`: GitHub repository (`owner/name`).
- `issues`: optional comma-separated issue numbers (for example `1,2`); default `all open issues`.
- `mode`: `backlog` or `execute`; defaults to `backlog` when omitted.
- `target`: `claude` or `codex` for `execute` mode only. The `copilot` target has been removed (see shared policy).
- `target-command`: optional command override for `execute` mode only; it swaps the selected target's entry-point binary while preserving that target's built-in arguments.

## Constraints

- Use `npm run issues:workflow -- --repo=<owner/name> [--mode=<backlog|execute>] [flags]` as the canonical runner.
- Treat `docs/issues-workflow-shared-policy.md` and `scripts/issues-workflow.ts` as source of truth for mode behavior, ranking, queue processing, brief contract, and artifacts.
- Backlog mode rejects execute-only flags such as `--target`, `--target-command`, `--apply-issue-actions`, and `--dry-run`.
- Keep this skill concise; do not restate orchestration semantics already defined in shared policy.

## Execution Loop

1. Backlog mode: `npm run issues:workflow -- --repo=<owner/name> [--issues=1,2]`.
2. Execute mode: `npm run issues:workflow -- --mode=execute --repo=<owner/name> --target=<claude|codex> [--target-command=<bin>] [--dry-run] [--apply-issue-actions] [--issues=1,2]`.
3. Use run artifacts in `tmp/issues-orchestration/<run-id>/` for queue, grouped tasks, briefs, and results.
4. `--dry-run` still invokes the selected target CLI; it only suppresses GitHub issue comments/closes.
5. `--target-command` changes only the command name. The selected target still controls the argument template.
6. Keep issue processing script-driven; do not add alternate ordering logic here.

## Required Final Report

For every issue:

- issue_number
- issue_url
- terminal_status
- resolution_summary
- evidence_links
- issue_action (closed | commented_open)
- actions_taken
- blockers_if_any
