# docs/

Human-readable documentation: runbooks, audit policies, UX decisions, and operational guides. Version-controlled alongside code so documentation stays in sync with the system it describes.

## What goes here

| File type | Examples |
| --- | --- |
| Runbooks | `ux-audit-auth-runbook.md` — step-by-step setup for authenticated UX audit sessions |
| Policies | `ux-audit-shared-policy.md` — severity definitions and audit scope rules |
| Decision records | Architectural or UX decisions with context and rationale |
| Operational guides | Deployment notes, migration checklists, on-call reference |

## Rules

**Do** write docs for decisions and procedures that aren't obvious from the code. Code explains *what* it does; docs explain *why* a choice was made or *how* a process works.

**Do** keep docs close to the code they describe. A runbook for a feature lives here, not in a separate wiki.

**Don't** use this directory for temporary notes or session context. If it's ephemeral, it doesn't belong in version control.

**Don't** let docs go stale. An outdated runbook is worse than no runbook — it gives false confidence. When you change a system, update its documentation in the same PR.

## Agents and docs

Agents load specific docs when relevant:

- `ux-audit-auth-runbook.md` — loaded by the UX Audit agent when setting up authenticated sessions
- `ux-audit-shared-policy.md` — loaded by the UX Audit agent as the baseline policy for all audits

Add a note to the relevant agent definition in `.claude/agents/` when a new doc is created that agents should use.
