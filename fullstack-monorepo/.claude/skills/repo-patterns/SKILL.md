---
name: repo-patterns
description: Shared repository conventions for data fetching, issue format, database write helpers, and route modules. Referenced by agents instead of duplicating inline.
---

# Repo Patterns

Shared conventions that multiple agents reference. Read this file when working on implementation, review, or issue management.

## Data Fetching Conventions

<!-- TODO: Document your data-fetching library and conventions. e.g.:
- Reuse query key factories from `<query-dir>/` instead of creating ad hoc keys.
- Normalize key inputs before building keys. Use the established reference file for stable list params.
- Preserve visible data during background refetches when the UI already has content. Follow the established hook for split loading states (`initialLoading` vs `refreshing`) and prerequisite gating.
- Prefer patching local list state from mutation responses plus background reconciliation over full-screen reload.
- **Debounce free-text inputs that drive query keys.** When a text input is included in a query key, debounce it (300–400ms). The input's display value stays immediate; only the value fed into the query key is delayed. Failure to debounce fires a network request per keystroke and causes UI flicker.
- For query-backed UI tests, use a fresh query client per test.
-->

## Database Write Helpers

<!-- TODO: Document your cross-dialect or ORM write helper conventions.-->

## Audit-Log / Event-Sourcing Patterns

<!-- TODO: Document patterns for projection + event table pairs, if applicable. e.g.:
- Upsert + event-append must be wrapped in `withTransaction`; a missing transaction risks a partially-written audit trail.
- Flag any write path that touches both the projection table and the events table outside a transaction.
-->

## Permission and Role Checks

<!-- TODO: Document your authorization model and how agents should apply it.
- Feature permission types: `'visible-editable' | 'visible-readonly' | 'hidden'`, defined in `<permissions-file>`.
- Backend enforces via `<auth-middleware>` and `<feature-permission-middleware>`.
- Frontend reads via `<PermissionContext or equivalent>`.
- Use `requireAdmin` for admin-only routes; `requireAuth` for any authenticated user; feature-permission middleware for role-gated routes.
- When reviewing route additions, verify that the appropriate auth/permission middleware is applied intentionally.
-->

## Route Module Conventions

<!-- TODO: Document how route modules are structured. e.g.:
- Apply `requireAdmin` middleware (unless it's a public route).
- Use schema validation for all mutating endpoints.
- Wrap all DB results with date normalization before JSON responses.
- IDs parsed from path params — always validate the record exists before mutating.
- Return `404` for missing records, `400` for validation errors, `201` for created resources.
- JSON-serialized columns stored as text: parse/stringify at the route boundary, not in the service layer.
-->

## GitHub Issue Format

When creating issues, use this format:

- **Title:** `[Bug][<scope>][<severity>] <short title>`
- **Required sections:**
  - `## Problem`
  - `## Reproduction / Context`
  - `## Diagnostics / Evidence`
  - `## Expected behavior`
  - `## Proposed direction`
  - `## Acceptance criteria` (with `- [ ] <criterion>` checkboxes)
- **Required labels:**
  - Always: `bug`
  - Always: one severity label from `critical | major | minor`
  - Include scope labels when applicable: `frontend`, `backend`, `testing`, `ux`, `accessibility`, `localization`, `security`, `code-quality`, `mobile`
