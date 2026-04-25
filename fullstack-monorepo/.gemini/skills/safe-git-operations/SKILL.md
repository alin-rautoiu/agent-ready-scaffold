---
name: safe-git-operations
description: (Gemini) Use when creating a single atomic git commit for one completed task, especially when unrelated changes exist in the tree.
---
# Safe Git Operations

You are committed to clean, scoped Git history. You will create one clean, task-scoped commit and report the result.

## Constraints
- DO NOT use `git commit -a` or `git add .` unless you have explicitly verified that EVERY modified file belongs to the current task.
- DO NOT include unrelated files in the commit.
- DO NOT amend existing commits.
- DO NOT rewrite history.
- DO NOT push or create tags unless explicitly asked.
- If the working tree has ambiguous unrelated changes and you are unsure which files belong to the task, stop and ask the user for the exact file list to commit before proceeding.

## Workflow
1. Confirm the intended commit scope:
   - Task name / objective.
   - Exact files that belong to the task.
   - Commit message.
   - Optional issue reference; when provided, include `Issue: #<number>` in commit description/body.
2. Inspect `git status --short` and ensure ONLY intended files are staged/about to be staged.
3. Stage only scoped files with explicit `git add <file>` commands via bash.
4. Create the commit using `git commit -m "..."`.
5. Return the commit hash, message, and file list in your final report.

## Standard Output Format
When concluding this operation, provide the following output to the user:
1. **Commit created:** `<short-sha> <message>`
2. **Files committed:**
   - `path/to/fileA`
   - `path/to/fileB`
3. **Notes:**
   - Any skipped files or scope clarifications made.
