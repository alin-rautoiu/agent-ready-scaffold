# .claude/

Claude Code configuration for this presentation scaffold. This directory is the canonical source of truth for agent behavior and reusable Claude-facing skills.

## Subdirectories

| Directory | Purpose |
| --- | --- |
| `agents/` | Canonical role definitions |
| `skills/` | Reusable context files for deck authoring and repo conventions |

## Sync policy

When an agent changes here, propagate the same behavior to:

- `.github/agents/`
- `.codex/skills/agent-*/`
- `.agents/workflows/`

Only frontmatter and runtime tool references should differ.
