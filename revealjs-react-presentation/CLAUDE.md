# CLAUDE.md

This file provides guidance to Claude Code when working with this presentation scaffold.

## About this project

<!-- TODO: Describe the presentation in 2-3 sentences.
e.g.: "Presentation deck for explaining an internal platform migration to engineering leadership. The deck combines narrative slides, code snippets, and visual comparisons for a mixed technical audience." -->

## Repository Identity

- Canonical GitHub repository: <!-- TODO: e.g.: `https://github.com/your-org/your-presentation-repo` -->
- Primary audience: <!-- TODO: e.g.: "conference attendees", "internal engineering team", "executive review" -->
- Notes policy: <!-- TODO: e.g.: "Every slide should carry speaker notes for live delivery." -->
- Asset provenance rule: <!-- TODO: e.g.: "Every non-placeholder image must have a source note in `assets/provenance.md`." -->

## Code Style

- TypeScript first. Keep components small, typed, and explicit.
- The Reveal deck root lives in `src/client/presentation/PresentationApp.tsx`. Do not spread Reveal config across slide files.
- Author slides as React modules in `src/client/presentation/slides/`. Do not switch to Markdown-first authoring for this scaffold.
- Shared layout primitives belong in `src/client/presentation/components/`.
- Theme tokens and reusable layout rules belong in `src/client/presentation/theme/`.
- Use placeholder assets only in the scaffold. Production decks should replace them with verified media and documented provenance.
- Keep the first viewport readable: title, one key message, and a small number of primary bullets before navigation.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run typecheck
npm run test
npm run export:pdf
npm run setup:browsers
```

Run a single test file:

```bash
npx vitest run tests/presentation-app.test.tsx
```

## Architecture

**Single-package presentation app with a fixed authoring contract.**

```text
src/main.tsx                               Vite entrypoint
src/client/presentation/PresentationApp.tsx  Deck root and Reveal config
src/client/presentation/slides/            Ordered slide modules
src/client/presentation/components/        Shared slide primitives
src/client/presentation/theme/             CSS variables and layout rules
src/client/presentation/assets/            Placeholder media only
tests/                                     Smoke tests
scripts/                                   Export automation
```

### Deck root

- `PresentationApp.tsx` owns Reveal plugins, sizing, and navigation configuration.
- Slide ordering comes only from `slides/index.tsx`.
- Slide modules may define slide-level props such as `notes`, but they should not initialize Reveal or register plugins.

### Slide modules

- Each module should communicate one section or one grouped stack.
- Use `Stack` for vertical narratives and `Fragment` for paced disclosure.
- Keep code examples in `Code` blocks so syntax highlighting stays stable.

### Theme layer

- CSS variables are the source of truth for palette, typography, and spacing.
- Prefer extending shared layout classes before creating slide-specific CSS.
- Theme direction: <!-- TODO: describe the visual system you want this deck to follow. -->

### Assets

- Placeholder assets live in `src/client/presentation/assets/`.
- Add a provenance note when the deck starts using real screenshots, diagrams, or external imagery.

## Testing patterns

- Smoke tests live in `tests/`.
- `tests/presentation-app.test.tsx` should continue to verify that the starter deck mounts and that the slide manifest keeps the expected shape.
- Export validation happens through `npm run export:pdf`.

## Agent sync policy

Agent definitions live in four directories, one per coding-assistant runtime:

| Runtime | Path | Format |
| --- | --- | --- |
| Claude Code | `.claude/agents/*.md` | Canonical source of truth |
| GitHub Copilot | `.github/agents/*.agent.md` | VS Code mirror |
| Codex | `.codex/skills/agent-*/SKILL.md` | Codex skill mirror |
| Gemini Code Assist | `GEMINI.md` + `.agents/workflows/*.md` | Gemini mirror |

**Source of truth:** `.claude/agents/`. When an agent changes, propagate the same behavior to the other runtime surfaces and keep tool references aligned to the target runtime.

## Planning workflow

The scaffold separates "what to build" (the plan) from "how to build" (the skills) and "what is built" (the slide modules).

1. **Plan** — `docs/deck-plan.md` is the spec. Generate or update it with the **Deck Planner** agent or the `/plan-deck` slash command. Inputs: a PDF source, a markdown source, or interactive Q&A.
2. **Implement** — the **Orchestrator** reads the plan and delegates slides to the **Implementation Lead**, which maps plan entries to slide modules under `src/client/presentation/slides/`.
3. **Review** — **Code Review** and **UX Audit** verify that implementation matches the plan and meets the visual bar. Plan drift is surfaced, not silently reconciled.

Do not start slide implementation without a plan entry for the target slide. If the plan is wrong, update the plan first.

## Specialized workflows

- Deck planning schema and source-ingestion: `.claude/skills/deck-planning/SKILL.md`
- Reveal authoring guidance: `.claude/skills/revealjs-presentation-improvement/SKILL.md`
- Shared repo conventions: `.claude/skills/repo-patterns/SKILL.md`
- Browser automation for visual QA: `.claude/skills/playwright-cli/SKILL.md`
