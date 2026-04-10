# Agent-Ready Scaffold Collection

A set of project templates pre-wired for AI agent collaboration. Each scaffold ships with agent configuration for Claude Code, GitHub Copilot, OpenAI Codex, and Gemini Code Assist, plus documented conventions, a multi-agent orchestration loop, and a full do's-and-don'ts guide drawn from real experience running agents on production codebases.

This is not a starter kit for an application. It is a **working environment** for AI agents — the configuration, instructions, and structural patterns that let agents understand a codebase, follow team conventions, and hand work off to each other without losing context.

## Start here

Before reading anything else, read these two files:

- [**general-agentic-reference/README.md**](general-agentic-reference/README.md) — The do's and don'ts guide. Every rule has a **Why** explaining the failure it prevents. These rules apply regardless of architecture or framework.
- [**general-agentic-reference/orchestrator-loop.md**](general-agentic-reference/orchestrator-loop.md) — The agent loop rationale. Explains the Orchestrator → Implementation Lead → Code Review design: what each agent's responsibility boundary is, why the separation matters, and when the loop pays for itself.

For fullstack web applications, also read [`fullstack-monorepo/README.md`](fullstack-monorepo/README.md) for stack-specific rules (testing, architecture, i18n, vertical slice, technology choices).

## How to use this scaffold

Initialization is split across two files:

**[INIT.md](INIT.md)** — Run this first. It asks which AI agent you are using, sets that runtime's folder as the canonical source of truth, updates the knowledge files accordingly, and tells you which surfaces to delete (for example, if you are a Codex user with no Claude on the team, `.claude/` gets removed). Then it hands off to the second file.

**[INIT-SCAFFOLD.md](INIT-SCAFFOLD.md)** — The detailed setup script. Asks 13 questions about your project and works through 12 transformation TODOs: filling template placeholders, populating DESIGN.md, configuring commands, removing unused agent surfaces, and optionally scaffolding the initial source tree.

If you prefer to do it manually: copy `fullstack-monorepo/` into your project root and work through each `<!-- TODO: ... -->` placeholder in the knowledge files. Read INIT.md to understand the canonical surface decision before touching anything in `.claude/`, `.github/`, `.codex/`, or `.agents/`.

Read `fullstack-monorepo/README.md` once before starting work. The do's and don'ts are short; the failures they describe are not.

## Available scaffolds

| Scaffold | Description |
| --- | --- |
| [`fullstack-monorepo/`](fullstack-monorepo/) | Full-stack monorepo template with backend API, frontend SPA, shared types, multi-agent orchestration loop, UX audit pipeline, and GitHub issue workflow |
| [`revealjs-react-presentation/`](revealjs-react-presentation/) | RevealJS presentation template with Vite, React, TypeScript, PDF export, and mirrored agent surfaces for deck authoring workflows |

## Assumptions

This scaffold was written with a specific setup in mind: Claude Code used in VS Code on Windows. The agent configuration, shell syntax, and tooling references reflect that setup. If your situation differs, the table below describes what to change.

### Primary coding agent

**Assumed: Claude Code is the primary agent.** The `.claude/` directory is the canonical source of truth. All agent definitions, skill files, hooks, and slash commands are written in Claude Code format first.

| Your setup | What to do |
| --- | --- |
| **GitHub Copilot** | Use `.github/agents/*.agent.md` — these are maintained mirrors of the Claude agents with Copilot-specific front matter. The agent loop works the same way; the Orchestrator, Implementation Lead, and Code Review agents are all present. Run `INIT.md` with Copilot as the agent. |
| **OpenAI Codex** | Use `.codex/skills/agent-*/SKILL.md` — Codex skill format mirrors of the same agents. |
| **Gemini Code Assist** | Use `GEMINI.md` and `.agents/` — Gemini context files with the same conventions. Gemini does not have a sub-agent primitive; read `.claude/agents/README.md` to understand the loop design and adapt it to focused chat sessions. |
| **Multiple agents on the same team** | All four surfaces are maintained in parallel. `.claude/agents/` remains the source of truth. When you update an agent definition, propagate the change to the other three surfaces (see `CLAUDE.md` for the sync policy). |

The do's and don'ts in `fullstack-monorepo/README.md` are agent-agnostic. Every rule applies regardless of which tool you use.

### Code editor

**Assumed: VS Code.** The GitHub Copilot integration targets the VS Code extension API (`target: vscode` in agent front matter). The UX audit agent references Chrome MCP tools that are available in VS Code via the GitHub Copilot extension.

| Your setup | What to do |
| --- | --- |
| **JetBrains IDEs** | Claude Code works from any terminal independent of IDE — no changes needed for the `.claude/` surface. GitHub Copilot in JetBrains does not support agent mode with custom agent files; the `.github/agents/` surface does not apply. Gemini Code Assist works similarly to VS Code. |
| **Neovim / Emacs / other** | Claude Code CLI is the most practical surface. The `.claude/` directory works fully from the terminal. Ignore `.github/agents/` entirely. |
| **No IDE (terminal only)** | Use Claude Code CLI and the `.claude/` directory. All agents, skills, hooks, and commands work from the terminal. |

The Chrome MCP tools referenced in the UX audit agent (`mcp_io_github_chr_*`) are VS Code Copilot-specific. If you are not using VS Code Copilot, the UX audit agent uses `playwright-cli` via Bash instead — this works from any terminal environment.

### Claude delivery method

**Assumed: Claude Code** (either the VS Code extension or the CLI). Several features in `.claude/` are Claude Code-specific:

- **Hooks** (`.claude/hooks/`) — shell commands that fire on tool-call events; Claude Code only
- **Slash commands** (`.claude/commands/`) — `/commit`, `/check-tests`, etc.; Claude Code only
- **Sub-agents** — the Agent tool that powers the Orchestrator loop; Claude Code only
- **Skills** (`.claude/skills/`) — lazily loaded context files; Claude Code only

| Your setup | What to do |
| --- | --- |
| **Claude via the VS Code extension** | Fully supported. Same as Claude Code CLI for the purposes of this scaffold. |
| **Claude via API (no IDE integration)** | Hooks and slash commands do not apply. Load skill files and agent definitions manually as context. The agent loop can be approximated by running separate API calls with different system prompts, but you lose the automatic handoff structure. |
| **Claude.ai chat (no coding integration)** | Only the do's and don'ts in `general-agentic-reference/README.md` and the agent loop rationale in `general-agentic-reference/orchestrator-loop.md` apply as reading material. The configuration files are not directly usable. |

### Operating system

**Assumed: the scaffold is OS-neutral by default, but the VS Code-based agent surfaces (GitHub Copilot, Gemini Code Assist) require Windows-specific shell syntax** because they run in PowerShell on Windows.

Claude Code uses Bash on macOS/Linux and Bash-in-WSL or the native shell on Windows — the `.claude/` surface works correctly on all three.

| Your setup | What to change |
| --- | --- |
| **macOS / Linux** | In `.github/agents/*.agent.md` and `GEMINI.md`, replace PowerShell syntax (`Select-String`, `;` chaining, `$null`) with Bash equivalents (`grep`, `&&`, `/dev/null`). The `INIT.md` Q5 and TODO 3 handle this automatically if you use the init script. |
| **Windows (WSL)** | Claude Code runs in WSL and uses Bash. The `.claude/` surface needs no changes. The Copilot and Gemini surfaces still use PowerShell (they run outside WSL). |
| **Windows (native PowerShell only)** | No changes needed — this is what the Copilot and Gemini surfaces already assume. |

---

### New project

**Assumed: the scaffold is used to set up a new project, from scratch.**

| Your setup | What to do |
| --- | --- |
| **Existing codebase** | The agent configuration files still apply — an existing project benefits from the same structured conventions, agent loop, and knowledge files as a new one. The source scaffolding does not apply. In `INIT-SCAFFOLD.md`: answer Q0 as "Existing", choose Level 1 or 2 in Q12 (not Level 3), and complete the existing codebase survey in TODO 0 before touching any other file. The goal is to fill `CLAUDE.md`, `DESIGN.md`, and the agent files with accurate descriptions of what is already there, not what you intend to build. |

## Adding a new scaffold

Create a new top-level directory alongside `fullstack-monorepo/`. Follow the same internal structure:

```
your-scaffold/
├── README.md          # Do's and don'ts for this stack
├── CLAUDE.md          # Claude Code agent instructions
├── AGENTS.md          # Codex/OpenAI agent instructions
├── GEMINI.md          # Gemini Code Assist context
├── DESIGN.md          # Architecture and design reference
├── INIT.md            # Initialization prompt (copy from root and adapt paths)
├── .claude/           # Claude Code config (agents, skills, hooks, commands)
├── .github/           # GitHub Copilot config (agents, prompts, workflows)
├── .agents/           # Gemini Code Assist context
├── .codex/            # OpenAI Codex config
└── src/               # Application source
```

`.claude/agents/` is always the canonical source of truth. Propagate agent changes to the other three surfaces after every edit. See `fullstack-monorepo/CLAUDE.md` for the full sync policy and the runtime capability table.
