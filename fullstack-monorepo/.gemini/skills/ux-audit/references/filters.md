---
name: ux-audit/filters
description: UX audit checklist for filtering patterns — filter positioning, fetch timing, applied filter visibility, multi-select logic, empty states, mobile filters, advanced/complex filtering, and accordion filter groups. Invoke before auditing Article Queue, Edition List, Subscribers, Sources, Email Logs, Mailing Lists, and Observability.
---

# Filters & Faceted Search Audit Skill

**Sources:** blog.logrocket.com/ux-design/ui-filters-ux-design-guide, pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables, baymard.com/blog/allow-applying-of-multiple-filter-values, baymard.com/blog/visual-filters, nngroup.com/articles/filter-categories-values, css-tricks.com/filtering-data-client-side-comparing-css-jquery-and-react, smashingmagazine.com/2021/07/frustrating-design-patterns-broken-frozen-filters, smashingmagazine.com/2017/06/designing-perfect-accordion-checklist, smart-interface-design-patterns.com/articles/complex-filtering

---

## When to invoke this skill

Invoke this skill when auditing any page that allows the user to narrow, search, or sort a list of items:
<!-- TODO: list the specific filterable pages in this app. e.g.:
- **Record List** (multi-filter: category, status, date range)
- **Log / History** (filter by date range, status)
- **Users / Members** (search, filter by role or status)
-->

---

## 1 — Filter Categories and Labels

### Appropriate categories
- Filter categories cover the most important attributes users care about for this data type — not just what the database exposes
- Missing a critical filter (e.g., date range on logs, status on articles) is a **major** finding
- Specialized pages should have domain-specific filters, not just generic ones

### Predictable labels
- Users can predict what values they will find inside each filter category from its label alone
- Avoid vague labels: "Item Type", "Category", "Type" — prefer concrete terms ("Source", "Priority", "Status")
- If two filter categories overlap in meaning, users will pick the wrong one — consolidate or differentiate clearly

### No jargon
- Filter labels use terms the user says, not database column names or internal codes
- If a technical term is necessary (e.g., "RSS" in Sources), provide an inline explanation (tooltip with `aria-label`)
- Test: would a new editor understand every filter label on first visit?

### Prioritised order
- Most-used / highest-impact filter categories appear first (top or left)
- General filters (status, date, text search) before specific filters (source ID, tag)
- Within a category: alphabetical for known-name values (brands, sources); frequency for everything else

---

## 2 — Filter Types and Controls

### Control selection matrix

| Options | Frequency | Recommended control |
|---|---|---|
| < 5 | Frequent | Radio buttons (single) or checkboxes (multi) — always visible |
| 5–15 | Occasional | Dropdown (single) or checkbox dropdown (multi) |
| 15–200+ | User knows target | Combobox with search (single) or multi-select with pills (multi) |
| Continuous range | Any | Slider **with text input fallback** (price, date range) |
| Boolean | Any | Toggle switch or single checkbox |
| Date/time range | Any | Date picker with presets ("Last 7 days", "This month") + custom range |

### Slider rules
- A slider without a text input fallback is a **minor** finding — users cannot type precise values (e.g., $200 → $215)
- Steppers (+/−) alongside sliders provide a middle speed between drag and type
- Sliders must show the current value while dragging, not only on release

### Multi-select logic (critical)
- Within the same filter category, values combine with **OR** logic ("Blue OR Black") — 15% of sites get this wrong, causing abandonment
- Across different filter categories, filters combine with **AND** logic ("Color: Blue AND Brand: Samsung")
- Use **checkboxes** to signal that multiple values can be selected — radio buttons imply single-select
- If only single-select is allowed within a category, use radio buttons or a single-select dropdown — never checkboxes

### Visual filter options
- For attributes with visually distinct values (colour, shape, style), pair text labels with thumbnail images or swatches
- Text-only labels for visual attributes cause users to bypass or misapply filters

---

## 3 — Filter Positioning

### Positioning patterns

| Pattern | Best for | Scalability | Trade-offs |
|---|---|---|---|
| Sidebar | Global page-level filters, desktop-first views | High (many categories) | Takes horizontal space; needs overlay on mobile |
| Inline / filter bar | Component-level or 1–3 quick filters | Low–Medium | Compact; limited room for many categories |
| Above results (pill bar) | Applied filter summary + quick toggles | Medium | Good for showing active state; needs an overflow menu for many filters |
| Full-page overlay | Mobile; complex multi-category filtering | High | Good for mobile; hides results while configuring |

### Positioning rules
- On **desktop** (≥ 1024px): filters should be always visible — not hidden behind a toggle by default
- On **mobile** (< 768px): filters behind a "Filter" button opening a full-screen overlay or bottom sheet; **not** a tiny split-screen
- Filter area must be **scrollable independently** from the results area — never nest a tiny scrollable pane inside the page scroll
- For long filter lists (e.g., Brands with 50+ options): show 7–10 options initially, then "Show more" / accordion expand — never a tiny 3–4 item scrollbox

### Floating / sticky filters
- On long result lists, the filter bar or "Filter" button should remain accessible while scrolling — either sticky or floating
- On mobile, an "Apply" button should be **sticky at the bottom** of the filter overlay

---

## 4 — Fetch Timing and UI Responsiveness

### Timing strategies

| Strategy | When to use | Key rule |
|---|---|---|
| **Live filtering** (instant) | Simple selections: toggles, checkboxes, radio buttons | Results update as each selection changes; filters stay interactive |
| **Per-filter** (on close) | Multi-select dropdowns — apply when dropdown closes | User sets multiple values within a dropdown, then results refresh on close |
| **Batch filtering** (Apply button) | Heavy datasets, mobile overlays, complex queries | User configures all filters, taps "Apply"; number of results shown on button |

### Anti-patterns to flag

| Anti-pattern | Severity | Problem |
|---|---|---|
| **Freeze UI on single input** | Major | Blocks the user from setting multiple filters quickly; forces waiting after each click |
| **Auto-scroll to top on filter input** | Major | Disorients user; loses scroll position in filter panel and in results |
| **Collapse filter accordion on input** | Major | User has to re-expand the same section to set the next filter value |
| **Full page reload on filter change** | Major | Destroys filter and scroll state; slowest possible UX |
| **No loading indicator during async update** | Minor | User doesn't know if their filter was applied |

### Correct behaviour
- Filters and results render **asynchronously** — on every filter input, results update in the background while filters remain interactive and in-place
- During async update, grey out or skeleton the results area to indicate loading — but **never disable the filter controls**
- Every filter input is registered, even if the user clicks 3 checkboxes in rapid succession — no lost inputs
- If using an "Apply" button, show the **count of matching results** on the button ("Show 14 results") and update it live as the user configures filters

---

## 5 — Applied Filter Visibility

### Redundancy principle
- Applied filters must be visible in **at least two places**: (1) in the filter control itself (checked state, selected value) and (2) in a summary area (chips/pills above results, or a "Filters: X active" indicator)
- Each filter category that has active selections should visually indicate this (badge count, highlight, filled state)

### Chip / pill bar
- Applied filters shown as removable **chips or pills** above the results — each chip shows the category + value and has a close/× button
- "Clear all filters" button visible when any filter is active
- Removing a chip immediately updates results

### Filter state persistence
- Filter state preserved when navigating away and returning (back button, in-app navigation)
- Filter state preserved on page refresh (via URL query params or localStorage)
- If not persisted: a **major** finding for any filtered list used frequently (Article Queue, Email Logs)

---

## 6 — Result Count and Empty States

### Result count
- **Always** show the number of matching results dynamically ("14 articles match", "Showing 3 of 247") — absence is a **major** finding
- Update count in real-time as filters change (or on Apply click)
- On mobile "Apply" button: embed count in button text ("Show 14 results")

### Empty result handling
- Distinguish between "no data exists" and "no data matches your filters" — different messages, different actions
- When filters produce zero results:
  - Show a clear "No results match your filters" message (not a blank page)
  - Suggest removing the most recently added filter, or offer "Clear all filters" prominently
  - Optionally: indicate which specific filter caused the empty result
- Never silently show an empty list without explanation

### Disabled / unavailable filter values
- When a filter value would produce zero additional results, **disable** it (greyed out, non-clickable) with an explanation — do **not** hide it
- Hiding unavailable options causes layout shifts and confusion ("where did that option go?")

---

## 7 — Layout Stability During Filtering

### Layout shift prevention
- Filter area must not shift, jump, or resize when results update — results area updates independently
- Applied-filter chip bar growing in size must not push filters down the page — place chips above results, not above the filter panel
- Accordion sections within the filter panel remain in their open/closed state after a filter is applied — never auto-collapse on input

### Accordion filter groups
- Use chevron-down (collapsed) / chevron-up (expanded) — not arrows (which imply page scrolling)
- Entire accordion header bar is the click/tap target, not just the icon — icon + label + empty space all trigger expand/collapse
- Icon must be large enough for comfortable tapping (≥ 44×44px)
- Expanding one accordion should **not** auto-collapse others (unless the panel has very few items)
- Already-expanded accordions stay expanded when a filter within them is changed
- Provide "Collapse all / Expand all" for panels with 5+ accordion sections
- For many-item accordions (e.g., 50+ brands): show 7–10 initially, offer "Show more" or built-in search within the accordion

---

## 8 — Mobile Filter UX

### Mobile-specific rules
- Display filters as a full-page overlay — not a split-screen or a sidebar squeeze
- Overlay has a clear "Close" / "×" and a sticky "Apply" button at the bottom
- Filter overlay opens with the first accordion/section relevant to the user's last interaction
- Avoid dropdowns-within-overlays (nested scrolling) — prefer inline checkboxes, radio buttons, or chip selectors
- Touch targets for filter controls ≥ 48px
- Swiping between filter categories (horizontal tabs) is acceptable — but must have visible tab labels, not just swipe-to-discover

### Sort on mobile
- Sort control should be separate from filters (a sort dropdown or segmented control) — not buried inside the filter overlay
- Sort by "Most recent" or "Most actionable" as the default — not alphabetical

---

## 9 — Advanced and Complex Filtering

### Query constructor pattern (for enterprise / data-heavy views)
- When the number of possible filter dimensions exceeds ~15, consider a query constructor: user chooses a filter attribute → operator → value, adding rows
- Each filter row = identifier + comparator + value (e.g., "Priority" "is" "High")
- AND/OR logic between rows must be explicit — show connectors between conditions
- Allow adding and removing condition rows freely
- Provide saved / named filter presets that users can store and recall

### Saved filters
- For frequently-used filter combinations, allow users to save a filter configuration with a name
- Saved filters should be accessible from a dropdown or sidebar
- Saved filters belong to the individual user (not shared by default)

### Search within filter panel
- For filter panels with many categories or many values per category, provide a search/autocomplete input within the filter panel itself
- Auto-focus the search input when the filter panel is long

---

## 10 — Accessibility

### Keyboard navigation
- All filter controls reachable via Tab in a logical order
- Checkboxes toggled with Space; radio buttons cycled with Arrow keys
- Dropdowns opened with Enter/Space, navigated with Arrow keys, selected with Enter
- Accordion sections toggled with Enter/Space when focused on the header
- "Clear all filters" reachable via keyboard

### Screen reader announcements
- Filter controls have programmatic labels (`<label>`, `aria-label`, `aria-labelledby`)
- Changing a filter announces the new result count via a `role="status"` live region ("14 results")
- Applied filter chips have accessible labels including category and value ("Remove filter: Status is Active")
- Accordion state announced: `aria-expanded="true/false"` on header button

### Focus management
- After applying filters, focus remains on the filter area (not jumped to results)
- After clearing all filters, focus moves to the first filter control
- On mobile overlay: focus trapped inside the overlay while it's open; returns to trigger button on close

---

## App-Specific Checks

<!-- TODO: Add one subsection per filterable page in this app. For each, document:
- Which filter dimensions must be present (treating any missing critical dimension as a major finding)
- Whether OR or AND logic applies within multi-select filters
- Whether filter state must persist across navigation
- Whether real-time or Apply-button filtering is expected
- Any tab-level filter isolation requirements (for multi-tab views)
-->
