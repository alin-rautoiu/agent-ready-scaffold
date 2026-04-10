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

## Runtime

- GitHub Copilot and Gemini Code Assist typically run PowerShell on Windows.
- Claude Code and Codex typically use Bash.
- When mirroring agent instructions, adapt shell syntax to the runtime surface instead of changing the underlying workflow.

## References

- See `CLAUDE.md` for the main architecture notes and conventions.
- See `.agents/workflows/` for Gemini-adapted agent role instructions.
- See `.agents/skills/` for reusable reveal authoring and repo pattern guidance.
