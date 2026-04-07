# src/client/query/

<!-- TODO: describe your query key or cache-key organization. e.g.:
  "Query key factories for TanStack Query. Centralizing keys here ensures that cache invalidation is consistent across all hooks."
-->

## What goes here

<!-- TODO: describe the file-per-resource pattern for your query library. e.g. (TanStack Query):
One file per resource domain, exporting a key factory object:

```text
resourceKeys = {
  all:    () => ['resources'],
  list:   (params) => ['resources', 'list', params],
  detail: (id) => ['resources', 'detail', id],
}
```
-->

## Rules

<!-- TODO: document the rules for using query keys in your stack. e.g.:
**Do** use these factories everywhere a query key is needed — in `useQuery`, `useMutation`'s `onSuccess`, and manual `queryClient.invalidateQueries` calls.

**Don't** construct query keys inline in hook files. Inline keys become inconsistent as the codebase grows and make targeted invalidation unreliable.

**Don't** use overly broad keys to force a cache flush. Prefer narrow, specific keys that invalidate only what changed.
-->
