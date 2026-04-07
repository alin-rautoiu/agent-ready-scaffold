---
name: ux-audit/microcopy
description: UX writing and microcopy audit checklist. Invoke on every page — button labels, error messages, empty states, headings, tooltips, and terminology consistency exist everywhere.
---

# Microcopy & UX Writing Audit Skill

**Sources:** smashingmagazine.com/2024/06/how-improve-microcopy-ux-writing-tips-non-ux-writers, css-tricks.com/another-stab-at-truncated-text, css-tricks.com/tooltip-best-practices

---

## When to invoke this skill

Invoke on **every page**. Microcopy problems are universal. Specifically look for:
- Button labels
- Page and section headings
- Empty states
- Error messages
- Placeholder text
- Confirmation dialog copy
- Toast/notification text
- Truncated text

---

## Button Labels

**Rule: label must describe the immediate next action, not a distant goal.**

| Bad | Good | Why |
|---|---|---|
| Submit | Save [item] | Generic — what is being submitted? |
| Yes / No | Delete / Cancel | Specific — confirms the consequence |
| Get code | Send code | You can't guarantee delivery |
| Edit | Edit [item] settings | Ambiguous when multiple edit buttons appear per row |
| Send | Send to N recipients | Missing consequence and scale |

<!-- TODO: add project-specific button label checks here, e.g.:
  "- List view actions ('Approve', 'Reject', 'Delete'): specific enough given the context?"
  "- Primary editor actions ('Save', 'Publish', 'Build'): does each label match exactly what happens next?"
  "- Invite/share action: does the button label match what actually happens?"
  "- Confirmation dialogs: replace generic Yes/No with action-specific labels."
-->

---

## Page and Section Headings

**Rule: titles must work as standalone text and be specific.**

- Avoid vague headings: "Settings", "Edit" — add context: "Scheduler Settings", "Edit Source".
- Modal headings must name the object: "Delete Item?" not "Confirm Action".
- Section headings inside pages must describe what the section contains.

<!-- TODO: add project-specific heading checks here, e.g.:
  "- Dashboard: do widget headings describe what metric they show?"
  "- Editor: is it clear which item is being edited (title shown in heading)?"
  "- Dialogs: does each dialog heading describe the specific action?"
-->

---

## Empty States

**Rule: empty states must include context + a call to action. Never just "No items found."**

<!-- TODO: add a table of empty states for this project's key pages, e.g.:
| Page | Weak empty state | Strong empty state |
|---|---|---|
| Item Queue | "No items." | "No items to review. [trigger action] runs on [schedule] — or trigger it manually." + [action] button |
| List page | "No entries." | "No entries yet. [describe next step]." + [CTA] button |
-->

For every list/table page, check:
- What does the empty state say?
- Does it explain why it is empty?
- Does it offer a path forward (CTA button)?

---

## Error Messages

**Rule: explain what happened, identify which field, and tell the user how to fix it.**

- Bad: "An error occurred."
- Bad: "Invalid value."
- Good: "URL must start with http:// or https://"
- Good: "Email address is not valid — check for typos and try again."
- Good: "Failed to save. Check your [setting] and try again." + link to settings

<!-- TODO: add project-specific error message checks here, e.g.:
  "- Form validation errors: are they inline per-field, or generic banners?"
  "- API errors: when a save/send fails, is the error message specific enough to act on?"
  "- Login error: distinguish 'invalid credentials' from 'account locked'."
  "- Network errors: does the app show a useful message when the API is unreachable?"
-->

---

## Placeholder Text

**Rule: placeholder text is not a label. It disappears on focus and fails accessibility requirements.**

- Placeholder should show a realistic example, not repeat the label: `placeholder="e.g. https://example.com/feed.xml"` — not `placeholder="URL"`.
- Never use placeholder as the sole form label.
- Placeholder contrast must meet 4.5:1.

<!-- TODO: add project-specific placeholder checks here, e.g.:
  "- Does every input have a visible label AND a helpful placeholder example?"
  "- Are any inputs label-free (relying on placeholder only)?"
-->

---

## Confirmation Dialog Copy

**Rule: confirmation dialogs must state the consequence, not ask for abstract confirmation.**

| Weak | Strong |
|---|---|
| "Are you sure?" | "Delete '[item name]'? This cannot be undone." |
| "Confirm" / "Cancel" | "[Action] [item]" / "Keep [item]" |
| "Yes" / "No" | Action-specific verbs |

<!-- TODO: list this project's destructive actions that need confirmation copy checked, e.g.:
  "- Deleting items, users, or accounts"
  "- Revoking access or invites"
  "- Sending/publishing (irreversible — confirmation must show recipient/scope count)"
-->

---

## Truncated Text

**Rule: truncated content must always have a way to see the full value.**

- Long titles in list views: is there a tooltip, expand control, or detail view that shows the full text?
- URLs that overflow: truncate with ellipsis in the middle (to preserve the domain), and show full URL on focus/hover.
- Truncated text must not hide accessibility text.

<!-- TODO: add project-specific truncation checks here, e.g.:
  "- Item list: long item titles — truncated? Full title accessible on hover or in detail view?"
  "- URL columns: how are long URLs displayed?"
-->

---

## Notification and Toast Copy

**Rule: notifications must state what happened, not just confirm a button was clicked.**

| Weak | Strong |
|---|---|
| "Saved!" | "[Item name] saved." |
| "Error!" | "Failed to save — check your network connection." |
| "Done." | "Invitation sent to [email]." |
| "Sent!" | "[Item] sent to N recipients." |

<!-- TODO: add project-specific toast copy checks here, e.g.:
  "- What do success toasts say after key actions?"
  "- Are error toasts specific enough to act on?"
  "- Do toasts auto-dismiss? Are they accessible via ARIA live regions?"
-->

---

## Consistent Terminology

**Rule: one term per concept across the entire app.**

<!-- TODO: list this project's domain terms that must be used consistently, e.g.:
  "- 'Item' vs 'Post' vs 'Record' — pick one"
  "- 'User' vs 'Member' vs 'Subscriber' — pick one"
  "- 'Publish' vs 'Send' vs 'Submit' for the primary delivery action — pick one"
  Log any inconsistencies across pages as a minor finding.
-->

---

## Content Design Additions (GOV.UK)

Reference sources: gov.uk/guidance/content-design/what-is-content-design, gov.uk/guidance/content-design/user-needs, gov.uk/guidance/content-design/content-maintenance

- Confirm copy is user-needs-first and task-oriented.
- Group labels and helper text by user task, not backend implementation.
- Keep terms stable across editor, preview, and publish flows.
- Review date-sensitive guidance regularly so labels do not go stale.

---

## UI Decision Guide Integration

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Canonical reference: `UI_DECISION_GUIDE.md`" -->
- Read the project's UX decision guide before copy review.
- Wording must reinforce the screen's primary decision and next action.
- Headings and labels should map to hierarchy levels consistently across sections and overlays.
