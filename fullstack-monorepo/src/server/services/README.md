# src/server/services/

Business logic. All decisions, calculations, and multi-step operations live here. Routes call services; services do the work.

## Pattern

A service function takes explicit dependencies (db, config, external clients) as parameters and returns a typed result:

```text
list_resources(db, params) -> { rows, total }
create_resource(db, values) -> Resource
bulk_update(db, ids, changes) -> { updated, skipped }
```

Services do not know about HTTP — no request objects, no response codes. They receive validated data and return domain results. The route handler decides what HTTP status that maps to.

## Subdirectories

Group services by domain when a domain grows beyond one file. For example `scraper/` contains multiple files cooperating on the same concern.

## What goes here

- Filtering, sorting, and pagination logic
- Multi-step operations (read → validate → write → log)
- Cross-table business rules
- Integration with external services (email, AI, queues)

## What does NOT go here

- Input validation (that belongs in routes)
- HTTP-specific concerns (status codes, headers, cookies)
- Response formatting (dates normalization etc. belongs at the route boundary)
