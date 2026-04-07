# Repository Knowledge

Stable facts about this project for quick Codex orientation. Keep this file concise — Codex loads it fresh each session.

<!-- TODO: fill in the sections below with facts about this project. Remove sections that don't apply. -->

## Architecture

<!-- TODO: describe the high-level structure. e.g.:
  - Single-package monorepo with backend in `<backend-path>/`, frontend in `<frontend-path>/`, shared modules in `<shared-path>/`.
  - `<app-factory-path>` is the route-surface source of truth.
  - Entry point: `<entry-point-path>` — loads env, runs migrations, starts the server.
-->

## Database

<!-- TODO: describe the data layer. e.g.:
  - Default runtime is `<primary-db>`; `<secondary-db>` supported via env flags.
  - Driver selection: `<runtime-config-path>`.
  - Write helpers: `<write-helpers-path>` — use instead of calling the ORM directly.
-->

## API Surface

<!-- TODO: list route prefixes and any key conventions. e.g.:
  - Prefixes: `/api/auth`, `/api/users`, `/api/<resource>`, ...
  - Route modules: one file per resource under `<routes-path>/`.
-->

## Frontend

<!-- TODO: describe the client app. e.g.:
  - `<Framework>` app built with `<build-tool>`.
  - Pages: `<page-1>`, `<page-2>`, ...
  - Public pages: `<public-page-1>`, ...
  - Data fetching: `<library>` with key factories in `<query-dir>/`.
  - i18n: `<i18n-dir>/` (if applicable).
-->

## Deployment

<!-- TODO: describe the deployment model. e.g.:
  - Primary local model: `<local-run-command>`.
  - Public exposure: `<tunnel/proxy approach>`.
  - Key scripts: `<migrate-command>`, `<secret-gen-command>`.
-->

## Key Behavioral Rules

<!-- TODO: list any non-obvious invariants agents must respect. e.g.:
  - JSON-serialized columns should be parsed/stringified at route boundaries, not in services.
  - Date values must be normalized before JSON responses.
  - Settings in the key-value store override env defaults at runtime.
-->
