# Deck Plan

<!--
Planning document for the deck. Agents read this BEFORE implementing slides.

This file is the "what to build" spec; the `revealjs-presentation-improvement`
skill is the "how to build" authority; `slides/index.tsx` is the implementation.

The Deck Planner agent creates and updates this file — either interactively or
by ingesting a PDF source. Run the `/plan-deck` slash command or invoke the
Deck Planner agent directly to start.
-->

## Deck metadata

- **Title**: <!-- TODO: e.g. "No energy transition without social transformation" -->
- **Theme**: <!-- TODO: theme-neon-dusk | theme-natural-light | theme-classical -->
- **Audience**: <!-- TODO: e.g. "Academic conference, mixed technical and humanities background" -->
- **Duration**: <!-- TODO: e.g. "25 min talk + 10 min Q&A" -->
- **Delivery mode**: <!-- TODO: live keynote | recorded | conference room | print handout -->
- **Source material**: <!-- TODO: path to PDF/DOCX or "interactive" if planned conversationally -->

## Outline

<!-- TODO: top-level beats the deck is organized around. Each beat can own one or more slides. -->

1. <!-- e.g. "Framing — the problem" -->
2. <!-- e.g. "Evidence — three cases" -->
3. <!-- e.g. "Synthesis — the pattern" -->
4. <!-- e.g. "Close — call to action" -->

## Open questions

<!-- Questions the user needs to answer or assets still missing. Keep this short and actionable. -->

- <!-- e.g. "Do we have a usable portrait of <name>, or is the placeholder acceptable for this audience?" -->

---

## Slides

<!--
Per-slide format. Copy the block below for each slide. `id` must match the
entry in `src/client/presentation/slides/index.tsx`. `Layout` should be one of
the named patterns documented in
`.claude/skills/revealjs-presentation-improvement/SKILL.md` (hero,
framed-argument, analysis-column, evidence-rail, vertical-stack, thesis-focal,
enumeration, theme-showcase).
-->

### Slide: <!-- TODO id, e.g. "title" -->

- **Layout**: <!-- TODO: hero | framed-argument | analysis-column | evidence-rail | vertical-stack | thesis-focal | enumeration | theme-showcase -->
- **Theme override**: <!-- Optional. e.g. "theme-classical" for a single archival slide. Omit to inherit deck default. -->
- **Title**: <!-- TODO -->
- **Subtitle / kicker**: <!-- Optional -->
- **Key message**: <!-- One sentence the slide must land -->
- **Body**:
  <!-- TODO: bullets, prose, code block, or quote. Mark fragment-staged content with "(fragment N)". -->
- **Stage directions**:
  <!-- TODO: pacing, fragment order, where to pause, what to emphasize verbally. -->
- **Speaker notes**:
  <!-- TODO: what the speaker says when this slide is on screen. -->
- **Assets**:
  <!-- TODO: portrait, diagram, chart, screenshot names. Mark `TODO(asset): <description>` for assets not yet sourced. -->
- **Citations**:
  <!-- TODO: attributions in `author, title, year, locator` form. The `Citation` component renders these inline. -->

### Slide: <!-- TODO next slide id -->

<!-- ... repeat per slide ... -->
