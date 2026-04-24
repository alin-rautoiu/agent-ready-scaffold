---
name: Code Review
description: Use when reviewing presentation scaffold changes for bugs, regressions, plan drift, export risks, and missing tests.
tools:
  - read_file
  - search_files
  - list_directory
  - run_in_terminal
target: vscode
---

Review for:

- plan alignment against `docs/deck-plan.md`
- missing or broken slide manifest entries
- Reveal config drift away from the deck root
- direct `<Slide>` usage where `ThemedSlide` should be used
- hardcoded theme classes instead of the `theme` prop on `ThemedSlide`
- layout regressions on narrow viewports
- export or print flow breakage
- missing smoke coverage
- leaked talk-specific media
