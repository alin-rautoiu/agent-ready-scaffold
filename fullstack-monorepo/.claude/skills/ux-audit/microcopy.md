---
name: ux-audit/microcopy
description: UX writing and microcopy audit checklist. Invoke on every page — microcopy issues (button labels, error messages, empty states, titles, tooltips) exist everywhere in the app.
---

# Microcopy & UX Writing Audit Skill

**Sources:** smashingmagazine.com/2024/06/how-improve-microcopy-ux-writing-tips-non-ux-writers, css-tricks.com/another-stab-at-truncated-text, css-tricks.com/tooltip-best-practices

---

## When to invoke this skill

Invoke on **every page**. Microcopy problems are universal. Specifically look for:
- Button labels
- Page and section headings
- Empty states
- Error messages
- Placeholder text
- Confirmation dialog copy
- Toast/notification text
- Truncated text

---

## Button Labels

**Rule: label must describe the immediate next action, not a distant goal.**

| Bad | Good | Why |
|---|---|---|
| Submit | Save source | Generic — what is being submitted? |
| Yes / No | Delete / Cancel | Specific — confirms the consequence |
| Get code | Send code | You can't guarantee delivery |
| Edit | Edit source settings | Ambiguous when multiple edit buttons appear per row |
| Send | Send edition to 847 subscribers | Missing consequence and scale |

<!-- TODO: Add your app-specific checks here. e.g.:
- Article Queue: "Approve", "Reject", "Delete" — are these specific enough given the context?
- Edition Editor: "Save", "Send", "Build" — does each button label match exactly what happens next?
- Subscribers invite: what does the button say — "Invite", "Send invitation", "Generate link"? Should match what actually happens.
- Confirmation dialogs: replace generic Yes/No with action-specific labels ("Delete source" / "Cancel").
- Destructive action buttons must not share the same visual weight as primary actions.
-->

---

## Page and Section Headings

**Rule: titles must work as standalone text and be specific.**

- Avoid vague headings: "Settings", "Edit" — add context: "Scheduler Settings", "Edit Source"
- Modal headings must name the object: "Delete Article?" not "Confirm Action"
- Section headings inside pages must describe what the section contains, not just label a UI element

<!-- TODO: Add your app-specific checks here. e.g.:
- Dashboard: do widget headings describe what metric they show?
- Edition Editor: is it clear which edition is being edited (title shown in heading)?
- Dialogs: does each dialog heading describe the specific action?
-->

---

## Empty States

**Rule: empty states must include context + a call to action. Never just "No items found."**

| Page | Weak empty state | Strong empty state |
|---|---|---|
| Item Queue | "No items." | "No items to review. Processing runs every Monday at 6:00 AM — or trigger it manually." + "Run now" button |
| Record List | "No records." | "No records yet. Create your first record to get started." + "New record" button |
| Members | "No members." | "No members yet. Share an invite link to start growing your list." + "Create invite" button |
| Sources | "No sources." | "Add your first source to start collecting items." + "Add source" button |
| Activity Log | "No logs." | "No activity has been recorded yet." |
| Events | "No events." | "No upcoming events. Add one to include it in your next publication." + "Add event" button |

<!-- TODO: Add your app-specific checks here. e.g.:
- What does the empty state say?
- Does it explain why it is empty?
- Does it offer a path forward (CTA button)?
-->

---

## Error Messages

**Rule: explain what happened, identify which field, and tell the user how to fix it.**

- Bad: "An error occurred."
- Bad: "Invalid value."
- Good: "Source URL must start with http:// or https://"
- Good: "Email address is not valid — check for typos and try again."
- Good: "Failed to send edition. Check your SMTP settings and try again." + link to settings

<!-- TODO: Add your app-specific checks here. e.g.:
- Form validation errors: are they inline per-field, or generic banners?
- API errors: when a save/send fails, is the error message specific enough to act on?
- Login error: "Invalid credentials" is fine, but "Account locked" should be distinct.
- Network errors: does the app show a useful message when the API is unreachable?
-->

---

## Placeholder Text

**Rule: placeholder text is not a label. It disappears on focus and fails accessibility requirements.**

- Placeholder should show a realistic example, not repeat the label: `placeholder="e.g. https://blog.example.com/feed.xml"` — not `placeholder="URL"`
- Never use placeholder as the sole form label
- Placeholder contrast must meet 4.5:1 (many designs fail this)

<!-- TODO: Add your app-specific checks here. e.g.:
- Does every input have a visible label AND a helpful placeholder example?
- Are any inputs label-free (relying on placeholder only)?
-->

---

## Confirmation Dialog Copy

**Rule: confirmation dialogs must state the consequence, not ask for abstract confirmation.**

| Weak | Strong |
|---|---|
| "Are you sure?" | "Delete 'Romania Digest #12'? This cannot be undone." |
| "Confirm" / "Cancel" | "Delete edition" / "Keep edition" |
| "Yes" / "No" | "Revoke invite" / "Keep invite" |

<!-- TODO: Add your app-specific checks here. e.g.:
- Deleting a source, article, subscriber, edition, event, editor
- Revoking an invite
- Sending an edition (irreversible — confirmation must show recipient count)
-->

---

## Truncated Text

**Rule: truncated content must always have a way to see the full value.**

- Article titles in the queue that are truncated: is there a tooltip, expand control, or detail view that shows the full title?
- Source URLs that overflow: truncate with ellipsis in the middle (to preserve the domain), and show full URL on focus/hover
- Edition content preview: truncation is acceptable but a "View full" path must exist
- Truncated text must not hide accessibility text — what is truncated visually must still be announced completely to screen readers OR an expand mechanism exists

<!-- TODO: Add your app-specific checks here. e.g.:
- Article Queue: long article titles — truncated? Full title accessible on hover or in detail view?
- Sources table: long source URLs — how are they displayed?
- Mailing list descriptions: truncated? Can user expand?
-->

---

## Notification and Toast Copy

**Rule: notifications must state what happened, not just confirm a button was clicked.**

| Weak | Strong |
|---|---|
| "Saved!" | "Source saved." or "Changes saved to Romania Digest #12." |
| "Error!" | "Failed to save — check your network connection." |
| "Done." | "Invitation sent to contact@example.com." |
| "Sent!" | "Edition sent to 847 subscribers." |

<!-- TODO: Add your app-specific checks here. e.g.:
- What do success toasts say after saving a source, approving an article, sending an invitation, sending an edition?
- Are error toasts specific enough to act on?
- Do toasts auto-dismiss? Are they accessible via ARIA live regions?
-->

---

## Consistent Terminology

**Rule: one term per concept across the entire app.**

Newsletter-specific terms to verify are used consistently:
- "Article" vs "Post" vs "Item" — pick one
- "Edition" vs "Newsletter" vs "Issue" — pick one
- "Subscriber" vs "Contact" vs "Member" — pick one
- "Source" vs "Feed" vs "RSS source" — pick one
- "Mailing list" vs "List" vs "Group" — pick one
- "Invite" vs "Invitation" vs "Invite link" — pick one
- "Send" vs "Publish" vs "Distribute" for the edition delivery action — pick one

Log any inconsistencies across pages as a minor finding.

---

## Content Design Additions (GOV.UK)

Reference sources: gov.uk/guidance/content-design/what-is-content-design, gov.uk/guidance/content-design/user-needs, gov.uk/guidance/content-design/organising-and-grouping-content-on-gov-uk, gov.uk/guidance/content-design/content-maintenance, gov.uk/guidance/content-design/data-and-analytics

- Confirm authoring copy is user-needs-first and task-oriented.
- Group labels and helper text by editorial task, not backend implementation.
- Keep terms stable across editor, preview, and send flows.
- Review date-sensitive guidance regularly so labels do not go stale.
- Use analytics evidence to improve high-friction copy in send and validation flows.

---

## UI Decision Guide Integration

Canonical reference: `UI_DECISION_GUIDE.md`

- Wording must reinforce the screen's primary decision and next action.
- Terminology should follow interaction model choices (application workflow language for edition authoring).
- Headings and labels should map to hierarchy levels consistently across sections and overlays.
- Avoid copy that compensates for weak structure; fix hierarchy and flow first.
