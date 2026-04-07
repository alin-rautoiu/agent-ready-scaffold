---
name: ux-audit-forms
description: Checklist for forms, multi-step flows, selection controls, toggles, and date inputs.
---

# Forms Audit

## Check

- Every input has a visible label.
- Validation is inline, specific, and recoverable.
- Submit buttons use explicit action labels and prevent double-submit.
- Multi-step flows preserve entered data and show progress.
- Toggles communicate state accessibly.
- Date and selection controls work with keyboard and mobile input.

## Edition Authoring Additions

Reference sources: nngroup.com/articles/progressive-disclosure, nngroup.com/articles/forms-vs-applications, gov.uk/guidance/content-design/user-needs

- Treat edition editing as an application workflow with clear stages (build, review, send).
- Apply progressive disclosure so advanced controls do not overwhelm core authoring tasks.
- Keep autosave and recovery status visible throughout long editing sessions.
- Confirm each control serves a concrete editorial user need.

## UI Decision Guide Link

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Read `UI_DECISION_GUIDE.md` before applying form checks." -->
- Read the project's UX decision guide before applying form checks.
- Prefer application-style staging for complex authoring flows.
- Apply single-column and minimal-field defaults unless a stronger workflow reason exists.
