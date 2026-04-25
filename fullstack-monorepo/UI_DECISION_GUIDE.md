# UI Decision Guide

This guide is the default decision framework for UX and UI work in this repository.

It is intentionally decision-first: use it to choose patterns before discussing visual polish.

## Sources

- https://www.smashingmagazine.com/2018/02/comprehensive-guide-ui-design
- https://www.smashingmagazine.com/2022/10/typographic-hierarchies
- https://www.smashingmagazine.com/2013/02/creating-visual-hierarchies-typography/
- https://www.nngroup.com/articles/forms-vs-applications/
- https://www.airtable.com/guides/collaborate/get-the-starting-started-with-interface-designer
- https://www.baymard.com/learn/form-design

## Priority Order

When making UI decisions, resolve questions in this order:

1. User job and outcome.
2. Interaction model (form vs application).
3. Information hierarchy and task flow.
4. Typography hierarchy and readability.
5. Component-level control choices and validation behavior.
6. Visual styling and motion.

If a later choice conflicts with an earlier one, earlier priorities win.

## Form Vs Application

Use this rule first:

- Choose a form for short, linear, low-state tasks.
- Choose an application workflow for multi-step, stateful, revisitable work.

<!-- TODO: Document which major workflows in your app are treated as application workflows vs long forms. e.g.:
- "Edition authoring is an application workflow, not a long form."
- "Build, review, QA, and send should be explicit stages."
-->

## Interface Composition

Compose screens around high-frequency decisions:

- Put primary decision controls in the first viewport.
- Defer advanced options behind explicit reveals.
- Keep expensive actions obvious and hard to trigger accidentally.
- Prefer modular panels/blocks over one overloaded surface.

Design for real collaboration and operational use:

- Surface ownership, status, and scope where actions happen.
- Keep side effects visible (who is affected, when, and how much).
- Provide stable landmarks so users can resume interrupted work quickly.

## Visual And Typographic Hierarchy

Hierarchy should communicate priority without reading every word.

- Use clear scale contrast for headings and section levels.
- Keep body text stable and readable; avoid decorative size oscillation.
- Use weight, spacing, and grouping before adding extra colors.
- Ensure scan path reveals: page goal, current stage, next action.

Typography defaults for admin/data-heavy UI:

- One primary text family per surface.
- Distinct heading/body scales with consistent step intervals.
- Comfortable line length and line height for long-form editing.
- Avoid center-aligned long text blocks in operational screens.

## Form Design Rules

Apply these by default:

- Prefer single-column forms for completion speed and error recovery.
- Ask only for required inputs at each step.
- Put helper text next to the field that needs it.
- Validate near the field, in context, with clear recovery action.
- Label required/optional states explicitly and consistently.
- Use autocomplete where appropriate and make suggestions concise.

For large workflows:

- Split into meaningful stages with visible progress.
- Preserve entered data on navigation or interruptions.
- Show review and confirmation before irreversible actions.

## Decision Heuristics For Components

When selecting UI patterns:

- Table vs cards: use tables for comparison, cards for status-first workflow.
- Modal vs inline: use modal for high-risk confirmations, inline for low-risk edits.
- Tooltip vs inline text: never hide required information in tooltips.
- Toggle vs checkbox: toggle for immediate effect, checkbox for submit-time changes.

## Quality Bar

A change is not ready unless it satisfies all:

- Primary task is obvious within 5 seconds.
- Current state and next action are unambiguous.
- Validation and failure states are recoverable.
- Keyboard/focus behavior supports all core actions.
- Wording reflects user needs, not internal implementation terms.

## How To Use In This Repo

- UX audits: treat this guide as the default cross-cutting baseline.
- Skill checklists: apply page-specific checks plus these global rules.
- UI reviews: when feedback conflicts, cite this guide's priority order.

## Do This Here (Highest-Confidence Examples)

Use these as default references when implementing UI changes:

- <!-- TODO: Describe your design tokens and base interaction states. e.g.: "Use existing CSS tokens from index.css." -->
- <!-- TODO: Link to your primary page structure and hierarchy primitives. -->
- <!-- TODO: Link to your primary form composition and field-level clarity examples. -->
- <!-- TODO: Describe mobile navigation and accessibility baseline. -->
- <!-- TODO: Link to your shared confirmation dialog pattern. -->
- <!-- TODO: Link to your responsive table strategy. -->

## Needs Improvement

- <!-- TODO: List any areas of the UI that still deviate from these rules and the planned direction for fixing them. -->
