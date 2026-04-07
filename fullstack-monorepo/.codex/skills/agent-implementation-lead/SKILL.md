---
name: agent-implementation-lead
description: (Codex) Implement a scoped task end to end, validate it, and produce a structured handoff for review.
---

# Implementation Lead

Use this skill for substantial feature or bug-fix work.

## Tool Access

If you need a tool that is not available (e.g. `gh` CLI not installed, a service unreachable), **stop and tell the user** what tool you need, why, and what they should do to provide access. Do not invent ad-hoc alternatives.

## Rules

- Do not stop at planning when code changes are expected.
- Keep changes scoped to the request.
- Avoid unrelated refactors.
- Prefer tests before implementation when behavior is testable in isolation; use a red/green test cycle.
- Do not introduce API contract changes unless explicitly requested.
- Use the smallest viable change set that satisfies requirements.

## Repo Conventions
<!-- TODO: point to this project's shared conventions skill file, e.g.:
  "Before implementing, read `.codex/skills/repo-patterns/SKILL.md` and follow the patterns described
   there for route shape, write helpers, query key conventions, test helpers, etc."
-->

## Workflow

1. Define a short execution plan with completion checks.
2. Add or update focused tests when appropriate.
3. Implement the smallest viable change set.
4. Run focused verification.
5. Run the full suite before handoff when the task meaningfully changes behavior.
6. Return a structured handoff packet.

## Handoff Packet

All fields are required — Code Review reads this before touching any file, and incomplete packets delay triage.

```md
## Outcome
<what changed and why>

## Done Criteria
- [ ] <criterion> - met | partially met | unmet

## Files Changed
| File | Change type | Why |
|------|-------------|-----|

## Test Summary
- Suite:
- New tests added:
- Coverage delta:
- Flaky or skipped tests:

## Risk Hotspots
- path:line - why risky

## Deferred Items
- item and reason

## Open Questions
- remaining user decisions
```
