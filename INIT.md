# Scaffold Initialization — Step 1: Runtime Check

This is the first file to run. Its only purpose is to identify which AI coding agent is executing it, then direct that agent to `INIT-SCAFFOLD.md` with the right context and adaptation notes.

Read this file completely before taking any action.

---

## Which agent are you?

| Label | Runtime |
| --- | --- |
| **A** | Claude Code (CLI or VS Code extension) |
| **B** | GitHub Copilot (VS Code extension) |
| **C** | OpenAI Codex |
| **D** | Gemini Code Assist (VS Code extension) |
| **E** | Other |

---

## Runtime-specific instructions

### A — Claude Code

No adaptation needed. This scaffold is authored for Claude Code natively.

Proceed to `INIT-SCAFFOLD.md` and follow its instructions as written.

---

### B — GitHub Copilot

**Your canonical surface:** `.github/agents/*.agent.md`. This folder is now the source of truth for agent definitions. If Claude Code is used by anyone on the team, `.claude/agents/` becomes a mirror maintained after edits to `.github/agents/` — not the other way around. If nobody on the team uses Claude Code, `.claude/` can be deleted (TODO 6 in `INIT-SCAFFOLD.md` handles this).

**What is unavailable:** Hooks (`.claude/hooks/`), slash commands (`.claude/commands/`), and the Agent tool for spawning sub-agents. The Orchestrator → Implementation Lead → Code Review loop cannot be automated — you will run each agent as a separate focused chat session, loading the relevant `.github/agents/` file as context each time.

**Adapt the knowledge files before proceeding:**

1. Read `.claude/agents/README.md` to understand the loop design you will be following manually.
2. Update `.github/agents/README.md`: add the following line at the top, immediately after the heading:

   ```markdown
   > **Canonical source.** Agent definitions here are the source of truth. Propagate changes to `.claude/agents/` if Claude Code is used by anyone on the team.
   ```

3. Update `fullstack-monorepo/CLAUDE.md` at the top, immediately after the `# CLAUDE.md` heading:

   ```markdown
   > **Mirror.** Primary agent: GitHub Copilot. Canonical definitions: `.github/agents/`. Edit there first; propagate here only if Claude Code is in use on this project.
   ```

**Adapt `INIT-SCAFFOLD.md` as you work through it:**

- Shell syntax → use PowerShell (Windows) or Bash (macOS/Linux) based on Q5
- Any step referencing the Agent tool or sub-agents → open a new focused chat, load the relevant `.github/agents/` file, and proceed manually
- Any step referencing `.claude/hooks/` or `.claude/commands/` → skip entirely
- File paths referencing `.claude/skills/` → read the skill file as context; no automatic loading

**Then proceed to `INIT-SCAFFOLD.md`.**

---

### C — OpenAI Codex

**Your canonical surface:** `.codex/skills/agent-*/SKILL.md`. This folder is now the source of truth for agent definitions. If Claude Code is used by anyone on the team, `.claude/agents/` becomes a mirror. If nobody uses Claude Code, `.claude/` can be deleted (TODO 6 in `INIT-SCAFFOLD.md` handles this).

**What is unavailable:** Hooks, slash commands, and sub-agents. Same manual approximation as Copilot.

**Adapt the knowledge files before proceeding:**

1. Read `.claude/agents/README.md` for the loop design.
2. Update `fullstack-monorepo/AGENTS.md` at the top, immediately after the `# Codex Repo Guide` heading:

   ```markdown
   > **Canonical source.** Agent skill definitions in `.codex/skills/agent-*/` are the source of truth. Propagate changes to `.claude/agents/` if Claude Code is used by anyone on the team.
   ```

3. Update `fullstack-monorepo/CLAUDE.md` at the top, immediately after the `# CLAUDE.md` heading:

   ```markdown
   > **Mirror.** Primary agent: OpenAI Codex. Canonical definitions: `.codex/skills/agent-*/`. Edit there first; propagate here only if Claude Code is in use on this project.
   ```

**Adapt `INIT-SCAFFOLD.md` as you work through it:**

- Shell syntax → Bash (Codex uses the same shell environment as Claude Code)
- Any step referencing the Agent tool or sub-agents → run as a separate Codex task with the relevant `.codex/skills/agent-*/SKILL.md` file loaded
- Any step referencing `.claude/hooks/` or `.claude/commands/` → skip

**Then proceed to `INIT-SCAFFOLD.md`.**

---

### D — Gemini Code Assist

**Your canonical surface:** `GEMINI.md` and `.agents/skills/`. These files are now the source of truth. If Claude Code is used by anyone on the team, `.claude/agents/` becomes a mirror. If nobody uses Claude Code, `.claude/` can be deleted (TODO 6 in `INIT-SCAFFOLD.md` handles this).

**What is unavailable:** Hooks, slash commands, and sub-agents. No dedicated sub-agent primitive. Run each agent role as a separate focused chat.

**Adapt the knowledge files before proceeding:**

1. Read `.claude/agents/README.md` for the loop design.
2. Update `fullstack-monorepo/GEMINI.md` at the top, immediately after the `# GEMINI.md` heading:

   ```markdown
   > **Canonical source.** This file and `.agents/` are the source of truth. Propagate changes to `.claude/agents/` if Claude Code is used by anyone on the team.
   ```

3. Update `fullstack-monorepo/CLAUDE.md` at the top, immediately after the `# CLAUDE.md` heading:

   ```markdown
   > **Mirror.** Primary agent: Gemini Code Assist. Canonical definitions: `GEMINI.md` and `.agents/`. Edit there first; propagate here only if Claude Code is in use on this project.
   ```

**Adapt `INIT-SCAFFOLD.md` as you work through it:**

- Shell syntax → PowerShell (Windows) or Bash (macOS/Linux) based on Q5
- Any step referencing the Agent tool or sub-agents → separate focused chat with the relevant `.agents/skills/` file loaded
- Any step referencing `.claude/hooks/` or `.claude/commands/` → skip

**Then proceed to `INIT-SCAFFOLD.md`.**

---

### E — Other

Use `INIT-SCAFFOLD.md` as a requirements checklist rather than an execution script. Each TODO describes a concrete file edit — work through them manually or translate them to your agent's tool format.

Add a note to the top of `fullstack-monorepo/CLAUDE.md` and `fullstack-monorepo/AGENTS.md` identifying your agent as primary and noting that `.claude/agents/` is the canonical reference.

**Then proceed to `INIT-SCAFFOLD.md`.**

---

## Teardown note

When `INIT-SCAFFOLD.md` reaches its final TODO (teardown), delete **both** this file and `INIT-SCAFFOLD.md`.
