# .claude/agents/

Named sub-agent definitions for Claude Code. Each file defines a specialized agent that can be invoked via the Agent tool.

## Canonical agents in this scaffold

| File | Role | Writes code? |
| --- | --- | --- |
| `orchestrator.md` | Plans, delegates, triages findings | No |
| `implementation-lead.md` | Implements tasks, writes tests first, runs full suite | Yes |
| `code-review.md` | Reviews diffs, returns severity-ranked findings | No |
| `ux-audit.md` | Browser-based UX audits on live pages | No |
| `issues-workflow.md` | GitHub issue triage and ranked execution | No |

## File format

```markdown
---
name: Agent Name
description: One-line description used by the Agent tool to pick this agent
tools: Read, Glob, Grep, Bash, ...
---

## Role
...

## Do
...

## Do not
...
```


## Rules

For the reasoning behind these rules — why role separation holds even as models improve, how the handoff packet prevents context loss, and when the loop pays back its overhead — see [orchestrator-loop.md](../../../general-agentic-reference/orchestrator-loop.md).

### Role design

**Do** keep each agent to a single responsibility. An agent that both implements and reviews is harder to invoke correctly and harder to trust.

**Do** include an explicit "Do not" section. Agents without clear prohibitions tend to over-reach — implementing when they should only plan, or refactoring code outside the task scope.

**Don't** let an agent invoke the next stage of the loop. The Orchestrator invokes Code Review — not the Implementation Lead. The Implementation Lead returns a handoff — not a verdict. Role boundaries only hold if each agent stops at its boundary and returns control. An agent that reaches across the boundary absorbs the next role and breaks the feedback loop.

**Don't** give a non-writing agent write tools. Code Review and Orchestrator should not have `Write`, `Edit`, or `NotebookEdit` in their tool list. Access shapes behavior — an agent with write tools will use them.

### Tool selection

**Do** list only the tools the agent actually needs. Agents with access to all tools use all tools. See [Writing tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents): "More tools don't always lead to better outcomes" — focused tools reduce context consumption and decision-making overhead.

**Do** treat tool access as a constraint, not a convenience. A reviewer that cannot write code cannot accidentally fix what it was asked to evaluate.

### Descriptions

**Don't** write agent descriptions that overlap. Overlapping descriptions cause the Agent tool to pick the wrong agent.

**Do** write descriptions that name what the agent returns, not just what it does. `Reviews diffs, returns severity-ranked findings` is more useful than `Reviews code` — the return type tells the Orchestrator whether to expect a handoff, a finding list, or a decision.

### Conventions

**Don't** duplicate conventions already in `skills/repo-patterns/` — reference the skill file instead of inlining the content.

**Don't** inline project conventions into agent bodies. Put them in a skill file and have the agent read it. Inlined conventions drift; skill files are a single source of truth.

### The handoff contract

Any agent that hands off to another must return a structured packet. For Implementation Lead → Orchestrator → Code Review, the required fields are:

| Field | Why it matters |
| --- | --- |
| Outcome | One sentence — what was done |
| Done criteria | Whether each acceptance criterion was met |
| Files changed | Scopes the Code Review diff |
| Test summary | Pass/fail counts; skipped tests and reason |
| Risk areas | Where the Implementer is least confident — the signal Code Review needs most |
| Deferred items | What was explicitly left out of scope |
| Open questions | Ambiguities found during implementation |

A handoff missing risk areas and deferred items is incomplete. These are the fields where the agent admits uncertainty. An agent that omits them is not being efficient — it is hiding the information the next stage needs.

## Propagation

This directory is the source of truth. After editing, update:

- `.github/agents/*.agent.md` — GitHub Copilot format (YAML list tools, `target: vscode`, PowerShell syntax)
- `.codex/skills/agent-*/SKILL.md` — Codex skill format
- `.agents/skills/` — Gemini plain markdown
