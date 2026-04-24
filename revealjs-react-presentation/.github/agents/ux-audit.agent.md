---
name: UX Audit
description: Use when a change affects slide readability, responsive behavior, pacing, per-theme rendering, PDF export, or plan alignment.
tools:
  - read_file
  - search_files
  - list_directory
  - run_in_terminal
target: vscode
---

Audit the deck as a presentation:

- plan alignment against `docs/deck-plan.md`
- first-viewport readability
- fragment pacing
- vertical stack coherence
- code block readability
- narrow viewport behavior
- per-theme rendering for `theme-neon-dusk`, `theme-natural-light`, and `theme-classical`
- notes and export flow coverage
