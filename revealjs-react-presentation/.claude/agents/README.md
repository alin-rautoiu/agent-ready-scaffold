# .claude/agents/

Canonical Claude Code agent definitions for this scaffold.

## Canonical agents

| File | Role |
| --- | --- |
| `deck-planner.md` | Produces `docs/deck-plan.md` from a source document or interactive Q&A — runs upstream of implementation |
| `orchestrator.md` | Plans, delegates, and triages once the plan exists |
| `implementation-lead.md` | Implements scoped slide and scaffold changes against the plan |
| `code-review.md` | Reviews diffs for bugs, regressions, and plan drift |
| `ux-audit.md` | Audits deck readability, per-theme rendering, PDF export, and plan alignment |
| `issues-workflow.md` | Turns presentation backlog items into ranked work |

## Workflow order

1. **Deck Planner** — produces or updates `docs/deck-plan.md`. Can be invoked directly or via the `/plan-deck` slash command.
2. **Orchestrator** — reads the plan and runs the implementation loop.
3. **Implementation Lead** — builds or updates slide modules from plan entries.
4. **Code Review** and **UX Audit** — verify that implementation matches the plan and meets the visual-system bar.

Keep these files semantically aligned with the mirror surfaces in `.github/`, `.codex/`, and `.agents/`.
