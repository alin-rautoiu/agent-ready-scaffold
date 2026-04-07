# .github/prompts/

GitHub Copilot context files. These files provide repository-level context that Copilot loads automatically when working in this repository.

## What goes here

Markdown files that describe the repository to Copilot: its purpose, conventions, and key patterns. Think of these as a lightweight `CLAUDE.md` for the Copilot surface.

Typical contents:

- Repository overview and technology stack
- Key architectural decisions (thin routes, service extraction)
- File naming conventions
- Links to agent definitions and skill files

## What does NOT go here

- Detailed task-specific guidance — that belongs in `agents/` or `.claude/skills/`
- Content that duplicates `CLAUDE.md` verbatim — maintain one source, reference the other
- Temporary notes or session context

## Rules

**Do** keep prompt files focused on stable, high-level context. This content is loaded on every Copilot interaction; bloated prompt files increase cost and dilute relevance.

**Don't** use prompt files as a substitute for agent definitions. Prompts inform; agents act. If you find yourself writing step-by-step instructions in a prompt file, move the logic to `agents/`.
