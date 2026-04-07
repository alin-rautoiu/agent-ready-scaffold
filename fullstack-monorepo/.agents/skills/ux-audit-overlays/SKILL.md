---
name: ux-audit/overlays
description: UX audit checklist for tooltips, popovers, dialogs, hover-triggered overlays, icon legibility, and context menus. Invoke before auditing any page that has icon buttons, action menus, confirmation dialogs, contextual help, or hover effects.
---

# Overlay Patterns Audit Skill

**Sources:** css-tricks.com/tooltip-best-practices, css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs, css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more, smashingmagazine.com/2024/04/iconography-design-systems-troubleshooting-maintenance, smashingmagazine.com/2023/08/better-context-menus-safe-triangles

---

## When to invoke this skill

Invoke this skill when the page under audit contains any of:
- Icon-only buttons (approve, reject, delete, edit, copy)
- Action dropdowns or contextual menus
- Confirmation dialogs (delete, revoke, publish/send)
- Hover-triggered previews or descriptions
- Inline help or "?" icons
- Toast notifications

---

## Tooltip Rules

### Use tooltips only for:

- Labelling an icon-only button (1-3 words: "Approve", "Delete item", "Copy link")
- Clarifying a non-obvious control that already has a visible label

### Never use tooltips for:

- Essential information the user needs to complete a task — put it inline
- Interactive content (links, buttons inside) — use a dialog instead
- Long explanations — use a popover or inline help text
- Touch targets — tooltips are inaccessible on mobile; find an alternative

### Accessibility requirements for every tooltip:

- Icon-only button must have either `aria-label` or `aria-labelledby` pointing to tooltip text.
- Tooltip element must have `role="tooltip"` and a unique `id`.
- Tooltip must open on both hover (`mouseover`) and keyboard focus (`focus`).
- Tooltip must close on `mouseout`, `blur`, and `Escape` key (WCAG 1.4.13).
- `title` HTML attribute must not be used as a tooltip substitute.
- Mouse must be able to move over the tooltip without it dismissing.

<!-- TODO: add project-specific tooltip checks here, e.g.:
  "- Table row action icons: does each have a visible tooltip AND `aria-label`?"
  "- Any '?' help icons: do they use `role='tooltip'` or a popover pattern correctly?"
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
- Not trap keyboard focus (unless they are dialogs).
- Be dismissible with `Escape`.

### Dialogs must:

- Trap keyboard focus inside while open.
- Restore focus to the trigger element on close.
- Be dismissible via `Escape` and a visible close button.
- Have `role="dialog"` with `aria-labelledby` pointing to the dialog heading.

<!-- TODO: add project-specific dialog/popover checks here, e.g.:
  "- Delete confirmation: is it a `<dialog>` (modal, focus-trapped) or just an inline confirm? Should be modal."
  "- Publish/send flow: is there a confirmation step that is properly modal?"
  "- Dropdowns in key pages: do they have `role='menu'` / `role='listbox'`?"
  "- Are dialogs restored to focus on the trigger after closing?"
-->

---

## Hover-Triggered Overlay Rules

- Hover-only overlays are inaccessible on touch devices — always provide a tap/keyboard equivalent.
- Show delay of ~300–500ms prevents accidental activation while mousing across the page.
- Hide delay prevents accidental dismissal when moving from trigger to overlay content.
- Never hide essential content exclusively behind hover.
- Moving the mouse from trigger to the overlay must not close the overlay mid-path (use a buffer zone).

<!-- TODO: add project-specific hover overlay checks here, e.g.:
  "- Sidebar nav: any hover-only sub-menus?"
  "- List view: any hover-only row actions? They must also appear on focus/tap."
-->

---

## Contextual Overlay Positioning

- Overlays must stay within viewport — check at both 1280px and 375px widths.
- On mobile, overlays that cannot fit beside their anchor should fall back to a bottom sheet or inline expansion.
- Overlay position must not obscure the trigger or adjacent content the user needs to read.

<!-- TODO: add project-specific positioning checks here, e.g.:
  "- On mobile at 375px, do any tooltips or popovers overflow the screen?"
  "- In the editor, does any action menu get clipped by the viewport edge?"
-->

---

## Icon Legibility

**Source:** smashingmagazine.com — Iconography Design Systems

Icons must not rely on shape alone to communicate meaning. When icon-only controls appear, check:

### When icons require a visible text label:

- Navigation items — always pair icon + label (never icon-only nav on desktop).
- Any action whose meaning is not universally obvious.
- Any icon that is not one of the ~20 universally recognised symbols (home, search, close ×, settings gear).

### Icon visual quality checks:

- Consistent stroke weight across all icons on the page.
- Solid-fill icon variants used for active/selected states.
- Icons render crisply at their actual display size.
- Icons in a group share the same optical centre and visual weight.

### Accessibility:

- Every icon-only interactive control has `aria-label`.
- Decorative icons inside a labelled button have `aria-hidden="true"`.
- Icons used as status indicators must have a text alternative.

<!-- TODO: add project-specific icon checks here, e.g.:
  "- List row actions: are all icon buttons labelled? Do they use solid icons for active states?"
  "- Sidebar nav icons: are they paired with text labels at all viewport sizes?"
  "- Status/priority badges: do colour-coded icons have text alternatives?"
-->

---

## Context Menus and Safe Triangles

**Source:** smashingmagazine.com — Better Context Menus with Safe Triangles

Any dropdown or submenu that opens on hover is subject to the "diagonal cursor problem".

### Safe triangle rule:

If any menu has a submenu opened by hovering a trigger and requires the cursor to travel to the menu content, there must be a "safe zone" between the trigger and the menu.

### What to check:

- Does any hover-triggered menu close when the cursor moves directly toward its content? If yes: missing safe zone — flag as **major**.
- Is the hover debounce delay long enough (~300–500ms)?
- For multi-level menus: can the cursor travel diagonally from a parent item to a child item without the parent closing?

### Preferred alternative:

Click-to-open menus eliminate the safe triangle problem entirely. If hover menus are causing friction and safe triangles are not implemented, recommend switching to click-based opening.

<!-- TODO: add project-specific safe triangle checks here, e.g.:
  "- Category dropdowns (if hover-triggered): test diagonal cursor movement."
  "- '...' row action menus: do they stay open while the cursor moves into the menu content?"
  "- On mobile: verify all menus are tap/click-triggered only."
-->

---

## Confirmation Dialog Additions (NN/g)

Reference source: nngroup.com/articles/confirmation-dialog

- Use confirmation dialogs for high-cost or irreversible actions only.
- Dialog title should include action + item identity.
- Dialog body should include consequence, scope, and reversibility.
- Primary action text should be explicit (for example, "Delete [item name]").
- Provide a safe alternative action (for example, "Keep editing").
- Avoid redundant stacked confirmations for the same action.

---

## UI Decision Guide Integration

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Canonical reference: `UI_DECISION_GUIDE.md`" -->
- Read the project's UX decision guide before choosing overlay patterns.
- Validate overlays against hierarchy: they should clarify or confirm, not replace primary page structure.
- Choose modal dialogs only for high-impact decisions; keep routine edits inline when possible.
