# .gemini/skills/

Gemini Code Assist skill playbooks. Each skill is a self-contained directory documenting a reusable pattern or workflow that Gemini can load before working on a specific task type.

## Discovery

Gemini discovers skills through `INDEX.md` in this directory. `INDEX.md` lists each skill with a one-line description. Gemini reads the index first, then activates only the skills relevant to the current task.

## Structure

Each skill is a directory containing:

- **`SKILL.md`**: (Required) Contains the metadata (YAML frontmatter with `name` and `description`) and primary instructions.
- **`references/`**: (Optional) Folder for static documentation and additional markdown files used by the skill.
- **`assets/`**: (Optional) Folder for templates, example data, or other non-executable resources.

## Relationship to `.claude/skills/`

These skills are Gemini-adapted versions of the skills in `.claude/skills/`. The content should be semantically identical; only the format is adapted for Gemini CLI's skill structure.

When a skill in `.claude/skills/` is updated, mirror the change here.

## Rules

**Do** keep `INDEX.md` up to date. An unindexed skill is invisible to Gemini.

**Do** use `references/` for large sets of related documentation to keep `SKILL.md` focused and concise.

**Don't** add files here for one-time tasks. Skills are for recurring patterns.
