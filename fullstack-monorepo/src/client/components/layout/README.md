# src/client/components/layout/

Page layout system. Provides structural shells that every admin page composes from rather than building its own layout.

## What goes here

Layout primitives that define the visual skeleton of a page — headers, content areas, sidebars, navigation shells — without any domain-specific content.

<!-- TODO: list the layout components your project exports. e.g.:
- `PageShell` — outermost wrapper (sidebar + content area)
- `PageHeader` — title, breadcrumb, and primary action area
- `PageCard` — content card container
- `PageTable` — table with consistent spacing and empty state
- `PageEmptyState` — empty state display
- `PageSection` — labeled content section within a card
-->

## Rules

**Do** use these shells in every page. Consistent layout is enforced structurally, not by convention.

**Don't** add domain logic or domain data to layout components. Layout components receive everything they display as props.

**Don't** create page-specific layout variants here. If one page needs a unique layout, build it in that page's file or in the relevant domain component directory.
