# .github/

GitHub Copilot customization surface for this scaffold: always-on instructions, custom agents, prompt files, skills, and CI/CD workflows.

## Subdirectories

| Directory | Purpose |
| --- | --- |
| `instructions/` | Optional scoped `*.instructions.md` files (apply by glob pattern) |
| `agents/` | GitHub Copilot agent definitions (Copilot-format mirror of `.claude/agents/`) |
| `prompts/` | Copilot context files scoped to this repository |
| `skills/` | Agent Skills (`SKILL.md`) for reusable task capabilities |
| `workflows/` | GitHub Actions CI/CD pipelines |

## Runtime context

GitHub Copilot runs inside VS Code on Windows. Key differences from Claude Code:

- Shell: PowerShell 5.1+ (not Bash)
- Browser automation: Chrome DevTools MCP (`mcp_io_github_chr_*` tools)
- Sub-agents: `agent` / `runSubagent` primitives
- Session isolation: `isolatedContext` on `new_page`

Copilot customizations are discovered from conventional locations:

- Always-on instructions: `.github/copilot-instructions.md`
- Scoped instructions: `.github/instructions/**/*.instructions.md`
- Custom agents: `.github/agents/*.agent.md`
- Prompt files: `.github/prompts/*.prompt.md`
- Skills: `.github/skills/<skill-name>/SKILL.md`

When propagating agent definitions from `.claude/agents/`, adapt tool references and shell commands for this runtime. Semantic content must remain identical.

## Rules

**Do** keep agent definitions in `.github/agents/` semantically identical to the canonical versions in `.claude/agents/`. Only frontmatter and tool references should differ.

**Don't** let agents modify files in `workflows/` without explicit user authorization. CI/CD pipelines affect every contributor and every deployment.

**Don't** put project-specific knowledge in `prompts/` that belongs in a skill file. Prompts provide repository-level context; skills provide task-level guidance.

**Do** keep this surface template-friendly. Project-specific values should remain TODO placeholders unless this scaffold is being initialized for a concrete repository.
