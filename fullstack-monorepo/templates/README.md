# templates/

<!-- TODO: describe your template type and rendering engine. e.g.:
  "Handlebars email templates rendered by the mailer service."
  "Jinja2 email templates rendered by the notification service."
  "Liquid templates for transactional SMS and email."
-->

## What goes here

<!-- TODO: list the template files and their purposes. e.g.:
| File | Purpose |
| --- | --- |
| `newsletter.hbs` | Main newsletter edition template |
| `invite.hbs` | Subscriber invite email |
-->

## Rules

**Don't** hardcode recipient-specific data. All dynamic content must be passed as template variables at render time.

**Don't** put business logic in templates. Templates receive pre-shaped data — filtering, formatting, and conditional logic belong in the service that calls the renderer.

<!-- TODO: add any format-specific constraints. e.g. (HTML email):
**Do** write HTML that works in email clients — use `<table>` for layout, inline styles, no JavaScript, no external fonts, absolute image URLs with explicit dimensions.

**Do** test template output locally before sending to real addresses.
-->
