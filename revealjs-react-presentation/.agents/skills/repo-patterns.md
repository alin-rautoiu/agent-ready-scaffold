# Repo Patterns

- `src/client/presentation/PresentationApp.tsx` is the only Reveal deck root and the single owner of Reveal config.
- `src/client/presentation/slides/index.tsx` is the ordered slide manifest.
- Reusable presentation primitives live in `src/client/presentation/components/`.
- Theme variables, base layout rules, and theme files live in `src/client/presentation/theme/`.
- `ThemedSlide` is the canonical slide wrapper. Use its `theme` prop for per-slide overrides.
- `PresentationApp` sets the deck default theme. Shipped themes are `theme-neon-dusk`, `theme-natural-light`, and `theme-classical`.
- Prefer shared primitives such as `SlideFrame`, `DeckShell`, `Citation`, `DimGroup`, `Emph`, `EnumerationStack`, `FocalSentence`, `QuotedFigure`, and `ThesisCard` before introducing one-off markup.
- Validate export behavior with `npm run export:pdf`.
