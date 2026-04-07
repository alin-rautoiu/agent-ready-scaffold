# src/client/hooks/

<!-- TODO: describe your frontend hooks or composables. e.g.:
  "Custom React hooks. Mostly data fetching hooks built on top of TanStack Query, plus any stateful logic too complex to inline in a component."
  "Vue composables. Mostly data fetching composables built on top of VueQuery, plus any reactive logic too complex to inline in a component."
-->

## What goes here

<!-- TODO: list the categories of hooks/composables in your project. e.g.:
- Data fetching hooks: `useResourceListQuery`, `useResourceDetailQuery`, etc.
- Mutation hooks: `useCreateResourceMutation`, `useBulkUpdateMutation`, etc.
- Complex local state hooks extracted from components for reuse or testability
-->

## Data fetching pattern

Fetch hooks wrap query library calls and expose a clean interface to components:

```text
useResourceListQuery(params):
  initialLoading = query.isLoading && !query.data
  refreshing = query.isFetching && !!query.data
  return { data, total, initialLoading, refreshing, error }
```

Splitting `initialLoading` from `refreshing` prevents visible data from disappearing during background refetches.

<!-- TODO: reference your query key factory location. e.g.:
Use query key factories from `../query/` — never construct keys inline inside hook files.
-->

## Rules

**Do** debounce free-text filter inputs that feed into query keys (300–400ms). Without debouncing, every keystroke triggers a request.

**Don't** put UI logic in hooks. A hook that returns JSX or makes layout decisions belongs in a component, not here.

<!-- TODO: reference your query key factory location. e.g.:
**Don't** duplicate query key construction across hooks. Keys live in `../query/` so they can be invalidated consistently.
-->
