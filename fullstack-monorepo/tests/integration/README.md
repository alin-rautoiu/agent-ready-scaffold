# tests/integration/

<!-- TODO: describe your integration test setup. e.g.:
  "End-to-end integration tests. Each test boots a real in-memory SQLite database and a real Hono HTTP server, then exercises the full request/response cycle."
  "End-to-end integration tests. Each test spins up a real test database and the application server, then exercises the full request/response cycle."
-->

## What goes here

Tests that verify the complete behavior of a route or multi-step workflow:

- Authentication flows
- Route handlers (request → service → DB → response)
- Middleware enforcement (auth guards, feature permissions)
- Multi-step operations (e.g., create subscriber → send invite → revoke)

## Setup pattern

<!-- TODO: document your test setup pattern and helper imports. e.g. (Node.js/Hono/Supertest):
```typescript
import { createTestDb } from '../helpers/db'
import { makeTestServer } from '../helpers/server'
import { seedAdmin, makeAuthCookie } from '../helpers/auth'
import { createApp } from '../../src/server/app'
import request from 'supertest'

let db: ReturnType<typeof createTestDb>
let app: ReturnType<typeof createApp>
let authCookie: string

beforeEach(async () => {
  db = createTestDb()
  app = createApp(db)
  await seedAdmin(db)
  authCookie = await makeAuthCookie(app)
})
```
-->

<!-- TODO: reference your test helpers directory. e.g.:
Always use `tests/helpers/` for setup. Never create an ad-hoc test DB or mock auth inline.
-->

## Rules

<!-- TODO: state your test database policy. e.g.:
**Do** use a real in-memory database. Do not mock the database layer.
-->

**Do** test error cases: missing records (404), invalid input (400), unauthorized access (401/403).

**Don't** let tests share state. Each test should start with a fresh DB via `beforeEach`.

<!-- TODO: document how external transports are mocked in your stack. e.g.:
**Don't** make real external calls (real email sends, real HTTP scraping). Mock transports are available via `setTransport()` and `setClient()`.
-->
