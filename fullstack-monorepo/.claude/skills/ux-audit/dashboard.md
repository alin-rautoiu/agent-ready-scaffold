---
name: ux-audit/dashboard
description: UX audit checklist for data-heavy views — real-time dashboards, data tables, list filtering, and search. Invoke before auditing Dashboard, Article Queue, Edition List, Subscribers, Email Logs, and Mailing Lists.
---

# Dashboard & Data Views Audit Skill

**Sources:** smashingmagazine.com/2025/09/ux-strategies-real-time-dashboards, smashingmagazine.com/2021/07/frustrating-design-patterns-broken-frozen-filters, smashingmagazine.com/2019/02/complex-web-tables, coyleandrew.medium.com/design-better-data-tables-4ecc99d23356, pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables

---

## When to invoke this skill

Invoke this skill when auditing pages that display lists, tables, metrics, or filtered data:
<!-- TODO: list the specific pages in this app where this skill applies. e.g.:
- **Dashboard** (stats overview, key counts)
- **Record List** (filterable, sortable table)
- **Log / History** (time-ordered log table)
-->

---

## Dashboard Page Checks

### Information hierarchy
- Critical metrics (subscriber count, pending articles, next edition date) should appear above the fold at 1280px and at the top of the scroll on 375px — not buried below lower-priority content
- Maximum ~5 key metrics visible before the fold; additional detail accessible via scroll or expand
- Related metrics grouped together visually (editorial metrics vs. system metrics)
- Each metric widget has a heading that explains what it measures — not just a number alone

### Data freshness and status
- If any metric is derived from async data, a "last updated" timestamp or refresh indicator must be visible
- Stale or unavailable data must be labelled ("Data as of 10:42 AM", not silently showing old values)
- Loading state: does the dashboard show skeleton placeholders or spinners while data loads? Or does it flash empty then populate (layout shift)?

### Delta indicators and trends
- Metrics benefit from directional context ("+5 new subscribers this week", "↑ 12 articles pending")
- Pure numbers without context force users to remember previous states

### Colour coding
- Red/orange reserved for critical or negative states; green/blue for positive/stable
- Colour must never be the sole distinguisher — always pair with text, icon, or shape
- Test: cover the colour channel mentally — is each widget's status still clear from text alone?

### Animation and motion
- Count-up transitions or fade-ins on metric load: must complete within 400ms
- Must respect `prefers-reduced-motion` (no animations for users who have opted out)

<!-- TODO: Add app-specific dashboard checks. e.g.: what key metrics must be visible, what direct-action links are expected, what counters need contextual labels. -->

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
- Filters remain interactive while results load (async update)
- Filter state is preserved when navigating away and back
- Number of results displayed dynamically ("14 articles match")
- Unavailable filter options are **disabled** (with explanation) not hidden
- Applied filters shown as chips/tags above results for easy removal
- "Clear all filters" option when any filter is active
- Search input has a clear/× button

<!-- TODO: Add app-specific filter checks per filterable page. e.g.: list which filter dimensions each page should support, whether filter state must persist across navigation, and whether real-time or submit-based filtering is expected. -->

---

## Table UX Checks

**Sources:** smashingmagazine.com/2019/02/complex-web-tables, coyleandrew.medium.com/design-better-data-tables-4ecc99d23356, pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables

### Data alignment — mandatory rules
- **Left-align text columns** — matches Western left-to-right reading direction
- **Right-align quantitative numbers** (amounts, measures, percentages) — aligns decimal points for comparison
- **Match column heading alignment to column content** — misalignment creates awkward whitespace
- **Never center-align any data** — prevents quick scanning and forces the eye to jump
- Qualitative numbers (dates, zip codes, phone numbers) may be left-aligned
- Use **tabular/monospace font for numeric data** — prevents "$1,111.11" looking visually smaller than "$999.99"
- Avoid repeating the column title in every cell (e.g., put "Lead" in the heading, use qualifiers like "Qualified" in cells)

### Column headers and sorting
- Column headers are descriptive and aligned with column content
- Sortable columns have a visible indicator (chevron ↑↓); sort chevron placement must not disrupt heading alignment
- Default sort order should be meaningful: most recent entry, or most urgent/needing action — not arbitrary
- Show current sort direction clearly; a second click on the same header reverses direction
- Multi-column sort (shift+click) should be available if users need to compare across dimensions

### Row styles — choose by interactivity level
| Style | When to use |
|---|---|
| **Line divisions** (1px light grey) | Most interactive tables — safest choice |
| **Zebra stripes** (alternating white/light grey) | Read-only large horizontal datasets only — avoid in interactive tables |
| **Card rows** (slight elevation/background) | Works when app already has a background colour |
| **Free form** (no separators) | Small, non-dense, non-interactive datasets |

**Why zebra stripes are risky in interactive tables:** hover, disabled, selected, and zebra rows each use a shade of grey — collisions create up to 5 semantic grey levels, breaking visual continuity. Prefer line divisions.

### Row height and density
- Standard density tiers: **condensed 40px / regular 48px / relaxed 56px**
- Row height should accommodate touch targets (min 40px)
- Vertical cell alignment: **center** when row height varies ≤3 lines; **top** when >3–4 lines or multi-line content
- Never bottom-align multi-line cells — content can be clipped at viewport edges
- If display density control is provided, **preserve the user's choice** across browser session and account login
- Always provide a **"Reset to defaults"** option for any column or density customization

### Fixed/sticky elements for large tables
- **Sticky header row** — mandatory for any table taller than one viewport; allows reading column names while scrolling
- **Sticky first column** — required when horizontal scrolling is present (identifier column stays visible)
- Optionally sticky last column for summary/total values
- **Sticky bulk-action toolbar** — appears at the bottom of the viewport once rows are selected, so users see what they're acting on

### Horizontal scroll and column management
- Identifier/key data (name, ID, status) in the first column — always visible during horizontal scroll
- **Column resize**: drag handle on separator hover — expected UX in editable tables; define minimum widths per content type to prevent unreadable squeezing
- Long text: truncate with ellipsis (add tooltip for full value) OR wrap at column boundary — not both
- **Column freeze/pin**: allow users to fix columns in place; especially useful for wide tables
- **Column reorder and hide**: reduces cognitive load for role-specific workflows; prevents scrolling through irrelevant columns
- **Add/remove columns**: powerful for power users; always include a "Reset columns to default" button
- Warn: too many columns is often a symptom of jamming everything into one view — revisit user needs if there are more than ~8 columns

### Row selection and bulk actions
- Selection checkbox appears on **row hover** (not always visible) to reduce visual clutter
- Checkboxes in header for "select all visible rows"; show count "3 of 12 selected"
- Bulk action toolbar appears **only when rows are selected** — never visible when nothing is selected
- Bulk action toolbar: confirm destructive bulk actions (bulk delete requires a confirmation dialog)
- For large datasets: distinguish "select all on this page" vs. "select all N records" explicitly

### Row actions — per-row and expanded detail
- Per-row actions revealed on hover; icon-only commands need tooltips + accessible labels
- Use icons for obvious metaphors (trash = delete, pencil = edit); use text for domain-specific actions
- **Expandable rows**: chevron at row edge expands inline for additional detail — least disruptive
- **Tooltip**: quick context without leaving table — for small amounts of supplementary info
- **Modal/overlay**: more context, some disruption; trigger via 3-dot menu or "View more" link
- **Quick-view sidebar**: best for large detail sets; scalable, allows subtabs and scrolling within sidebar
- **Row → detail page**: full navigation when all columns + actions for a single record are needed

### Cell editing
- Editable cells: text cursor on hover signals editability; cursor changes between read-only and editable cells
- Inline edit confirmed by pressing **Enter**, clicking outside, or an explicit ✓ / Save button
- Show inline validation adjacent to the edited cell, not a top-of-page banner
- For high-stakes data: require click-through to edit mode (expandable row or modal) to add intentional friction
- Mixed read/write rows: visually distinguish read-only cells from editable ones (background, cursor, border)

### Filtering and search within tables
- Provide column-level sort as a baseline; column-level search/filter for power users
- **Search highlighting**: highlight the matching text within result rows — reduces mental matching effort
- Filter boxes should have a visible **reset / × icon** to clear the filter and see unfiltered data
- When filtering: show result count dynamically ("14 articles match")
- Wildcard support: document the wildcard character clearly; adapt to user domain (SQL `%` for analysts, `*` for technical users)
- Date filter: support both typed input and calendar picker — if user knows the date, typing is faster
- Format date input leniently (accept `01/25/2017`, `Jan 25 2017`) — don't error on format variations

### Empty and loading states
- Loading: **skeleton rows** (preferred) or spinner while data fetches — prevents layout shift
- Empty: descriptive message explaining *why* empty + an action to populate (see microcopy skill)
- Error: meaningful message + retry action if data load fails
- Empty result from filter: distinguish "no data exists" from "no data matches your current filters" — provide "Clear filters" link

### Pagination
- Prefer pagination over infinite scroll for prioritization, comparison, and operational tables
- Infinite scroll works for browsing/discovery; it's disastrous for tables where row position matters
- Show total count and current range: "Showing 21–40 of 284"
- Allow user to control rows-per-page (e.g., 20 / 50 / 100)

### Mobile responsiveness
- Complex tables cannot reasonably be used on 375px screens — plan the mobile strategy explicitly
- Options: horizontal scroll + sticky first column (acceptable), or **convert to cards** (best for small datasets)
- Card conversion: each row becomes a card showing key fields; secondary fields behind "expand"
- Indicate horizontal scroll with a shadow/gradient at the edge and a "Scroll →" hint

### Accessibility
- Table must use semantic `<table>`, `<th scope="col">`, `<th scope="row">` — not `<div>` grids
- Table should have a `<caption>` or `aria-labelledby` pointing to a heading that describes the data
- Sortable column headers use `aria-sort="ascending|descending|none"`
- Min 16px font size; layout must not break when user zooms to 200%
- All data and state must be distinguishable without color alone (pair color with icon, text, or pattern)
- Interactive controls (checkboxes, buttons) min 40×40px touch target
- Keyboard navigation: Tab reaches each interactive element; row actions reachable via keyboard
- Row selection via keyboard: focus row, press Space to toggle selection
- Bulk action toolbar: after triggering via keyboard, focus should move to the toolbar

<!-- TODO: Add app-specific table checks per data table. e.g.: column alignment rules, default sort order, per-row action accessibility, bulk action availability, sticky header requirements, status badge format. -->

---

## Real-Time and Auto-Refresh Checks

The Dashboard and Email Logs may show data that changes as emails are sent or articles are scraped.

- If the page auto-refreshes or polls for data, inform the user ("Updating…" indicator)
- Never reload the entire page for a data update — update only the changed region
- ARIA live regions must announce significant updates to screen readers (e.g., new articles available)
- Provide a manual "Refresh" control in addition to any auto-refresh
- If real-time updates cause rows to reorder (e.g., articles sorted by newest), animate the reorder (<300ms) so users maintain spatial context rather than losing their place

<!-- TODO: Add app-specific real-time checks. e.g.: which user-triggered background operations should update visible counts, and how the UI should signal that an async operation is in progress. -->

---

## Analytics And Tables Additions (GOV.UK)

Reference sources: gov.uk/guidance/content-design/data-and-analytics, gov.uk/guidance/content-design/tables

- Pair dashboard metrics with clear decisions, not passive reporting.
- For edition authoring, prioritize QA and send-readiness indicators over vanity counters.
- Label metric definitions clearly so editors can interpret numbers correctly.
- Keep timezone and timestamp context explicit for decision-critical signals.
- Use tables only when comparison is the core task; otherwise prefer workflow-oriented layouts.

---

## UI Decision Guide Integration

Canonical reference: `UI_DECISION_GUIDE.md`

- Evaluate hierarchy with the guide's decision order: user job -> structure -> typography -> components.
- Require a scan path where users can identify page goal, current state, and next action quickly.
- Choose table vs card/list patterns based on task type (comparison vs workflow status).
- Reject metric-heavy layouts that do not support an explicit operational decision.
