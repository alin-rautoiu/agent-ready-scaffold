---
name: agent-code-review
description: (Codex) Review a diff or working tree for bugs, regressions, security risks, data integrity issues, and missing tests.
---

# Code Review

Use this skill when the task is review-first rather than implementation-first. Focus on severity-ranked findings with concrete evidence for Orchestrator triage.

## Tool Access

If you need a tool that is not available (e.g. `gh` CLI not installed or not authenticated), **stop and tell the user** what tool you need, why, and what they should do to provide access. Do not invent ad-hoc alternatives.
<!-- TODO: specify how findings should be recorded as issues for this project, e.g.:
  "When recording findings as GitHub issues, use `gh issue create` via Bash — if `gh` is not available, ask the user to install it."
  "Write issue files to `docs/issues/open/` — no CLI required."
-->

## Constraints

- Do not modify source, tests, or config as part of the review.
- Do not write praise or style-only nits.
- Do not report speculative findings without concrete evidence.
- Do not create issues unless explicitly asked.

## Review Focus

- Behavioral bugs and regressions
- Security and data integrity risks
- API or serialization mismatches
- Broken edge cases and error handling
- Missing tests for risky behavior
- UX failures in core flows
<!-- TODO: add stack-specific anti-patterns to watch for, e.g.:
  - "N+1 queries: loops that call the DB per iteration instead of batching"
  - "Unthrottled inputs wired directly to query keys without debounce"
  - "ORM calls that bypass the project's write helpers"
-->

## Repo-Specific Checks
<!-- TODO: point to this project's shared conventions skill file and add key checks, e.g.:
  "Read `.codex/skills/repo-patterns/SKILL.md` before reviewing. Apply the checks described
   there to every relevant changed file."
-->

## Companion Skills To Load

<!-- TODO: specify when to load companion UX or template review skills, e.g.:
  "If frontend files are in scope (`src/client/`, `.tsx`, `.jsx`, `.css`), load applicable `ux-audit-*` skills before reviewing."
  "If email-template files are in scope, load the email-template-review skill before reviewing."
-->

## Workflow

1. Determine review scope from user request. If missing, inspect the current working tree.
2. If an implementation handoff packet exists, verify it first:
   - files changed and rationale
   - done criteria claims
   - test summary
   - listed risk hotspots
3. For large diffs (roughly >10 files or >500 changed lines), split inspection into independent areas and parallelize read-only exploration.
4. Run repo-specific checks and applicable companion skills.
5. Return findings ordered by severity in the shape below.
6. If no findings exist, state that explicitly and mention residual testing gaps.

## Output Shape

- Severity: `high`, `medium`, or `low`
- Category: `bug`, `regression`, `security`, `data-integrity`, `tests`, or `ux`
- Files: `path/to/file.ts:line`
- Why it matters: one concise sentence
- Blast radius: where else this breaks if left unfixed (omit if self-contained)

## When Recording Findings As Issues
<!-- TODO: specify issue format and creation method for this project, e.g.:
  "Use this structure for GitHub issues:
   - Title: `[Bug][<scope>][<severity>] <concise title>`
   - Sections: Problem, Reproduction / Context, Diagnostics / Evidence, Expected behavior, Proposed direction, Acceptance criteria
   - Labels: `bug` + one severity label (`critical|major|minor`) + applicable scope labels"
  "Write issue files to `docs/issues/open/<slug>.md` using the format in `.codex/skills/repo-patterns/SKILL.md`."
-->
