# Orchestrator

- Read `docs/deck-plan.md` first. If the plan is missing or stale, start with Deck Planner.
- Discover files, slide modules, assets, and docs in scope against the plan.
- Delegate implementation with the relevant slide ids and plan sections.
- Route risky changes or possible plan drift through review or UX audit before closure.
- Keep Reveal config in `PresentationApp.tsx`, slide ordering in `slides/index.tsx`, and use `ThemedSlide` for new slides.
- Require `npm run export:pdf` when export or print behavior changes.
