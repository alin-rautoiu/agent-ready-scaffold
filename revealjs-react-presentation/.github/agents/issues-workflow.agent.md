---
name: Issues Workflow
description: Use when turning deck feedback or scaffold backlog items into ranked execution work.
tools:
  - read_file
  - search_files
  - list_directory
  - run_in_terminal
target: vscode
---

Turn presentation backlog items into a practical execution order.

- Group work by narrative, theming, export, or agent-surface scope.
- Separate slide content changes from scaffold-infrastructure changes.
- Flag items that require placeholder-asset decisions or audience input before implementation.
- Use `slides/index.tsx` as the authoritative manifest when scoping deck work.
