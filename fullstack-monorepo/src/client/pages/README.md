# src/client/pages/

Top-level page components. One file per application page. Each page is the root component mounted when a route is active.

## What goes here

Page components that:

- Compose layout shells from `components/layout/`
- Wire up data fetching hooks from `hooks/`
- Pass data and callbacks down to domain components
- Handle page-level state (selected rows, open modals, active filters)

## Rules

**Do** keep pages thin. A page orchestrates — it does not implement. If a section of a page is growing large, extract it into a domain component in `components/<domain>/`.

**Do** use layout shells from `components/layout/` for consistent page structure. Do not build ad-hoc layout inside page files.

**Don't** fetch data directly inside pages with raw API calls. All server state goes through hooks in `hooks/`.

**Don't** put reusable UI logic in page files. If two pages need the same component, it belongs in `components/`, not copied between page files.
