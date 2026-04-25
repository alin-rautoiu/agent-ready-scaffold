# Data Views

Use this reference for dashboards, tables, lists, filters, and search.

## Source Guidance

- `UI_DECISION_GUIDE.md`
- <!-- TODO: link to relevant UX audit skill files if applicable -->

## Dashboard And List Defaults

- Put the primary operational signal and next action in the first viewport.
- Pair metrics with interpretation: label what is counted, freshness, and why it matters.
- Use tables when comparison is the core task; use cards/lists for status-first workflows.
- Show result count and current range for filtered or paginated lists.
- Distinguish loading, background refreshing, empty, empty-after-filter, and error states.
- Provide clear retry or recovery actions for failed data loads.

## Filters And Search

- <!-- TODO: Describe your query key or data fetching state management pattern. -->
- Keep filter controls interactive while results update in the background.
- Preserve visible data during background refetch where continuity matters.
- Do not auto-scroll, collapse filter panels, or reset active controls after a filter change.
- Within one filter category, combine multiple values with OR logic; across categories, combine with AND logic.
- Show active filters in the control and in a summary area.
- <!-- TODO: Describe how to preserve filter state through navigation (URL params, local storage, etc.). -->

## Tables

- Use semantic tables where comparison matters.
- Left-align text; right-align quantitative numbers; never center-align dense data.
- Keep sort state visible and accessible.
- <!-- TODO: Describe your responsive table strategy (e.g. table-to-card, horizontal scroll). -->
- Use pagination for operational tables where row position and comparison matter.
- Keep row actions keyboard reachable and labelled.

## Verification

- <!-- TODO: List required verification steps for data views (tests, mobile check, etc.). -->
