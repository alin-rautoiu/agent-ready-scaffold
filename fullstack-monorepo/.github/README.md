# .github/

GitHub-specific configuration: GitHub Copilot agent definitions, Copilot context prompts, and CI/CD workflows.

## Subdirectories

| Directory | Purpose |
| --- | --- |
| `agents/` | GitHub Copilot agent definitions (Copilot-format mirror of `.claude/agents/`) |
| `prompts/` | Copilot context files scoped to this repository |
| `workflows/` | GitHub Actions CI/CD pipelines |

## Runtime context

GitHub Copilot runs inside VS Code on Windows. Key differences from Claude Code:

- Shell: PowerShell 5.1+ (not Bash)
- Browser automation: Chrome DevTools MCP (`mcp_io_github_chr_*` tools)
- Sub-agents: `agent` / `runSubagent` primitives
- Session isolation: `isolatedContext` on `new_page`

When propagating agent definitions from `.claude/agents/`, adapt tool references and shell commands for this runtime. Semantic content must remain identical.

## Rules

**Do** keep agent definitions in `.github/agents/` semantically identical to the canonical versions in `.claude/agents/`. Only frontmatter and tool references should differ.

**Don't** let agents modify files in `workflows/` without explicit user authorization. CI/CD pipelines affect every contributor and every deployment.

**Don't** put project-specific knowledge in `prompts/` that belongs in a skill file. Prompts provide repository-level context; skills provide task-level guidance.
