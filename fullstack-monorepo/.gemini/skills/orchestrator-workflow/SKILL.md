---
name: orchestrator-workflow
description: (Gemini) Main-agent workflow for multi-step delivery — delegates discovery, implementation, and review to specialized subagents.
---

# Orchestrator Workflow

Use this skill when you have a multi-step plan or backlog of tasks that should be implemented, reviewed, and triaged in sequence. As the main agent, you coordinate delivery by delegating to specialized subagents.

## Tool Access

If you need a tool that is not available (e.g. `gh` CLI not installed or not authenticated, a network service unreachable), **stop and tell the user** what tool you need, why, and what they should do to provide access. Do not invent ad-hoc alternatives (temp scripts, curl workarounds, manual API calls) to replace missing tools.

## Constraints

- DO NOT implement code yourself — delegate all code changes to the `implementation-lead` subagent.
- DO NOT invoke `code-review` after every task; invoke it only when the review triggers in Step 3 are met.
- DO NOT proceed to the next task without user confirmation, unless autonomous mode is active.
- DO NOT delegate implementation before completing the discovery and plan-approval gate.

## Step 1 — Discover and propose

Before entering the per-task loop, run this mandatory preflight for the requested feature area:

Delegate discovery to the `codebase_investigator` subagent. Map:

- Relevant files and modules in scope for the feature area.
- Relationships and call/data flow between those files.
- Existing implementation patterns to follow.
- Existing unit/integration tests and any obvious test gaps.

After discovery returns:

1. Summarize the map for the user.
2. Propose an implementation plan aligned to discovered patterns.
3. Request explicit user approval of the plan.
4. Only after approval, continue to Step 2.

## Step 2 — Implement (per task)

Hand the task to the `implementation-lead` subagent using `invoke_agent`. Pass:

- The task description and done criteria.
- Any constraints from the plan.
- A context packet from previous completed tasks.

## Step 3 — Review (per task)

Invoke the `code-review` subagent only when at least one of these is true:

- The diff touches shared infrastructure (middleware, DB helpers, auth, shared types).
- The handoff lists risk areas or open questions.
- The task was ambiguous going in.
- The change is large or crosses multiple layers (more than ~5 files or ~300 lines).

If none apply, skip review and proceed to Step 4 with no findings.

## Step 4 — Triage findings (per task)

For each finding from Code Review, decide independently:

**Block and fix now** if any of these are true:

- Severity is high (data loss, security, broken core flow).
- Done criteria for this task are not actually met.
- The next task directly depends on correctness of the broken behavior.

**Record as issue and continue** if all of these are true:

- Severity is medium or low.
- The plan can proceed safely without the fix.

**Discard** only if the finding is speculative, style-only, or clearly out of scope.

## Step 5 — Validate and commit (per task)

After triage is resolved for the task, run mandatory validation before any commit:

1. <!-- TODO: replace with this project's test command, e.g.: `npm test`, `pytest`, `go test ./...` -->
2. <!-- TODO: replace with this project's type/lint check, e.g.: `npx tsc --noEmit`, `mypy .`, `go vet ./...` -->
3. Only when all checks pass, proceed to commit.

## Step 6 — Confirm and advance (per task)

Tell the user the task is closed, include the commit details, and ask for confirmation to proceed to the next task.

## Per-Task Output

After each task, report:

- What was delegated or executed
- What review found (or "review skipped — no triggers met")
- How findings were resolved
- Commit hash and file scope
- Current progress through the plan
