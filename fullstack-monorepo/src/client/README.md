# src/client/
<!-- TODO: describe your frontend layer. e.g.:
  "React SPA built with Vite. This layer owns all frontend code: pages, components, data fetching hooks, i18n, and routing."
  "Vue 3 SPA built with Vite. This layer owns all frontend code: views, components, composables, and routing."
  "Razor Pages frontend. This layer owns all server-rendered views, partial views, and client-side scripts."
-->

## Structure

<!-- TODO: list the key files and directories in your frontend layer. e.g.:
| Path | Purpose |
| --- | --- |
| `App.tsx` | Root component; auth state, navigation context, route rendering |
| `components/` | Reusable UI components, organized by domain |
| `components/common/` | Shared primitives: buttons, inputs, tables, badges |
| `pages/` | Top-level page components |
| `hooks/` | Custom hooks, mostly data-fetching integrations |
| `query/` | Query key factories — normalized, shared across hooks |
| `context/` | Contexts: auth, navigation, permissions, i18n |
| `i18n/` | Translations per locale |
-->

## Data fetching pattern

<!-- TODO: document your data-fetching library and conventions. e.g. (TanStack Query):
Use TanStack Query for all server state. Query keys come from factory functions in `src/client/query/` — never construct ad-hoc keys.

```typescript
// Good: use the factory
import { resourceKeys } from '../query/resourceKeys'
useQuery({ queryKey: resourceKeys.list(params), ... })

// Bad: ad-hoc key
useQuery({ queryKey: ['resources', params.status], ... })
```

**Do** debounce free-text inputs that drive query keys (300–400ms). Unthrottled inputs cause a request per keystroke.

**Do** split loading state into `initialLoading` (first fetch) and `refreshing` (background refetch) to avoid flickering visible data.
-->

## Component conventions

<!-- TODO: document your component conventions. e.g.:
**Do** use primitives from `components/common/` before creating new ones. Check what exists before building.

**Do** use `PermissionGate` to render UI conditionally by role or feature permission.

**Don't** use inline styles. Use Tailwind utility classes as the default.

**Don't** import from `src/server/` directly. Use the HTTP API and `src/shared/` types only.
-->

## i18n

<!-- TODO: document your i18n setup if applicable. e.g.:
All user-visible strings go through the `t()` helper from `I18nContext`. Add new keys to both `en.ts` and `ro.ts`.
-->
