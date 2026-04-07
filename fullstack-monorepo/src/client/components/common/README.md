# src/client/components/common/

Shared UI primitives with no domain knowledge. Used everywhere in the application.

## What goes here

Generic, composable components that work in any context:

- Buttons (with loading states, variants)
- Form inputs, selects, textareas
- Tables and table rows
- Badges and status indicators
- Pagination controls
- Inline messages and empty states
- Overflow menus

## Rules

**Do** check here before building a new component. Duplicating a common component creates two sources of truth that will drift apart.

**Do** keep components here completely domain-free. A component in `common/` must not import from any domain directory or reference any domain type.

**Don't** add components here that are only used in one domain. Components earn their place in `common/` when a second domain needs them. Until then, they live in the domain that owns them.
