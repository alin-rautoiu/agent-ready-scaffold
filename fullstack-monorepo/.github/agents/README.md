# .github/agents/

GitHub Copilot agent definitions. These are Copilot-format mirrors of the canonical agent definitions in `.claude/agents/`.

## File format

```markdown
---
name: Agent Name
description: One-line description
tools:
  - read
  - search
  - execute
agents:
  - Explore
target: vscode
---

## Role
...
```

Additional optional frontmatter keys supported by Copilot include `argument-hint`, `model`, `user-invocable`, `disable-model-invocation`, and `handoffs`.

## Key differences from `.claude/agents/`

| Aspect | Claude Code | GitHub Copilot |
| --- | --- | --- |
| Shell | Bash | PowerShell 5.1+ |
| Tools key | Comma-separated string | YAML list |
| Browser | `playwright-cli` via Bash | `mcp_io_github_chr_*` MCP tools |
| Target field | Not required | `target: vscode` |

For MCP tools, prefer server-scoped declarations when practical (for example `github/*`) instead of long per-tool lists.

## Rules

**Do** keep the body of each agent definition semantically identical to its `.claude/agents/` counterpart. Only frontmatter and tool references should differ.

**Do** translate Bash commands to PowerShell when propagating from Claude Code. For example:
- `npm test 2>&1 | tee /dev/null` → `npm test`
- `find . -name "*.ts"` → `Get-ChildItem -Recurse -Filter *.ts`

**Do** keep tool permissions minimal. Grant only what the agent actually needs.

**Don't** add Copilot-specific behavior that doesn't exist in the canonical agent. Agents should behave consistently across runtimes.

**Don't** update these files without also updating `.claude/agents/`. These files are mirrors, not originals.
