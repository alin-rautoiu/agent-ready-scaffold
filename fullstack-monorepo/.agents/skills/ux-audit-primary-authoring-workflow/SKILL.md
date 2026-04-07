---
name: ux-audit/primary-authoring-workflow
description: UX audit checklist for multi-stage content authoring and publishing workflows (build, review, QA, publish, lifecycle). Invoke before auditing the app's primary content editor and send/publish flows.
---

# Primary Authoring Workflow UX Audit Skill

**Sources:** nngroup.com/articles/progressive-disclosure, nngroup.com/articles/forms-vs-applications, nngroup.com/articles/confirmation-dialog, gov.uk/guidance/content-design/what-is-content-design, gov.uk/guidance/content-design/user-needs, gov.uk/guidance/content-design/content-maintenance

---

## When to invoke this skill

Invoke this skill when auditing:
<!-- TODO: specify this project's primary authoring flow, e.g.:
  "- The main content editor page"
  "- Preview and QA checks before publish/send"
  "- Publish/send confirmation and audience targeting"
  "- Archive and lifecycle handling for published content"
-->

---

## Workflow Model: Application, Not Single Form

- Audit the editor as a multi-stage application workflow, not a single long form.
- Define explicit stages (e.g. Build → Review → QA → Publish) and make the current stage visible.
- Show stable stage/location cues so users always know where they are.
- Keep frequent controls visible; progressively disclose advanced settings.
- Preserve state across long sessions with clear autosave status and failure recovery.

---

## Progressive Disclosure Checks

- Show only controls needed for the current authoring step.
- Delay advanced options until users ask for them.
- Keep high-impact controls obvious and always findable.
- Avoid hidden dependencies between collapsed sections.

---

## Confirmation Dialog Checks (Publish/Destructive)

- Use confirmation for high-impact actions only.
- Dialog title names action + target item.
- Body explains consequence, scale, and reversibility.
- Primary action label is explicit (for example: <!-- TODO: e.g.: `"Publish to 847 recipients"` or `"Send to all active users"` -->).
- Secondary action keeps work safe (for example: "Keep editing").

---

## Pre-Publish Checklist Checks

- A pre-publish checklist is visible and complete before the final action.
<!-- TODO: list the critical pre-publish checks for this project, e.g.:
  "- Verify links, personalization variables, subject/preheader"
  "- Confirm rendering in representative client/device combinations"
  "- Distinguish test-send success from production-send readiness"
-->
- Block final publish on critical failures; report blockers inline with clear remediation steps.

---

## Content Design Checks (User Needs First)

- Every field and control should support a concrete user need.
- Group content by user tasks, not backend model names.
- Use clear, plain labels that describe action and outcome.
- Keep terminology stable between editor, preview, and publish steps.

---

## Data and Media Checks

- Use tables only when row/column comparison is the real task.
- Keep table semantics and keyboard behavior accessible.
- Use images only when they add meaning; do not embed critical text in images.

---

## Maintenance and Lifecycle Checks

- Authoring UI should expose lifecycle status (draft / scheduled / published / archived).
<!-- TODO: specify what lifecycle states exist in this project -->
- Withdrawal or archive flows should capture reason and show scope before commit.
- Archive and retention actions should make scope explicit.
- Include recurring maintenance checks for stale content, broken links, and outdated copy.

---

## Delivery Pattern Checks

- Prefer modular authoring components over one monolithic editor panel.
- Add new capabilities as isolated modules with dedicated controls.
- Validate new modules with lightweight user testing before broad rollout.
- Iterate quickly using feedback loops from real user activity.

---

## Project-Specific Checks

<!-- TODO: add project-specific checks for this app's authoring flow here, e.g.:
  "- Is there a clear sense of which stage the user is in?"
  "- Can the user go back and change earlier inputs after advancing?"
  "- Is the publish action clearly separated from the save/draft action?"
  "- Does saving preserve all edits including item prioritisation?"
-->
