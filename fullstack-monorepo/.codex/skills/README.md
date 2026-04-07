# .codex/skills/

Codex-format skill and agent files. Each subdirectory contains a `SKILL.md` that adapts a canonical agent definition or reusable pattern to the Codex format.

## Naming convention

Agent skills follow the pattern `agent-<role>/SKILL.md`:

```
agent-orchestrator/SKILL.md
agent-implementation-lead/SKILL.md
agent-code-review/SKILL.md
agent-atomic-commit/SKILL.md
agent-ux-audit/SKILL.md
```

Non-agent skills (patterns, conventions) use a descriptive name:

```
repo-patterns/SKILL.md
book-to-website-improvement/SKILL.md
```

## What goes in each SKILL.md

A Codex skill file should contain:

- **Role** — what this skill or agent does
- **When to use** — conditions that trigger this skill
- **Steps** — numbered, concrete, executable instructions
- **Do not** — explicit prohibitions
- **Verification** — how to confirm the skill completed correctly

## Rules

**Do** keep the body content semantically identical to the corresponding `.claude/agents/` file. Only format should differ.

**Do** write steps as imperative commands. Codex follows instructions more reliably when steps are concrete and numbered.

**Don't** include Claude Code-specific tool names. Codex has its own tool set — use generic descriptions or Codex-native equivalents.

**Don't** add files here without a corresponding file in `.claude/`. Every Codex skill should trace back to a canonical source.
