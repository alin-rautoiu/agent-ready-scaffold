# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About this project

<!-- TODO: Describe your project in 2-3 sentences.
e.g.: "Full-stack monorepo that automates the collection, curation, and distribution of curated content to subscribers. Combines feed scraping, AI-powered summarization, and email delivery into a streamlined publishing workflow." -->

## Repository Identity

- Canonical GitHub repository: <!-- TODO: e.g.: `https://github.com/your-org/your-repo` -->
- Use GitHub CLI (`gh`) for remote GitHub operations (PRs, issues, checks, metadata).
- Assume this repository is accessible through authenticated `gh` in this workspace.
- <!-- TODO: Add any authenticated workflow runbooks. e.g.: "For authenticated UX audit setup/teardown, use `docs/ux-audit-auth-runbook.md`." -->

## Code Style

- <!-- TODO: Styling approach. e.g.: "When working on the frontend, use existing CSS classes and Tailwind CSS utility classes as the default styling approach." -->
- <!-- TODO: Typing preference. e.g.: "Make use of the TypeScript type system." -->
- Use TDD; follow a red/green test cycle whenever the behavior is testable in isolation.
- Treat edge cases when writing tests
- <!-- TODO: name the key library choices already made and which alternatives to avoid. e.g.: "Prefer proven libraries — for this stack: use Express over Hono for HTTP routing, use pg over a query-builder when raw performance matters, avoid alpha-stage packages for any data-critical path." -->
- **Keep handlers thin.** <!-- TODO: remove if the project has no HTTP handler/controller layer (e.g. a CLI tool or pure data pipeline) --> Route handlers own input parsing, service delegation, and response shaping only. Conditions, calculations, and multi-step operations belong in the service layer.
- **Wire i18n from the first line of UI code.** <!-- TODO: remove if the project has no UI layer or no i18n requirement --> Do not hardcode user-visible strings in components. All display text — labels, error messages, empty states, button copy — goes through the translation helper, even before a second locale exists.

## Commands

```bash
# Development
<!-- TODO: List your primary development commands. e.g.:
<install-command>          # Install dependencies
<dev-command>              # Start dev server with hot reload
<build-command>            # Compile / build
<start-command>            # Run production build
-->

# Testing
<!-- TODO: List your test commands. e.g.:
<test-command>             # Run all tests
<watch-command>            # Watch mode
<coverage-command>         # Coverage report
-->

# Database
<!-- TODO: List your database commands if applicable. e.g.:
<generate-command>         # Generate migration from schema changes
<migrate-command>          # Apply migrations
<db-browser-command>       # Open DB browser (if available)
-->

# Utilities
<!-- TODO: Any utility scripts. e.g.:
<hash-command>             # Interactive hash/secret generator
-->
```

Run a single test file:

```bash
<!-- TODO: e.g.:
<single-test-command> tests/unit/example.<ext>
<single-test-command> tests/integration/example.<ext>
-->
```

## Scripts Workflow

- Script entrypoints live in <!-- TODO: e.g.: `scripts/` --> and are run via <!-- TODO: e.g.: npm scripts, Makefile targets, Rake tasks -->.
- Reuse shared helpers in <!-- TODO: e.g.: `src/shared/` --> when script logic overlaps across files.
- Prefer predictable and safe script interfaces:
  - print clear `--help` usage
  - support `--dry-run` and/or `--force` for destructive flows
  - validate runtime assumptions before mutating DB/files

## Docker

<!-- TODO: If using Docker, add commands here. e.g.:
```bash
docker compose up           # Start app (+ any dev services like mail testing)
docker compose up --build   # Rebuild after code changes
```
-->

## Setup

<!-- TODO: List setup steps. e.g.:
1. Copy `.env.example` to `.env`
2. Set required environment variables
3. Run `<migrate-command>` (or let the server apply migrations on first start)
-->

## Architecture

<!-- TODO: Replace this section with your project's architecture. Keep the same structure (brief description + file map table + subsection details). -->

**<!-- TODO: describe your monorepo structure, e.g.: "Single-package monorepo — backend and frontend in one `package.json`." -->**

```
<!-- TODO: Describe your folder layout. e.g.:
src/server/    Backend API
src/shared/    Cross-boundary types and logic
src/client/    Frontend SPA
tests/         Unit and integration test suites
templates/     Email/document templates
-->
```

### Backend <!-- TODO: path, e.g.: `src/server/` -->

<!-- TODO: List key backend files and their roles in the table below. e.g.:
- `<app-factory>.<ext>` — App factory; mounts all routes
- `<entry-point>.<ext>` — Entry point: loads config, runs migrations, starts server
- `db/schema.<ext>` — Database schema (source of truth)
- `db/client.<ext>` — DB connection singleton
- `routes/` — One file per resource
- `services/` — Business logic layer
- `middleware/` — Auth, permissions, and other cross-cutting concerns
-->

<!-- TODO: Add a `| File | Role |` table here listing each key file and its purpose. -->

<!-- TODO: Add route-surface sync note. e.g.:
**Route-surface sync:** `<app-factory-path>` is the single source of truth for mounted API prefixes. When you add, rename, or remove a route module, update any references in this file to match.
-->

### Frontend <!-- TODO: path, e.g.: `src/client/` -->

<!-- TODO: Describe your frontend setup. e.g.:
<Framework> app served by the backend's static middleware in production. During development run `<dev-command>` which proxies API requests to `:PORT`.

Pages: <!-- TODO: list main pages -->

**i18n**: <!-- TODO: if applicable, describe i18n setup. e.g.: "Bilingual support via `<i18n-dir>/`." -->

**Data fetching**: <!-- TODO: describe your data-fetching library and pattern. e.g.: "Uses <library>; normalized query keys in `<query-dir>/`." -->
-->

### Data model key points

<!-- TODO: List important data model conventions agents must know. e.g.:
- JSON-serialized columns should be parsed/stringified at route boundaries.
- Soft deletes use a `deletedAt`/`revokedAt` timestamp rather than hard deletes.
- All API responses normalize `Date` values to Unix seconds before serialization.
-->

### Database driver selection

<!-- TODO: Describe how your database driver or connection is selected at runtime, if dynamic. e.g.:
`<runtime-config-path>` resolves the driver at startup:
| Condition | Driver |
|---|---|
| `DATABASE_DRIVER` env var set | that value |
| Secondary URL env var present | secondary driver |
| Default | primary driver |
-->

### Cross-dialect write helpers

<!-- TODO: If you have an ORM or DB abstraction layer with cross-dialect or cross-engine helpers, document their conventions. e.g.:
Always use helpers from `<write-helpers-path>` instead of calling the ORM directly:
- `insertOneReturning` / `insertManyReturning`
- `updateByIdReturning`
- `withTransaction(fn)` — wraps multi-step writes in a single transaction
- `isDuplicateKeyError(error)` — cross-dialect duplicate key detection

Do not call ORM primitives that differ across databases directly in routes or services.
-->

### Testing patterns

- Integration tests use <!-- TODO: describe your test DB/server setup. e.g.: "`createTestDb()` (in-memory DB) and `makeTestServer(createApp(db))`." -->
- <!-- TODO: Auth test helpers location. e.g.: "`seedAdmin()` and `makeAuthCookie()` helpers are in `tests/helpers/auth.ts`." -->
- <!-- TODO: Service mock injection pattern. e.g.: "External service clients expose `setClient()` / `setTransport()` for injecting mocks." -->

Run the full suite and single-file commands are in the **Commands** section above.

### Agent sync policy

**Source of truth:** `.claude/agents/`. Propagate changes to `.github/agents/`, `.codex/skills/agent-*/`, and the Gemini Code Assist surface (`GEMINI.md` plus any referenced `.agents/` files). Frontmatter format differs by runtime — only the body content must match semantically. When propagating, adapt tool-specific instructions to use the target runtime's equivalent tools. See `AGENTS.md` for the full runtime table. Canonical agents: Orchestrator, Implementation Lead, Code Review, <!-- TODO: add any project-specific agents. e.g.: "Atomic Commit, UX Audit, Issues Workflow." -->

**Runtime capabilities differ.** Agents that use browser automation, shell commands, or external CLIs must adapt tool references per runtime:

| Capability | Claude Code | GitHub Copilot (VS Code) | Codex | Gemini Code Assist (VS Code) |
| --- | --- | --- | --- | --- |
| Shell environment | Bash (macOS/Linux) | PowerShell 5.1+ (Windows) | Bash | PowerShell 5.1+ (Windows) |
| Shell syntax | `&&`, `\|`, `grep` | `;`, `\|`, `Select-String` | `&&`, `\|`, `grep` | `;`, `\|`, `Select-String` |
| Browser automation | `playwright-cli` via Bash | Chrome MCP (`mcp_io_github_chr_*`) | N/A | MCP/browser tools only if configured in `~/.gemini/settings.json` |
| Session isolation | `-s=<name>` named sessions | `isolatedContext` on `new_page` | N/A | Separate chats or tool-specific isolation only |
| A11y tree snapshot | `playwright-cli snapshot` | `mcp_io_github_chr_take_snapshot` | N/A | Via configured browser/MCP tooling only |
| Lighthouse audit | N/A (manual) | `mcp_io_github_chr_lighthouse_audit` | N/A | Via configured browser/MCP tooling only |
| GitHub CLI (`gh`) | via Bash | via run_in_terminal (if installed) | via Bash | via terminal tool (if installed) |
| MCP tool servers | N/A | User-configured; may or may not be active | N/A | User-configured in `~/.gemini/settings.json` |
| File operations | Read, Write, Edit | read, edit, search, create_file | Read, Write | Built-in file search/read/write/edit tools |
| Sub-agents | Agent tool | `agent` / runSubagent | N/A | No dedicated sub-agent primitive; use focused chats/prompts |

**Ask, don't workaround.** When an agent needs a tool that is unavailable in its runtime (for example Chrome MCP not configured, `gh` CLI not installed, or a Gemini MCP server missing from `~/.gemini/settings.json`), the agent must **stop and ask the user** to enable or install the required tool. Do not invent ad-hoc alternatives (temp scripts, curl workarounds, manual API calls) to replace missing tools. State what tool is needed, why, and what the user should do to provide access.

<!-- TODO: Specify the primary development OS and shell syntax for this project.
e.g.: "This codebase runs on Windows. Copilot and Gemini Code Assist instructions must use PowerShell syntax. Claude Code and Codex agents use Bash."
OR: "This codebase runs on macOS/Linux. All runtimes use Bash syntax." -->

Agents without browser needs propagate as body-content-only changes with shell syntax adapted. Agents with browser automation require full tool-command adaptation plus explicit Gemini MCP guidance when the Gemini surface is updated.

### Specialized workflows

<!-- TODO: List any project-specific agent workflows or skill files. e.g.:
- **<workflow name>**: follow `.claude/skills/<skill-name>/SKILL.md`.
-->
