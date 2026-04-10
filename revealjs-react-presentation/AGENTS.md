# Codex Repo Guide

This file is the Codex-facing equivalent of `CLAUDE.md`.

## Project

<!-- TODO: Describe the presentation project in 2-3 sentences. -->

- App type: RevealJS presentation scaffold built with Vite + React + TypeScript
- Deck root: `src/client/presentation/PresentationApp.tsx`
- Slide modules: `src/client/presentation/slides/`
- Shared presentation primitives: `src/client/presentation/components/`
- Tests: `tests/`

## Repository Identity

- Canonical GitHub repository: <!-- TODO: e.g.: `https://github.com/your-org/your-presentation-repo` -->
- Audience: <!-- TODO -->
- Export target: <!-- TODO: e.g.: "conference PDF handout", "speaker deck for live presentation", "static hosted deck" -->

## Working Rules

- Prefer TypeScript-first changes with explicit props and small components.
- Keep Reveal config centralized in `src/client/presentation/PresentationApp.tsx`.
- Use React slide modules, not Markdown-first deck authoring.
- Reuse shared slide primitives before creating one-off layout wrappers.
- Keep theme rules in `src/client/presentation/theme/`.
- Replace scaffold placeholder assets with verified media before final delivery.
- Preserve the slide manifest contract in `src/client/presentation/slides/index.tsx`.

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

Single test file:

```bash
npx vitest run tests/presentation-app.test.tsx
```

## Scripts

- Script entrypoints live in `scripts/` and are executed through npm scripts.
- `scripts/export-pdf.mjs` is the export automation source of truth.
- Keep script interfaces explicit and safe. Export scripts should validate preview readiness before opening a browser.

## Runtime and deployment

- Build output is static and can be hosted on any static file platform.
- The default local export path is `exports/presentation.pdf`.
- Notes policy: <!-- TODO -->
- Theme direction: <!-- TODO -->

## App-specific facts

- The deck root owns plugins and layout sizing.
- Slide order is controlled by `slides/index.tsx`.
- Placeholder assets are scaffold-safe only; production decks should document real asset provenance.
- The starter deck exists as an example implementation and should be replaced by the actual talk content.

## Testing patterns

- Smoke tests live in `tests/`.
- The baseline smoke test should keep verifying deck mount safety and manifest integrity.
- Run `npm run export:pdf` whenever export or print styles change.

## Environment

- Copy this scaffold and then fill the TODO fields in `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, and `DESIGN.md`.
- If `npm run export:pdf` fails because Chromium is unavailable, run `npm run setup:browsers`.

## Agent sync policy

Agent definitions live in four directories, one per runtime:

| Runtime | Path | Format |
| --- | --- | --- |
| Claude Code | `.claude/agents/*.md` | Canonical |
| GitHub Copilot | `.github/agents/*.agent.md` | Mirror |
| Codex | `.codex/skills/agent-*/SKILL.md` | Mirror |
| Gemini Code Assist | `GEMINI.md` + `.agents/workflows/*.md` | Mirror |

**Source of truth:** `.claude/agents/`. Keep mirrors semantically aligned after every edit.
