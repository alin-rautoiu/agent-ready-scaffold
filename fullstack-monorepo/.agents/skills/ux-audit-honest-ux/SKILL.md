---
name: ux-audit/honest-ux
description: Ethical and transparent UI audit checklist. Invoke before auditing any sign-up, opt-out, consent, settings, AI disclosure, or credential-handling flow.
---

# Honest & Ethical UX Audit Skill

**Sources:** smashingmagazine.com/2016/10/how-to-build-honest-uis-and-help-users-make-better-decisions

---

## When to invoke this skill

Invoke this skill when auditing:
<!-- TODO: list this project's trust-sensitive pages, e.g.:
  "- Sign-up / join page (what are users agreeing to?)"
  "- Unsubscribe / opt-out page (easy? friction-free?)"
  "- Subscription or list management (is it clear what a user is being added to?)"
  "- Settings (automated behaviour, data decisions)"
  "- Invite flow (what does the invite tell a recipient before they click?)"
-->

---

## Transparency Principles

### Show information at the point of decision — not buried elsewhere

The primary opt-in moment is the primary trust-building moment. When a new user sees the sign-up form, they should know:
- What they are signing up for (service name, frequency, type of content)
- Who is operating it (organisation name)
- How to opt out ("You can unsubscribe at any time")
- Whether their data is shared with third parties

<!-- TODO: add project-specific opt-in page checks here, e.g.:
  "- Does the page describe what the service is about, how often it communicates, and who runs it?"
  "- Is there a visible 'You can unsubscribe at any time' line before the submit button?"
  "- Is the benefit to the user stated clearly?"
-->

### Do not hide friction or costs in tooltips

If there are conditions attached (e.g., only certain lists are receiving content, or the service is irregular), state this near the submit action — not buried in a tooltip or fine print.

---

## Opt-Out UX — Remove Dark Patterns

The opt-out flow must be:
- **One click or at most one confirmation** — not a multi-page survey, not re-engagement tricks.
- **Immediately effective** — no "Your request will be processed within 10 business days."
- **Honest about what happens** — "You have been removed from [Service]. You will receive no further emails."
- **No guilt-based messaging** — avoid copy like "Are you sure? You'll miss out on great content."

<!-- TODO: add project-specific opt-out checks here, e.g.:
  "- Does the page confirm the action immediately and clearly?"
  "- Does it avoid persuasive retention copy?"
  "- Is there an option to reverse the action if it was accidental?"
  "- Is the success message specific (which list/service they were removed from)?"
-->

---

## Algorithmic and Automated Decision Transparency

If the app uses automation or AI:
- **AI-generated or AI-assisted content must be labelled** — users should know they are reviewing machine output, not the original author's words.
- **Automated jobs**: when did the last run occur? Does the UI show when data was collected and from which sources?
- **Scheduler/cron**: in Settings, is it clear what the automation does, when it runs, and what happens if it is disabled?

<!-- TODO: add project-specific automation transparency checks here, e.g.:
  "- Are AI-generated summaries or recommendations labelled as AI-generated?"
  "- Does the settings page explain what automated jobs do, when they run, and what disabling them means?"
  "- If an automated job fails, is the user informed?"
-->

---

## User Control and Easy Opt-Out

**Principle:** Users must be able to undo or opt out of automated behaviours easily.

- Automation on/off controls must be prominent and labelled with what they do — not hidden deep in settings.
- Manual override for automated tasks must be available even when automation is enabled.
- Bulk actions (bulk delete, bulk send) must have a confirmation step showing the scope.
- Any action that cannot be undone must warn the user and require confirmation — state irreversibility explicitly: "This cannot be undone."

<!-- TODO: add project-specific control checks here, e.g.:
  "- Automation toggle: is its behaviour described in plain language?"
  "- Are API keys or credentials masked by default, with a show/hide toggle?"
-->

---

## Consent and Data Transparency

- The service collects user data (e.g., email addresses). Users have a right to know this when they sign up.
- The opt-out flow is the primary mechanism for data removal. Confirm it removes or anonymises the user record or at minimum stops all communication.
- External service integrations (e.g., SMTP relay, analytics) should be transparent to admins in Settings.

<!-- TODO: add project-specific data transparency checks here, e.g.:
  "- Is there any statement on the join page about how the user's email is used?"
  "- Does opting out remove or anonymise the user record?"
  "- In Settings, are external service integrations clearly labelled?"
-->

---

## Anti-Patterns to Flag Immediately

| Pattern | Severity | Description |
|---|---|---|
| Opt-out buried or multi-step | Critical | Must be maximum 1-click from any communication or 1 step on the opt-out page |
| Guilt copy on opt-out | Major | Manipulative retention copy |
| No description of service on sign-up page | Major | User cannot make an informed decision |
| AI-generated content not labelled | Major | User believes they are reading original content |
| Automation behaviour not explained in Settings | Minor | Admin cannot understand what will happen when they enable automation |
| Credentials/tokens visible in plain text | Critical | API keys, passwords, subscriber tokens must be masked by default |

---

## Content Lifecycle Transparency Additions (GOV.UK)

Reference sources: gov.uk/guidance/content-design/content-maintenance, gov.uk/guidance/content-design/gov-uk-content-retention-and-withdrawal-archiving-policy

- Make lifecycle states explicit in authoring and archive views (draft, scheduled, published, archived, withdrawn).
- For withdrawal or delete actions, require clear rationale and replacement guidance.
- Show exact retention/archive scope before commit actions.
- Include recurring maintenance checks for stale content and outdated copy.

---

## UI Decision Guide Integration

<!-- TODO: specify the path to this project's UX decision guide, e.g.: "Canonical reference: `UI_DECISION_GUIDE.md`" -->
- Read the project's UX decision guide before trust/consent review.
- Apply decision-first clarity to trust-sensitive actions: state, consequence, and next action must be explicit.
- Keep consent and transparency copy tied to real user decisions, not implementation details.
