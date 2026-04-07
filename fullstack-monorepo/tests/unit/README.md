# tests/unit/

Fast, isolated unit tests. No database, no HTTP server, no external process.

## What goes here

Tests for pure functions, service logic that can be called directly, and utilities:

<!-- TODO: list the categories of unit tests in your project. e.g.:
- Feed parsing (`rss.test.ts`)
- Date normalization
- Pagination utilities
- Permission logic
- Pure service functions that don't require a DB connection
-->

## What does NOT go here

- Tests that make HTTP requests (those go in `tests/integration/`)
- Tests that touch the database (those go in `tests/integration/`)
- Tests that require a running server

## Conventions

<!-- TODO: document how external services are mocked in your stack. e.g.:
**Do** mock external services (`summarizer.ts`, `mailer.ts`) using their `setClient()` / `setTransport()` injection points, not by mocking modules.
-->

**Do** keep tests fast. A unit test suite should complete in seconds. If a test is slow, it probably belongs in `tests/integration/`.

**Don't** create test infrastructure (DB helpers, auth cookies) in unit test files. If you find yourself needing that, the test is an integration test.
