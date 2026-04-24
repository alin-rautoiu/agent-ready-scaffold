---
name: revealjs-presentation-improvement
description: Improves the RevealJS React presentation scaffold with a stronger visual system, theme-aware slides, and export checks.
---

# RevealJS Presentation Improvement

- Treat `docs/deck-plan.md` as the spec for what to build.
- Preserve the React slide-module authoring model.
- Keep the deck root centralized in `PresentationApp.tsx`.
- Keep slide ordering in `slides/index.tsx`.
- Use `ThemedSlide` as the slide wrapper so the deck-level theme applies.
- Prefer shared presentation primitives before inventing slide-local markup.
- Keep all shipped themes usable: `theme-neon-dusk`, `theme-natural-light`, and `theme-classical`.
- Give each slide a clear visual anchor and layout identity.
- Split overloaded slides before shrinking typography globally.
- Re-run `npm run test` and `npm run export:pdf` after structural changes.
- See `.claude/skills/revealjs-presentation-improvement/REVEALJS_REACT_API.md` for the wrapper reference.
