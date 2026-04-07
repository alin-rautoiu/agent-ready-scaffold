---
name: ux-audit/sticky
description: Implementation and review checklist for sticky UI elements (headers, sidebars, in-section action bars). Invoke when adding or auditing position sticky behavior.
---

# Sticky Elements Skill

**Sources:** frontendmasters.com/blog/the-weird-parts-of-position-sticky, smashingmagazine.com/2024/09/sticky-headers-full-height-elements-tricky-combination, nngroup.com/articles/sticky-headers

---

## When to invoke this skill

Invoke this skill when:
- Implementing `position: sticky` for headers, sidebars, filters, or action bars
- Debugging sticky behavior that fails or behaves inconsistently
- Reviewing whether sticky improves usability or adds chrome without value

---

## Decision First

Before implementation, answer:
- Is persistent visibility needed for a high-frequency user action?
- Will sticky reduce friction more than it reduces visible content area?
- Is the sticky element justified on mobile where space is tight?

If these answers are mostly no, avoid sticky.

---

## Implementation Baseline

Use this safe baseline:

```css
.sticky {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--surface);
}
```

Rules:
- Always set an offset (`top`, `bottom`, etc.).
- Use an opaque surface for readability.
- Keep layering below modal/dialog layers.

---

## Sticky Failure Debug Checklist

If sticky is not working, check in this order:

1. Offset missing (`top` not set)
2. Wrong scroll container (sticky binds to nearest scrolling ancestor)
3. Ancestor overflow side effects (`overflow: hidden|auto|scroll`)
4. Sticky element taller than available scroll region
5. Parent boundary too short (sticky constrained by container end)
6. Flex/grid stretching behavior (use `align-self: start`)
7. Transform/contain side effects on ancestors

---

## Flex/Grid Sticky Pattern

For side panels in flex/grid layouts:

```css
.layout {
  display: grid; /* or flex */
  gap: 1rem;
}

.sticky-panel {
  position: sticky;
  top: 1rem;
  align-self: start;
}
```

---

## Sticky Header + Full-Height Hero

When header height is variable and hero should fill remaining above-the-fold space:
- Prefer grid composition over hardcoded `calc(100vh - headerHeight)`.
- Use a `100vh` spacer grid strategy so sticky header and hero can coexist without brittle height math.

---

## UX Constraints For Sticky Headers

- Keep header small to protect content-to-chrome ratio.
- Ensure strong contrast and separation from page content.
- Keep motion minimal; avoid delayed stalker-style behavior.
- For partially persistent variants, animation should feel natural and brief.
- Reconfirm sticky necessity based on task frequency.

---

## Accessibility And Quality Checks

- Keyboard focus order remains logical with sticky active.
- Sticky controls remain reachable on desktop and mobile.
- Sticky element does not obscure anchor targets or focused fields.
- Use `scroll-padding-top` where in-page anchors are present:

```css
html { scroll-padding-top: 4rem; }
```
