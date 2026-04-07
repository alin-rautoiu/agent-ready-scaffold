---
name: ux-audit-content-authoring
description: Checklist for multi-step content authoring workflows — build, review, QA, publish, and lifecycle maintenance.
---

# Content Authoring Workflow Audit

## Check

- Editor is audited as a staged application workflow (Build → Review → QA → Publish), not a single long form.
- Current stage is always visible; stage transitions are explicit.
- Frequent controls are always visible; advanced options are progressively disclosed.
- Autosave status is visible throughout long editing sessions; failure recovery is offered.
- Pre-publish checklist is complete and visible before the final action.
- Final publish is blocked on critical failures; blockers reported inline with remediation steps.
- Confirmation dialogs for destructive or high-impact actions name the target item, explain consequence and scope, and use explicit action labels.
- Lifecycle status (draft / scheduled / published / archived / withdrawn) is exposed in the authoring UI.
- Archive and withdrawal flows capture reason and show scope before committing.

## Content Design

Reference sources: gov.uk/guidance/content-design/what-is-content-design, gov.uk/guidance/content-design/user-needs, gov.uk/guidance/content-design/content-maintenance

- Every field and control maps to a concrete author task.
- Controls are grouped by author tasks, not backend model names.
- Terminology is consistent between editor, preview, and publish steps.
- Recurring maintenance checks cover stale content, broken links, and outdated copy.

## Delivery Pattern

Reference sources: nngroup.com/articles/progressive-disclosure, nngroup.com/articles/forms-vs-applications, insidegovuk.blog.gov.uk/2019/04/23/building-and-testing-the-new-content-publisher

- Prefer modular authoring components over one monolithic editor panel.
- Add new capabilities as isolated modules with dedicated controls.
- Validate new modules before broad rollout.

## UI Decision Guide Link

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Read `UI_DECISION_GUIDE.md` before auditing the authoring flow." -->
- Read the project's UX decision guide before auditing the authoring flow.
- Default to application-style staged workflow for complex multi-step content creation.
