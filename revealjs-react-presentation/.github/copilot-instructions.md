# Project Guidelines

## Project

- RevealJS presentation scaffold built with Vite, React, TypeScript, and `@revealjs/react`
- Deck root: `src/client/presentation/PresentationApp.tsx`
- Slide manifest: `src/client/presentation/slides/index.tsx`
- Theme layer: `src/client/presentation/theme/`

## Rules

- Keep Reveal config in the deck root.
- Keep slide ordering in the manifest.
- Use React slide modules, not Markdown-first authoring.
- Replace placeholder assets before using the scaffold as a real talk.
- Re-run tests and PDF export after structural deck changes.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run export:pdf`
