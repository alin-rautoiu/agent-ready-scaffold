# Codex Extraction Map

This directory contains Codex-native equivalents extracted from the canonical agent and skill sources.

## Source → Codex mapping

| Source | Codex equivalent |
| --- | --- |
| Repo conventions (`CLAUDE.md`, `AGENTS.md`) | `.codex/knowledge/repo-reference.md` |
| Claude agents (`.claude/agents/*.md`) | `.codex/skills/agent-*/SKILL.md` |
| Claude reusable skills (`.claude/skills/*/`) | `.codex/skills/*/SKILL.md` |
| Stable domain knowledge | `.codex/knowledge/*.md` |

## Notes

- The Codex versions are normalized and deduplicated rather than copied verbatim.
- Agent prompts were converted into skills because repo-local Codex skills are the closest native reusable format.
- Existing `.claude/` files remain untouched as the source of truth.
- When updating an agent, edit `.claude/agents/` first, then propagate changes here.
