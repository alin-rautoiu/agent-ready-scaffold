# .opencode/

OpenCode agent configuration. This directory holds OpenCode-format agent definitions that mirror the canonical agent definitions from `.claude/agents/`.

## Subdirectories

| Directory | Purpose |
| --- | --- |
| `agents/` | Named sub-agent definitions loaded via the Task tool |

## Runtime context

OpenCode supports Windows (native or [WSL](https://opencode.ai/docs/windows-wsl)), macOS, and Linux. The shell environment is decided at project init time.

<!-- TODO: declare the primary shell environment for this project, e.g.:
     "Bash (macOS/Linux/WSL) — use `&&` for sequential execution, `grep` for text search."
     "PowerShell 5.1+ (Windows) — use `;` for sequential execution, `Select-String` for text search."
     If the project targets both, pick one as the canonical agent shell and note the other for cross-platform scripts.
-->

Key differences from Claude Code:

- **Front matter format:** `mode` (`primary` / `subagent`) and `permission` blocks with explicit tool allow/deny — not `tools:` / `agents:` comma-strings
- **Sub-agents:** Invoked via the `Task` tool; each agent's available sub-agents are listed under `task:` in the permission block
- No persistent CLAUDE.md equivalent — agent definitions and repo context must be self-contained
- No `skills/`, `commands/`, or `hooks/` directories — agent definitions are the primary configuration surface

## Rules

**Do** keep agent body content semantically identical to their `.claude/agents/` counterparts. Only front matter format differs.

<!-- TODO: replace with the project's chosen shell syntax, e.g.:
**Do** adapt shell syntax for Bash when agent definitions contain inline commands. Use `&&` for sequential execution and `grep` for text search.
-->

**Don't** create agent behaviors that don't exist in the canonical `.claude/agents/` definitions. Agents should behave consistently across runtimes.

**Don't** modify these files without also updating `.claude/agents/`. These are mirrors, not originals.
