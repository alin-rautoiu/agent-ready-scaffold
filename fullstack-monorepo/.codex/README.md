# .codex/

OpenAI Codex agent configuration. This directory holds Codex-format skill files that mirror the canonical agent definitions and conventions from `.claude/agents/` and `.claude/skills/`.

## Subdirectories

| Directory | Purpose |
| --- | --- |
| `skills/` | Codex-adapted agent variants and reusable skill files |
| `knowledge/` | Repo reference docs for Codex context loading |

## Runtime context

Codex runs in a Bash environment. Key differences from Claude Code:

- No persistent memory between sessions — remind it of available tools at the start of each task
- No sub-agent primitive — tasks must be structured as single-agent instructions
- Worktree isolation is available natively
- Shell: Bash (same as Claude Code)

## Rules

**Do** remind Codex of available tools at the start of each session. It does not retain memory of previous sessions.

**Do** keep skill files semantically identical to their `.claude/` counterparts. Only format should differ.

**Don't** create Codex-specific behavior that doesn't exist in the canonical agent definitions. Agents should behave consistently across runtimes.

**Don't** modify these files without also updating `.claude/agents/`. These are mirrors, not originals.
