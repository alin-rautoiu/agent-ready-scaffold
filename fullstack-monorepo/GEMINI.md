# GEMINI.md

This file provides repository context for Gemini Code Assist agent mode in VS Code.

## Runtime

<!-- TODO: Specify the primary development OS for this project.
e.g. Windows: "This codebase runs on Windows. Use PowerShell syntax for all terminal commands. Prefer `Get-ChildItem`, `Test-Path`, and `Select-String` over Bash-specific examples."
e.g. macOS/Linux: "This codebase runs on macOS/Linux. Use Bash syntax for all terminal commands." -->
- Use GitHub CLI (`gh`) for remote GitHub operations when it is installed and authenticated.
- For multi-line GitHub issue comments, prefer `gh issue comment ... --body-file <path>` with UTF-8 content instead of inline quoted bodies.
- If a required tool is unavailable, stop and ask the user to enable it. Do not invent ad-hoc replacements.

## Project

<!-- TODO: Describe your project in 2-3 sentences.
e.g.: "Full-stack monorepo for collecting, curating, summarizing, and distributing newsletter content." -->

- Backend: <!-- TODO: e.g.: "Hono API in `src/server/`" -->
- Frontend: <!-- TODO: e.g.: "React SPA in `src/client/`" -->
- Tests: <!-- TODO: e.g.: "Vitest unit and integration suites in `tests/`" -->
- Templates: <!-- TODO: If applicable. e.g.: "Handlebars email templates in `templates/`" -->

## Working Rules

- <!-- TODO: Language/typing preference. e.g.: "Prefer TypeScript-first changes with strict, explicit types." -->
- <!-- TODO: Styling approach. e.g.: "Use Tailwind CSS utility classes as the default styling approach for frontend work in `src/client/`." -->
- <!-- TODO: name the key library choices already made and which alternatives to avoid. e.g.: "Prefer proven libraries — for this stack: use Express over Hono for HTTP routing, use pg over a query-builder when raw performance matters, avoid alpha-stage packages for any data-critical path." -->
- Keep backend route modules thin: validate input, call services, return JSON. <!-- TODO: remove if the project has no HTTP handler/controller layer -->
- <!-- TODO: Route naming convention. e.g.: "Follow the existing `create<Resource>Routes(db)` pattern under `src/server/routes/`." -->
- Reuse test helpers from <!-- TODO: e.g.: `tests/helpers/` --> instead of inventing ad hoc setup.
- Use TDD when the behavior is testable in isolation; apply a red/green test cycle.
- Treat edge cases as part of the task, not optional cleanup.
- When adding or renaming routes, keep <!-- TODO: e.g.: `src/server/app.ts` --> and repo references in sync.
- <!-- TODO: DB helper convention. e.g.: "Use cross-dialect write helpers from `src/server/db/writeHelpers.ts` — never call `.returning()` directly." -->
- <!-- TODO: Other key conventions. e.g.: "Feature permissions: stored in `appSettings` under key `editor-permissions`; types in `src/shared/permissions.ts`." -->
- <!-- TODO: i18n convention if applicable. e.g.: "i18n: bilingual support via `src/client/i18n/`; translation keys typed in `types.ts`." -->
- Wire i18n from the first line of UI code: all display text goes through the translation helper, even before a second locale exists. <!-- TODO: remove if the project has no UI layer or no i18n requirement -->
- <!-- TODO: API prefixes. e.g.: "API prefixes: `/api/auth`, `/api/users`, ..." -->

## Commands

<!-- TODO: Choose the shell syntax that matches your development OS (PowerShell or Bash), then list your primary commands. -->

```
<!-- TODO: e.g.:
<install-command>          # Install dependencies
<dev-command>              # Start dev server
<build-command>            # Build for production
<start-command>            # Run production build
<test-command>             # Run all tests
<watch-command>            # Watch mode
<coverage-command>         # Coverage report
<migrate-command>          # Apply migrations
-->
```

Single test file:

```
<!-- TODO: e.g.:
<single-test-command> tests/unit/<name>.<ext>
<single-test-command> tests/integration/<name>.<ext>
-->
```

## Gemini Context Surface

Gemini Code Assist in VS Code does not use the old Antigravity plugin layout. The repository-local Gemini surface is:

- `GEMINI.md`: root workspace instructions for Gemini Code Assist.
- `.gemini/skills/**/SKILL.md`: reusable task playbooks.
- `.gemini/workflows/*.md`: focused workflow recipes.

Use `.gemini/README.md`, `.gemini/skills/INDEX.md`, and `.gemini/workflows/INDEX.md` as discovery entrypoints before loading a more specific file.

## Agent Mapping

Canonical agent behavior still lives in `.claude/agents/`. When a task maps to one of the shared agent roles, read the matching Claude file and adapt it to Gemini Code Assist's capabilities:

- Orchestrator: `.claude/agents/orchestrator.md`
- Implementation Lead: `.claude/agents/implementation-lead.md`
- Code Review: `.claude/agents/code-review.md`
- Atomic Commit: `.claude/agents/atomic-commit.md`
- UX Audit: `.claude/agents/ux-audit.md`
- Issues Workflow: `.claude/agents/issues-workflow.md`
<!-- TODO: Add any project-specific agents. -->

Gemini Code Assist does not have a checked-in per-agent manifest in this repo and should not recreate the old `.gemini/plugins/*/agents` structure. Emulate the requested role by reading the relevant markdown instructions and executing them within the current Gemini agent chat.

## Task Routing

- Multi-step delivery or backlog execution: read `.claude/agents/orchestrator.md`, then load only the specific `.gemini/skills/` files needed for the task.
- Direct implementation: read `.claude/agents/implementation-lead.md`.
- Frontend implementation: read `.gemini/skills/frontend-implementation/SKILL.md` before coding visible UI.
- Review requests: read `.claude/agents/code-review.md`.
- UX audits: read `.claude/agents/ux-audit.md`, then load the `.gemini/skills/ux-audit/` skill.
- Git workflows and careful commits: read `.gemini/skills/safe-git-operations/SKILL.md`.
- Issue workflow tasks: read `.gemini/skills/issues-workflow-orchestrator/SKILL.md`.
<!-- TODO: Add any project-specific task routing rules. -->

Do not bulk-read every skill file. Load only the files that match the task.

## Custom Subagents

This project defines specialized subagents in `.gemini/agents/` to handle specific roles in the development lifecycle:

- `orchestrator`: Coordinating multi-step technical delivery and planning.
- `implementation-lead`: Implementing scoped technical tasks and adding tests.
- `code-review`: Reviewing code changes for bugs, regressions, and risks.
- `ux-audit`: Strategic UX evaluation of workflows and pages.
- `issues-workflow`: Backlog management and ranked issue execution.

Invoke them using `invoke_agent("<name>", "...")` when following the `feature-development-loop` skill or when you need a specialized perspective.

## Tooling Notes

- Browser automation is not built in. Use browser or MCP tools only when the user has configured them in `~/.gemini/settings.json`.
- Project-scoped context belongs in this file or in additional markdown files under the repo. User-wide Gemini configuration belongs in `~/.gemini/settings.json` and is not stored in this repository.
- If browser automation, GitHub integration, or another MCP-backed workflow is required and not configured, ask the user to enable the needed server instead of improvising.
