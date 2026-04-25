# Baseline

Use this reference before implementing visible frontend changes.

## Implementation Defaults

- Resolve UI choices in this order: user job, interaction model, hierarchy, readability, component behavior, then styling.
- <!-- TODO: Describe your styling approach and key tokens/primitives, e.g.: "Use Tailwind utilities and existing CSS tokens." -->
- Prefer shared layout and interaction primitives before creating one-off wrappers.
- <!-- TODO: Describe page orchestration vs component logic boundaries. -->
- <!-- TODO: Describe how to handle permissions or feature gating in the UI. -->
- <!-- TODO: Describe your i18n / localization approach. -->

## Accessibility And State

- Every interactive control needs keyboard access, a visible focus state, and an accessible name.
- Do not communicate state with color alone; pair color with text, icon, shape, or position.
- Keep loading, refreshing, empty, and error states distinct.
- Prevent layout shifts in high-frequency workflows; keep controls stable while data refreshes.
- Respect reduced motion for animations and avoid motion that hides state changes.
