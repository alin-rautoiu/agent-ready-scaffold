---
name: Issue Close Sweep
description: "Review open remote issues that have associated commits: run a code review for each, close if clean, comment blockers if not, and create follow-up issues for newly found problems."
agent: agent
argument-hint: "Optional: specific issue numbers to sweep (e.g. '284 300 304'), or omit to sweep all open issues"
tools:
  - execute
  - read
  - search
  - edit
  - agent
---

# Issue Close Sweep

Review every open remote issue that has an associated commit on main. For each:
1. Code-review the commit(s) linked to that issue.
2. If clean → close the issue with a close comment.
3. If blockers remain → post a comment listing each blocker; leave the issue open.
4. If the review surfaces a new, unblocking problem → create a new GitHub issue for it.

## Repo context

- Repo: <!-- TODO: e.g.: `owner/repo` -->
- Shell: <!-- TODO: e.g.: PowerShell (`; ` to chain, no `&&`) or Bash (`&&` to chain) -->
- Commit convention: <!-- TODO: describe how issue numbers appear in commits. e.g.: "Issue number appears in commit body as `Issue: #NNN` or as `Issue #NNN:` (both forms are used; GitHub's linked-commit detection recognises both)." -->
- Issue title/body convention: see existing issues for format

## Step 1 — Discover open issues with commits

If specific issue numbers were provided as arguments, use only those. Otherwise, list all open remote issues:

```powershell
gh issue list --repo <!-- TODO: owner/repo --> --state open --limit 100 --json number,title,state
```

For each issue number `N`, search for associated commits — first on `main`, then across all branches:

```powershell
# Check main first (merged work) — covers both "Issue: #N" and "Issue #N:"
git log --oneline --grep="Issue: #N" main
git log --oneline --grep="Issue #N" main

# If nothing on main, check all refs (pre-merge branches, worktrees)
git log --oneline --all --grep="Issue: #N"
git log --oneline --all --grep="Issue #N"
```

Deduplicate results by commit hash before proceeding (the two greps may return the same commit).

Record which ref each commit was found on. If commits exist only on non-`main` refs, note that in the todo entry — the diff will need `git show <hash>` per commit rather than a range diff against main.

Skip any issue where no commit is found anywhere — those are not yet implemented.

## Step 2 — Build the work list

Produce a todo list with one entry per issue that has ≥ 1 associated commit. Mark all as `not-started` before proceeding.

## Step 3 — Review each issue

For each issue in the list (one at a time, mark `in-progress` before starting):

### 3a — Gather the diff

**If commits are on `main`** (the normal post-merge case):

```powershell
# Get all commits for this issue
git log --oneline --grep="Issue: #N" main

# Show the cumulative diff against the parent of the earliest linked commit
git diff <earliest-parent>...<latest-commit> -- .
```

**If commits are only on a non-`main` branch** (pre-merge / open worktree):

```powershell
# Show each commit individually
git show <hash> -- .
# Repeat for each commit associated with the issue
```

Also read the issue body for acceptance criteria:

```powershell
gh issue view N --repo <!-- TODO: owner/repo --> --json title,body,number
```

### 3b — Delegate to Code Review agent

Invoke the **Code Review** subagent with:
- The diff content (for historical context on what changed)
- The issue acceptance criteria
- The list of changed files
- Explicit instruction: **"Review the current state of the changed files in the working tree. Use the diff for context on what was changed, but evaluate acceptance criteria and correctness against the current file contents — later commits may have already resolved issues visible in the diff."**

The Code Review agent auto-loads UX, email-template, and other skill checklists based on file extensions — no extra instruction is needed for that.

### 3c — Triage the findings

Use the Code Review agent's `recommended-action` field as the primary signal — it is more precise than severity alone:

| Outcome | Action |
|---|---|
| No `block-and-fix-now` findings | Close issue — go to Step 4 |
| Any finding is `block-and-fix-now` | Comment blockers — go to Step 5 |
| New unrelated problem uncovered (`record-and-continue` or any finding not attributable to this issue) | Create follow-up issue — go to Step 6, then re-triage the original |

## Step 4 — Close a clean issue

Post a close comment summarising:
- Which commit(s) deliver the fix
- What was reviewed
- Confirmation that all acceptance criteria are met

```powershell
gh issue comment N --repo <!-- TODO: owner/repo --> --body-file tmp\issue-N-close.md
gh issue close N --repo <!-- TODO: owner/repo -->
```

Write the close comment body to `tmp\issue-N-close.md` before the command.

## Step 5 — Comment blockers on an open issue

Post a comment listing each blocker. Use this format:

```markdown
## Review findings — blockers present

The linked commit(s) were reviewed and the following issues must be resolved before closing:

### Blockers
- **[severity] file:line** — description and recommended action

### Next steps
1. Fix each blocker above
2. Push to main (or open a PR)
3. Re-run `/issue-close-sweep` for this issue number
```

```powershell
gh issue comment N --repo <!-- TODO: owner/repo --> --body-file tmp\issue-N-blockers.md
```

Do **not** close the issue.

## Step 6 — Create a follow-up issue for a new problem

Use the standard issue format from the Code Review agent instructions:

**Title**: `[Bug][<scope>][<severity>] <short title>`

**Body**:
```markdown
## Problem
<what is wrong>

## Reproduction / Context
<steps or context>

## Diagnostics / Evidence
<code path, behavior, test failure>

## Expected behavior
<what should happen>

## Proposed direction
<concise fix>

## Acceptance criteria
- [ ] ...
```

Required labels: `bug` + one severity label (`critical`, `major`, `minor`) + applicable scope labels.

```powershell
gh issue create --repo <!-- TODO: owner/repo --> --title "..." --body-file tmp\new-issue-<slug>.md --label "bug,minor"
```

## Step 7 — Final summary

After sweeping all issues, output a table:

| Issue | Title | Outcome | Notes |
|---|---|---|---|
| #N | ... | closed / blocked / skipped | commit hash or blocker count |

Then list any new issues created with their numbers.
