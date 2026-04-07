# src/server/middleware/

Cross-cutting request/response concerns: authentication, authorization, and feature permission gating.

## What goes here

Middleware that applies uniformly across routes or route groups:

- Auth guards — verify session tokens, reject unauthenticated requests
- Role checks — restrict access by user role
- Feature permission middleware — gate routes by runtime-configured feature flags

## Pattern

Middleware has one job: pass through or reject. It should not transform response data or contain business logic.

```text
middleware auth_required(request):
  token = extract_token(request)
  if invalid: return 401
  request.user = decode(token)
  next()
```

Apply middleware at the router level in `routes/`, not inside individual handlers. This keeps handler code clean and makes it obvious which routes are protected.

## What does NOT go here

- Business logic or data fetching
- Response formatting
- Error handling for application-level errors (those belong in routes or services)
