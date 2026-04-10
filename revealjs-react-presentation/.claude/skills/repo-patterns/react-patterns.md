# React Patterns

Use these patterns when editing the presentation scaffold.

## Structure

- Keep components at module scope.
- Use typed props.
- Prefer derived values during render over syncing redundant state in effects.
- Use refs only for DOM handles or transient mutable values.

## Deck-specific guidance

- Keep Reveal config at the deck boundary.
- Keep slide content declarative. Avoid imperative DOM manipulation inside slides.
- Use `Stack`, `Slide`, `Fragment`, and `Code` before inventing custom equivalents.

## Testing

- Prefer smoke tests for scaffold structure.
- Mock wrapper components in unit tests when the goal is manifest integrity rather than Reveal internals.
