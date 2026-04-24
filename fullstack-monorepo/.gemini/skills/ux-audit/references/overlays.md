---
name: ux-audit/overlays
description: UX audit checklist for tooltips, popovers, dialogs, hover-triggered overlays, icon legibility, and context menus. Invoke before auditing any page that has icon buttons, action menus, confirmation dialogs, contextual help, or hover effects.
---

# Overlay Patterns Audit Skill

**Sources:** css-tricks.com/tooltip-best-practices, css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs, css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more, css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers, css-tricks.com/popping-comments-with-css-anchor-positioning-and-view-driven-animations, smashingmagazine.com/2024/04/iconography-design-systems-troubleshooting-maintenance, smashingmagazine.com/2023/08/better-context-menus-safe-triangles

---

## When to invoke this skill

Invoke this skill when the page under audit contains any of:
- Icon-only buttons (approve, reject, delete, edit, send, copy)
- Action dropdowns or contextual menus
- Confirmation dialogs (delete, revoke, send edition)
- Hover-triggered previews or descriptions
- Inline help or "?" icons
- Toast notifications

---

## Tooltip Rules

### Use tooltips only for:
- Labelling an icon-only button (1-3 words: "Approve", "Delete source", "Copy link")
- Clarifying a non-obvious control that already has a visible label

### Never use tooltips for:
- Essential information the user needs to complete a task — put it inline
- Interactive content (links, buttons inside) — use a dialog instead
- Long explanations — use a popover or inline help text
- Touch targets — tooltips are inaccessible on mobile; find an alternative

### Accessibility requirements for every tooltip:
- Icon-only button must have either `aria-label` or `aria-labelledby` pointing to tooltip text
- Tooltip element must have `role="tooltip"` and a unique `id`
- Tooltip must open on both hover (`mouseover`) and keyboard focus (`focus`)
- Tooltip must close on `mouseout`, `blur`, and `Escape` key (WCAG 1.4.13)
- `title` HTML attribute must not be used as a tooltip substitute
- Mouse must be able to move over the tooltip without it dismissing

<!-- TODO: Add your app-specific checks here. e.g.:
- Article Queue approve/reject/delete icons: does each have a visible tooltip AND `aria-label`?
- Sources table action icons: labelled?
- Subscribers invite/delete icons: labelled?
- Edition Editor send button and build controls: labelled?
- Any "?" help icons: do they use `role="tooltip"` or a popover pattern correctly?
-->

---

## Popover vs. Dialog Decision Rules

| Situation | Use |
|---|---|
| Confirmation required before destructive action | `<dialog>` (modal) |
| Additional info shown on demand, background still usable | Popover |
| Form requiring full user attention | `<dialog>` (modal) |
| Contextual menu (list of actions) | Popover with `role="menu"` |
| Brief supplementary description | Tooltip with `role="tooltip"` |

### Popovers must:
- Have an explicit ARIA role: `menu`, `listbox`, `dialog`, etc.
- Not trap keyboard focus (unless they are dialogs)
- Be dismissible with `Escape`

### Dialogs must:
- Trap keyboard focus inside while open
- Restore focus to the trigger element on close
- Be dismissible via `Escape` and a visible close button
- Have `role="dialog"` with `aria-labelledby` pointing to the dialog heading

<!-- TODO: Add your app-specific checks here. e.g.:
- Delete confirmation: is it a `<dialog>` (modal, focus-trapped) or just an inline confirm? Should be modal.
- "Send edition" flow: is there a confirmation step that is properly modal?
- Any dropdowns in Sources or Subscribers: do they have `role="menu"` / `role="listbox"`?
- Are dialogs restored to focus on the trigger after closing?
-->

---

## Hover-Triggered Overlay Rules

- Hover-only overlays are inaccessible on touch devices — always provide a tap/keyboard equivalent
- Show delay of ~300–500ms prevents accidental activation while mousing across the page
- Hide delay prevents accidental dismissal when moving from trigger to overlay content
- Never hide essential content exclusively behind hover
- Moving the mouse from trigger to the overlay must not close the overlay mid-path (use a buffer zone)

<!-- TODO: Add your app-specific checks here. e.g.:
- Sidebar nav: any hover-only sub-menus?
- Article Queue: any hover-only row actions? They must also appear on focus/tap
- Are status badges or priority tags hover-only, or do they work on focus too?
-->

---

## Contextual Overlay Positioning

- Overlays must stay within viewport — check at both 1280px and 375px widths
- On mobile, overlays that cannot fit beside their anchor should fall back to a bottom sheet or inline expansion
- Overlay position must not obscure the trigger or adjacent content the user needs to read

<!-- TODO: Add your app-specific checks here. e.g.:
- On mobile at 375px, do any tooltips or popovers overflow the screen?
- In the Edition Editor, does any action menu get clipped by the viewport edge?
-->

---

## Icon Legibility

**Source:** smashingmagazine.com — Iconography Design Systems

Icons must not rely on shape alone to communicate meaning. In admin UIs, icon-only controls are common (action buttons in tables, nav icons, toolbar icons).

### When icons require a visible text label:
- Navigation items — always pair icon + label (never icon-only nav on desktop)
- Any action whose meaning is not universally obvious (e.g., a "build edition" icon, a "scrape" icon)
- Any icon that is not one of the ~20 universally recognised symbols (home, search, close ×, settings gear)

### Icon visual quality checks:
- Consistent stroke weight across all icons on the page — mixed weights create visual noise
- Solid-fill icon variants used for active/selected states (solid communicates "on"; outline communicates "off" or "available")
- Icons render crisply at their actual display size — test at 16px, 20px, 24px as used in the app
- Icons in a group share the same optical centre and visual weight

### Accessibility:
- Every icon-only interactive control has `aria-label` (or `aria-labelledby` pointing to visible text)
- Decorative icons inside a labelled button have `aria-hidden="true"` so screen readers read the button label only once
- Icons used as status indicators (e.g., article priority badges) must have a text alternative or `title` in SVG — but prefer an explicit `aria-label` on the container

<!-- TODO: Add your app-specific checks here. e.g.:
- Article Queue row actions: are all icon buttons labelled? Do they use solid icons for active states?
- Sidebar nav icons: are they paired with text labels at all viewport sizes?
- Edition Editor toolbar (if present): are all formatting/action icons labelled?
- Status/priority badges: do colour-coded icons have text alternatives?
-->

---

## Context Menus and Safe Triangles

**Source:** smashingmagazine.com — Better Context Menus with Safe Triangles

Any dropdown or submenu that opens on hover is subject to the "diagonal cursor problem" — the user moves diagonally from the trigger toward a submenu item, and the menu closes because the cursor briefly exits the trigger's hover zone.

### Safe triangle rule:
If any menu in the app has a submenu or is opened by hovering a trigger and requires the cursor to travel to the menu content, there must be a "safe zone" between the trigger and the menu. Without it, users experience the menu closing unexpectedly mid-navigation — a major friction point.

### What to check:
- Does any hover-triggered menu close when the cursor moves directly toward its content? If yes: missing safe zone — flag as **major**.
- Is the hover debounce delay long enough (~300–500ms) that slight cursor drift does not dismiss the menu?
- For multi-level menus: can the cursor travel diagonally from a parent item to a child item without the parent closing?

### Preferred alternative:
Click-to-open menus eliminate the safe triangle problem entirely. If hover menus are causing friction and safe triangles are not implemented, recommend switching to click-based opening as the fix.

<!-- TODO: Add your app-specific checks here. e.g.:
- Sources category dropdown (if hover-triggered): test diagonal cursor movement
- Any "..." row action menus: do they stay open while the cursor moves into the menu content?
- On mobile: hover menus must not exist — verify all menus are tap/click-triggered only
-->

---

## Confirmation Dialog Additions (NN/g)

Reference source: nngroup.com/articles/confirmation-dialog

- Use confirmation dialogs for high-cost or irreversible actions only.
- In edition authoring, require this for final send, draft deletion, and large-scope destructive actions.
- Dialog title should include action + edition identity.
- Dialog body should include consequence, scope, and reversibility.
- Primary action text should be explicit (for example, "Send to 847 subscribers").
- Provide a safe alternative action (for example, "Keep editing").
- Avoid redundant stacked confirmations for the same action.

---

## UI Decision Guide Integration

Canonical reference: `UI_DECISION_GUIDE.md`

- Validate overlays against hierarchy: they should clarify or confirm, not replace primary page structure.
- Choose modal dialogs only for high-impact decisions; keep routine edits inline when possible.
- Overlay title and actions should match the guide's decision-first language (state + next action + scope).
