---
name: ux-audit-sticky
description: Checklist for implementing and validating sticky headers, sticky sidebars, and sticky action bars.
---

# Sticky Elements Audit

## Check

- Sticky is used only when persistent visibility supports frequent user actions.
- Sticky element defines an explicit offset (`top`/`bottom`).
- Sticky behaves correctly within its real scroll container.
- Overflow, parent-boundary, and flex/grid stretch pitfalls are checked.
- Sticky surfaces remain readable (opaque background, clear contrast, controlled z-index).
- Motion is minimal and non-distracting.
- Sticky does not hide anchors, focused fields, or critical content.

## Implementation Notes

Reference sources: frontendmasters.com/blog/the-weird-parts-of-position-sticky, smashingmagazine.com/2024/09/sticky-headers-full-height-elements-tricky-combination, nngroup.com/articles/sticky-headers

- For flex/grid sticky children, use `align-self: start`.
- For sticky header + full-height hero combinations, prefer grid composition over brittle `100vh - header` math.
- Validate sticky necessity with content-to-chrome tradeoff on mobile.

## UI Decision Guide Link

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Read `UI_DECISION_GUIDE.md` before introducing sticky behavior." -->
- Read the project's UX decision guide before introducing sticky behavior.
- Prioritize user task frequency and decision support over visual novelty.
