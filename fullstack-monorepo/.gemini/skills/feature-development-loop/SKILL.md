---
name: feature-development-loop
description: (Gemini) Workflow to coordinate multi-step delivery through implementation, review, triage, and commit decisions.
---

# Feature Development Loop

Use this skill when work should be broken into explicit tasks with review and triage between them.

## Tool Access

If you need a tool that is not available (e.g. `gh` CLI not installed or not authenticated, a network service unreachable), **stop and tell the user** what tool you need, why, and what they should do to provide access. Do not invent ad-hoc alternatives (temp scripts, curl workarounds, manual API calls) to replace missing tools.

## GitHub Comment Formatting

When posting multi-line GitHub comments or close messages, do not pass long bodies inline in shell-quoted arguments.

- Prefer `gh issue comment ... --body-file <path>` and write UTF-8 text to that file first.
- For close flows, post a comment with `--body-file` and then run `gh issue close ...` separately.
- Keep automation-generated text ASCII-only unless the user explicitly asks for localized copy.

## Rules

- Do not implement product code directly under this role.
- Move one task at a time in dependency order.
- Use `invoke_agent("implementation-lead", ...)` for all implementation tasks.
- Use `invoke_agent("code-review", ...)` for all review tasks when the triggers are met.
- Invoke review only when the task meets the triggers in the Loop section — not after every task.
- Do not advance with blocking findings unresolved.
- Before making any code changes, load the `orchestrator-workflow` skill to map the feature area and propose a plan.
- Propose an implementation plan and wait for user approval before delegating implementation.

## Worktree Isolation

Before starting discovery, isolate the task in a dedicated git branch.

1. Create a task branch: `git checkout -b task/<slug>` (derive a kebab-case slug from the task name).
2. <!-- TODO: if the project has a standard task-branch bootstrap script, add it here, e.g.:
     "Alternatively, use `npm run task:new -- -TaskId <slug>` for the repo's standard branch naming." -->
3. Sync the task branch with the latest `origin/main` before discovery: `git fetch origin; git merge --ff-only origin/main`. If sync fails or conflicts appear, stop and ask the user how to proceed.
4. <!-- TODO: if the project requires a migration step before running the app or tests, add it here, e.g.:
     "If the task touches the database, run `npm run db:migrate` before starting discovery." -->

## Preflight

1. Map the feature area first. Load the `orchestrator-workflow` skill and follow its Step 1 (Discover and propose) to design the plan.
2. Collect:
   - Relevant files and modules in scope
   - Relationships and data/call flow between files
   - Existing implementation patterns to follow
   - Existing tests and obvious test gaps
3. Share the map with the user.
4. Propose an implementation plan aligned to discovered patterns.
5. Require explicit user approval before entering the task loop.

## Loop

1. **Implement**: Hand the task to the `implementation-lead` subagent: `invoke_agent("implementation-lead", "Implement <task description> with done criteria: <criteria>")`.
2. **Review**: Invoke the `code-review` subagent only when at least one of these is true:
   - The diff touches shared infrastructure (middleware, DB helpers, auth, shared types).
   - The handoff lists risk areas or open questions.
   - The task was ambiguous going in.
   - The change is large or crosses multiple layers (more than ~5 files or ~300 lines).

   Call: `invoke_agent("code-review", "Review the following changes: <handoff packet>")`.

   If none apply, skip review and proceed to triage with no findings.
3. **Triage**: Triage findings from the `code-review`:
   - high severity -> block and fix now
   - medium/low severity and isolated -> record and continue
   - speculative or out of scope -> discard
   - <!-- TODO: specify how to record findings as issues, e.g.:
       "Create GitHub issues via `gh issue create` using the format in `.claude/skills/repo-patterns/SKILL.md`."
       "Write issue files to `docs/issues/open/` using the format in `.claude/skills/repo-patterns/SKILL.md`."
     -->
4. Before commit, run full validation:
   - <!-- TODO: replace with this project's test command, e.g.: `npm test`, `pytest`, `go test ./...` -->
   - <!-- TODO: replace with this project's type/lint check, e.g.: `npx tsc --noEmit`, `mypy .`, `go vet ./...` -->
   - If the same failure recurs more than twice, stop and explain the blocker to the user.
5. Commit only the files belonging to the task, and only after validation passes.
   - <!-- TODO: if the project tracks work in an issue tracker, add a reference to the source issue in the commit body, e.g.: "Include `Issue: #<number>` in the commit description." -->
6. Report progress and next step.
7. Before cleanup, sync completed task work back into `main` by merging the task branch directly or through a PR, following the user's preferred flow. If conflicts or branch protections block merge, stop and ask the user how to proceed.
8. After merge to `main` is complete, clean up the task branch: `git branch -d task/<slug>`.
   <!-- TODO: if the project has a task-close script, document it here, e.g.:
     "Use `npm run task:close -- -TaskId <slug>` if the task used the repo-specific `task:new` path."
   -->

## Per-Task Output

- What was delegated or executed
- What review found
- How findings were resolved
- Commit hash and file scope
- Current progress through the plan
