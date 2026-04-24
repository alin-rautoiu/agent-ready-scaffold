---
name: ux-audit/forms
description: UX audit checklist for forms, multi-step flows, toggle switches, selection controls, and date/calendar inputs. Invoke before auditing Login, Sources (add/edit), Subscribers (invite), Events (add/edit), Editors (add), Settings, Mailing Lists, Join, and the Edition Editor build flow.
---

# Forms & Multi-Step Flows Audit Skill

**Sources:** css-tricks.com/how-to-create-multi-step-forms-with-vanilla-javascript-and-css, smashingmagazine.com/2024/12/creating-effective-multistep-form-better-user-experience, css-tricks.com/how-to-make-a-scroll-to-select-form-control, css-tricks.com/grouping-selection-list-items-together-with-css-grid, css-tricks.com/making-calendars-with-accessibility-and-internationalization-in-mind, smashingmagazine.com/2022/08/toggle-button-case-study-part-1, smashingmagazine.com/2022/08/toggle-button-case-study-part-2, smashingmagazine.com/2026/02/combobox-vs-multiselect-vs-listbox

---

## When to invoke this skill

Invoke this skill when auditing any page or modal that contains:
- A form with more than 3 fields
- A multi-step wizard or sequential flow
- A selection list (articles, subscribers, tags)
- A date/time input or event scheduler
- An "Add / Edit" modal or drawer

---

## Single-Step Form Checks

### Labels and inputs
- Every input has a visible, persistent `<label>` — placeholder text alone is never acceptable as a label (placeholder disappears on focus)
- Label is programmatically associated with its input via `for`/`id` or `aria-labelledby`
- Required fields clearly marked with both a visual indicator and `aria-required="true"` or `required` attribute — not colour alone
- `autocomplete` attributes set on common fields: `email`, `name`, `new-password`, `current-password`
- Password fields have a show/hide toggle

### Validation
- Inline validation fires on `blur` (not on every keystroke — that's disruptive)
- Error messages are inline, adjacent to the failing field — not a generic banner at the top only
- Error message text describes what went wrong and how to fix it (not just "Invalid value")
- Error state clears when the user corrects the field (not only on re-submission)
- On submission failure, focus moves to the first error field

### Submit button
- Submit button is clearly labelled with the action it performs ("Save source", "Send invitation", not just "Submit")
- Submit button protected against double-submission (disabled or shows loading state while request is pending)

<!-- TODO: Add your app-specific checks here. e.g.:
- **Login form**: is username/password using `autocomplete="current-password"` / `autocomplete="username"`? Is the password field show/hide present?
- **Add Source modal**: do all fields have labels? Is URL field validated before save?
- **Add Subscriber / Invite**: does the email field use `type="email"` with `autocomplete="email"`?
- **Settings page**: do toggle switches have accessible labels? Are they `<button role="switch">` with `aria-checked`?
- **Events — add event**: does the date input work with keyboard? Is it accessible at month/day/year level?
-->

---

## Multi-Step Flow Checks

### Progress indication
- User knows how many steps exist and which step they are on ("Step 2 of 4" or a visible stepper component)
- Stepper updates dynamically as the user advances
- Page/section title changes at each step to describe the current task

### Navigation between steps
- "Previous" button is visible on steps 2+ (hidden or disabled on step 1)
- "Next" / "Continue" button is hidden or disabled on the final step (replaced by "Submit" or "Publish")
- Navigating back preserves previously entered values — never clears data already entered
- When the user returns to a previous step, focus moves to the first input of that step

### Validation per step
- Each step validates before allowing progression (user cannot skip required fields by clicking Next)
- Validation errors on a step are shown immediately when the user clicks Next, not only on final submission
- A summary/review step before final submission allows the user to check and edit all answers

### Data persistence
- Long multi-step flows save progress to `localStorage` so a page reload or accidental navigation does not lose data
- Stored data is cleared after successful submission

<!-- TODO: Add your app-specific multi-step flow checks here. e.g.:
The Edition Editor is effectively a multi-step publishing workflow (Select articles → Edit content → Preview → Send). Check:
- Is there a clear sense of "where I am" in the publish flow?
- Can the user go back and change article selection after entering the editor?
- Is the Send action clearly separated (requires confirmation) from the Save/draft action?
- Does saving preserve all edits including article prioritisation?
-->

---

## Selection List Checks

### Visual grouping and state
- Selected items are visually distinct from unselected — not colour alone (also position, icon, or background)
- In multi-select lists, selected count is shown ("3 of 12 selected")
- When items are grouped (e.g., articles by category), group headings are semantic (`<optgroup>`, heading element, or `role="group"` with `aria-label`)
- Deselecting all items returns the list to its neutral state without layout shifts

### Keyboard interaction for selection lists
- `Space` toggles selection on a focused item
- Arrow keys navigate between items
- "Select all" control available for long lists

<!-- TODO: Add your app-specific checks here. e.g.:
- **Article Queue**: approve/reject bulk selection — is selected count visible? Is keyboard selection (Space) supported?
- **Edition article picker** (if applicable): is selected vs. unselected state unambiguous?
- **Mailing Lists subscriber assignment**: is the selection UI clear?
-->

---

## Date and Time Input Checks

The app has an Events feature with `eventDate` field. Check:

- Date input uses `<input type="date">` or a custom picker — if custom, it must be fully keyboard-navigable
- Calendar grid uses `<table>` semantics (not `<div>` grid) so screen readers can navigate by row/column
- Today's date is marked with `aria-current="date"`
- Selected date is announced to screen readers via `aria-selected` or live region
- Month/year navigation buttons are labelled (`aria-label="Previous month"`, `aria-label="Next month"`)
- Week starts on the correct day for the locale (Romanian locale: Monday first)
- Keyboard: `Arrow` keys navigate days, `Enter` selects, `Escape` closes picker
- Native date inputs have known accessibility issues on some browsers — if used, verify they work with keyboard on the target browser

---

## Toggle Switch Checks

**Source:** smashingmagazine.com — Toggle Button Case Study (Parts 1 & 2)

### When to use a toggle vs. a checkbox

| Control | Use when |
|---|---|
| Toggle switch | Setting takes effect **immediately** with no Save button — flipping it does something right now |
| Checkbox | Setting is part of a form submitted with a Save button |

If a toggle is inside a form that requires a Save button to apply changes, it should be a checkbox instead. Flag misuse as **major**.

### Active state must visually dominate — empirical rules from research

The active state must be instantly recognisable within 5 seconds. Ranked by error rate (lowest = best):

1. **Inactive button matches the page background** — the active state stands out because the inactive one disappears into the page (0.9% error rate in research)
2. **Bold text on active label** — simple, reliable, colorblind-safe (1.7% error rate)
3. **Checkmark icon on active state** — clear but may be confused with a checkbox (5% error rate)
4. **Inverted colors / equal visual weight** — causes frequent mis-reading (19–24% error rate) — flag as **major**
5. **Embossed / debossed only** — worst performer (83% error rate) — flag as **critical**

### Color rules for toggles

- Do **not** use red/green as the sole color pair — the most common color vision deficiency makes these indistinguishable (32.5% error rate in research) — flag as **critical**
- Apply color to the **background** of the active state, not to the text — background color performs 5–8% better than text color alone
- Pair saturated (active) against desaturated/gray (inactive) — same hue at different saturations outperforms grayscale-vs-color pairs
- Must pass 3:1 contrast between active and inactive states, not just against the page background

### Multiple visual cues required

A well-designed toggle uses at least two simultaneous cues, e.g.:
- Background color change + bold label text
- Saturated background + position shift of the thumb
- Never rely on a single cue (color alone, position alone, size alone)

### Accessibility requirements for toggle switches

- Must be implemented as `<button role="switch" aria-checked="true|false">` — not a styled `<div>` or `<input type="checkbox">`
- The button's accessible name must describe **what is being toggled**, not the state: `aria-label="Scheduler"` not `aria-label="On"`
- State is communicated by `aria-checked` — screen readers announce "Scheduler, switch, on" automatically
- Keyboard: `Space` toggles the state; `Enter` should also work
- When toggling causes an immediate side effect (e.g., enabling the scheduler starts a cron job), an ARIA live region must announce the result: "Scheduler enabled. Will run next Monday at 6:00 AM."

<!-- TODO: Add your app-specific toggle checks here. e.g.:
- **Scheduler toggle**: Does flipping it take effect immediately (no Save)? If yes, is it a `role="switch"`? Does it describe what it enables? Does it confirm what will happen after toggle?
- All toggles: do they use a color pair that passes colorblind and contrast checks?
- All toggles: are they keyboard-operable with `Space`?
-->

---

## Combobox, Multiselect, Listbox & Dual Listbox Checks

**Source:** smashingmagazine.com/2026/02/combobox-vs-multiselect-vs-listbox (Vitaly Friedman)

### Choose the right control — decision matrix

| Control | List visible | Selection | Use when |
|---|---|---|---|
| **Radio buttons / checkboxes** | Always | 1 or many | <5 options — no dropdown needed |
| **Dropdown** | Hidden until triggered | Single | 5–15 options, infrequently used |
| **Combobox** | Hidden; filter by typing | Single | 15–200+ options; user knows what they want |
| **Multiselect** | Hidden; filter by typing | Many (pills/chips) | 15–200+ options; multiple selections needed |
| **Listbox** | Always visible (scrollable) | Single or many | Frequently used; user benefits from seeing all options at once |
| **Dual listbox** | Two panels side-by-side | Bulk transfer | Assigning roles, permissions, bulk tasks; user needs to review full selection against source |

### Combobox checks
- On click/tap, **expose all options** — not just a filtered subset; users may not know what's available
- After the user types, filter the list; on clear, restore full list
- Supports keyboard: `↓` key opens list, `↑↓` navigate, `Enter` selects, `Escape` closes
- Group related options within the list when applicable (e.g., regions within a country selector)
- Accessible: `role="combobox"`, `aria-expanded`, `aria-owns` pointing to `role="listbox"`, `aria-activedescendant` tracking current option
- If there are 2–3 frequently selected values, show them as quick-select chips **outside** the dropdown

### Multiselect checks
- Selected items displayed as **pills/chips** inside or below the input — each chip has a remove × button
- `aria-label` on each chip's remove button: "Remove [item name]" — not just "×"
- Selected count visible: "3 selected" — do not rely only on rendered chips (they may overflow)
- For 7+ options: provide **"Select All"** and **"Clear All"** controls
- Keyboard: `↑↓` navigate options, `Space` or `Enter` toggles selection, `Backspace` removes last chip
- Never hide frequently used options — expose as pre-selected chips or pinned to top of list

### Listbox checks
- All options visible without a trigger — make this explicit in the design (not a collapsed dropdown)
- Use when users need to **compare options** before choosing, or when the list is frequently consulted
- Scrollable with a visible scrollbar when list exceeds container height
- For multi-selection: `Ctrl/Cmd+click` for non-contiguous, `Shift+click` for range; "Select All" / "Clear All" buttons
- Keyboard: `↑↓` navigate, `Space` toggles selection (multi), `Home`/`End` jump to first/last
- `role="listbox"`, each item `role="option"` with `aria-selected`; `aria-multiselectable="true"` for multi

### Dual listbox (Transfer List) checks
- Left panel = available items; right panel = selected/assigned items
- Bulk transfer buttons: "Add selected →", "← Remove selected", "Add all →→", "←← Remove all"
- Users can review their **complete selection side-by-side** with the source list before committing — this is the key advantage over multiselect pills
- Keyboard: navigate with `↑↓`, `Space` to select row, `Enter` to transfer; all transfer buttons Tab-reachable
- Use dual listbox instead of drag-and-drop for role/permission assignment — more accessible, faster for bulk selection
- `aria-label` both panels clearly: "Available subscribers", "Assigned to list: Newsletter"

### Common mistakes to flag
| Mistake | Severity |
|---|---|
| Using a plain `<select multiple>` without keyboard navigation enhancement | Minor |
| Combobox that only shows filtered options (never shows full list on click) | Major |
| Multiselect chips with only "×" as remove label (not accessible) | Major |
| Frequently used options hidden inside a collapsed listbox | Major |
| Static labels styled to look like buttons, or interactive elements styled like static text | Critical |
| No "Select All" / "Clear All" on a list with 7+ options | Minor |
| List type mismatch: using a dropdown where listbox is better (options consulted frequently) | Minor |

<!-- TODO: Add your app-specific checks here.
-->

---

## Edition Authoring Focus (NN/g + GOV.UK)

Reference sources: nngroup.com/articles/progressive-disclosure, nngroup.com/articles/forms-vs-applications, gov.uk/guidance/content-design/user-needs, insidegovuk.blog.gov.uk/2019/04/23/building-and-testing-the-new-content-publisher

- Audit the Edition Editor as an application workflow, not a single long form.
- Evaluate stage clarity across Build -> Review -> Send.
- Use progressive disclosure to keep high-frequency controls visible and advanced controls optional.
- Ensure autosave and recovery state are always visible during long editing sessions.
- Map each control to an explicit editorial user need; flag controls that do not support recurring authoring tasks.
- Prefer modular authoring blocks (intro, section list, preview, send) over one monolithic mixed panel.

---

## UI Decision Guide Integration

Canonical reference: `UI_DECISION_GUIDE.md`

- Use the guide's priority order before evaluating form details.
- For edition flows, default to application-style staged workflow, not a single dense form.
- Apply Baymard form fundamentals: single-column bias, minimal required fields, in-context validation, explicit labels.
- Use progressive disclosure only for advanced options, never for critical decisions or irreversible actions.
