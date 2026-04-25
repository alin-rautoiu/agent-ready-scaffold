# Gemini Context Library

This directory is the repository-local prompt and workflow library for Gemini Code Assist in VS Code.

## Structure

- `.gemini/skills/`: reusable playbooks for recurring task types
- `.gemini/workflows/`: short execution recipes for common flows

## Usage

Start from `GEMINI.md` at the repo root, then load only the specific files needed for the task.
<!-- TODO: add the correct path to this project's GEMINI.md, e.g.: "Start from [GEMINI.md](../GEMINI.md)" -->

- For discovery, use `.gemini/skills/INDEX.md`.
- For workflow recipes, use `.gemini/workflows/INDEX.md`.
- For shared agent-role behavior, use the canonical files in `.claude/agents/` and adapt them to Gemini Code Assist's VS Code runtime.

Keep these files as plain markdown context. They are meant to be read by Gemini's built-in file tools.
