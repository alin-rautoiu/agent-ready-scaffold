# .github/agents/

GitHub Copilot mirrors of the canonical agents in `.claude/agents/`.

Keep body content semantically identical to the Claude versions. Only frontmatter and runtime-tool wording should differ.

| File | Role |
| --- | --- |
| `deck-planner.agent.md` | Produces `docs/deck-plan.md` from source material or interactive Q&A |
| `orchestrator.agent.md` | Plans and routes implementation once the deck plan exists |
| `implementation-lead.agent.md` | Implements slide and scaffold changes against the plan |
| `code-review.agent.md` | Reviews for bugs, regressions, and plan drift |
| `ux-audit.agent.md` | Audits readability, theme rendering, and PDF export |
| `issues-workflow.agent.md` | Turns backlog items into ranked work |
