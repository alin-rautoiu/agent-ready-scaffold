# src/

<!-- TODO: describe your source layout at a high level. e.g.:
  "Application source code. The monorepo keeps backend, frontend, and shared code in one package — separated by subdirectory, not by npm workspace."
-->

## Subdirectories

<!-- TODO: list your source subdirectories and their purposes. e.g.:
| Directory | Purpose |
| --- | --- |
| `server/` | HTTP API (Hono) — routes, services, database, middleware |
| `client/` | Frontend SPA (React/Vite) — components, pages, hooks, i18n, TanStack Query |
| `shared/` | Cross-boundary types and pure logic used by both |
-->

## Layering rules

Dependencies flow one direction only:

<!-- TODO: update directory names to match your project if different from the scaffold defaults. e.g.: -->
```
server/ → shared/
client/ → shared/
server/ ← (no imports from client/)
client/ ← (no imports from server/)
```

The shared layer may not import from any application layer. If code in the shared layer needs something from a specific layer, it belongs in that layer, not in the shared layer.

**Further Reading:**

- [Harness engineering](https://openai.com/index/harness-engineering/) — "enforce invariants, not micromanaging implementations"; structural tests that catch dependency layer violations give agents clear boundaries without micromanaging every change
- [Context engineering for coding agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) — well-structured codebases serve as powerful context themselves; clear layering reduces the explicit instruction agents need to make correct architectural decisions

## What goes here

Only application source code. No configuration files, no build artifacts, no test files.

## What does NOT go here

<!-- TODO: update these paths to match your project conventions. e.g.:
- Tests (those live in `tests/`)
- Build output (that goes in `dist/` or `build/`, gitignored)
- Scripts (those live in `scripts/`)
- Email templates (those live in `templates/`)
-->
