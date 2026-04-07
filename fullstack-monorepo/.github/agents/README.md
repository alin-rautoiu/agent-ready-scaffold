# .github/agents/

GitHub Copilot agent definitions. These are Copilot-format mirrors of the canonical agent definitions in `.claude/agents/`.

## File format

```markdown
---
name: Agent Name
description: One-line description
tools:
  - read_file
  - list_directory
  - run_terminal_command
target: vscode
---

## Role
...
```

## Key differences from `.claude/agents/`

| Aspect | Claude Code | GitHub Copilot |
| --- | --- | --- |
| Shell | Bash | PowerShell 5.1+ |
| Tools key | Comma-separated string | YAML list |
| Browser | `playwright-cli` via Bash | `mcp_io_github_chr_*` MCP tools |
| Target field | Not required | `target: vscode` |

## Rules

**Do** keep the body of each agent definition semantically identical to its `.claude/agents/` counterpart. Only frontmatter and tool references should differ.

**Do** translate Bash commands to PowerShell when propagating from Claude Code. For example:
- `npm test 2>&1 | tee /dev/null` → `npm test`
- `find . -name "*.ts"` → `Get-ChildItem -Recurse -Filter *.ts`

**Don't** add Copilot-specific behavior that doesn't exist in the canonical agent. Agents should behave consistently across runtimes.

**Don't** update these files without also updating `.claude/agents/`. These files are mirrors, not originals.
