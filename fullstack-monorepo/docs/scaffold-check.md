# Scaffold Check Script — Specification

This document is the single source of truth for `scripts/check-scaffold.{ext}`. Use it when generating, regenerating, or modifying that script. It is intentionally decoupled from the initialization flow so it can be referenced independently.

---

## Language selection

Run commands assume `fullstack-monorepo/` as the working directory.

| OS | Stack includes | Language | Run command |
| --- | --- | --- | --- |
| Windows | TypeScript / Node.js | TypeScript | `npx tsx scripts/check-scaffold.ts` |
| Windows | anything else | PowerShell | `.\scripts\check-scaffold.ps1` |
| macOS / Linux | Python | Python | `python scripts/check-scaffold.py` |
| macOS / Linux | TypeScript / Node.js | TypeScript | `npx tsx scripts/check-scaffold.ts` |
| macOS / Linux | anything else | Bash | `bash scripts/check-scaffold.sh` |

If the stack is ambiguous, default to PowerShell on Windows and Bash on macOS/Linux.

---

## Scanning scope

- Scan all text files under the project root for the literal string `<!-- TODO`.
- Exclude: `node_modules/`, `.git/`, and any vendor or build-output directories.
- Skip binary files silently.
- Each file is classified by the **first** tier whose glob pattern matches its path. Files matching no pattern are excluded from output entirely — neither scanned nor printed.
- Files that do not exist (e.g., surfaces removed during initialization) are silently skipped.
- Files with zero matches are not printed.

---

## Criticality tiers

| Tier | Severity label | Files matched |
| --- | --- | --- |
| 1 — Agent runtime | `[CRITICAL]` | `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `DESIGN.md`, `.claude/agents/*.md`, `.github/agents/*.agent.md`, `.codex/skills/agent-*/SKILL.md` |
| 2 — Agent capabilities | `[WARN]` | `.claude/skills/**`, `.agents/skills/**`, `.codex/skills/**`, `.github/copilot-instructions.md`, `README.md` |
| 3 — Peripheral docs | `[INFO]` | `src/**`, `tests/**`, `scripts/**`, `docs/**`, `templates/**`, `knowledge/**`, `memories/**` |

Tier 1 files are read by agents at runtime. Unfilled TODOs in these files silently degrade every agentic task. Tier 2 files reduce agent capability. Tier 3 files are documentation only and safe to fill incrementally.

---

## Output format

**Required per-file line:**

```
[SEVERITY] <relative-path>  <N> TODOs
```

**Required summary block** (print zero counts for tiers with no matches):

```
Summary
  Critical  : <files> files, <todos> TODOs
  Warn      : <files> files, <todos> TODOs
  Info      : <files> files, <todos> TODOs
```

Trailing annotations (e.g., `— agents read this at runtime`) and padding/dot-leaders are **optional**. Implementations may include or omit them.

**Example output:**

```text
Scaffold completion check
=========================
[CRITICAL] CLAUDE.md  38 TODOs
[CRITICAL] DESIGN.md  70 TODOs
[CRITICAL] .claude/agents/orchestrator.md  6 TODOs
[WARN]     .claude/skills/ux-audit/legacy-steps.md  17 TODOs
[INFO]     src/server/README.md  5 TODOs

Summary
  Critical  : 3 files, 114 TODOs
  Warn      : 5 files,  38 TODOs
  Info      : 12 files, 61 TODOs
```

---

## Exit code

Exit `1` if any Tier 1 (CRITICAL) files have remaining TODOs; exit `0` otherwise. This lets CI or a pre-commit hook gate on completion.

---

## Verification pass criteria

After generating the script, run it and confirm all of the following:

1. The script exits without error.
2. Every Tier 1 file that still contains `<!-- TODO` markers appears in the output with a count greater than zero.
3. The summary tier counts match the per-file lines.

If the script fails or produces wrong output, fix it before proceeding.

---

## Generation guidance

When generating this script via a subagent: provide only this document as the specification. The initialization context is not needed and will add noise.

If your runtime does not support subagents (e.g., Codex CLI — see INIT.md), write the script directly using this document as the spec.
