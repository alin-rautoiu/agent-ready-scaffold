# Project Guidelines

## Project

- RevealJS presentation scaffold built with Vite, React, TypeScript, and `@revealjs/react`
- Deck root: `src/client/presentation/PresentationApp.tsx`
- Slide manifest: `src/client/presentation/slides/index.tsx`
- Theme layer: `src/client/presentation/theme/`

## Rules

- Plan the deck before implementing slides. Use the Deck Planner flow to populate `docs/deck-plan.md`.
- Keep Reveal config in the deck root.
- Keep slide ordering in the manifest.
- Use React slide modules, not Markdown-first authoring.
- Use `ThemedSlide` from `src/client/presentation/components/` as the slide wrapper so the deck-level theme applies.
- Replace placeholder assets before using the scaffold as a real talk.
- Re-run tests and PDF export after structural deck changes.
- Verify browser and per-theme rendering when layout or theme files change.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run export:pdf`
