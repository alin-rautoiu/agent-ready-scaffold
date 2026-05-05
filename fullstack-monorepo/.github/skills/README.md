# .github/skills/

GitHub Copilot Agent Skills for reusable, portable capabilities.

## What goes here

Each skill lives in its own directory:

```text
.github/skills/
  <skill-name>/
    SKILL.md
    # optional supporting files (scripts, examples, templates)
```

`<skill-name>` must match the `name` field in `SKILL.md` frontmatter.
Use lowercase letters, numbers, and hyphens only.

## SKILL.md minimum format

```markdown
---
name: skill-name
description: What this skill does and when to use it
---

# Skill Title

Instructions for the capability...
```

## When to use skills

- Use skills for specialized capabilities that may include multi-step procedures and optional supporting files.
- Use agents for persistent personas and tool boundaries.
- Use prompts for on-demand slash-command workflows.
- Use instructions for always-on or file-scoped coding conventions.

## Rules

**Do** keep skills focused, specific, and reusable.

**Do** reference any supporting files from `SKILL.md` using relative Markdown links.

**Don't** put project-secrets or environment credentials in skill files.

**Don't** duplicate global coding standards here; keep those in instructions files.
