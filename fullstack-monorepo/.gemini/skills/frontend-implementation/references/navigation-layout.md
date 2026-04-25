# Navigation And Layout

Use this reference for navigation, page structure, responsive layout, and sticky surfaces.

## Source Guidance

- `UI_DECISION_GUIDE.md`
- <!-- TODO: link to relevant UX audit skill files if applicable -->

## Navigation

- Keep navigation labels aligned to user tasks, not implementation names.
- Preserve active route state visually and accessibly.
- Keep high-frequency destinations shallow and visible.
- <!-- TODO: Describe skip-link behavior and route focus management. -->
- <!-- TODO: Describe how to hide restricted features in navigation. -->
- Make mobile navigation reachable, dismissible, focus-safe, and operable without hover.

## Layout

- <!-- TODO: Describe shared layout and page primitives. -->
- Keep primary task, current state, and next action visible in the scan path.
- Use stable dimensions for fixed-format controls, tables, and action bars to avoid layout shift.
- Avoid nested card structures and unrelated decorative wrappers in operational workflows.
- Ensure text fits its container on narrow and wide viewports without overlap.

## Sticky Surfaces

- Use sticky behavior only when persistent visibility supports frequent action or orientation.
- Define explicit offsets and verify the actual scroll container.
- For sticky children inside flex or grid, ensure appropriate alignment.
- Give sticky surfaces opaque backgrounds, clear contrast, and controlled z-index.
- Ensure sticky headers or action bars do not hide important content.

## Verification

- <!-- TODO: List required verification steps for navigation and layout. -->
