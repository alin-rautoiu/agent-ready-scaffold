# .claude/skills/repo-patterns/

Shared repository conventions loaded by agents before implementation or review tasks. This is the single source of truth for patterns that must be consistent across the entire codebase.

## What goes here

The primary file is `SKILL.md`. It documents:

- **TanStack Query conventions** — query key factories, debounce rules, loading state splits
- **Database write helpers** — which helpers to use from `src/server/db/writeHelpers.ts` and why
- **Route module conventions** — `create<Resource>Routes(db)` shape, middleware order, error codes
- **GitHub issue format** — title pattern, required sections, label taxonomy

## Rules

**Do** update this skill whenever a shared convention is added or changed. Agents that read a stale skill file will implement the old pattern.

**Do** include concrete before/after examples for each convention. Abstract descriptions produce inconsistent implementations.

**Don't** duplicate this content in agent definition files. Agent files should reference the skill, not restate it:

```markdown
# Good (in an agent definition)
Load `.claude/skills/repo-patterns/SKILL.md` before any backend implementation.

# Bad (in an agent definition)
Always use insertOneReturning() instead of .returning(). Use withTransaction() for...
(repeated from the skill file)
```

**Don't** add frontend-specific or backend-specific patterns that only apply to one layer. Keep this file to cross-cutting conventions. Layer-specific patterns go in the relevant skill or agent file.
