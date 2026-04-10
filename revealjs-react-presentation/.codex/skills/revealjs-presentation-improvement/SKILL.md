---
name: revealjs-presentation-improvement
description: Improves the RevealJS React presentation scaffold with readability, rendering, and export checks.
---

# RevealJS Presentation Improvement

- Preserve the React slide-module authoring model.
- Keep the deck root centralized in `PresentationApp.tsx`.
- Keep slide ordering in `slides/index.tsx`.
- Split overloaded slides before shrinking typography globally.
- Re-run `npm run test` and `npm run export:pdf` after structural changes.
- See `.claude/skills/revealjs-presentation-improvement/REVEALJS_REACT_API.md` for the wrapper reference.
