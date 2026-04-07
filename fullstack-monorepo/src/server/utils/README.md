# src/server/utils/

Pure server-side utility functions. No database access, no HTTP, no side effects.

## What goes here

Small, focused functions used by routes and services but belonging to neither:

- Date normalization (serializing dates for JSON responses)
- Pagination helpers (offset/limit calculation, total page count)
- String or data format utilities specific to the server layer

## Rules

**Do** keep functions here pure and stateless — same input always produces same output.

**Don't** add functions that touch the DB or make network calls. Those belong in `services/`.

**Don't** add functions that are used only in one route or service. A utility that has one caller should live next to its caller, not here.
