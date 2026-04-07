# src/server/
<!-- TODO: describe your backend layer. e.g.:
  "Hono HTTP API. This layer owns all backend logic: HTTP routing, business services, database access, authentication, and scheduled jobs."
  "ASP.NET Core Web API. This layer owns all backend logic: controllers, services, data access, and authentication."
-->

## Structure

<!-- TODO: list the key files and directories in your backend layer. e.g.:
| Path | Purpose |
| --- | --- |
| `app.ts` | App factory; mounts all route modules + health endpoints |
| `index.ts` | Entry point: loads env, runs migrations, starts server |
| `routes/` | One file per resource |
| `services/` | Business logic; called by route handlers |
| `db/schema.ts` | Table definitions — single source of truth for the data model |
| `db/client.ts` | Singleton DB connection |
| `db/writeHelpers.ts` | Cross-dialect write helpers |
| `middleware/` | Auth guards, permission middleware |
| `utils/` | Pure server-side utilities |
-->

## Route module pattern

<!-- TODO: document your route/controller pattern. e.g. (Hono):
```typescript
export function create<Resource>Routes(db: Db): Hono<AppEnv> {
  const router = new Hono<AppEnv>()
  router.use('*', requireAdmin)  // unless public
  router.get('/', async (c) => { /* thin: parse → service call → return */ })
  return router
}
```
-->

<!-- TODO: document the key rules for route handlers in your stack. e.g.:
**Do** keep route handlers thin. Each handler validates input, calls a service function, normalizes the result, and returns a response.

**Don't** put business logic in route handlers. Conditions, calculations, and multi-step DB operations belong in services.

**Don't** call write APIs directly from routes if your project has shared write helpers for cross-dialect compatibility.
-->

## Adding a route

<!-- TODO: document the steps for adding a new route in your stack. e.g.:
1. Create `src/server/routes/<resource>.ts`
2. Export `create<Resource>Routes(db: Db)`
3. Register it in `src/server/app.ts` with the appropriate prefix
4. Update the route surface table in `CLAUDE.md`
-->
