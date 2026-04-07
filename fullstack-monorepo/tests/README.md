# tests/

<!-- TODO: Describe your test framework and suite layout. e.g.: "Vitest test suite." -->

Unit tests and integration tests are separated by directory. Shared infrastructure lives in `helpers/`.

## Subdirectories

| Directory | Purpose |
| --- | --- |
| `unit/` | Fast, isolated tests — no DB, no HTTP, no external dependencies |
| `integration/` | End-to-end route and service tests against a real test DB |
| `helpers/` | Shared test setup utilities reused across both suites |

## Running tests

```bash
<!-- TODO: List your test commands. e.g.:
<test-command>                                           # full suite
<single-test-command> tests/unit/<file>.test.<ext>       # single unit test file
<single-test-command> tests/integration/<file>.test.<ext> # single integration test file
<watch-command>                                          # watch mode
<coverage-command>                                       # coverage report
-->
```

## Rules

**Do** write tests before implementation when the behavior is testable in isolation.

**Don't** write tests that only confirm the implementation you just wrote. Tests should describe the required behavior, written before or alongside the code. See [Red/green TDD with coding agents](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) — "It's important to confirm that the tests fail before implementing the code."

<!-- TODO: list the shared helpers available. e.g.:
**Do** use `tests/helpers/` utilities for auth setup, DB seeding, and server creation. Do not write ad-hoc setup inline in test files.
-->

**Don't** use mock databases in integration tests. Integration tests hit a real <!-- TODO: e.g.: in-memory --> test DB instance. Mocking the DB validates the mock, not the code. The [red/green TDD guide](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) notes that test-first development "ensures a robust automated test suite that protects against future regressions" — but only when tests exercise real behavior.

**Do** run the full suite before any handoff or commit. No failing tests.

**Don't** skip or comment out failing tests to make the suite pass. Fix the underlying issue.
