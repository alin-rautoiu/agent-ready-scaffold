---
name: repo-patterns
description: Shared repository conventions for the RevealJS React presentation scaffold, including canonical primitives and the shared component catalog.
---

# Repo Patterns

## Source layout

- `src/client/presentation/PresentationApp.tsx` is the only Reveal deck root and the single owner of Reveal config + plugin registration.
- `src/client/presentation/slides/index.tsx` is the ordered slide manifest.
- `src/client/presentation/slides/` contains the slide modules.
- `src/client/presentation/components/` contains reusable presentation primitives.
- `src/client/presentation/theme/` contains CSS variables, the base `presentation.css`, and one file per shipped theme.

## Canonical primitives

- `ThemedSlide` (`components/ThemedSlide.tsx`) is the canonical wrapper for every slide. It wraps `@revealjs/react`'s `<Slide>` and applies the active theme class so the deck-level default (set on `PresentationApp`) propagates. Pass an optional `theme` prop to override for one slide.
- `DeckThemeContext` and `useDeckTheme` (`components/DeckThemeContext.ts`) back the theme inheritance. Prefer composition via the `theme` prop over reading the context directly.
- `PresentationApp` accepts `theme?: string` (default `'theme-neon-dusk'`). The value goes on the context and cascades to every `ThemedSlide` that does not override it.

Example:

```tsx
// Deck-level default
<PresentationApp theme="theme-natural-light" />

// Per-slide override
<ThemedSlide theme="theme-classical" className="slide slide--archival">
  {/* ... */}
</ThemedSlide>
```

## Shared components

Use these before inventing new markup. See files under `src/client/presentation/components/`.

- `SlideFrame` — structured shell with title, kicker, key message, and body. Props: `density?: 'default' | 'compact'`, `headerAddon?: ReactNode`, `className?`.
- `DeckShell` — hero composition for title and closing slides. `subtitle` is `ReactNode`; optional `subtitleSecondary`.
- `SlideHead` — compact slide header with icon, title, and optional subtitle node.
- `Citation` — inline `author / year / locator` citation chip.
- `DimGroup` — wraps a group and dims it when a later fragment fires (via `dimAt={index}`).
- `Emph` — inline emphasis span. Tones: `primary | accent | muted`.
- `EnumerationStack` — stacked image list (header, cover, or portrait kinds) with optional fragment reveal.
- `EvidenceNote` — footer-style note with an evidence badge.
- `FocalSentence` — large emphasized sentence. Same tone set as `Emph`.
- `ListItemWithSubs` — bullet with an indented sub-list.
- `NarrativeBand` — pacing strip that labels where the current slide sits in a multi-step narrative.
- `QuotedFigure` — quote block with optional speaker, source, and portrait. Variants: `.quoted-figure--safe` (narrower preset for in-card use), `.quoted-figure--centered`. Reveal props: `quoteReveal`, `quoteFragmentIndex`, `speakerReveal`, `speakerFragmentIndex`, `portraitReveal`.
- `ThesisCard` — kicker / statement / footnote claim block.

## Themes

Three themes ship. The deck default is set via `PresentationApp`'s `theme` prop. Per-slide override via `ThemedSlide`'s `theme` prop.

- `theme-neon-dusk` — dark indigo with cyan and amber accents; built for evening / keynote delivery. Default.
- `theme-natural-light` — warm cream with moss accents and an organic line motif; built for essayistic long-form decks.
- `theme-classical` — paper background with rust accent; built for archival or reference-heavy material.

Each theme lives in its own CSS file under `theme/` and is imported by `theme/index.css`.

## Reusable layout patterns

Describe content structure with these patterns. Names below are generic — CSS implementations are per-theme and may evolve. When a pattern repeats, extract or generalize it.

- **Hero** — `DeckShell` with `hero-strip` for metadata. Title slide, closing slide.
- **Framed argument** — `SlideFrame` with kicker, title, key message, and body. Default wrapper for most argument slides.
- **Two-column setup / payoff** (`analysis-column` pattern) — left column sets up evidence, right column lands the claim. Often implemented with `card-grid card-grid--two`.
- **Vertical stack progression** — setup line, quote or evidence, thesis, paced fragments. One module returns a Reveal `Stack` so a section can unfold across multiple beats.
- **Evidence rail** (`evidence-rail` pattern) — horizontal strip of cards, portraits, or compact figures sitting below a thesis or focal sentence; good for comparative enumerations.
- **Thesis + focal sentence** — `ThesisCard` followed by a fragment-revealed `FocalSentence` to land the argument after the supporting beats.
- **Enumeration** — `EnumerationStack` for sequenced exhibits (portraits, covers, or headers) that advance with fragments while earlier items recede.

## Authoring rules

- Keep slide modules focused on one section or one related vertical stack.
- Use `ThemedSlide`, not `<Slide>` from `@revealjs/react`, so the theme prop propagates.
- Prefer extending shared components and theme CSS before adding slide-local markup or CSS.
- Keep placeholder assets scaffold-safe and generic.
- When changing export behavior, validate with `npm run export:pdf`.

## Testing rules

- Keep the smoke test aligned to the slide manifest contract.
- Add targeted coverage when a structural deck rule changes.
- Re-run export validation after print or theme changes.

## Reference implementations

Study these before adding similar slides.

- `slides/TitleSlide.tsx` — `DeckShell` hero with `subtitleSecondary` and inline `Emph`.
- `slides/AgendaSlide.tsx` — `SlideHead` + `card-grid--two`, with `Citation` and `ListItemWithSubs` usage.
- `slides/StackExampleSlides.tsx` — three-child Reveal `Stack`; final child demos `DimGroup` + `Fragment` with `density="compact"`.
- `slides/FragmentExampleSlide.tsx` — two-card showcase of `QuotedFigure` in static and progressive-attribution modes; both use `--safe`. Ends with a fragment `FocalSentence`.
- `slides/EnumerationExampleSlide.tsx` — `EnumerationStack` with three items and fragment-staged reveal.
- `slides/ThesisExampleSlide.tsx` — `ThesisCard` paired with a fragment `FocalSentence`.
- `slides/ThemeShowcaseSlides.tsx` — Reveal `Stack` of three slides, each using `<ThemedSlide theme={...}>` to show per-slide composition across all three shipped themes.
- `slides/CodeExampleSlide.tsx` — `Code` block with line highlight ranges, paired with `EvidenceNote`.
- `slides/ClosingSlide.tsx` — `SlideFrame` with a fragment `FocalSentence` closing beat.

## React notes

See `react-patterns.md` for component-level guidance.
