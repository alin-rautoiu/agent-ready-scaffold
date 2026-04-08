# .claude/commands/

Slash-command definitions for Claude Code. Each `.md` file in this directory becomes available as `/filename` in the Claude Code CLI.

## What goes here

Shortcut commands that invoke agents, run scripts, or automate common workflows. Examples:

- `/check-tests` — run the full test suite and report failures
- `/commit` — invoke the Atomic Commit agent for scoped staging
- `/review` — invoke the Code Review agent on current changes
- `/audit` — start a UX audit session

## File format

```markdown
---
description: Short description shown in /help
---

<prompt that Claude executes when this command is invoked>
```

Arguments can be referenced with `$ARGUMENTS` (e.g., `/commit fix login bug` → `$ARGUMENTS` = `"fix login bug"`).

## Rules

**Do** keep commands thin — they should invoke an agent or a script, not contain logic themselves.

**Do** document what arguments the command accepts, if any, in the file's description frontmatter.

**Don't** inline business logic into command files. If a command needs more than a paragraph of instructions, promote the logic to an agent definition in `agents/`.

**Don't** create commands for one-time tasks. Commands are for repeatable workflows used across multiple sessions.

**Further Reading**:

- MCP, Skills, and Agents: [Commands](https://cra.mr/mcp-skills-and-agents/#commands) — disputable if they're needed anymore. Copilot, at least, still finds a use for them.
