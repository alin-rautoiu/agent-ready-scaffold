---
name: revealjs-presentation-improvement
description: Improves the RevealJS React presentation scaffold with strict readability, rendering, and export checks.
---

# RevealJS Presentation Improvement Skill

Use this skill when editing the deck in `src/client/presentation/`.

## Source of truth priority

When guidance conflicts, decide in this order:

1. The user's current brief and audience requirements
2. The scaffold's authoring contract in `PresentationApp.tsx`, `slides/index.tsx`, and the shared components
3. The current state of the slide implementation

## Scope

- Improve clarity, pacing, and readability
- Preserve the React slide-module authoring model
- Fix rendering and export regressions without flattening the visual hierarchy
- Keep the scaffold free of talk-specific or anecdotal assets

## Non-negotiable rules

1. Keep the deck root centralized in `PresentationApp.tsx`.
2. Keep slide ordering in `slides/index.tsx`.
3. Optimize every slide for scanability in the first viewport.
4. Split overloaded slides before shrinking typography globally.
5. Keep narrow viewport behavior and PDF export usable.
6. Do not fabricate or import unverified evidence media into the scaffold.

## RevealJS affordances

- Use fragments to pace an argument, not to decorate it.
- Use vertical `Stack` groups when a single section needs multiple beats.
- Keep code blocks short and use the `Code` helper for stable highlighting.
- Use auto-animate only when two adjacent slides represent the same idea changing state.

## React integration

Full API reference for `@revealjs/react` lives in `REVEALJS_REACT_API.md`.

- Use `Deck`, `Slide`, `Stack`, `Fragment`, and `Code` as the default primitives.
- Keep plugins explicit and registered at the deck root.
- Do not reintroduce manual Reveal initialization.

## Current scaffold baseline

- Deck config is centralized in `src/client/presentation/PresentationApp.tsx`.
- Slide ordering is centralized in `src/client/presentation/slides/index.tsx`.
- Shared shell components live in `src/client/presentation/components/`.
- Theme tokens live in `src/client/presentation/theme/presentation.css`.
- The starter deck is an example implementation, not a product requirement.

## Recommended content pattern per slide

- Clear title
- One key message
- One primary layout pattern
- Optional notes for live delivery

## Quality gates

- Density Gate:
  - No slide should require reading more than one dense code block plus one dense bullet list at the same time.
- Rendering Gate:
  - No text clipping at common presentation sizes.
  - No unusable code blocks.
- Migration Intent Gate:
  - No manual Reveal initialization.
  - `Deck` remains the single source of Reveal config and plugin registration.

## Fast checklist

- Update slide modules before touching deck config.
- Default to `@revealjs/react` primitives.
- Prefer splitting slides over shrinking global typography.
- Re-run `npm run test` and `npm run export:pdf` after structural changes.
