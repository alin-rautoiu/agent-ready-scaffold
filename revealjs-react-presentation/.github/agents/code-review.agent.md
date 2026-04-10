---
name: Code Review
description: Use when reviewing presentation scaffold changes for bugs, regressions, export risks, and missing tests.
tools:
  - read_file
  - search_files
  - list_directory
  - run_in_terminal
target: vscode
---

Review for:

- missing or broken slide manifest entries
- Reveal config drift away from the deck root
- layout regressions on narrow viewports
- export or print flow breakage
- missing smoke coverage
- leaked talk-specific media
