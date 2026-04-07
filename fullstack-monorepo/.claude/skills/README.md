# .claude/skills/

Reusable context files that agents load selectively when relevant to the current task. Skills are not always loaded — they are pulled in by agents that explicitly reference them.

## Subdirectories

| Directory | Purpose |
| --- | --- |
| `repo-patterns/` | Shared conventions: TanStack Query, DB write helpers, route modules, issue format |
| `ux-audit/` | Tiered UX audit skills loaded by audit priority |

## What goes here

Focused markdown files that teach an agent a specific skill or convention. Each skill file should:

- Be self-contained and readable without other context
- Cover one topic (one skill per file)
- Include concrete examples, not just principles
- Be short enough to fit comfortably in a context window alongside other material

## What does NOT go here

- Agent definitions (those go in `agents/`)
- Project setup instructions (those go in `CLAUDE.md`)
- Ephemeral notes or session logs

## How agents use skills

An agent definition in `agents/` specifies which skills to load and when:

```markdown
Before reviewing UI changes, load `.claude/skills/ux-audit/forms.md`.
Before any backend change, load `.claude/skills/repo-patterns/SKILL.md`.
```

Skills are not auto-loaded. If a skill is not referenced by an agent, it has no effect.

## Rules

**Do** update a skill file when a convention changes. Skills that become stale produce agents that follow outdated patterns.

**Don't** create a skill for a one-time task. Skills are for patterns that recur across multiple tasks.

**Don't** duplicate content between a skill and `CLAUDE.md`. Put conventions in one place; reference the skill from agent definitions.

**Do** put deterministic, repeatable work in scripts that skills invoke — not inside the skill text itself. See [Skills and the Agents SDK](https://developers.openai.com/blog/skills-agents-sdk): "the model handles context-dependent judgment… while scripts manage deterministic, repeated shell work."

**Further Reading**:

- [Codex shell tips](https://developers.openai.com/blog/skills-shell-tips) — "When you're running a production workflow with a clear contract, just say: 'Use the skill.' This transforms fuzzy routing into explicit contracts." Scripted procedures with human-inspectable outputs outperform open-ended agent reasoning for repeatable work. "Put templates and examples inside the skill (they’re basically free when unused)"
- 15 lessons learned building ChatGPT Apps: [Turning lessons into a Codex Skill](https://developers.openai.com/blog/15-lessons-building-chatgpt-apps#turning-lessons-into-a-codex-skill)
