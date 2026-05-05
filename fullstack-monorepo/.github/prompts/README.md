# .github/prompts/

GitHub Copilot prompt files (slash commands). These files are invoked on demand from chat and are best for focused, repeatable tasks.

## What goes here

Markdown files with `.prompt.md` extension and optional YAML frontmatter (`name`, `description`, `argument-hint`, `agent`, `model`, `tools`).

Typical uses:

- Reusable review/checklist workflows
- Scaffolding prompts for common tasks
- Operational runbooks that benefit from user-provided arguments
- Prompt wrappers that delegate to a custom agent

## What does NOT go here

- Always-on conventions (put those in `.github/copilot-instructions.md`)
- Persistent persona/tool boundaries (put those in `.github/agents/`)
- Portable capability packages with resources/scripts (put those in `.github/skills/`)

## Rules

**Do** keep prompts single-purpose and explicit about inputs/outputs.

**Do** delegate to a named custom agent with the `agent` frontmatter key when a workflow depends on that persona.

**Don't** duplicate agent behavior in a prompt body. Prompts should orchestrate or parameterize, not replace agent definitions.
