# Overlays And Actions

Use this reference for overlays, menus, confirmations, and action controls.

## Source Guidance

- `UI_DECISION_GUIDE.md`
- <!-- TODO: link to relevant UX audit skill files if applicable -->

## Pattern Selection

- Use modal dialogs for destructive, irreversible, or high-cost confirmations.
- Use inline UI for routine edits that do not need full attention.
- Use popovers or menus for contextual actions that leave the page usable.
- Use tooltips only for short labels or supplemental clarification.

## Dialogs

- <!-- TODO: Describe shared confirmation dialog components. -->
- Trap focus while open, restore focus to the trigger on close, support Escape, and include a visible close or cancel path.
- Use appropriate accessibility roles and labels for dialogs.
- State action, object identity, consequence, scope, and reversibility in confirmation copy.
- Use explicit action labels; avoid generic "Yes" and "Confirm".

## Menus, Popovers, And Tooltips

- Give popovers and menus explicit roles appropriate to their behavior.
- Make popovers dismissible with Escape and outside click where appropriate.
- Do not build hover-only interactions; provide keyboard and touch equivalents.
- Keep overlays inside the viewport on all screen sizes.
- For icon-only buttons, provide appropriate accessible names.

## Action Controls

- Pair destructive actions with clear visual weight and confirmation when appropriate.
- Keep row actions reachable on keyboard focus, not only mouse hover.
- Use icons for common metaphors only; use visible text for domain-specific actions.

## Verification

- <!-- TODO: List required verification steps for overlays and actions. -->
