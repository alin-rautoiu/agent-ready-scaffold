---
name: repo-patterns
description: Shared repository conventions for the RevealJS React presentation scaffold.
---

# Repo Patterns

- `src/client/presentation/PresentationApp.tsx` is the only Reveal deck root.
- `src/client/presentation/slides/index.tsx` is the ordered slide manifest.
- Reusable presentation primitives live in `src/client/presentation/components/`.
- Theme variables and shared layout rules live in `src/client/presentation/theme/`.
- Validate export behavior with `npm run export:pdf`.
