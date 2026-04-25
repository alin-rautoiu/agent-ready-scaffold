---
name: deck-planning
description: (Gemini) Provides the schema and vocabulary for creating or updating docs/deck-plan.md.
---

# Deck Planning

`docs/deck-plan.md` is the deck spec that upstreams slide implementation.

Each slide section should capture:

- `id`
- `Layout`
- `Theme override` when needed
- `Title`
- `Subtitle / kicker`
- `Key message`
- `Body`
- `Stage directions`
- `Speaker notes`
- `Assets`
- `Citations`

Valid layout values:

- `hero`
- `framed-argument`
- `analysis-column`
- `evidence-rail`
- `vertical-stack`
- `thesis-focal`
- `enumeration`
- `theme-showcase`

Rules:

- Keep slide ids stable once implemented.
- Leave unknown content as `TODO` instead of inventing it.
- Preserve direct quotations verbatim.
- Do not edit `src/client/presentation/`.
