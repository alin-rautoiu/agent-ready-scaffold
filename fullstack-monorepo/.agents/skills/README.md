# .agents/skills/

Gemini Code Assist skill playbooks. Each file documents a reusable pattern or workflow that Gemini can load before working on a specific task type.

## Discovery

Gemini discovers skills through `INDEX.md` in this directory. `INDEX.md` lists each skill with a one-line description. Gemini reads the index first, then loads only the skills relevant to the current task.

## What goes here

One markdown file per skill. A skill file should:

- Be self-contained — no references to other files that Gemini would need to load
- Cover one topic completely
- Use plain markdown — no frontmatter, no Claude Code-specific format
- Include concrete examples, not just principles

## Relationship to `.claude/skills/`

These files are Gemini-adapted versions of the skills in `.claude/skills/`. The content should be semantically identical; only format differs (no frontmatter, no tool-specific references).

When a skill in `.claude/skills/` is updated, mirror the change here.

## Rules

**Do** keep `INDEX.md` up to date. An unindexed skill file is invisible to Gemini.

**Don't** create skills that require running a tool to be useful. Gemini's built-in file tools are read-only — skills must be informational.

**Don't** add files here for one-time tasks. Skills are for recurring patterns.
