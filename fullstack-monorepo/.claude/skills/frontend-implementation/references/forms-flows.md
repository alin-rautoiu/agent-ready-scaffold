# Forms And Flows

Use this reference for forms and workflow surfaces.

## Source Guidance

- `UI_DECISION_GUIDE.md`
- <!-- TODO: link to relevant UX audit skill files if applicable -->

## Form Defaults

- Use a form for short, linear tasks; use an application workflow for stateful, revisitable work.
- Keep visible, persistent labels for every input. Do not rely on placeholders as labels.
- Associate labels programmatically.
- Mark required fields clearly with text and appropriate ARIA attributes.
- Use appropriate input types and autocomplete values for common fields.
- Validate inline near the field, usually on blur or submit.
- Move focus to the first invalid field after submit failure.
- Disable or show a pending state on submit buttons to prevent double submission.
- Label submit buttons with the real action.

## Staged Workflows

- <!-- TODO: Describe how to treat complex multi-step processes as application workflows. -->
- Make progress stages explicit when the task touches a multi-step flow.
- Preserve entered data when moving backward or across stages.
- Keep autosave, save state, and destructive scope visible.
- Separate save/draft actions from final publish/send actions.

## Controls

- Use a toggle switch only when the change takes effect immediately; use a checkbox for values saved with a form.
- Implement switches with appropriate accessibility roles and labels.
- For multi-select controls, show selected count and removable selected items where space allows.
- Provide Select All and Clear All for long multi-select lists.
- For date/time inputs, prefer native inputs unless a custom picker is required.

## Verification

- <!-- TODO: List required verification steps for forms (tests, focus check, etc.). -->
