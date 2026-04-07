# src/client/components/

Reusable UI components, organized by domain. Before creating a new component, check `common/` — the primitive you need may already exist.

## Subdirectories

| Directory | Contents |
| --- | --- |
| `common/` | Stack-agnostic primitives: buttons, inputs, tables, badges, modals |
| `layout/` | Page-level layout shells shared across all admin pages |
| `domain-scope/` | Components scoped to the domain |

## Layering rule

`common/` and `layout/` must not import from domain directories. Domain directories may import from `common/` and `layout/`, but not from each other. If two domains need to share a component, promote it to `common/`.

## What does NOT go here

- Data fetching (that belongs in `hooks/`)
- Business logic (that belongs in the server layer)
- Page-level routing components (those belong in `pages/`)
