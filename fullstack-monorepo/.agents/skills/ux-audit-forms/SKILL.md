---
name: ux-audit/forms
description: UX audit checklist for forms, multi-step flows, toggle switches, selection controls, and date/calendar inputs. Invoke before auditing any page with a form, modal, settings panel, or creation flow.
---

# Forms & Multi-Step Flows Audit Skill

**Sources:** css-tricks.com/how-to-create-multi-step-forms-with-vanilla-javascript-and-css, smashingmagazine.com/2024/12/creating-effective-multistep-form-better-user-experience, smashingmagazine.com/2022/08/toggle-button-case-study-part-1, smashingmagazine.com/2022/08/toggle-button-case-study-part-2, smashingmagazine.com/2026/02/combobox-vs-multiselect-vs-listbox

---

## When to invoke this skill

Invoke this skill when auditing any page or modal that contains:
- A form with more than 3 fields
- A multi-step wizard or sequential flow
- A selection list
- A date/time input
- An "Add / Edit" modal or drawer

---

## Single-Step Form Checks

### Labels and inputs

- Every input has a visible, persistent `<label>` — placeholder text alone is never acceptable as a label.
- Label is programmatically associated with its input via `for`/`id` or `aria-labelledby`.
- Required fields clearly marked with both a visual indicator and `aria-required="true"` or `required` attribute — not colour alone.
- `autocomplete` attributes set on common fields: `email`, `name`, `new-password`, `current-password`.
- Password fields have a show/hide toggle.

### Validation

- Inline validation fires on `blur` (not on every keystroke — that's disruptive).
- Error messages are inline, adjacent to the failing field — not a generic banner at the top only.
- Error message text describes what went wrong and how to fix it (not just "Invalid value").
- Error state clears when the user corrects the field (not only on re-submission).
- On submission failure, focus moves to the first error field.

### Submit button

- Submit button is clearly labelled with the action it performs — not just "Submit".
- Submit button protected against double-submission (disabled or shows loading state while request is pending).

<!-- TODO: add project-specific single-form checks for key forms here, e.g.:
  "- Login form: correct autocomplete attributes? Password show/hide present?"
  "- Add Item modal: all fields labelled? URL field validated before save?"
  "- Invite form: email field uses `type='email'`?"
  "- Settings toggles: accessible labels? `<button role='switch'>` with `aria-checked`?"
-->

---

## Multi-Step Flow Checks

### Progress indication

- User knows how many steps exist and which step they are on.
- Stepper updates dynamically as the user advances.
- Page/section title changes at each step to describe the current task.

### Navigation between steps

- "Previous" button is visible on steps 2+ (hidden or disabled on step 1).
- "Next" / "Continue" button is hidden or disabled on the final step (replaced by "Submit" or "Publish").
- Navigating back preserves previously entered values — never clears data already entered.
- When the user returns to a previous step, focus moves to the first input of that step.

### Validation per step

- Each step validates before allowing progression.
- Validation errors on a step are shown immediately when the user clicks Next.
- A summary/review step before final submission allows the user to check and edit all answers.

### Data persistence

- Long multi-step flows save progress to `localStorage` so a page reload does not lose data.
- Stored data is cleared after successful submission.

<!-- TODO: add project-specific multi-step flow checks here, e.g.:
  "- Is there a clear sense of 'where I am' in the publishing flow?"
  "- Can the user go back and change earlier inputs after advancing?"
  "- Is the final submit action clearly separated from the save/draft action?"
-->

---

## Selection List Checks

### Visual grouping and state

- Selected items are visually distinct from unselected — not colour alone.
- In multi-select lists, selected count is shown.
- When items are grouped, group headings are semantic.
- Deselecting all items returns the list to its neutral state without layout shifts.

### Keyboard interaction for selection lists

- `Space` toggles selection on a focused item.
- Arrow keys navigate between items.
- "Select all" control available for long lists.

<!-- TODO: add project-specific selection list checks here, e.g.:
  "- Bulk selection: is selected count visible? Is keyboard selection (Space) supported?"
  "- Item assignment: is the selection UI clear?"
-->

---

## Date and Time Input Checks

<!-- TODO: specify where date inputs appear in this project, e.g.:
  "The app has an Events feature with a date field. Check:"
-->

- Date input uses `<input type="date">` or a custom picker — if custom, it must be fully keyboard-navigable.
- Calendar grid uses `<table>` semantics so screen readers can navigate by row/column.
- Today's date is marked with `aria-current="date"`.
- Selected date is announced to screen readers via `aria-selected` or live region.
- Month/year navigation buttons are labelled (`aria-label="Previous month"`, `aria-label="Next month"`).
- Week starts on the correct day for the locale.
- Keyboard: `Arrow` keys navigate days, `Enter` selects, `Escape` closes picker.

---

## Toggle Switch Checks

**Source:** smashingmagazine.com — Toggle Button Case Study (Parts 1 & 2)

### When to use a toggle vs. a checkbox

| Control | Use when |
|---|---|
| Toggle switch | Setting takes effect **immediately** with no Save button — flipping it does something right now |
| Checkbox | Setting is part of a form submitted with a Save button |

If a toggle is inside a form that requires a Save button, it should be a checkbox instead. Flag misuse as **major**.

### Active state must visually dominate — empirical rules from research

The active state must be instantly recognisable within 5 seconds. Ranked by error rate (lowest = best):

1. **Inactive button matches the page background** — active state stands out (0.9% error rate)
2. **Bold text on active label** — simple, reliable, colorblind-safe (1.7% error rate)
3. **Checkmark icon on active state** — clear but may be confused with a checkbox (5% error rate)
4. **Inverted colors / equal visual weight** — causes frequent mis-reading (19–24% error rate) — flag as **major**
5. **Embossed / debossed only** — worst performer (83% error rate) — flag as **critical**

### Color rules for toggles

- Do **not** use red/green as the sole color pair — the most common color vision deficiency makes these indistinguishable (32.5% error rate) — flag as **critical**.
- Apply color to the **background** of the active state, not to the text.
- Pair saturated (active) against desaturated/gray (inactive).
- Must pass 3:1 contrast between active and inactive states.

### Multiple visual cues required

A well-designed toggle uses at least two simultaneous cues, e.g.:
- Background color change + bold label text
- Saturated background + position shift of the thumb
- Never rely on a single cue (color alone, position alone, size alone)

### Accessibility requirements for toggle switches

- Must be implemented as `<button role="switch" aria-checked="true|false">` — not a styled `<div>` or `<input type="checkbox">`.
- The button's accessible name must describe **what is being toggled**, not the state.
- State is communicated by `aria-checked` — screen readers announce "Scheduler, switch, on" automatically.
- Keyboard: `Space` toggles the state.
- When toggling causes an immediate side effect, an ARIA live region must announce the result.

<!-- TODO: add project-specific toggle checks here, e.g.:
  "- Settings toggles: do they take effect immediately (no Save)? Are they `role='switch'`?"
  "- Feature flags or active/inactive switches: is the difference between each switch clear from label alone?"
  "- All toggles: do they pass colorblind and contrast checks?"
-->

---

## Combobox, Multiselect, Listbox & Dual Listbox Checks

**Source:** smashingmagazine.com/2026/02/combobox-vs-multiselect-vs-listbox

### Choose the right control — decision matrix

| Control | List visible | Selection | Use when |
|---|---|---|---|
| **Radio buttons / checkboxes** | Always | 1 or many | <5 options — no dropdown needed |
| **Dropdown** | Hidden until triggered | Single | 5–15 options, infrequently used |
| **Combobox** | Hidden; filter by typing | Single | 15–200+ options; user knows what they want |
| **Multiselect** | Hidden; filter by typing | Many (pills/chips) | 15–200+ options; multiple selections needed |
| **Listbox** | Always visible (scrollable) | Single or many | Frequently used; user benefits from seeing all options |
| **Dual listbox** | Two panels side-by-side | Bulk transfer | Assigning roles, permissions, bulk tasks |

### Common mistakes to flag

| Mistake | Severity |
|---|---|
| Using a plain `<select multiple>` without keyboard navigation enhancement | Minor |
| Combobox that only shows filtered options (never shows full list on click) | Major |
| Multiselect chips with only "×" as remove label (not accessible) | Major |
| Frequently used options hidden inside a collapsed listbox | Major |
| Static labels styled to look like buttons | Critical |
| No "Select All" / "Clear All" on a list with 7+ options | Minor |

<!-- TODO: add project-specific combobox/multiselect checks here, e.g.:
  "- Category field: with 4 options, a plain `<select>` or radio buttons are fine — no combobox needed."
  "- Tags field (if editable): are selections shown as chips? Can chips be removed with keyboard?"
  "- Bulk assignment: is the selection mechanism appropriate for list size?"
-->

---

## Primary Authoring Flow Checks

<!-- TODO: if this project has a complex primary authoring flow (editor, publisher, etc.), add checks here.
  Refer to the `ux-audit-primary-authoring-workflow` skill for a full checklist.
  Example checks:
  "- Audit the editor as an application workflow, not a single long form."
  "- Evaluate stage clarity across Build → Review → Publish."
  "- Ensure autosave and recovery state are always visible."
-->

---

## UI Decision Guide Integration

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Canonical reference: `UI_DECISION_GUIDE.md`" -->
- Read the project's UX decision guide before applying form checks.
- For complex authoring flows, default to application-style staged workflow, not a single dense form.
- Apply single-column and minimal-field defaults unless a stronger workflow reason exists.
