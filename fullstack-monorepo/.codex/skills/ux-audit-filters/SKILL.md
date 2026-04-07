---
name: ux-audit-filters
description: Checklist for filtering patterns — positioning, fetch timing, applied filter visibility, multi-select logic, empty states, mobile filters, and accordion groups.
---

# Filters And Faceted Search Audit

## Check

- Filter categories cover the most important attributes users care about — missing a critical filter is a major finding.
- Labels are predictable and jargon-free; a new editor understands every label on first visit.
- Most-used categories appear first; general filters before specific ones.
- Control type matches option count: checkboxes/radios for <5, dropdowns for 5–15, combobox for 15+, toggle for boolean, date picker with presets for ranges.
- Within a category, multiple values combine with OR logic; across categories, AND logic.
- Sliders always have a text input fallback.

## Positioning And Timing

- Desktop (≥1024px): filters always visible, not behind a toggle.
- Mobile (<768px): full-page overlay with sticky Apply button — not a split-screen.
- Filter bar or button remains accessible while scrolling (sticky or floating).
- Filters and results update asynchronously — never freeze UI or auto-scroll on single input.
- Apply button shows matching result count ("Show 14 results").

## Applied Filter Visibility

- Active filters visible in the control and in a summary area (chips/pills above results).
- Each chip shows category + value with a close/× button; "Clear all" visible when any filter is active.
- Filter state preserved on navigation and page refresh (URL params or localStorage).

## Empty States And Result Count

- Always show the number of matching results dynamically.
- Distinguish "no data exists" from "no data matches your filters" with different messages and actions.
- Unavailable filter values are disabled (not hidden) with an explanation.

## Layout Stability

- Filter area does not shift when results update.
- Accordion sections stay open/closed after a filter change — never auto-collapse on input.
- Accordion headers: entire bar is the click target, ≥44×44px, chevron icons (not arrows).

## Mobile Filters

- Full-page overlay with close button and sticky Apply at bottom.
- No dropdowns-within-overlays; prefer inline checkboxes, radios, or chips.
- Touch targets ≥48px; sort control separate from filter overlay.

## Advanced Filtering

- For 15+ filter dimensions, consider a query constructor (attribute → operator → value rows).
- Saved filter presets for frequently-used combinations.
- Search/autocomplete within long filter panels.

## Accessibility

- All controls reachable via Tab; checkboxes with Space, radios with arrows, accordions with Enter/Space.
- Filter changes announce result count via `role="status"` live region.
- Applied filter chips have accessible labels ("Remove filter: Status is Active").
- Focus stays on filter area after apply; trapped in mobile overlay while open.

## Canonical Reference

Full checklist: `.claude/skills/ux-audit/filters.md`
