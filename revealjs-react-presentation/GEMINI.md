# GEMINI.md

Repository context for Gemini Code Assist.

## Project

<!-- TODO: Describe the presentation project in 2-3 sentences. -->

- Stack: Vite + React + TypeScript + `@revealjs/react`
- Deck root: `src/client/presentation/PresentationApp.tsx`
- Slide modules: `src/client/presentation/slides/`
- Shared primitives: `src/client/presentation/components/`
- Theme: `src/client/presentation/theme/`
- Tests: `tests/`

## Working rules

- Keep Reveal configuration in the deck root.
- Keep slide ordering in `slides/index.tsx`.
- Author slides as React modules, not Markdown.
- Use the shared frame components before inventing one-off wrappers.
- Keep placeholder assets scaffold-safe and replace them with verified media in real decks.
- Re-run smoke tests and PDF export after structural deck changes.

## Commands

```text
npm install
npm run dev
npm run build
npm run preview
npm run typecheck
npm run test
npm run export:pdf
npm run setup:browsers
```

## Planning workflow

- Treat `docs/deck-plan.md` as the deck spec.
- Start with the `deck-planner` agent when the requested slides are not already planned.
- Implement against the relevant slide ids and keep `slides/index.tsx` aligned with the plan.
- Use `ThemedSlide` for new slide modules so the deck-level theme applies.
- Route layout, theme, and export changes through the `code-review` and `ux-audit` agents.

## Custom Subagents

This project defines specialized subagents in `.gemini/agents/` to handle specific roles in the presentation lifecycle:

- `orchestrator`: Coordinating multi-step presentation delivery and planning.
- `deck-planner`: Creating and updating the `docs/deck-plan.md` spec.
- `implementation-lead`: Implementing slide modules and scaffold changes.
- `code-review`: Reviewing changes for plan alignment and scaffold standards.
- `ux-audit`: Auditing slide readability, fragment pacing, and theme rendering.
- `issues-workflow`: Triage and ranking of deck feedback and backlog.

Invoke them using `invoke_agent("<name>", "...")` when following a multi-step workflow or when you need a specialized perspective.

## Runtime

- GitHub Copilot and Gemini Code Assist typically run PowerShell on Windows.
- Claude Code and Codex typically use Bash.
- When mirroring agent instructions, adapt shell syntax to the runtime surface instead of changing the underlying workflow.

## References

- See `CLAUDE.md` for the main architecture notes and conventions.
- See `.gemini/agents/` for Gemini-adapted agent role instructions.
- See `.gemini/skills/` for reusable reveal authoring and repo pattern guidance.
