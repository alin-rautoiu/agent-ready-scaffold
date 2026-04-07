# Scaffold Initialization — Step 2: Project Setup

If you have not read `INIT.md` yet, stop and read it first. It identifies which runtime you are, adapts the knowledge files accordingly, and provides runtime-specific notes for interpreting this file.

---

## Instructions

1. Ask the questions below. If your runtime supports interactive prompts, ask one group at a time and wait for answers. If running headlessly, present all questions at once and proceed when answers are provided.
2. Record every answer before starting any edits.
3. Work through the **Transformation** section in order. Mark each checkbox done before moving to the next.
4. Deliver a summary report (see TODO 12).
5. Delete both `INIT.md` and this file (see TODO 13).

---

## Questions

### Group 1 — Project identity

**Q0. New project or existing codebase?**
Choose one:

- **New** — no application code exists yet; this scaffold will be the starting point
- **Existing** — source code, configuration, or dependencies already exist; the agent configuration is being added to a live project

If **Existing**: work through TODO 0 before any other transformation step. Also choose Level 1 or 2 in Q12 — Level 3 does not apply to an existing codebase.

**Q1. Project name**
What will this project be called? This appears in file headings, documentation, and the Stack table.

**Q2. GitHub repository URL**
Where will this project be hosted? (e.g. `https://github.com/your-org/your-repo`)
If not yet created, provide the intended URL or write `TBD`.

**Q3. What kind of project are you building?**
e.g. SaaS web application, internal tooling, public REST API, mobile backend, CLI tool, data pipeline, e-commerce platform.
A sentence or two is enough.

---

### Group 2 — Technology stack

**Q4. Technology stack**
For each layer, state your chosen technology or write `TBD` if undecided:

| Layer | Your choice |
| --- | --- |
| Backend runtime + framework | |
| Database | |
| ORM / query builder | |
| Frontend framework | |
| Styling | |
| Data fetching | |
| Testing framework | |
| Authentication mechanism | |
| Email / notifications | |
| Scheduling / background jobs | |
| AI / LLM (if any) | |

**Q5. Primary development OS**
Windows, macOS, or Linux? This determines shell syntax (PowerShell vs Bash) in Copilot and Gemini agent instructions.

---

### Group 3 — Team and process

**Q6. Team size**
Solo / 2–5 / 6–15 / 15+

**Q7. Issue tracking**
Do you use an issue tracker? If yes, which one and what is the project URL or board key?
(e.g. GitHub Issues at `https://github.com/org/repo/issues`, Linear project `ENG`, Jira project `MYAPP`, none)

**Q8. AI coding agents in use**
Which agents will your team use? Check all that apply:
- Claude Code
- GitHub Copilot
- OpenAI Codex
- Gemini Code Assist

---

### Group 4 — Deployment and access

**Q9. Deployment target**
Where will this application run?
(e.g. Docker on a VPS, Railway, Fly.io, AWS ECS, Vercel + serverless, local development only)

**Q10. Authentication model**
What authentication pattern does your project need?
(e.g. username + password with JWT, session cookies, OAuth/SSO, API keys, magic links, none — fully public)
Include any role or permission requirements if known (e.g. admin / editor / viewer).

**Q11. Primary audience**
Who are the end users of this application?
(e.g. paying consumers, internal employees, other developers via API, the project owner only)
This shapes documentation depth, UX patterns, and what pages to scaffold.

---

### Group 5 — Scope

**Q12. Scaffolding depth**
Choose a level:

| Level | What it produces |
| --- | --- |
| **1 — Template cleanup** | Fill all `<!-- TODO: -->` placeholders in existing files. No new files created. |
| **2 — Project foundation** | Level 1 + populate the Stack table, flesh out DESIGN.md based on your answers, update agent conventions. |
| **3 — Ready to code** | Level 2 + create the initial source tree with stub files, a working `package.json` (or equivalent), `.env.example`, and one scaffolded vertical slice. Not available if Q0 is "Existing". |

**Q13. Existing requirements or design**
Do you already have requirements, a design document, user stories, or a feature list?
If yes, paste them here or describe the core feature set in as much detail as you have.
This is used to populate DESIGN.md and (at Level 3) to decide what the first vertical slice should be.

---

## Transformation

Work through each TODO in order. Mark each checkbox done before moving to the next.

---

### TODO 0 (Existing codebase only) — Survey existing conventions

Skip this TODO entirely if Q0 is "New".

Before filling any template placeholders, document what is already there. This ensures the agent files describe reality, not aspirations. Do not edit any scaffold files yet — only read and record.

- [ ] **Source tree** — read the top-level directory structure and each source subdirectory. Record the actual layout; you will use it to replace the template tree in DESIGN.md Section 2.2 during TODO 7.
- [ ] **Technology stack** — inspect `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, or equivalent. Record the actual stack as your answer to Q4 before working through TODO 2. Do not answer Q4 from intention — answer it from what is already installed.
- [ ] **Existing conventions** — read 3–5 source files representative of the current style (one route handler, one service or utility, one test). Note naming conventions, import style, error handling patterns, and test structure. Alongside each relevant convention placeholder in `fullstack-monorepo/CLAUDE.md`, add a `<!-- EXISTING: ... -->` comment recording what is already done. These conflicts between the template default and the existing pattern need a human decision: adopt the existing convention, adopt the template convention, or document both as accepted variants.
- [ ] **Existing agent config** — check whether a `CLAUDE.md`, `.github/copilot-instructions.md`, `GEMINI.md`, or similar instructions file already exists in the project root. If yes, read it. Decide whether to merge its content into the scaffold files or replace it. Do not silently discard existing agent instructions.
- [ ] **Environment variables** — check `.env`, `.env.example`, or any configuration documentation. Use the existing variable names for DESIGN.md Section 10.1 instead of deriving them from scratch.
- [ ] **Skip TODO 9** — source scaffolding does not apply to an existing codebase. Record this skip in the final report (TODO 11).

---

### TODO 1 — Fill project identity placeholders

Using answers to Q1, Q2, Q3, and Q13:

- [ ] `fullstack-monorepo/CLAUDE.md` — "About this project" description; "Repository Identity" repo URL
- [ ] `fullstack-monorepo/AGENTS.md` — "Project" section description and repo URL
- [ ] `fullstack-monorepo/GEMINI.md` — "Project" section description
- [ ] `fullstack-monorepo/DESIGN.md` — Section 1 heading (replace `<!-- TODO: Application name -->`) and Executive Summary body

---

### TODO 2 — Fill technology stack

Using answer to Q4:

- [ ] `fullstack-monorepo/README.md` — Stack table (fill every row; remove rows for layers not used)
- [ ] `fullstack-monorepo/CLAUDE.md` — Architecture section: Backend, Frontend, Data model, Database driver, Testing patterns subsections
- [ ] `fullstack-monorepo/AGENTS.md` — Working Rules (language/typing, styling, route naming, DB helper); Database Rules (schema source of truth, ORM helpers)
- [ ] `fullstack-monorepo/GEMINI.md` — Project and Working Rules sections
- [ ] `fullstack-monorepo/DESIGN.md` — Section 2.1 (Technology Stack) and Section 2.2 (Source Tree) — fill in the tech and adjust the tree to match the chosen framework's conventions
- [ ] `fullstack-monorepo/CLAUDE.md` — Code Style section: fill in the preferred-libraries TODO with the key library choices from Q4 and the alternatives agents should avoid; remove **Keep handlers thin** if the project has no HTTP handler layer; remove **Wire i18n from the first line of UI code** if Q4 lists no i18n or the project has no UI; in any kept bullet, replace generic framework terms with the chosen stack's actual names.

---

### TODO 3 — Fill OS and shell syntax

Using answer to Q5:

- [ ] `fullstack-monorepo/CLAUDE.md` — OS/shell note at the end of the Agent sync policy section
- [ ] `fullstack-monorepo/AGENTS.md` — OS/shell note at the end of the Agent sync policy section
- [ ] `fullstack-monorepo/GEMINI.md` — Runtime section
- [ ] `fullstack-monorepo/.github/agents/*.agent.md` — Verify all shell examples use the correct syntax (PowerShell for Windows; Bash for macOS/Linux)

If Windows: replace any Bash-specific examples (`&&`, `grep`, `/dev/null`) with PowerShell equivalents (`;`, `Select-String`, `$null`).

---

### TODO 4 — Fill commands

Using answers to Q4 and Q5:

- [ ] `fullstack-monorepo/CLAUDE.md` — Commands section (dev, build, start, test, db:generate, db:migrate, and any others relevant to the stack)
- [ ] `fullstack-monorepo/AGENTS.md` — Commands section
- [ ] `fullstack-monorepo/GEMINI.md` — Commands section

Derive standard commands from the chosen stack (e.g. `npm run dev`, `python -m uvicorn app:main --reload`, `go run ./cmd/server`). If Level 3, these must exactly match the scripts created in TODO 9.

---

### TODO 5 — Fill issue tracker reference

Using answer to Q7:

- [ ] `fullstack-monorepo/CLAUDE.md` — Repository Identity section
- [ ] `fullstack-monorepo/AGENTS.md` — Repository Identity section

If GitHub Issues: add the repo issues URL. If Linear: add the project key and URL. If Jira: add the project key. If none: remove the issue tracker placeholder entirely.

---

### TODO 6 — Configure agent surfaces

Using answers to Q8 and the canonical/mirror designations set in `INIT.md`:

**Confirm canonical designation:**

- [ ] Verify the canonical source header added in `INIT.md` is present in the primary runtime's config root. If missing, add it now.
- [ ] If Claude Code is not primary, verify the mirror note is present at the top of `fullstack-monorepo/CLAUDE.md`.

**Remove unused surfaces:**

For each runtime **not** listed in Q8, delete its directory. There is no value in maintaining config files for tools nobody on the team runs.

- Claude Code not in Q8: delete `fullstack-monorepo/.claude/` entirely.
- GitHub Copilot not in Q8: delete `fullstack-monorepo/.github/agents/`. Keep `fullstack-monorepo/.github/workflows/` if CI/CD is configured there.
- OpenAI Codex not in Q8: delete `fullstack-monorepo/.codex/`.
- Gemini Code Assist not in Q8: delete `fullstack-monorepo/.agents/` and remove `fullstack-monorepo/GEMINI.md`.

**Verify active surfaces:**

- [ ] For each runtime listed in Q8 as **in use**, verify its config reflects the conventions filled in by TODOs 1–4.
- [ ] If multiple runtimes are in use, update the canonical surface's README or header to list which mirror surfaces need to be kept in sync after future edits.

---

### TODO 7 — Populate DESIGN.md

Using answers to Q3, Q4, Q9, Q10, Q11, Q13:

Always fill:
- [ ] Section 1 (Executive Summary) — project name, what it does, who uses it, 3–5 key capabilities
- [ ] Section 2.1 (Technology Stack) — already done in TODO 2; verify consistency
- [ ] Section 10.1 (Required Environment Variables) — list variables for the chosen stack (database connection, JWT secret, SMTP, API keys, app URL, port)
- [ ] Section 12 (Deployment) — local dev commands from TODO 4; deployment target from Q9; note any tunnel or reverse proxy setup

Fill from requirements (Q13) if provided:
- [ ] Section 3 (Data Model) — stub out the main entities with their fields
- [ ] Section 4 (Core Features) — list the major feature areas with brief descriptions
- [ ] Section 5 (REST API) — stub out the route groups with method/endpoint tables
- [ ] Section 6 (Frontend Pages) — list public and authenticated pages
- [ ] Section 9 (Authentication) — describe the auth mechanism (Q10), public routes, and role model
- [ ] Section 13 (Key Design Decisions) — record the most important choices made during initialization and why

Leave as-is (still TODO) if no requirements were provided:
- Sections 7, 8, 11

---

### TODO 8 — Apply authentication conventions

Using answer to Q10:

- [ ] `fullstack-monorepo/CLAUDE.md` — Data model key points: note soft-delete or audit patterns if authentication involves user records
- [ ] `fullstack-monorepo/DESIGN.md` — Section 9 (Authentication): fill in the chosen mechanism, public routes, and role/permission structure
- [ ] If the project has no authentication (fully public), remove auth-related placeholders from CLAUDE.md, AGENTS.md, and DESIGN.md

---

### TODO 9 (Level 3 only) — Create initial source structure

Skip this TODO entirely if the user chose Level 1 or Level 2, or if Q0 is "Existing".

Using answers to Q4 and Q13:

- [ ] Create `src/server/` with: entry point, app factory, one stub route file for the first resource derived from Q13
- [ ] Create `src/client/` with: index file, main component stub, router stub (if applicable)
- [ ] Create `src/shared/` with: a types file exporting at least one shared type
- [ ] Create `tests/helpers/` with: stub test database helper and stub test server helper
- [ ] Create `package.json` (or `pyproject.toml`, `go.mod`, etc.) with the exact scripts from TODO 4
- [ ] Create `.env.example` with all environment variables from DESIGN.md Section 10.1, with placeholder values and comments
- [ ] Create a stub database schema file at the path specified in CLAUDE.md

Created files should be minimal: correct imports, empty exports, and a one-line comment explaining the file's role. No business logic.

---

### TODO 10 — Scale conventions (conditional)

Skip if team size from Q6 is Solo or 2–5.

For teams of 6 or more:
- [ ] `fullstack-monorepo/CLAUDE.md` — Conventions section: add a note about using the issue tracker for backlog management and requiring linked issues on PRs
- [ ] `fullstack-monorepo/.claude/agents/README.md` — verify the Orchestrator → Implementation Lead → Code Review loop is referenced and the agent routing makes sense for the team's workflow

---

### TODO 11 — Generate scaffold check script

Read `fullstack-monorepo/docs/scaffold-check.md` for the complete specification: language-selection matrix, scanning scope, tier definitions, output contract, exit-code rules, and verification criteria. That file is the single source of truth — use it directly as the input when generating or regenerating the script.

- [ ] Read `fullstack-monorepo/docs/scaffold-check.md`, choose a language, and write `fullstack-monorepo/scripts/check-scaffold.{ext}`
- [ ] Run the script and confirm it passes the verification criteria in the spec
- [ ] Note the chosen run command in the final report (TODO 12) so the user can re-run it after future edits

---

### TODO 12 — Final scan and report

- [ ] Search all modified files for remaining `<!-- TODO` strings. List every unresolved placeholder and why it could not be filled from the provided answers.
- [ ] Confirm the Stack table in `fullstack-monorepo/README.md` has no empty rows for layers that were answered in Q4.
- [ ] If Level 2 or 3: confirm DESIGN.md Section 1 reads as a coherent project description, not a template fragment.
- [ ] If Level 3: list every file created and confirm `.env.example` covers every variable referenced in the source stubs.
- [ ] If Q0 is "Existing": confirm DESIGN.md Section 2.2 reflects the actual source tree (not the template tree), and list any `<!-- EXISTING: ... -->` convention conflicts that still need a human decision.

Report to the user:
1. What was filled in and from which answer
2. What remains as TODO and what information is still needed
3. (Level 3 only) The full list of created files

---

### TODO 13 — Teardown

- [ ] Delete `INIT.md`.
- [ ] Delete this file (`INIT-SCAFFOLD.md`).
