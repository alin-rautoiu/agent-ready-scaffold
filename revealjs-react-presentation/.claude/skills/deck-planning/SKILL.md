---
name: deck-planning
description: Knowledge layer for producing and maintaining `docs/deck-plan.md` — the human-readable deck spec that upstream of slide implementation.
---

# Deck Planning Skill

Use this skill when creating or updating `docs/deck-plan.md`. This document is the "what to build" spec. `revealjs-presentation-improvement` is the "how to build" authority. `src/client/presentation/slides/index.tsx` is the implementation.

## Plan schema

Every plan has:

- **Deck metadata** — title, theme, audience, duration, delivery mode, source material.
- **Outline** — the top-level narrative beats the deck is organized around.
- **Open questions** — blocking items for the user or for asset sourcing.
- **Slides** — one section per slide, in delivery order.

Per slide (one `### Slide: <id>` section per slide):

| Field | Required? | Notes |
| --- | --- | --- |
| `id` | Yes | Must match the entry in `slides/index.tsx` when implemented. |
| `Layout` | Yes | One of the named patterns (see below). |
| `Theme override` | No | Only when a slide diverges from the deck default. |
| `Title` | Yes | The slide's visible title. |
| `Subtitle / kicker` | No | Used by `SlideFrame` kicker or `DeckShell` eyebrow. |
| `Key message` | Yes | One sentence the slide must land. |
| `Body` | Yes | Bullets, prose, quote, or code block. Mark fragment-staged items with `(fragment N)`. |
| `Stage directions` | No | Pacing, fragment order, emphasis beats, transitions. |
| `Speaker notes` | No | What the speaker says while the slide is on screen. |
| `Assets` | No | Named portraits, diagrams, charts. `TODO(asset): <desc>` for items not yet sourced. |
| `Citations` | No | Attributions in `author, title, year, locator` form. |

## Layout vocabulary

These values are valid for the `Layout` field. Each maps to a pattern documented in `.claude/skills/revealjs-presentation-improvement/SKILL.md`.

| Layout | When to use | Scaffold components |
| --- | --- | --- |
| `hero` | Title, closing, or single-message slide | `DeckShell` + optional `hero-strip` |
| `framed-argument` | Default wrapper for a single argument slide | `SlideFrame` with kicker / title / key message / body |
| `analysis-column` | Two-column setup / payoff | `SlideFrame` + `card-grid card-grid--two` |
| `evidence-rail` | Horizontal strip of cards, portraits, or compact figures under a thesis | `SlideFrame` + horizontal card row |
| `vertical-stack` | Setup → quote → thesis → paced fragments | Reveal `Stack` with multiple `ThemedSlide` children |
| `thesis-focal` | Claim the slide _is_ the argument | `ThesisCard` + fragment `FocalSentence` |
| `enumeration` | Sequenced exhibits that advance with fragments | `EnumerationStack` |
| `theme-showcase` | Per-slide theme override demo | Reveal `Stack` with `ThemedSlide theme="…"` per child |

## Stage-directions vocabulary

Use these labels in the `Stage directions` field so the implementation-lead can map them to fragments and pacing primitives.

- **pause** — expect the speaker to pause before advancing. No code implication; purely a note.
- **build: <label>** — a fragment reveal. Label maps to content inside the slide (e.g., "build: speaker card").
- **dim: <prior block>** — fade a previously revealed block once focus moves on. Map to `DimGroup` with `dimAt`.
- **emphasize: <phrase>** — inline emphasis via `Emph` or `FocalSentence`.
- **transition: <type>** — a deliberate transition (slide-change, theme-change, mood shift).
- **demo: <target>** — the speaker demonstrates something off-slide. Note the expected duration.
- **Q-pause** — speaker poses a question and waits for audience reaction.

## Ingesting source material

The Deck Planner agent reads `docs/deck-plan.md` inputs from one of:

1. **PDF** — use the Read tool. For decks longer than 10 pages, read in ranges. Extract: section headers (slide boundaries), direct quotations (→ `QuotedFigure` candidates), numbered or bulleted lists (→ card grids), figures with captions (→ assets).
2. **DOCX** — convert to text first. If `pandoc` is on `PATH`, run `pandoc input.docx -o /tmp/source.md` and read the markdown. If `pandoc` is not installed, stop and ask the user to provide a converted copy or install pandoc.
3. **Markdown / plain text** — Read directly.
4. **Interactive** — no source file. Interview the user.

### Interview order (interactive or to fill gaps)

1. Deck metadata: title, audience, duration, delivery mode.
2. Theme preference (show the three options; default `theme-neon-dusk`).
3. Outline: the top-level beats.
4. Per beat: how many slides and what each needs to do.
5. Per slide: title, key message, layout, fragment order, citations, assets.

Always confirm layout choices before writing. Use `AskUserQuestion` for narrow A/B/C choices; prose questions for open-ended content.

## Extraction heuristics (PDF / DOCX)

- A top-level heading (`H1`, "Chapter N") → section break slide or theme change.
- A subsection heading (`H2`, `H3`) → candidate slide boundary.
- A block quote → candidate `QuotedFigure` with speaker + source derived from surrounding context.
- A numbered list with 3–5 items → candidate `card-grid card-grid--three` or `EnumerationStack`.
- A figure with caption → candidate asset entry; note the caption as a potential speaker note.
- A table → almost always needs splitting across slides; surface it as an open question rather than inlining.

## Rules

- Do not fabricate citations, attributions, or speaker notes. Mark missing information as `TODO` so downstream agents see it.
- Preserve direct quotations verbatim. Paraphrased quotes in the plan become paraphrased quotes in the slides; silent paraphrasing loses fidelity.
- When a field is genuinely unknown, leave the placeholder and add the question to the deck's `Open questions` list.
- Do not touch `src/client/presentation/`. The plan is a spec, not an implementation.
- Keep slide `id` values stable once an implemented slide exists under that id. Renaming an `id` breaks the link between plan and manifest.

## Handoff expectations

After a planning pass, the Deck Planner should tell the Orchestrator:

- Which slides are ready to implement (no `TODO` blockers).
- Which slides are partially specified (call out specific missing fields).
- Which slides the user still needs to answer questions about.
- Which assets are still missing.
