# .codex/knowledge/

Repository reference documentation for Codex context. These files provide Codex with stable facts about the codebase that it would otherwise need to rediscover on every session.

## What goes here

Concise reference documents that help Codex orient quickly:

- Key file locations and their purposes
- Data model summaries (table names, important columns, relationships)
- API surface summaries (route prefixes, common patterns)
- Architectural decisions that affect how code should be written

## What does NOT go here

- Content that is already in `CLAUDE.md` or `AGENTS.md` — don't duplicate
- Ephemeral task notes or session logs
- Content that changes frequently — stale knowledge is worse than no knowledge

## Rules

**Do** keep knowledge files concise. Codex has no persistent memory — these files are loaded fresh each session. Bloated files waste context.

**Do** include file paths when referencing code. "The DB helpers are in `src/server/db/writeHelpers.ts`" is more useful than "there are DB helpers somewhere."

**Don't** use knowledge files as a substitute for reading the actual source. If Codex needs to understand implementation details, it should read the file — not rely on a summary that may be out of date.

**Don't** add architectural decisions here that belong in `CLAUDE.md`. `CLAUDE.md` is the primary source of truth for conventions; knowledge files are supplementary quick-reference material.
