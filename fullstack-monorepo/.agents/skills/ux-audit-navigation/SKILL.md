---
name: ux-audit/navigation
description: UX audit checklist for sidebar navigation, dropdown menus, mobile navigation patterns, context menus, and safe-triangle hover behaviour. Invoke before auditing the sidebar, any page with a dropdown or fly-out menu, and the mobile navigation experience.
---

# Navigation Patterns Audit Skill

**Sources:** css-tricks.com/fancy-menu-navigation-using-anchor-positioning, smashingmagazine.com/2021/05/frustrating-design-patterns-mega-dropdown-hover-menus, smashingmagazine.com/2023/08/better-context-menus-safe-triangles, smashingmagazine.com/2022/11/navigation-design-mobile-ux

---

## When to invoke this skill

Invoke this skill when auditing:
- The sidebar navigation (all pages share it)
- Any dropdown menus
- Mobile navigation (hamburger / collapsed nav)
- Any fly-out, mega-menu, or hover-triggered menu

---

## Sidebar Navigation Checks

### Visual state clarity

- Active page must have a clearly distinct visual indicator (not colour alone — also icon weight, background, or left border).
- Hover state must be visually distinct from active state.
- Navigation group labels must be readable as section headings, not links.

### Grouping and hierarchy

- Related pages grouped together visually.
- Group boundaries must be perceivable to keyboard and screen reader users (use `<nav aria-label="...">` or equivalent landmark regions).
- Current section must be announced to screen readers (`aria-current="page"` on the active link).

### Mobile nav

- On 375px viewport: is the sidebar collapsed? If so, is the trigger button clearly labelled (`aria-label="Open navigation"`) and does it open a full-screen or slide-in panel?
- Mobile nav must be dismissible with `Escape` and by tapping outside.
- Focus must be trapped inside the mobile menu while open, and returned to the trigger on close.

<!-- TODO: add project-specific sidebar checks here, e.g.:
  "- Does the sidebar show a visual active indicator on the current page?"
  "- Do navigation groups have accessible labels?"
  "- On mobile at 375px: is the nav accessible and not clipped?"
  "- Is `aria-current='page'` applied to the active nav link?"
-->

---

## Dropdown and Action Menu Checks

### Anti-patterns to flag:

- **Hover-only activation** — any menu that opens only on hover is inaccessible to touch and keyboard; must also open on click/Enter.
- **No delay buffer** — hover menus with no show/hide delay cause accidental open/close.
- **Narrow hover tunnels** — if a submenu is offset from its trigger, the cursor path to reach it is a trap; flag as major.
- **Overloaded triggers** — a button that acts as both a link AND a menu trigger confuses users; these must be split.
- **Multiple overlapping levels** — more than one nested flyout open simultaneously; flag as major.
- **No keyboard support** — dropdown must open with `Enter`/`Space`, navigate with arrow keys, close with `Escape`.

### Correct patterns to look for:

- Click/tap-based menus (not hover-only) for complex interactions.
- Arrow key navigation within open menus (`role="menu"` with `role="menuitem"` children).
- Single level of expansion visible at any time.
- "Forgiving" mouse paths — the menu should not close while the cursor moves from trigger to the first menu item.

<!-- TODO: add project-specific dropdown checks here, e.g.:
  "- Category/type selectors: keyboard navigable?"
  "- '...' or action menus on table rows: open on click not hover; keyboard navigable; Escape closes?"
  "- On mobile: are any desktop dropdowns unusable (too small, hover-only)?"
-->

---

## Visual Feedback and Active State

- Hover state: visible colour/background change, cursor changes to pointer.
- Active/pressed state: perceptible depression or inversion.
- Focus state: visible ring, never `outline: none` without a replacement.
- Transitions: smooth but brief (<200ms for nav highlights); must respect `prefers-reduced-motion`.

---

## Mobile Navigation Patterns

**Source:** smashingmagazine.com — Navigation Design for Mobile UX

### Structure — prefer accordion over slide-in

| Pattern | Verdict | Reason |
|---|---|---|
| Accordion (expand in place) | **Preferred** | Users can jump between levels quickly; content stays in context |
| Slide-in drawer | Acceptable | But slow content discovery; disorienting on back navigation |
| Nested slide-in (3+ levels) | **Avoid** | Disorients users; back navigation becomes confusing |

- Keep mobile nav to a maximum of 2 levels.
- Within any accordion, limit visible items to ~4 before grouping into sub-sections.

### Thumb zones

- Primary navigation trigger must sit in the bottom-right or top-left — both are reachable thumb zones.
- All tap targets ≥ 44px tall with adequate spacing.

### Visual hierarchy in expanded mobile nav

- Use typography contrast (size + weight) to differentiate group headings from page links — not colour alone.
- Underline actual page links; do not underline section headings that only expand/collapse.
- Active page must be visually distinct even inside a collapsed group — the group containing the active page should auto-expand on load.

### Navigation depth indicator

- If the user is 2 levels deep, a breadcrumb or back-arrow must be visible and tappable.
- "Back" controls must be in a consistent position across all pages.

<!-- TODO: add project-specific mobile nav checks here, e.g.:
  "- At 375px, how does the sidebar present? Collapsed behind a button, or always visible?"
  "- If collapsed: is the trigger button labelled and in a reachable thumb position?"
  "- Does the mobile nav use accordion or slide-in?"
  "- Does the active page auto-highlight even when its group is initially collapsed?"
-->

---

## Navigation Accessibility Baseline

- `<nav>` element wrapping the sidebar with `aria-label` distinguishing it from any other nav on the page.
- `<ul>` and `<li>` for the list of links.
- Active page link: `aria-current="page"`.
- Skip link: `<a href="#main-content" class="skip-link">Skip to main content</a>` as the first focusable element — verify it is present and functional.

---

## UI Decision Guide Integration

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Canonical reference: `UI_DECISION_GUIDE.md`" -->
- Read the project's UX decision guide before navigation review.
- Navigation hierarchy should reflect decision hierarchy, not route implementation details.
- Keep primary destinations prominent and frequent tasks shallow in navigation depth.
