---
name: agent-ux-audit
description: (Codex) Strategic UX audit using discovery gate, task flow mapping, and targeted evaluation. Focus on impact over completeness.
---

# UX Audit

Use this skill for a strategic UX review of the app. Focus on finding the right high-impact issues, not all issues.

For full audits, use this as the authoritative workflow. Stop redundant auditing once a pattern is confirmed across 2-3 instances.

## Tool Access

**Browser automation** requires Playwright (`playwright-cli`). If Playwright is not available, **stop and tell the user** to install it before proceeding.

If you need any tool that is not available (e.g. `gh` CLI not installed, Playwright not configured, a service unreachable), **stop and tell the user** what tool you need, why, and what they should do to provide access. Do not invent ad-hoc alternatives.

## Core Principles

- Your goal is to find *the right issues*, not *all issues*.
- Skip checklist items that don't apply to a page's primary task.
- Stop redundant auditing once a pattern is confirmed across 2-3 instances.
- Depth-dive into critical blockers; keep polish findings brief.
- Connect findings to user impact: who, how often, what happens.
- Accessibility *is* usability. Violations are UX failures, not compliance theater.

## Core Rules

- Do not modify source files during the audit.
- <!-- TODO: specify the project's UX decision guide, e.g.:
    "Read `UI_DECISION_GUIDE.md` as the global baseline before page-specific UX checklists."
  -->
- <!-- TODO: specify the project's shared UX audit policy document, e.g.:
    "Apply shared orchestrator rules from `docs/ux-audit-shared-policy.md`."
  -->
- Use the actual deployed URL provided by the user.
- Do not start a local server and do not switch to localhost during a full audit.
- Do not audit pages in isolation — map end-to-end workflows and cross-page task friction.
- Check both desktop and mobile when mobile is in scope.
- Capture snapshots or screenshots before evaluating pages.
- Validate authenticated state before treating protected routes as valid.
- Deduplicate issues by pattern, not by isolated page instance.
- If a route requires specific data state, file the issue and note the missing required state instead of skipping.

## Full Audit Flow

1. Authenticate for the target environment:
   <!-- TODO: specify authentication methods, e.g.:
     "For deployed/non-local targets: use the auth runbook at `docs/ux-audit-auth-runbook.md`."
     "For local `localhost`: use the `admin-login` skill."
   -->
2. Read the router source files to discover all routes.
3. Select major routes from the discovered list.
4. For each major route, spawn a focused sub-task to:
   - Navigate to the page using Playwright on the deployed URL.
   - Capture screenshots.
   - Evaluate layout, spacing, responsiveness, and accessibility against the design system and UX skills.
   - File issues using the project's issue format with appropriate labels.
   <!-- TODO: specify issue creation method and label conventions, e.g.:
     "Create GitHub issues via `gh issue create` using the format from `.codex/skills/repo-patterns/SKILL.md`."
     "Apply labels: `ux`, one severity label (`critical|major|minor`), and `accessibility` when applicable."
   -->
   - Note required data state if the page cannot be fully exercised due to missing records.
5. After all routes finish, write a summary file grouping issue links by severity.
   <!-- TODO: specify where to write the summary, e.g.: `docs/ux-audit-summary.md` -->
6. <!-- TODO: if the project has an auth cleanup step, add it here, e.g.:
     "Run teardown with `npm run ux-audit:auth:cleanup` after the audit completes."
   -->

## Required Companion Skills

<!-- TODO: list the companion skills required for this project, e.g.:
  - `admin-login`
  - `ux-audit-navigation`
  - `ux-audit-microcopy`
  - `ux-audit-sticky` (when sticky headers, sidebars, or action bars are present)
  - Page-specific `ux-audit-*` skills
-->

## Synchronization Contract

- Canonical deep UX criteria live in `.claude/skills/ux-audit/*.md`.
- `.codex/skills/ux-audit-*` files are concise operational summaries and must remain semantically aligned with canonical files.

## Output

- Findings grouped by severity and pattern
- Evidence for each finding
- Issue links created with required labels
- A summary file grouped by severity
