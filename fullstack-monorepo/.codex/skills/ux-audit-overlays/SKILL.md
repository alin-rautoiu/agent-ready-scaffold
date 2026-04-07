---
name: ux-audit-overlays
description: Checklist for tooltips, popovers, dialogs, context menus, hover overlays, and icon-only controls.
---

# Overlays Audit

## Check

- Icon-only controls have accessible labels.
- Tooltips are supplemental, not essential.
- Dialogs trap focus and restore it on close.
- Popovers and menus have explicit roles and escape behavior.
- Hover-only interactions have touch and keyboard alternatives.
- Overlay positioning works on desktop and mobile.

## Confirmation Dialog Additions

Reference source: nngroup.com/articles/confirmation-dialog

- Use confirmation dialogs for high-impact actions only.
- For edition send flows, show consequence and recipient scope in the dialog body.
- Use explicit primary actions such as "Send to N subscribers" and a safe fallback like "Keep editing".

## UI Decision Guide Link

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Read `UI_DECISION_GUIDE.md` before choosing overlay patterns." -->
- Read the project's UX decision guide before choosing overlay patterns.
- Use overlays to confirm or clarify decisions, not to hide core workflow content.
- Keep overlay action labels explicit about scope, state, and next action.
