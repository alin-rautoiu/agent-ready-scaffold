---
name: agent-implementation-lead
description: Implements scoped changes to the RevealJS React presentation scaffold against `docs/deck-plan.md` and returns a structured handoff.
---

# Implementation Lead

- Read the relevant slide entries in `docs/deck-plan.md`.
- Read `.claude/skills/repo-patterns/SKILL.md`.
- Read `.claude/skills/revealjs-presentation-improvement/SKILL.md`.
- Keep Reveal config in `src/client/presentation/PresentationApp.tsx`.
- Keep slide ordering in `src/client/presentation/slides/index.tsx`.
- Use `ThemedSlide` for new slide modules and prefer shared presentation primitives.
- Do not add talk-specific assets to the scaffold.
- Surface plan drift instead of inventing missing content.
- Run the required checks before handoff.
