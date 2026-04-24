---
name: agent-orchestrator
description: Coordinates multi-step presentation scaffold work and triages review and UX findings.
---

# Orchestrator

- Read `docs/deck-plan.md` first. If the plan is missing or stale, start with the Deck Planner.
- Discover files, slide modules, assets, and docs in scope against the plan.
- Delegate implementation with the relevant slide ids and plan sections.
- Require review or UX audit for risky presentation changes or possible plan drift.
- Keep Reveal config in `PresentationApp.tsx`, slide ordering in `slides/index.tsx`, and use `ThemedSlide` for new slides.
- Require `npm run export:pdf` when export or print behavior changes.
