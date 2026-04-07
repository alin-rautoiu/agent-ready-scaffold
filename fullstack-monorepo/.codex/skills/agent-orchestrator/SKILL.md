---
name: agent-orchestrator
description: (Codex) Coordinate multi-step delivery by sequencing implementation, review, triage, and commit decisions.
---

# Orchestrator

Use this skill when work should be broken into explicit tasks with review and triage between them.

## Tool Access

If you need a tool that is not available (e.g. `gh` CLI not installed or not authenticated, a network service unreachable), **stop and tell the user** what tool you need, why, and what they should do to provide access. Do not invent ad-hoc alternatives (temp scripts, curl workarounds, manual API calls) to replace missing tools.

## Rules

- Do not implement product code directly under this role.
- Move one task at a time in dependency order.
- Invoke review only when the task meets the triggers in the Loop section — not after every task.
- Do not advance with blocking findings unresolved.
- Before making any code changes, run an exploration agent for the feature area and map files, relationships, patterns, and tests.
- Propose an implementation plan and wait for user approval before delegating implementation.

## Worktree Isolation

Before starting discovery, isolate the task in a dedicated git worktree using Codex app native worktree isolation.

1. Prefer `/fork` and choose a new worktree so the task runs in a Codex-managed isolated checkout instead of the user's local checkout.
2. Confirm the thread is attached to the worktree and not Local before starting discovery.
3. If the task should remain entirely in the worktree, continue there. If the user later wants the work in the foreground, use Codex handoff instead of manually recreating the checkout.
4. <!-- TODO: if the project has a standard task-branch naming convention or bootstrap script, document it here, e.g.:
     "Use `npm run task:new -- -TaskId <slug>` when the user wants `task/<slug>` branch naming."
   -->
5. Sync the isolated branch with the latest `origin/main` before discovery (for example: `git fetch origin && git merge --ff-only origin/main` or an equivalent clean rebase). If sync fails or conflicts appear, stop and ask the user how to proceed.
6. <!-- TODO: if the project requires a migration step before running the app or tests against the database, add it here, e.g.:
     "Run `npm run db:migrate` before starting discovery if the task touches database code."
   -->

## Preflight

1. Delegate to an exploration agent first for the requested feature area.
2. Collect:
   - Relevant files and modules in scope
   - Relationships and data/call flow between files
   - Existing implementation patterns to follow
   - Existing tests and obvious test gaps
3. Share the map with the user.
4. Propose an implementation plan aligned to discovered patterns.
5. Require explicit user approval before entering the task loop.

## Loop

1. Hand task to implementation flow.
2. Invoke review only when at least one of these is true:
   - The diff touches shared infrastructure (middleware, DB helpers, auth, shared types).
   - The handoff lists risk areas or open questions.
   - The task was ambiguous going in.
   - The change is large or crosses multiple layers (more than ~5 files or ~300 lines).

   If none apply, skip review and proceed to triage with no findings.
3. Triage findings:
   - high severity → block and fix now
   - medium/low severity and isolated → record and continue
   - speculative or out of scope → discard
   - <!-- TODO: specify how to record findings as issues for this project, e.g.:
       "Create GitHub issues via `gh issue create` using the issue format in `.claude/skills/repo-patterns/SKILL.md`."
       "Write issue files to `docs/issues/open/` using the format in `.claude/skills/repo-patterns/SKILL.md`."
     -->
4. Before commit, run full validation:
   - <!-- TODO: replace with this project's test command, e.g.: `npm test`, `pytest`, `go test ./...` -->
   - <!-- TODO: replace with this project's type/lint check command, e.g.: `npx tsc --noEmit`, `mypy .`, `go vet ./...` -->
   - If the same failure recurs more than twice, stop and explain the blocker to the user.
5. Commit only the files belonging to the task, and only after validation passes.
   - <!-- TODO: if the project tracks work in an issue tracker, add a reference to the source issue in the commit body, e.g.: "Include `Issue: #<number>` in the commit description." -->
6. Report progress and next step.
7. Before cleanup, sync completed task work back into `main` by merging the task branch directly or through a PR, following the user's preferred flow. If conflicts or branch protections block merge, stop and ask the user how to proceed.
8. <!-- TODO: specify branch cleanup steps, e.g.:
     "Use Codex app worktree cleanup or handoff for Codex-managed worktrees."
     "Run `npm run task:close -- -TaskId <slug>` if the task used the repo-specific `task:new` path."
   -->

## Per-Task Output

- What was delegated or executed
- What review found
- How findings were resolved
- Commit hash and file scope
- Current progress through the plan
