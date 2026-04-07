# .agents/workflows/

Gemini Code Assist execution recipes. Each file describes a step-by-step workflow for a common multi-step task.

## Discovery

Workflows are indexed in `INDEX.md` in this directory. Gemini reads the index to discover available recipes, then loads the relevant workflow before starting a task.

## What goes here

Short, numbered execution recipes. A workflow file should:

- Start with a goal statement (one sentence)
- List steps in order, each concrete enough to execute without further clarification
- Note decision points and what to do at each
- End with a verification step (how to confirm the workflow completed correctly)

## Difference from skills

Skills teach Gemini *what* a good implementation looks like. Workflows tell Gemini *how* to execute a specific task from start to finish.

| Skills | Workflows |
| --- | --- |
| Pattern documentation | Step-by-step execution |
| Reference material | Procedural guide |
| Loaded for context | Loaded to follow |

## Rules

**Do** keep workflows short — if a workflow exceeds 10 steps, it is probably two workflows.

**Do** update `INDEX.md` when adding or renaming a workflow file.

**Don't** duplicate workflow content in both this directory and `.claude/commands/`. Workflows are for Gemini; commands are for Claude Code. Keep them synchronized in intent, not in file.
