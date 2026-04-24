---
name: revealjs-presentation-improvement
description: Improves the RevealJS React presentation scaffold with a deliberate visual system, layout discipline, and strict readability, rendering, and export checks.
---

# RevealJS Presentation Improvement Skill

Use this skill when editing the deck in `src/client/presentation/`.

## Source of truth priority

When guidance conflicts, decide in this order:

1. The user's current brief and audience requirements.
2. The scaffold's authoring contract in `PresentationApp.tsx`, `slides/index.tsx`, and the shared components under `components/`.
3. The current state of the slide implementation.

## Scope

- Improve clarity, pacing, and readability.
- Improve the visual system so the deck feels designed, not merely formatted.
- Preserve the React slide-module authoring model.
- Fix rendering and export regressions without flattening the visual hierarchy.
- Keep the scaffold free of talk-specific or anecdotal assets.

## Non-negotiable rules

1. Keep the deck root centralized in `PresentationApp.tsx`.
2. Keep slide ordering in `slides/index.tsx`.
3. Use `ThemedSlide` from `components/` as the slide wrapper; never apply hardcoded theme classes through `@revealjs/react`'s `<Slide>`.
4. Optimize every slide for scanability in the first viewport.
5. Split overloaded slides before shrinking typography globally.
6. Keep narrow viewport behavior and PDF export usable.
7. Do not fabricate or import unverified evidence media into the scaffold.
8. Do not regress the deck into generic title-plus-bullets slides.

## Visual system

- Choose a palette with one dominant tone, one or two supporting tones, and one high-contrast accent. Do not assign equal visual weight to every color.
- Commit to one repeated motif across the deck — citation chips, boxed callouts, framed visuals, or a recurring border treatment — so the audience recognizes the deck's language.
- Prefer a deliberate light/dark structure across the talk:
  - Light content slides with darker section-break or conclusion slides is a strong default.
  - A fully dark deck is acceptable if contrast remains excellent in browser and PDF export.
- Every slide needs a visual anchor: chart, image, quote treatment, diagram, timeline, comparison frame, or stat callout.
- If a slide has only text, treat that as a problem to solve unless the slide is intentionally sparse for emphasis.
- When switching themes for a particular slide, use the `theme` prop on `ThemedSlide`. Do not inline the theme class string in `<Slide>`.

## Typography

- Prefer an intentional title / body pairing over generic system typography. The scaffold ships Cormorant Garamond, Manrope, Montserrat, and Space Grotesk so themes can choose.
- Maintain strong size contrast:
  - titles should read as titles immediately;
  - section labels and captions should be visibly subordinate;
  - dense body copy should stay rare and readable.
- Keep line lengths controlled. Wide Reveal canvases make overlong text blocks especially weak.
- Use italic or accent styling sparingly for emphasis. The `Emph` component exposes tones (`primary | accent | muted`) — do not turn every highlight into a new style.
- Do not solve density problems by shrinking all text globally.

## Layout and composition

- Default to one dominant composition per slide:
  - text plus visual split;
  - comparison columns;
  - timeline or process flow;
  - grid of compact evidence blocks;
  - large-number callout with short supporting text;
  - full-bleed or half-bleed visual with restrained overlay copy.
- Vary layout patterns across adjacent slides so the deck does not feel templated, while keeping the same palette and motif.
- Left-align paragraphs, bullets, captions, and evidence blocks. Center only titles, isolated quotes, or large numeric callouts when the composition clearly supports it.
- Preserve generous outer margins and consistent internal spacing. As a working default, prefer roughly `48-64px` outer padding and `24-40px` gaps between major blocks.
- Build obvious visual dominance into each slide. One element leads; supporting elements follow.
- Split content into a second slide when spacing or hierarchy starts to collapse.

Named patterns to reach for (CSS implementations live in `theme/presentation.css` and per-theme files):

- **Hero** — `DeckShell` with `hero-strip` metadata.
- **Framed argument** — `SlideFrame` with kicker, title, key message, and body; default wrapper for most slides.
- **analysis-column** — two-column setup / payoff. Left column stages evidence, right column lands the claim.
- **Vertical stack progression** — setup line → quote or evidence → thesis → paced fragments. One module returns a Reveal `Stack`.
- **evidence-rail** — horizontal strip of cards, portraits, or compact figures under a thesis or focal sentence; good for comparative enumerations.
- **Thesis + focal sentence** — `ThesisCard` paired with a fragment-revealed `FocalSentence` to land the argument after supporting beats.
- **Enumeration** — `EnumerationStack` for sequenced exhibits that advance with fragments while earlier items recede.

## RevealJS affordances

- Use fragments to pace an argument, not to decorate it.
- Use vertical `Stack` groups when a single section needs multiple beats.
- Keep code blocks short and use the `Code` helper for stable highlighting.
- Use auto-animate only when two adjacent slides represent the same idea changing state.

## React integration

Full API reference for `@revealjs/react` lives in `REVEALJS_REACT_API.md`.

- Use `ThemedSlide` (from `components/`) as the slide wrapper. Use `Stack`, `Fragment`, and `Code` from `@revealjs/react` directly.
- Keep plugins explicit and registered at the deck root.
- Do not reintroduce manual Reveal initialization.

## Canonical slide wrapper

- `ThemedSlide` applies the deck-level theme class (from `DeckThemeContext`) to its underlying `<Slide>`. Without it, theme CSS under `.theme-*` selectors does not cascade.
- Override per slide with `<ThemedSlide theme="theme-classical">`. The override wins by CSS specificity against the default, so the same deck can mix themes slide-by-slide.
- Read the active theme with `useDeckTheme()` only when a component genuinely needs to branch on it. Composition via CSS classes is the primary mechanism.

## Shared components

Documented in `repo-patterns/SKILL.md`. Key touchpoints when improving a slide:

- `SlideFrame` — `density="compact"` when a slide already carries multiple elements; `headerAddon` for pacing strips or mini-timelines.
- `DeckShell` — `subtitle` is `ReactNode`, use `subtitleSecondary` for a secondary credit line.
- `Citation`, `Emph`, `FocalSentence` — inline and block emphasis. Same tone set (`primary | accent | muted`) across `Emph` and `FocalSentence`.
- `ThesisCard` — a commitment, not filler. Use when the slide _is_ the claim.
- `QuotedFigure` — speaker and portrait framing. Variants: `--safe` (narrower preset for in-card use), `--centered`. Reveal props: `quoteReveal`, `speakerReveal`, `portraitReveal` with `match-speaker` default.
- `EnumerationStack` — stacked image list with fragment reveal. Supports `header`, `cover`, and `portrait` kinds.
- `DimGroup` — dims a group once a later fragment with index `dimAt` fires. Use sparingly, to push prior beats back once the focus has moved.

## Themes

Three themes ship:

- `theme-neon-dusk` — dark indigo with cyan and amber accents. Evening / keynote default.
- `theme-natural-light` — warm cream with moss accents. Essayistic long-form.
- `theme-classical` — paper background with rust accent. Archival / reference-heavy.

Switch the deck default by passing `theme` to `PresentationApp`. Compose per-slide by passing `theme` to `ThemedSlide`. Every shipped theme should remain usable in both browser and PDF export.

## Current scaffold baseline

- Deck config is centralized in `src/client/presentation/PresentationApp.tsx`.
- Slide ordering is centralized in `src/client/presentation/slides/index.tsx`.
- Shared components live in `src/client/presentation/components/`.
- Theme tokens live in `src/client/presentation/theme/presentation.css`; per-theme overrides in sibling files.
- The starter deck is an example implementation, not a product requirement.

## Recommended content pattern per slide

- Clear title.
- One key message.
- One primary layout pattern.
- Relevant citation, quote, or visual anchor when needed.
- Optional notes for live delivery.

## Quality gates

- **Density gate** — no slide should require reading more than one dense code block plus one dense bullet list at the same time.
- **Rendering gate** — no text clipping at common presentation sizes; no unusable code blocks.
- **Visual design gate** — each slide has a visible layout identity and a clear visual anchor; the palette, motif, and contrast feel intentional.
- **Spacing gate** — major blocks keep consistent gaps; nothing crowds slide edges or citations.
- **Per-theme gate** — run the deck under each shipped theme (`theme-neon-dusk`, `theme-natural-light`, `theme-classical`) to confirm contrast, clipping, and motif continuity.
- **Migration intent gate** — no manual Reveal initialization; `Deck` remains the single source of Reveal config and plugin registration; slide modules use `ThemedSlide`.

## QA workflow

Assume the first render has defects.

1. Export and inspect slides visually after non-trivial layout or theme changes.
2. Look specifically for:
   - text clipping or overflow;
   - wrapped titles that break the intended composition;
   - overlapping fragments or citations;
   - weak contrast in browser and PDF output;
   - uneven spacing, misaligned columns, or cards drifting off rhythm;
   - slides that reverted to plain text with no visual anchor.
3. Before handoff: `npm run typecheck`, `npm run test`, `npm run export:pdf`, a browser visual check, and a narrow-viewport spot-check.
4. Complete at least one fix-and-verify loop before considering the slide stable.

## Avoid

- Repeating the same layout on every slide.
- Centering body text or long lists.
- Default blue-on-white styling when the topic calls for something more specific.
- Low-contrast text, icons, or source labels.
- Decorative accent lines under titles.
- One "designed" slide surrounded by plain filler slides.
- Cramped edges, uneven gaps, or cards that nearly touch.
- Placeholder visuals, unlabeled diagrams, or vague decorative imagery in a deck being readied for delivery.

## Fast checklist

- Update slide modules before touching deck config.
- Default to `@revealjs/react` primitives; `ThemedSlide` as the slide wrapper.
- Ask whether each slide has a distinct visual anchor and layout identity.
- Use theme tokens and shared components before adding one-off per-slide decoration.
- Prefer splitting slides over shrinking global typography.
- Check contrast, spacing rhythm, and layout variation across adjacent slides.
- Re-run `npm run test` and `npm run export:pdf` after structural changes.

## Reference implementations

Study these for concrete patterns before adding a similar slide.

- `slides/TitleSlide.tsx` — hero layout with `DeckShell`, `subtitleSecondary`, and inline `Emph`.
- `slides/AgendaSlide.tsx` — two-column card grid with `Citation` and `ListItemWithSubs`.
- `slides/StackExampleSlides.tsx` — Reveal `Stack` with three children; last demos `DimGroup`.
- `slides/FragmentExampleSlide.tsx` — side-by-side `QuotedFigure` with static vs progressive attribution; ends with a fragment `FocalSentence`.
- `slides/EnumerationExampleSlide.tsx` — `EnumerationStack` with staged fragment reveal.
- `slides/ThesisExampleSlide.tsx` — `ThesisCard` paired with a fragment `FocalSentence`.
- `slides/ThemeShowcaseSlides.tsx` — per-slide theme override demo across all three shipped themes.
- `slides/CodeExampleSlide.tsx` — `Code` block with highlight ranges and an `EvidenceNote`.
- `slides/ClosingSlide.tsx` — `SlideFrame` with a fragment `FocalSentence` closing beat.
