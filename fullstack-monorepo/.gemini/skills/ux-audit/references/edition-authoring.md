---
name: ux-audit/content-authoring
description: UX audit checklist for multi-step content authoring workflows (build, review, QA, publish, and lifecycle maintenance). Invoke before auditing content editors, publishing flows, and send/deliver actions.
---

# Multi-Step Content Authoring UX Audit Skill

**Sources:** nngroup.com/articles/progressive-disclosure, nngroup.com/articles/forms-vs-applications, nngroup.com/articles/confirmation-dialog, gov.uk/guidance/content-design/what-is-content-design, gov.uk/guidance/content-design/user-needs, gov.uk/guidance/content-design/organising-and-grouping-content-on-gov-uk, gov.uk/guidance/content-design/content-maintenance, gov.uk/guidance/content-design/gov-uk-content-retention-and-withdrawal-archiving-policy, gov.uk/guidance/content-design/data-and-analytics, gov.uk/guidance/content-design/images, gov.uk/guidance/content-design/tables, insidegovuk.blog.gov.uk/2019/04/23/building-and-testing-the-new-content-publisher

---

## When to invoke this skill

Invoke this skill when auditing:
- <!-- TODO: e.g.: "Content creation and editing in `<editor-page-path>`" -->
- Preview and QA checks before publish or send
- <!-- TODO: e.g.: "Publish/send confirmation and audience targeting in `<publish-panel-component>`" -->
- Archive and lifecycle handling for published content

---

## Workflow Model: Application, Not Single Form

- Audit the editor as a multi-stage application workflow: Build → Review → QA → Publish.
- Show stable stage/location cues so users always know where they are in the flow.
- Keep frequent controls visible; progressively disclose advanced settings.
- Preserve state across long sessions with clear autosave status and failure recovery.

---

## Progressive Disclosure Checks

- Show only controls needed for the current authoring step.
- Delay advanced options until users ask for them.
- Keep high-impact controls obvious and always findable.
- Avoid adding hidden dependencies between collapsed sections.

---

## Confirmation Dialog Checks (Publish/Destructive)

- Use confirmation for high-impact actions only.
- Dialog title names the action and the specific content item.
- Body explains consequence, scale, and reversibility.
- Primary action label is explicit (e.g., <!-- TODO: e.g.: `"Publish to 847 recipients"` or `"Send to all active users"` -->).
- Secondary action keeps work safe (e.g., "Keep editing").

---

## Publish-Readiness Checks

- Pre-publish checklist is visible and complete before the final action.
- <!-- TODO: list the specific pre-publish checks for this app. e.g.: "Verify required fields, linked assets, audience targeting, and unsubscribe/opt-out path." -->
- Distinguish test/preview success from production-publish readiness.
- Block final publish on critical failures; report blockers inline with clear remediation steps.

---

## Content Design Checks (User Needs First)

- Every field and control should support a concrete authoring need.
- Group content by author tasks, not backend model names.
- Use clear, plain labels that describe action and outcome.
- Keep terminology stable between editor, preview, and publish steps.

---

## Data, Tables, and Media Checks

- Use tables only when row/column comparison is the real task.
- Keep table semantics and keyboard behavior accessible.
- Use images only when they add meaning; do not embed critical text in images.
- Ensure media blocks have fallback context and safe rendering behavior across target environments.

---

## Maintenance, Retention, and Withdrawal Checks

- Authoring UI should expose lifecycle status (draft / scheduled / published / archived / withdrawn).
- Withdrawal flows should capture reason and user-facing replacement guidance.
- Archive and retention actions should make scope explicit before commit.
- Include recurring maintenance checks for stale content, broken links, and outdated copy.

---

## Delivery and Iteration Checks

- Prefer modular authoring components over one monolithic editor panel.
- Add new capabilities as isolated modules with dedicated controls.
- Validate new modules with lightweight user testing before broad rollout.
- Iterate quickly using feedback loops from real editorial use.
