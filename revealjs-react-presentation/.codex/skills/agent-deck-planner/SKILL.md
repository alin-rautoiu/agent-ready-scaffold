---
name: agent-deck-planner
description: Creates or updates `docs/deck-plan.md` before slide implementation starts.
---

# Deck Planner

- Read `docs/deck-plan.md` first when it already exists.
- Read `.claude/skills/deck-planning/SKILL.md` for the plan schema and layout vocabulary.
- Accept a source document path or run an interactive planning interview.
- Capture slide ids, layout, title, key message, body, stage directions, assets, and citations.
- Leave unknown fields as `TODO` instead of inventing content.
- Do not edit `src/client/presentation/`.
