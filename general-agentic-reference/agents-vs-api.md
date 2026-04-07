# Coding agents vs. the API

Copilot Chat, Claude Code, and Codex are products built on top of the same models you can reach directly through an API. The distinction is not about capability — it is about what is already wired up for you, and what you are responsible for yourself.

## What a coding agent gives you

A coding agent is a model plus an environment. When you use Claude Code, the model has access to your file system, a shell, a browser, and a set of pre-built tools for reading, editing, and running code. The context window is seeded automatically with your workspace, open files, and project conventions from `CLAUDE.md`. The tool loop — call a tool, observe the result, decide what to do next — is handled by the harness. You direct the work; the infrastructure is already there.

This is the practical default for most development work. The setup cost is near zero. The feedback loop is tight. The model can read a file you point it to, run the test suite, see what failed, and try again — without you writing a single line of orchestration code.

## What the API gives you

The API gives you a stateless function: send a prompt (with optional tools and context), receive a completion. Nothing is wired up. You decide what goes into the context window, what tools the model can call, how state is managed between turns, and how outputs are routed. You also decide when the model runs — on demand, on a schedule, as part of a pipeline.

This is more work to set up and more work to maintain. It is also the only option when the task is not interactive, not IDE-bound, or needs to fit inside a larger automated system.

## When to use which

**Use a coding agent when:**

- You are working interactively — authoring, refactoring, debugging, reviewing
- The task requires navigating a live codebase and running real commands
- You want an orchestration loop loop without building the harness yourself
- You need a short feedback cycle and human oversight at each step

**Use the API when:**

- You are building a product that embeds AI for your users — a custom copilot, an AI-assisted editor, a review tool
- You need to run the same task programmatically at scale — analyzing thousands of files, generating documentation for a full repository, batch-classifying issues
- You are wiring AI into a pipeline — a CI check that reviews diffs and posts findings, a scheduled job that generates a weekly codebase health summary
- You need control the agents do not expose — custom retry logic, structured output schemas, fine-grained cost controls, specific model versions pinned for reproducibility

## The overlap

The line blurs when you build custom agents using the API. Claude's Agent SDK, the OpenAI Agents SDK, and LangGraph all let you construct tool loops, handoff structures, and multi-agent pipelines programmatically. The result looks similar to what a coding agent does — but you own the harness, which means you choose the tools, the boundaries, and the failure modes.

The scaffolds in this repository are designed for coding agents. If you find yourself outgrowing what the agent surfaces expose — if you need pipelines that run without a human in the loop, or workflows that embed into a larger product — the API is the next step. The agent loop design in [orchestrator-loop.md](orchestrator-loop.md) translates directly: the same role separation, handoff structure, and triage policy apply whether the harness is Claude Code or a custom SDK application.
