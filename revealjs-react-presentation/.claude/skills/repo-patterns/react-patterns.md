# React Patterns

Use these patterns when editing the presentation scaffold.

## Structure

- Keep components at module scope.
- Use typed props.
- Prefer derived values during render over syncing redundant state in effects.
- Use refs only for DOM handles or transient mutable values.

## Deck-specific guidance

- Keep Reveal config at the deck boundary (`PresentationApp.tsx`).
- Keep slide content declarative. Avoid imperative DOM manipulation inside slides.
- Use `ThemedSlide` from `components/` as the slide wrapper so the deck-level theme applies. Use `Stack`, `Fragment`, and `Code` from `@revealjs/react` before inventing custom equivalents.
- Use `useDeckTheme()` from `components/DeckThemeContext.ts` only when a component needs to read the active theme string (rarely — composition via CSS class is the primary mechanism).

## Testing

- Prefer smoke tests for scaffold structure.
- Mock wrapper components in unit tests when the goal is manifest integrity rather than Reveal internals.
