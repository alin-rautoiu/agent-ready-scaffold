# Codex Repo Guide

This file is the Codex-facing equivalent of `CLAUDE.md` and `.github/copilot-instructions.md`.

## Project

<!-- TODO: Describe your project in 2-3 sentences.
e.g.: "Full-stack monorepo for collecting, curating, summarizing, and distributing newsletter content." -->

- Backend: <!-- TODO: Framework and directory. e.g.: "Hono API in `src/server/`" -->
- Frontend: <!-- TODO: Framework and directory. e.g.: "React SPA in `src/client/`" -->
- Tests: <!-- TODO: Test framework and directory. e.g.: "Vitest unit and integration suites in `tests/`" -->
- Templates: <!-- TODO: If applicable. e.g.: "Handlebars email templates in `templates/`" -->

## Repository Identity

- Canonical GitHub repository: <!-- TODO: e.g.: `https://github.com/your-org/your-repo` -->
- Use GitHub CLI (`gh`) for remote GitHub operations (PRs, issues, checks, metadata).
- Prefer `gh` for GitHub issue workflows by default (view/comment/edit/close/reopen/label/assign); only fall back to other APIs/tools when `gh` cannot perform the needed operation cleanly.
- Assume this repository is accessible through authenticated `gh` in this workspace.

## Working Rules

- <!-- TODO: Language/typing preference. e.g.: "Prefer TypeScript-first changes with strict, explicit types." -->
- <!-- TODO: Styling approach. e.g.: "Use Tailwind CSS utility classes as the default styling approach for frontend work in `src/client/`." -->
- <!-- TODO: name the key library choices already made and which alternatives to avoid. e.g.: "Prefer proven libraries — for this stack: use Express over Hono for HTTP routing, use pg over a query-builder when raw performance matters, avoid alpha-stage packages for any data-critical path." -->
- Keep backend route modules thin: validate input, call services, return JSON. <!-- TODO: remove if the project has no HTTP handler/controller layer -->
- <!-- TODO: Route naming convention. e.g.: "Follow the existing `create<Resource>Routes(db)` pattern under `src/server/routes/`." -->
- Reuse test helpers from <!-- TODO: e.g.: `tests/helpers/` --> instead of inventing ad hoc setup.
- Use TDD when the behavior is testable in isolation; apply a red/green test cycle.
- Treat edge cases as part of the task, not optional cleanup.
- Wire i18n from the first line of UI code: all display text goes through the translation helper, even before a second locale exists. <!-- TODO: remove if the project has no UI layer or no i18n requirement -->
- When adding or renaming routes, keep <!-- TODO: e.g.: `src/server/app.ts` --> and repo references in sync.

## Commands

```bash
<!-- TODO: List your primary commands. e.g.:
<install-command>          # Install dependencies
<dev-command>              # Start dev server
<build-command>            # Build for production
<start-command>            # Run production build
<test-command>             # Run all tests
<watch-command>            # Watch mode
<coverage-command>         # Coverage report
<generate-command>         # Generate migration
<migrate-command>          # Apply migrations
-->
```

Single test file:

```bash
<!-- TODO: e.g.:
<single-test-command> tests/unit/<name>.<ext>
<single-test-command> tests/integration/<name>.<ext>
-->
```

## Scripts

<!-- TODO: Describe your scripts convention. e.g.:
- Script entrypoints are under `<scripts-dir>/` and are executed via `<run-command>`.
- Prefer shared helpers in `<shared-dir>/` for script logic that appears in more than one file.
- Keep script behavior explicit and safe: add `--help`, `--dry-run`, `--force` for destructive flows.
- Validate script changes with `<typecheck-command>` and targeted tests before the full suite.
-->

## Runtime And Deployment

- Default database: <!-- TODO: e.g.: "SQLite via `better-sqlite3`; MySQL-ready path for future migration." -->
- <!-- TODO: Dynamic driver selection logic, if applicable. e.g.: "MySQL is selected automatically when `MYSQL_URL`, `MYSQL_HOST`, or `DATABASE_HOST` is present." -->
- Primary deployment model: <!-- TODO: e.g.: "Docker, optionally exposed via Cloudflare Tunnel." -->
- <!-- TODO: Any authenticated workflow runbooks. e.g.: "For authenticated UX coverage of protected routes, use `docs/ux-audit-auth-runbook.md`." -->

## Database Rules

- Source of truth for schema: <!-- TODO: e.g.: `src/server/db/schema.ts` -->
- <!-- TODO: ORM or DB helper conventions. e.g.: "Use cross-dialect helpers from `src/server/db/writeHelpers.ts`; never call `.returning()` directly in routes or services." -->
- <!-- TODO: List primary DB helper functions. e.g.:
  - `insertOneReturning`
  - `insertManyReturning`
  - `updateByIdReturning`
  - `withTransaction` — wraps multi-step writes in a single transaction
  - `isDuplicateKeyError` — cross-dialect duplicate key detection
-->

## App-Specific Facts

<!-- TODO: List project-specific conventions agents must know. e.g.:
- JSON-serialized columns should be parsed/stringified at route boundaries.
- API prefixes: `/api/auth`, `/api/users`, ...
- All API responses normalize `Date` values to Unix seconds before serialization.
-->

## Frontend Data Fetching

<!-- TODO: Describe your data-fetching library and conventions. e.g.:
- TanStack Query is wired in `src/client/main.tsx`; shared query infrastructure lives in `src/client/query/`.
- Reuse query key factories instead of ad hoc array keys.
- Follow the established pattern for split loading states (`initialLoading` vs `refreshing`).
-->

## Testing Patterns

<!-- TODO: Describe your testing setup and key utilities. e.g.:
- Integration tests use `createTestDb()` (in-memory DB) and `makeTestServer(createApp(db))`.
- Auth helpers live in `tests/helpers/auth.ts`.
- External service clients expose injection hooks (`setClient()`, `setTransport()`) for test mocks.
- Full suite should pass before handing off substantial implementation work.
-->

## Environment

<!-- TODO: List env var setup steps. e.g.:
- Copy `.env.example` to `.env`
- Set `JWT_SECRET` to a random 32+ character string
- Set `ANTHROPIC_API_KEY` for AI workflows
- Run any hash-generation utilities for stored secrets
-->

## Agent Sync Policy

Agent definitions live in four directories, one per coding-assistant runtime:

| Runtime | Path | Format |
| --- | --- | --- |
| Claude Code | `.claude/agents/*.md` | `tools: Read, Glob, ...` (comma string) |
| GitHub Copilot | `.github/agents/*.agent.md` | `tools:` YAML list + `target: vscode` |
| Codex | `.codex/skills/agent-*/SKILL.md` | Codex-native skill format |
| Gemini Code Assist (VS Code) | `GEMINI.md` + `.agents/**/*.md` | Gemini context files and reusable markdown playbooks |

**Source of truth:** `.claude/agents/`. When an agent is added or updated, propagate the change to `.github/agents/`, `.codex/skills/agent-*/`, and the Gemini Code Assist surface (`GEMINI.md` plus any referenced `.agents/` files) so all four stay at feature parity. Frontmatter format differs by runtime — only the body content must match semantically. Current canonical agents: Orchestrator, Implementation Lead, Code Review, Atomic Commit, UX Audit, Issues Workflow.

**Runtime capabilities differ.** Agents that use browser automation, shell commands, or external CLIs must adapt tool references per runtime:

| Capability | Claude Code | GitHub Copilot (VS Code) | Codex | Gemini Code Assist (VS Code) |
| --- | --- | --- | --- | --- |
| Shell environment | Bash (macOS/Linux) | PowerShell 5.1+ (Windows) | Bash | PowerShell 5.1+ (Windows) |
| Shell syntax | `&&`, `\|`, `grep` | `;`, `\|`, `Select-String` | `&&`, `\|`, `grep` | `;`, `\|`, `Select-String` |
| Browser automation | `playwright-cli` via Bash | Chrome MCP (`mcp_io_github_chr_*`) | N/A | MCP/browser tools only if explicitly configured in `~/.gemini/settings.json` |
| Session isolation | `-s=<name>` named sessions | `isolatedContext` on `new_page` | N/A | Separate agent chats or tool-specific isolation only |
| A11y tree snapshot | `playwright-cli snapshot` | `mcp_io_github_chr_take_snapshot` | N/A | Via configured browser/MCP tooling only |
| Lighthouse audit | N/A (manual) | `mcp_io_github_chr_lighthouse_audit` | N/A | Via configured browser/MCP tooling only |
| GitHub CLI (`gh`) | via Bash | via run_in_terminal (if installed) | via Bash | via terminal tool (if installed) |
| MCP tool servers | N/A | User-configured; may or may not be active | N/A | User-configured in `~/.gemini/settings.json` |
| File operations | Read, Write | read, edit, search, create_file | Read, Write | Built-in file search/read/write/edit tools |
| Sub-agents | Agent tool | `agent` / runSubagent | N/A | No dedicated sub-agent primitive; use focused chats/prompts |

**Ask, don't workaround.** When an agent needs a tool that is unavailable in its runtime (for example Chrome MCP not configured, `gh` CLI not installed, or a Gemini MCP server missing from `~/.gemini/settings.json`), the agent must **stop and ask the user** to enable or install the required tool. Do not invent ad-hoc alternatives (temp scripts, curl workarounds, manual API calls) to replace missing tools. State what tool is needed, why, and what the user should do to provide access.

<!-- TODO: Specify the primary development OS and shell syntax for this project.
e.g.: "This codebase runs on Windows. Copilot and Gemini Code Assist instructions must use PowerShell syntax. Claude Code and Codex agents use Bash."
OR: "This codebase runs on macOS/Linux. All runtimes use Bash syntax." -->

Agents without browser needs (Code Review, Atomic Commit) propagate as body-content-only changes with shell syntax adapted. Agents with browser automation (UX Audit) require full tool-command adaptation plus explicit Gemini MCP guidance when the Gemini surface is updated.
