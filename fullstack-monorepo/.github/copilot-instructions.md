# Copilot Instructions (Workspace)

Use this file for always-on, high-signal rules that apply across the repository.
Keep task workflows in custom agents and reusable capabilities in skills.

## Repository Identity

- Canonical repository: <!-- TODO: e.g.: `https://github.com/your-org/your-repo` -->
- Runtime surface: VS Code + GitHub Copilot customizations under `.github/`
- This scaffold is template-first: preserve `<!-- TODO: ... -->` placeholders unless initializing for a concrete project.

## Environment

- Primary shell: <!-- TODO: e.g.: `Windows PowerShell 5.1+` or `Bash` -->
- Use shell syntax that matches the selected runtime.
- If required tools are unavailable (CLI, MCP server, extension tools), stop and ask the user to enable them. Do not invent workarounds.

## Architecture Baseline

- Keep route/controller layers thin: validate input, call services, return typed outputs.
- Prefer existing module boundaries and established patterns over introducing new abstractions.
- Avoid cross-layer coupling and broad refactors unless explicitly requested.

Project specifics:
- Backend entry points: <!-- TODO: list key backend files -->
- Frontend entry points: <!-- TODO: list key frontend files -->
- Shared contracts/types location: <!-- TODO: e.g.: `src/shared/` -->
- Schema source of truth: <!-- TODO: list schema file/path -->

## Code and Change Policy

- Make the smallest safe change that satisfies requirements.
- Preserve public API behavior unless the task explicitly requires a contract change.
- Add or update tests when behavior changes are testable.
- Do not modify CI/CD workflow files without explicit user approval.

## Validation

Run project-appropriate checks before handing work off:
- Test command: <!-- TODO: e.g.: `npm test` -->
- Type/lint command: <!-- TODO: e.g.: `npm run typecheck ; npm run lint` -->
- Build command (if relevant): <!-- TODO: e.g.: `npm run build` -->

If checks fail repeatedly for the same root cause, stop and report the blocker.

## Copilot Customization Layout

- Always-on instructions: `.github/copilot-instructions.md` (this file)
- Scoped instructions: `.github/instructions/**/*.instructions.md`
- Custom agents: `.github/agents/*.agent.md`
- Prompt files: `.github/prompts/*.prompt.md`
- Skills: `.github/skills/<skill-name>/SKILL.md`

Use each surface intentionally:
- Instructions: stable conventions and constraints
- Agents: role behavior, tool boundaries, handoffs
- Prompts: reusable slash-command workflows
- Skills: portable capabilities with focused procedures/resources

## Cross-Runtime Propagation Policy

The canonical source for agent content is `.claude/agents/`.
When updating mirrored Copilot agent files in `.github/agents/`:
- Keep body semantics aligned with canonical agent intent.
- Adapt frontmatter and tool declarations to Copilot format.
- Translate shell examples for the target shell (PowerShell vs Bash).

Do not edit non-Copilot runtime surfaces during Copilot-only updates unless explicitly requested.
