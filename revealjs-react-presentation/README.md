# RevealJS React Presentation Scaffold

Agent-ready scaffold for building presentation decks with `@revealjs/react`, Vite, React, and TypeScript.

This scaffold is for presentation authoring, not for a talk-specific repository snapshot. The starter deck demonstrates structure, pacing, theming, notes, and export flow with neutral content that should be replaced by the presentation author.

## What it provides

- A runnable Vite + React + TypeScript project
- A deck root that centralizes Reveal config and plugin registration
- A composable slide manifest under `src/client/presentation/slides/`
- Shared presentation primitives under `src/client/presentation/components/`
- A theme layer under `src/client/presentation/theme/`
- Speaker notes support through the Reveal Notes plugin
- A PDF export script built on the Reveal print flow and a headless browser
- Mirrored agent surfaces for Claude Code, GitHub Copilot, OpenAI Codex, and Gemini Code Assist

## Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local authoring server |
| `npm run build` | Build the static deck |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run TypeScript checks |
| `npm run test` | Run the smoke test suite |
| `npm run export:pdf` | Build and export `exports/presentation.pdf` |
| `npm run setup:browsers` | Install Chromium for Playwright if PDF export fails on a fresh machine |

## Authoring flow

1. Update the starter deck metadata and slide titles.
2. Replace or reorder modules in [slides/index.tsx](/c:/Workspace/agent-ready-scaffold/revealjs-react-presentation/src/client/presentation/slides/index.tsx).
3. Keep Reveal config in [PresentationApp.tsx](/c:/Workspace/agent-ready-scaffold/revealjs-react-presentation/src/client/presentation/PresentationApp.tsx) and keep slide content inside the slide modules.
4. Extend shared presentation primitives in [components](/c:/Workspace/agent-ready-scaffold/revealjs-react-presentation/src/client/presentation/components) before introducing ad hoc markup across many slides.
5. Adjust CSS variables and layout rules in [presentation.css](/c:/Workspace/agent-ready-scaffold/revealjs-react-presentation/src/client/presentation/theme/presentation.css).
6. Replace placeholder assets in [assets](/c:/Workspace/agent-ready-scaffold/revealjs-react-presentation/src/client/presentation/assets) with verified media.
7. Run `npm run test` and `npm run export:pdf` before treating the deck as ready for review.

## Speaker notes and export

- Notes are enabled through Reveal Notes. Add them per slide with the `notes` prop on `<Slide>`.
- During live authoring, Reveal's speaker notes window is available through the standard notes flow.
- `npm run export:pdf` builds the deck, starts a local preview server, opens `?print-pdf`, and writes the exported file to `exports/presentation.pdf`.
- If Playwright cannot launch Chromium yet, run `npm run setup:browsers` once and retry the export.

## Folder map

| Path | Purpose |
| --- | --- |
| `src/main.tsx` | Vite entrypoint |
| `src/client/presentation/PresentationApp.tsx` | Reveal deck root and config source of truth |
| `src/client/presentation/slides/` | Ordered slide modules |
| `src/client/presentation/components/` | Shared presentation primitives |
| `src/client/presentation/theme/` | Theme variables and deck styling |
| `src/client/presentation/assets/` | Scaffold-safe placeholder media |
| `tests/` | Smoke tests for deck rendering and manifest shape |
| `scripts/export-pdf.mjs` | Headless export workflow |
| `.claude/` | Canonical Claude Code surface |
| `.github/` | GitHub Copilot mirrors |
| `.codex/` | OpenAI Codex mirrors |
| `.agents/` | Gemini Code Assist mirrors |

## Customization checklist

- Fill the `<!-- TODO: -->` placeholders in [CLAUDE.md](/c:/Workspace/agent-ready-scaffold/revealjs-react-presentation/CLAUDE.md), [AGENTS.md](/c:/Workspace/agent-ready-scaffold/revealjs-react-presentation/AGENTS.md), [GEMINI.md](/c:/Workspace/agent-ready-scaffold/revealjs-react-presentation/GEMINI.md), and [DESIGN.md](/c:/Workspace/agent-ready-scaffold/revealjs-react-presentation/DESIGN.md).
- Replace the starter deck copy with the talk's actual narrative and evidence.
- Document real asset provenance once the deck stops using placeholder visuals.
- Update the issue tracker and repository identity fields if the scaffold is copied into a real project.
