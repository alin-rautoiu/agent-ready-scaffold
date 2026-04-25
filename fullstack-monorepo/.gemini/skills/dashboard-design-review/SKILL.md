---
name: dashboard-design-review
description: (Gemini) Reviews dashboard and data-heavy admin pages for scanability, KPI hierarchy, chart-task fit, and actionability; produces prioritized UI improvements and implementation tasks.
---

# Dashboard Design Review Skill

Use this when improving dashboard and list-heavy experiences in the admin UI.

## Inputs

- A target page or flow
<!-- TODO: list this project's key data-heavy pages, e.g.:
  "- dashboard, items list, subscribers, logs"
-->
- Latest snapshot or screenshot artifacts
- Relevant source files for the frontend layer
<!-- TODO: specify where frontend files live, e.g.: `src/client/` -->

## Method

1. Define the page's top 1-3 decisions users must make.
2. Verify KPI hierarchy:
   - place the highest-value metric first
   - ensure secondary metrics support decisions, not decoration
3. Check scanability:
   - strong heading hierarchy
   - concise labels and units
   - minimal competing visual weight
4. Check chart and table fit:
   - comparison tasks use comparison-friendly visuals
   - trends are shown over time with clear baselines
   - dense tables have sorting/filtering/search clues
5. Check progressive disclosure for dense content:
   - summary signals appear first, detail opens on click/expand
   - rows/cards do not expose all metadata in first pass
   - mobile view keeps one primary metric visible before expansion
6. Check annotations and context:
   - targets, thresholds, and period context are visible
   - unusual values are explained, not just highlighted
7. Validate mobile behavior:
   - key KPI summary visible early
   - no critical action hidden behind horizontal scrolling
8. Convert findings into implementation tasks with file-level suggestions.

## Output Format

- Findings ordered by severity:
  - issue
  - user impact
  - recommended change
  - likely files to touch
  - quick test plan
- A top-5 prioritized backlog for implementation

## Validation Checklist

- At least one improvement for information hierarchy
- At least one improvement for table/chart usability
- At least one progressive-disclosure improvement on dense sections
- At least one mobile-specific fix
- Every finding mapped to a measurable user outcome
