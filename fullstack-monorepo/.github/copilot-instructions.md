# Project Guidelines

## Repository Identity

- Canonical GitHub repository: <!-- TODO: e.g.: `https://github.com/your-org/your-repo` -->
- Use GitHub CLI (`gh`) for remote GitHub operations (PRs, issues, checks, metadata).
- Assume this repository is accessible through authenticated `gh` in this workspace.

## Shell Environment

<!-- TODO: Specify the primary development OS for this project.
e.g. Windows: "This workspace runs on Windows. The only available shell is PowerShell 5.1+."
e.g. macOS/Linux: "This workspace runs on macOS/Linux. Bash is the primary shell."
-->

<!-- TODO: List prohibited commands and their shell-appropriate equivalents if needed.
e.g. (Windows/PowerShell):
- Prohibited: `&&`, `grep`, `head`, `tail`, `cat`, `find`, `sed`, `awk`, `rm`, `cp`, `mv`, `ls`
- PowerShell equivalents:
  - `cmd1 && cmd2` → `cmd1 ; cmd2`
  - `grep pattern file` → `Select-String -Pattern 'pattern' file`
  - `head -n 20` → `Select-Object -First 20`
  - `tail -n 20` → `Select-Object -Last 20`
  - `cat file` → `Get-Content file`
  - `find . -name '*.ts'` → `Get-ChildItem -Recurse -Filter '*.ts'`
  - `rm -rf dir` → `Remove-Item -Recurse -Force dir`
  - `cp src dst` → `Copy-Item src dst`
  - `mv src dst` → `Move-Item src dst`
  - `ls` → `Get-ChildItem`
- Pipeline objects in PowerShell differ from text streams; use `-First`/`-Last` on object pipelines.
-->

## Code Style

- <!-- TODO: Typing preference. e.g.: "TypeScript first, strict typing, and small focused functions." -->
- <!-- TODO: Styling approach. e.g.: "Frontend styling uses Tailwind CSS utility classes." -->
- Keep backend route modules thin: validate input, call services, return JSON.
- <!-- TODO: Route naming convention. e.g.: "Follow existing route pattern in `src/server/routes/`: each module exports `create<Resource>Routes(db)`." -->
- <!-- TODO: Test helper convention. e.g.: "Reuse existing test helpers in `tests/helpers/` instead of building ad-hoc test setup." -->

## Architecture

<!-- TODO: Describe your overall structure. e.g.:
- Single-package monorepo:
  - Backend: <framework> in `<backend-path>/`
  - Frontend: <framework> in `<frontend-path>/`
  - Tests: <framework> in `<tests-path>/`
-->

<!-- TODO: Describe your app composition pattern. e.g.:
- `src/server/app.ts` wires routes from injected Db.
- `src/server/index.ts` runs migrations, starts the server, starts the scheduler.
-->

<!-- TODO: Source of truth for schema. e.g.: "Database schema defined in `src/server/db/schema.ts`." -->

<!-- TODO: Database driver selection. e.g.: "Driver selected at runtime by `src/server/db/runtime.ts`; default is the embedded driver." -->

<!-- TODO: Cross-dialect write helpers if applicable. e.g.:
- Use helpers from `src/server/db/writeHelpers.ts` instead of calling `.returning()` directly.
- Key helpers: `insertOneReturning`, `updateByIdReturning`, `withTransaction`, `isDuplicateKeyError`.
-->

<!-- TODO: Middleware. e.g.: "`auth.ts` (JWT verification), `featurePermissions.ts` (role/permission gates)." -->

<!-- TODO: Key services. e.g.: "itemService, recordService, membersService, ..." -->

<!-- TODO: API route prefixes. e.g.: "/api/auth, /api/users, /api/items, ..." -->

<!-- TODO: Roles and authorization model. e.g.: "Role field is `'admin' | 'editor'`; use `PermissionGate` to gate UI by role or feature permission." -->

<!-- TODO: i18n setup if applicable. e.g.: "Bilingual support via `src/client/i18n/`; translation keys typed in `types.ts`." -->

## Deployment Model

<!-- TODO: Describe your deployment model. e.g.:
- Primary operating model: local Docker deployment exposed via Cloudflare Tunnel.
- Bring-up: `docker compose up`.
- Default database: embedded SQLite; external DB (MySQL/Postgres) is a documented migration path.
- See CLAUDE.md for full deployment options.
-->

## Build and Test

<!-- TODO: List your primary commands. e.g.:
- Install deps: <install-command>
- Dev: <dev-command>
- Build: <build-command>
- Start production: <start-command>
- Test suite: <test-command>
- Coverage: <coverage-command>
- Single test file: <single-test-command> tests/unit/<name>.test.<ext>
- DB migrate: <migrate-command>
-->

## Scripts Workflow

- Script entrypoints are under <!-- TODO: e.g.: `scripts/` --> and are executed via <!-- TODO: e.g.: project-local runner scripts -->.
- Prefer shared helpers in <!-- TODO: e.g.: `src/shared/` --> when script logic is reused across files.
- Keep script interfaces explicit and safe:
  - Provide `--help` output.
  - Add `--dry-run` and/or `--force` for destructive flows.
  - Validate runtime assumptions before DB/filesystem mutations.
- <!-- TODO: Describe script validation steps. e.g.: "Validate script changes with `<typecheck-command>` + focused tests + full suite when shared helpers change." -->

## Conventions

<!-- TODO: List project-specific conventions agents must know. e.g.:
- JSON-serialized columns are parsed/stringified at route boundaries before returning API payloads.
- Prefer service-level dependency injection hooks for tests (`setClient`, `setTransport`) over broad mocking.
- Integration tests use in-memory DB helpers.
- Settings rows in a key-value store override env vars at runtime; read via settings routes, not env directly.
-->

## Frontend Data Fetching

<!-- TODO: Describe your data-fetching library and conventions. e.g.:
- <data-fetching-library> is wired in `<entry-point-file>`; shared query infrastructure in `<query-dir>/`.
- Reuse query key factories instead of ad hoc keys.
- Follow the established pattern for split loading states (`initialLoading` vs `refreshing`).
- For query-backed UI tests, create a fresh query client per test.
-->

## Environment Gotchas

<!-- TODO: List non-obvious env var setup requirements. e.g.:
- Generate password hashes with `<hash-command>`; plaintext passwords are not accepted.
- Keep hashed secrets quoted in Docker Compose `.env` files when the hash contains special characters.
- Set `JWT_SECRET` (or equivalent) to a strong random value.
- Set any external API keys before using AI/email/third-party workflows.
- Run migrations explicitly on first setup rather than relying on auto-migration.
-->

## References

<!-- TODO: List key reference files. e.g.:
- See CLAUDE.md for detailed architecture, command notes, and domain-specific behavior.
- See `.env.example` for required environment variables.
-->

## Agent Sync Policy

Agent definitions live in four directories, one per coding-assistant runtime:

| Runtime | Path | Format |
|---|---|---|
| Claude Code | `.claude/agents/*.md` | `tools: Read, Glob, ...` (comma string) |
| GitHub Copilot | `.github/agents/*.agent.md` | `tools:` YAML list + `target: vscode` |
| Codex | `.codex/skills/agent-*/SKILL.md` | Codex-native skill format |
| Gemini Code Assist (VS Code) | `GEMINI.md` + `.agents/**/*.md` | Gemini context files and reusable markdown playbooks |

**Source of truth:** `.claude/agents/`. When an agent is added or updated, propagate the change to every other runtime directory so all four stay at feature parity. For Gemini Code Assist, that means updating `GEMINI.md` plus any relevant `.agents/` files rather than recreating the old Antigravity plugin layout. Frontmatter format differs by runtime — only the body content must match semantically. When propagating, adapt tool-specific instructions to the target runtime's equivalent tools. Current canonical agents: Orchestrator, Implementation Lead, Code Review, Atomic Commit, UX Audit, Issues Workflow.

**Runtime capabilities differ.** Agents that use browser automation, shell commands, or external CLIs must adapt tool references per runtime:

| Capability | Claude Code | GitHub Copilot (VS Code) | Codex | Gemini Code Assist (VS Code) |
| --- | --- | --- | --- | --- |
| Shell environment | Bash (macOS/Linux) | <!-- TODO: e.g.: PowerShell 5.1+ (Windows) --> | Bash | <!-- TODO: e.g.: PowerShell 5.1+ (Windows) --> |
| Shell syntax | `&&`, `\|`, `grep` | <!-- TODO: e.g.: `;`, `\|`, `Select-String` --> | `&&`, `\|`, `grep` | <!-- TODO: e.g.: `;`, `\|`, `Select-String` --> |
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
e.g.: "This codebase runs on Windows. Copilot and Gemini Code Assist instructions must use PowerShell syntax in all shell examples and commands. Claude Code and Codex agents use Bash. When propagating agents, translate shell commands between Bash and PowerShell as needed."
OR: "This codebase runs on macOS/Linux. All runtimes use Bash syntax."
-->

Agents without browser needs (Code Review, Atomic Commit) propagate as body-content-only changes with shell syntax adapted. Agents with browser automation (UX Audit) require full tool-command adaptation plus explicit Gemini MCP guidance when the Gemini surface is updated.
