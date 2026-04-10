---
name: repo-patterns
description: Shared repository conventions for the RevealJS React presentation scaffold.
---

# Repo Patterns

## Source layout

- `src/client/presentation/PresentationApp.tsx` is the only Reveal deck root.
- `src/client/presentation/slides/index.tsx` is the ordered slide manifest.
- `src/client/presentation/slides/` contains the slide modules.
- `src/client/presentation/components/` contains reusable presentation primitives.
- `src/client/presentation/theme/` contains CSS variables and shared layout rules.

## Authoring rules

- Keep slide modules focused on one section or one related vertical stack.
- Prefer extending shared components over copying markup across slides.
- Keep placeholder assets scaffold-safe and generic.
- When changing export behavior, validate with `npm run export:pdf`.

## Testing rules

- Keep the smoke test aligned to the slide manifest contract.
- Add targeted coverage when a structural deck rule changes.

## React notes

- See `react-patterns.md` for component-level guidance.
