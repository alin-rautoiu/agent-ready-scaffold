---
name: ux-audit/dashboard
description: UX audit checklist for data-heavy views — real-time dashboards, data tables, list filtering, and search. Invoke before auditing dashboard, list, log, and queue pages.
---

# Dashboard & Data Views Audit Skill

**Sources:** smashingmagazine.com/2025/09/ux-strategies-real-time-dashboards, smashingmagazine.com/2021/07/frustrating-design-patterns-broken-frozen-filters, smashingmagazine.com/2019/02/complex-web-tables, coyleandrew.medium.com/design-better-data-tables-4ecc99d23356, pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables

---

## When to invoke this skill

Invoke this skill when auditing pages that display lists, tables, metrics, or filtered data.
<!-- TODO: list this project's data-heavy pages, e.g.:
  "- Dashboard (stats overview, counts)"
  "- Item Queue (filterable, sortable list)"
  "- Subscribers (searchable/filterable table)"
  "- Logs (time-ordered log table)"
-->

---

## Dashboard Page Checks

### Information hierarchy

- Critical metrics should appear above the fold at 1280px and at the top of the scroll on 375px — not buried below lower-priority content.
- Maximum ~5 key metrics visible before the fold; additional detail accessible via scroll or expand.
- Related metrics grouped together visually.
- Each metric widget has a heading that explains what it measures — not just a number alone.

### Data freshness and status

- If any metric is derived from async data, a "last updated" timestamp or refresh indicator must be visible.
- Stale or unavailable data must be labelled (e.g. "Data as of 10:42 AM"), not silently showing old values.
- Loading state: does the dashboard show skeleton placeholders or spinners while data loads? Or does it flash empty then populate (layout shift)?

### Delta indicators and trends

- Metrics benefit from directional context (e.g. "+5 new this week", "↑ 12 pending").
- Pure numbers without context force users to remember previous states.

### Colour coding

- Red/orange reserved for critical or negative states; green/blue for positive/stable.
- Colour must never be the sole distinguisher — always pair with text, icon, or shape.
- Test: cover the colour channel mentally — is each widget's status still clear from text alone?

### Animation and motion

- Count-up transitions or fade-ins on metric load: must complete within 400ms.
- Must respect `prefers-reduced-motion`.

<!-- TODO: add project-specific dashboard checks here, e.g.:
  "- What metrics are shown? Are they the most actionable ones for the user's role?"
  "- Is there a 'pending items' count with a direct link to the queue page?"
  "- Is the next scheduled action date visible?"
-->

---

## Table and List View Checks

### Filter and search — anti-patterns to flag as major:

| Anti-pattern | Problem | Flag as |
|---|---|---|
| Auto-applying every filter change | Freezes UI while results load; prevents setting multiple filters quickly | Major |
| Filters disappear/collapse when results change | Disorienting layout shift; user loses their place | Major |
| Available filter options removed (not disabled) when results narrow | User doesn't understand why options vanished | Major |
| No result count shown | User can't tell if their filter combination returned anything | Major |
| Search/filter state lost on navigation | User returns and filters are reset | Major |
| Filter panel hides while scrolling results | User must scroll back up to change filters | Minor |
| Slider without text input fallback | No way to type exact values | Minor |

### Filter and search — correct patterns to look for:

- Filters remain interactive while results load (async update).
- Filter state is preserved when navigating away and back.
- Number of results displayed dynamically (e.g. "14 items match").
- Unavailable filter options are **disabled** (with explanation), not hidden.
- Applied filters shown as chips/tags above results for easy removal.
- "Clear all filters" option when any filter is active.
- Search input has a clear/× button.

<!-- TODO: add project-specific table/filter checks for each major list page here, e.g.:
  "- Item Queue: can items be filtered by category, status, priority? Does filtering freeze the page?"
  "- Subscribers: is there a search input? Is filter state preserved?"
  "- Logs: can logs be filtered by date range or status? Is pagination present for large datasets?"
-->

---

## Table UX Checks

### Data alignment — mandatory rules

- **Left-align text columns** — matches Western left-to-right reading direction.
- **Right-align quantitative numbers** (amounts, measures, percentages) — aligns decimal points for comparison.
- **Match column heading alignment to column content** — misalignment creates awkward whitespace.
- **Never center-align any data** — prevents quick scanning and forces the eye to jump.
- Qualitative numbers (dates, zip codes, phone numbers) may be left-aligned.
- Use **tabular/monospace font for numeric data**.
- Avoid repeating the column title in every cell.

### Column headers and sorting

- Column headers are descriptive and aligned with column content.
- Sortable columns have a visible indicator (chevron ↑↓).
- Default sort order should be meaningful: most recent entry, or most urgent/needing action.
- Show current sort direction clearly; a second click on the same header reverses direction.

### Row styles — choose by interactivity level

| Style | When to use |
|---|---|
| **Line divisions** (1px light grey) | Most interactive tables — safest choice |
| **Zebra stripes** (alternating white/light grey) | Read-only large horizontal datasets only — avoid in interactive tables |
| **Card rows** (slight elevation/background) | Works when app already has a background colour |
| **Free form** (no separators) | Small, non-dense, non-interactive datasets |

**Why zebra stripes are risky in interactive tables:** hover, disabled, selected, and zebra rows each use a shade of grey — collisions create up to 5 semantic grey levels, breaking visual continuity. Prefer line divisions.

### Row height and density

- Standard density tiers: **condensed 40px / regular 48px / relaxed 56px**.
- Row height should accommodate touch targets (min 40px).
- Vertical cell alignment: **center** when row height varies ≤3 lines; **top** when >3–4 lines.
- Never bottom-align multi-line cells.
- If display density control is provided, **preserve the user's choice** across sessions.
- Always provide a **"Reset to defaults"** option for any column or density customization.

### Fixed/sticky elements for large tables

- **Sticky header row** — mandatory for any table taller than one viewport.
- **Sticky first column** — required when horizontal scrolling is present.
- Optionally sticky last column for summary/total values.
- **Sticky bulk-action toolbar** — appears at the bottom of the viewport once rows are selected.

### Horizontal scroll and column management

- Identifier/key data (name, ID, status) in the first column — always visible during horizontal scroll.
- Long text: truncate with ellipsis (add tooltip for full value) OR wrap — not both.
- **Column resize**: drag handle on separator hover.
- **Column freeze/pin**: allow users to fix columns in place for wide tables.

### Row selection and bulk actions

- Selection checkbox appears on **row hover** to reduce visual clutter.
- Checkboxes in header for "select all visible rows"; show count "3 of 12 selected".
- Bulk action toolbar appears **only when rows are selected**.
- Bulk action toolbar: confirm destructive bulk actions.
- For large datasets: distinguish "select all on this page" vs. "select all N records" explicitly.

### Row actions — per-row and expanded detail

- Per-row actions revealed on hover; icon-only commands need tooltips + accessible labels.
- Use icons for obvious metaphors (trash = delete, pencil = edit); use text for domain-specific actions.

### Cell editing

- Editable cells: text cursor on hover signals editability.
- Inline edit confirmed by pressing **Enter**, clicking outside, or an explicit ✓ / Save button.
- Show inline validation adjacent to the edited cell.

### Empty and loading states

- Loading: **skeleton rows** (preferred) or spinner — prevents layout shift.
- Empty: descriptive message explaining *why* empty + an action to populate.
- Error: meaningful message + retry action if data load fails.
- Empty result from filter: distinguish "no data exists" from "no data matches your current filters".

### Pagination

- Prefer pagination over infinite scroll for prioritization, comparison, and operational tables.
- Show total count and current range: "Showing 21–40 of 284".
- Allow user to control rows-per-page (e.g., 20 / 50 / 100).

### Mobile responsiveness

- Complex tables cannot reasonably be used on 375px screens — plan the mobile strategy explicitly.
- Options: horizontal scroll + sticky first column, or **convert to cards** for small datasets.
- Indicate horizontal scroll with a shadow/gradient at the edge and a "Scroll →" hint.

### Accessibility

- Table must use semantic `<table>`, `<th scope="col">`, `<th scope="row">` — not `<div>` grids.
- Table should have a `<caption>` or `aria-labelledby` pointing to a heading that describes the data.
- Sortable column headers use `aria-sort="ascending|descending|none"`.
- Min 16px font size; layout must not break when user zooms to 200%.
- All data and state must be distinguishable without color alone.
- Interactive controls min 40×40px touch target.
- Keyboard navigation: Tab reaches each interactive element; row actions reachable via keyboard.

<!-- TODO: add project-specific table checks for each major table page here, e.g.:
  "- Item Queue: left-align title/source text; right-align priority numbers; sort by newest by default"
  "- Subscribers table: search real-time; is there a 'select all' for bulk actions?"
  "- Logs table: sticky header; pagination for large logs; date column left-aligned"
-->

---

## Real-Time and Auto-Refresh Checks

- If the page auto-refreshes or polls for data, inform the user ("Updating…" indicator).
- Never reload the entire page for a data update — update only the changed region.
- ARIA live regions must announce significant updates to screen readers.
- Provide a manual "Refresh" control in addition to any auto-refresh.
- If real-time updates cause rows to reorder, animate the reorder (<300ms) so users maintain spatial context.

<!-- TODO: add project-specific real-time checks here, e.g.:
  "- After a background job completes, does the relevant count update? How is the user informed?"
  "- Does the log page reflect new entries without a full page reload?"
-->

---

## Analytics And Tables Additions (GOV.UK)

Reference sources: gov.uk/guidance/content-design/data-and-analytics, gov.uk/guidance/content-design/tables

- Pair dashboard metrics with clear decisions, not passive reporting.
- Label metric definitions clearly so users can interpret numbers correctly.
- Keep timezone and timestamp context explicit for decision-critical signals.
- Use tables only when comparison is the core task; otherwise prefer workflow-oriented layouts.

---

## UI Decision Guide Integration

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Canonical reference: `UI_DECISION_GUIDE.md`" -->
- Read the project's UX decision guide before evaluating layout and hierarchy.
- Require a scan path where users can identify page goal, current state, and next action quickly.
- Choose table vs card/list patterns based on task type (comparison vs workflow status).
- Reject metric-heavy layouts that do not support an explicit operational decision.
