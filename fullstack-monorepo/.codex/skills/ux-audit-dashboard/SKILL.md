---
name: ux-audit-dashboard
description: Checklist for dashboard pages, tables, filters, search, and other data-heavy views.
---

# Dashboard And Data Views Audit

## Check

- Primary operational signal is visible before lower-priority diagnostics.
- Metrics include enough context to interpret them.
- Filters do not freeze the UI or hide available options unexpectedly.
- Lists show result counts, loading states, and empty states.
- Tables are readable, keyboard-usable, and not color-only.
- Mobile handling is explicit for dense tables.

## Analytics And Tables Additions

Reference sources: gov.uk/guidance/content-design/data-and-analytics, gov.uk/guidance/content-design/tables

- Pair metrics with decisions the editor needs to make.
- Prioritize send-readiness and QA signals over passive counters.
- Use tables only where comparison is the primary user task.

## UI Decision Guide Link

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Read `UI_DECISION_GUIDE.md` before evaluating layout and hierarchy." -->
- Read the project's UX decision guide before evaluating layout and hierarchy.
- Verify the page exposes goal, current state, and next action in scan order.
- Use table layouts for comparison tasks and workflow layouts for status/action tasks.
