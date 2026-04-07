# src/server/routes/

HTTP handler modules. One file per resource. This is the thinnest layer in the backend — it owns input parsing and response shaping, nothing else.

## Pattern

<!-- TODO: describe your route/controller factory signature. e.g. (Hono):
Each file exports a single factory function:

```text
create<Resource>Routes(db) -> Router
```
-->

Every handler inside follows the same shape:

```text
handler VERB /path:
  1. Parse and validate input (return 400 on failure)
  2. Check record exists where applicable (return 404 if missing)
  3. Call a service function with validated params
  4. Shape and return the response
```

No conditions, no DB queries, no data transformations inside the handler body. If you find yourself writing `if` branches over data or building query conditions, that logic belongs in `services/`.

## Conventions

- Apply auth middleware at the router level, not per-handler, unless specific routes are public
- Use a validation library for request bodies on mutating endpoints
- Return `400` for invalid input, `404` for missing records, `201` for created resources
<!-- TODO: document any response normalization that belongs at this boundary. e.g.:
- Normalize dates and parse stored formats (e.g. JSON-stringified arrays) at this boundary before returning — not in the service layer
-->

## What does NOT go here

- Business logic of any kind
<!-- TODO: reference your DB access layer. e.g.:
- Direct database queries (those belong in `services/` or `db/`)
-->
- Data transformation beyond what is needed to serialize the response
