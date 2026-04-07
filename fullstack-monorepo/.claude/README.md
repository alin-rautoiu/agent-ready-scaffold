# .claude/

Claude Code configuration for this repository. This directory is the **canonical source of truth** for all agent behavior — definitions written here are propagated to `.github/agents/`, `.codex/skills/`, and `.agents/` when updated.

## Subdirectories

| Directory | Purpose |
| --- | --- |
| `agents/` | Named sub-agent definitions loaded via the Agent tool |
| `commands/` | Slash-command shortcuts (`/command-name`) |
| `hooks/` | Shell commands that run on tool-call events |
| `skills/` | Reusable context files loaded selectively per task |

## What goes here

- Configuration and behavior files for Claude Code only
- Nothing runtime-specific: no application code, no test files

## What does NOT go here

- Business logic or application utilities
- Files intended for other agent runtimes (those go in `.github/`, `.codex/`, `.agents/`)
- Duplicate copies of things already in `CLAUDE.md` — put shared conventions in `skills/repo-patterns/`

## Sync policy

When you update any file in `agents/`:

1. Mirror the semantic content to `.github/agents/` (adapt tool names for VS Code / PowerShell)
2. Mirror to `.codex/skills/agent-*/SKILL.md` (use Codex skill format)
3. Update `.agents/skills/` or `GEMINI.md` for Gemini Code Assist

Only frontmatter and tool references differ across runtimes. The body of each agent definition must remain semantically identical.

## Further Reading

- [Harness engineering](https://openai.com/index/harness-engineering/) — "give Codex a map, not a 1,000-page instruction manual"; the docs directory in an agent-first codebase is a structured knowledge base with short entrypoints, not a monolithic instruction file
- [Encoding team standards](https://martinfowler.com/articles/reduce-friction-ai/encoding-team-standards.html) — "a prompt on an individual machine is a personal productivity hack; the same prompt in the team's repository is infrastructure"
- [Knowledge priming](https://martinfowler.com/articles/reduce-friction-ai/knowledge-priming.html) — store priming documents in the repo so they apply automatically, remain version-controlled, and survive beyond individual sessions
- [Context engineering for coding agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) — catalogs Claude Code's context configuration options as of early 2026: CLAUDE.md, scoped rules, skills, subagents, MCP servers, hooks, and plugins; useful reference for deciding what belongs where
