---
description: Start or update the deck plan by invoking the Deck Planner agent.
---

Invoke the Deck Planner agent to create or update `docs/deck-plan.md`.

If the user supplied a PDF, DOCX, or markdown path in `$ARGUMENTS`, treat that as the source material. If no argument was given, start an interactive planning conversation.

Before writing anything, the Deck Planner should:

1. Read `.claude/skills/deck-planning/SKILL.md` for the plan schema and layout vocabulary.
2. Read `docs/deck-plan.md` if it already exists.
3. Confirm scope with the user — create, extend, or revise.

Do not touch `src/client/presentation/` during this command. The `/plan-deck` command produces a spec; implementation belongs to the Orchestrator → Implementation Lead → Review loop afterwards.

Arguments: `$ARGUMENTS`
