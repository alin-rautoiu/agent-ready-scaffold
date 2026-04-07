# src/client/context/

<!-- TODO: describe your frontend state/context mechanism. e.g.:
  "React contexts that provide global state to the component tree. Each context covers one cross-cutting concern."
  "Vue composables that expose shared reactive state. Each composable covers one cross-cutting concern."
-->

## What goes here

Contexts that need to be accessible anywhere in the application without prop drilling:

- Auth state (current user, login/logout)
- Navigation state (current route, navigation helpers)
- Permission state (role and feature permission helpers)
- i18n (translation function and locale)

## Rules

**Do** keep each context focused on one concern. A context that manages auth AND permissions AND navigation is hard to test and hard to reason about.

**Do** expose a custom hook per context (e.g. `useAuth()`, `usePermissions()`). Components import the hook, not the context object directly.

<!-- TODO: name your server-state library. e.g.:
**Don't** put server state here. Data fetched from the API belongs in the query library (e.g. TanStack Query), not in a context. Contexts are for session-level state that does not need caching or background refetching.
-->
