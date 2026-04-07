# tests/helpers/

Shared test infrastructure reused across unit and integration test files. These utilities eliminate boilerplate and ensure consistent test setup across the suite.

## What goes here

<!-- TODO: list your helper files, their exports, and their purposes. e.g.:
| File | Exports | Purpose |
| --- | --- | --- |
| `auth.ts` | `seedAdmin`, `makeAuthCookie` | Admin seeding and auth cookie generation for authenticated test requests |
| `db.ts` | `createTestDb` | In-memory database factory for integration tests |
| `server.ts` | `makeTestServer` | App → HTTP test client factory |
-->

## Rules

**Do** reuse these helpers in every test that needs them. If a helper doesn't exist yet, add it here — not inline in the test file.

**Don't** modify these helpers to accommodate a single test's edge case. If you need different setup behavior, create a new helper or extend the existing one in a backwards-compatible way.

**Don't** add helpers that are only used in one test file. If a utility is genuinely one-off, keep it in that test file. Move it here when a second test file needs it.

**Do** keep helpers deterministic. Random data, timing-dependent logic, or environment-dependent behavior in helpers causes flaky tests.
