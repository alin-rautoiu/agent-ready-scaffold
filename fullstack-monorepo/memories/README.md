# memories/

Agent-writable semantic cache. This directory is used by agents to persist working notes, intermediate results, and context summaries between sessions or tasks.

## What goes here

Short-lived agent artifacts that need to persist across sessions:

- Task context summaries from multi-session work
- Intermediate results from long-running workflows (e.g., partial book extraction outputs)
- Cross-session working notes that don't belong in permanent documentation

## What does NOT go here

- Permanent knowledge (that goes in `knowledge/`)
- Architecture decisions (those go in `docs/` or `CLAUDE.md`)
- Code (anywhere in `src/` is appropriate)
- Anything that should be version-controlled as a permanent record

## Rules

**Do** treat this directory as ephemeral. Content here may be overwritten, cleared, or superseded without notice.

**Don't** rely on memories for facts that matter. If information is important enough to act on, verify it against the actual source (code, DB, docs) before using it.

**Don't** commit memory files unless they represent output that should be permanent — in which case, move the content to `knowledge/` or `docs/` instead.

**Don't** let memory files accumulate indefinitely. Clean up stale entries at the end of each task or session.
