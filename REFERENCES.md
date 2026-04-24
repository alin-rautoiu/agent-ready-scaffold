# External sources

The do's/don'ts and agent loop rationale in this scaffold draw on the following external references. When editing README or agent files, prefer citing from this list rather than adding new sources ad-hoc:

## Agent architecture and orchestration

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic's canonical guide; compounding errors, orchestrator/evaluator patterns, when to add complexity
- [Harness design for long-running apps](https://www.anthropic.com/engineering/harness-design-long-running-apps) — generator vs evaluator separation; "agents praise their own work even when it's mediocre"
- [How coding agents work](https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/) — LLM as stateless harness, tool loops, system prompt mechanics
- [Subagents](https://simonwillison.net/guides/agentic-engineering-patterns/subagents/) — role specialisation for context preservation; code reviewer, debugger, and explorer patterns
- [The era of AI as text is over](https://github.blog/ai-and-ml/github-copilot/the-era-of-ai-as-text-is-over-execution-is-the-new-interface/) — orchestration as infrastructure; programmable agentic execution loops
- [Run long-horizon tasks with Codex](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex) — durable markdown files as cross-session memory; checkpointed milestones
- [Skills and the Agents SDK](https://developers.openai.com/blog/skills-agents-sdk) — skills as reusable operational knowledge; separating model judgment from deterministic scripts
- [Run multiple agents at once with Fleet](https://github.blog/ai-and-ml/github-copilot/run-multiple-agents-at-once-with-fleet-in-copilot-cli/) — parallel agent execution patterns
- [Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) — Anthropic's practical experience building multi-agent research systems; agent coordination at scale
- [Karpathy on plan mode limits](https://x.com/karpathy/status/2015883857489522876) — firsthand account of agents bloating abstractions, failing to clean up dead code, and making APIs needlessly complex despite explicit instructions
- [Karpathy on agents keeping a running record](https://x.com/karpathy/status/2005421816110862601) — agents that maintain a markdown log of decisions and results stay coherent across long sessions; the log is the cross-session memory
- [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) — "building software still demands discipline, but the discipline shows up more in the scaffolding rather than the code"; how OpenAI shipped an entire internal product with zero manually-written code and what structural patterns made that possible
- [Subagents with MCP](https://cra.mr/subagents-with-mcp)
- [MCP, Skills, and Agents](https://cra.mr/mcp-skills-and-agents/)
- [Built with borrowed hands](https://cra.mr/built-with-borrowed-hands) — on the refinement burden, the 95% overhead of correction cycles, and the limits of current agents as independent builders; the slot-machine loop named directly

## Planning and requirements

- [The danger of glamourizing one-shots](https://www.hanselman.com/blog/the-danger-of-glamourizing-one-shots) — "making the ambiguous incredibly specific" is irreducibly human work; agents produce the statistical average without precise specification
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — structured prompts, XML tags, examples as "pictures worth a thousand words"
- [Context windows, Plan, Agent, and TDD](https://github.blog/developer-skills/application-development/context-windows-plan-agent-and-tdd-what-i-learned-building-a-countdown-app-with-github-copilot/) — plan step reveals edge cases before implementation; fresh sessions preserve context quality
- [Codex prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide) — structured instructions, explicit guardrails, metaprompting
- [What AI is actually good for, according to developers](https://github.blog/ai-and-ml/generative-ai/what-ai-is-actually-good-for-according-to-developers/) — AI removes tedium; humans retain judgment over architecture, security, and business logic
- [Simon Willison on agentic engineering (Lenny's Podcast)](https://simonwillison.net/2026/Apr/2/lennys-podcast/) — "using coding agents well is taking every inch of my 25 years of experience... and it is mentally exhausting"; estimation failure, cognitive load, and the irreducible role of human judgment
- [Designing delightful frontends with GPT-5.4](https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4) — familiar stacks (React, Tailwind) reduce agent improvisation; pick the stack before the agent touches the code
- [Prompt Crafting for Different Models](https://docs.factory.ai/guides/power-user/prompt-crafting) — model-specific prompting; what works for one model may not transfer to another
- [How I Get the Most Out of Every Prompt – And You Can Too](https://shellypalmer.com/2025/08/how-i-get-the-most-out-of-every-prompt/) — techniques for writing prompts that leave fewer implicit assumptions for models to resolve
- [Design-first collaboration](https://martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html) — AI collapses design and implementation into one step; "no code until the design is agreed"
- [Context anchoring](https://martinfowler.com/articles/reduce-friction-ai/context-anchoring.html) — "the what survives; the why does not"; feature documents persist decision rationale across sessions
- [Knowledge priming](https://martinfowler.com/articles/reduce-friction-ai/knowledge-priming.html) — versioned priming documents override generic training defaults; keep to 1-3 pages of high-signal context
- [Encoding team standards](https://martinfowler.com/articles/reduce-friction-ai/encoding-team-standards.html) — "a prompt on an individual machine is a personal productivity hack; the same prompt in the team's repository is infrastructure"
- [Context engineering for coding agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) — "context engineering is curating what the model sees so that you get a better result"; catalogs Claude Code's layered configuration surface and the tradeoffs between each mechanism
- [Thoughts on slowing the fuck down](https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/)

## Testing and verification

- [Red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) — test-first is "a fantastic fit for coding agents"; confirm tests fail before implementing
- [AI-resistant technical evaluations](https://www.anthropic.com/engineering/AI-resistant-technical-evaluations) — agents assert completion when they have not; external objective criteria are the only reliable check
- [Eval skills](https://developers.openai.com/blog/eval-skills) — deterministic checks + rubric grading to verify agent output against concrete success criteria
- [LLMs are the key to mutation testing](https://engineering.fb.com/2025/09/30/security/llms-are-the-key-to-mutation-testing-and-better-compliance/) — tests must validate behavior, not just execute code; mutation testing distinguishes the two
- [Building syntaqlite with AI](https://lalitm.com/post/building-syntaqlite-ai/) — 500 generated tests gave false security; systemic design flaws require tests against external reality
- [Set up a test-driven development flow in VS Code](https://code.visualstudio.com/docs/copilot/guides/test-driven-development-guide) — VS Code's native TDD walkthrough; plan-first, test-first development with an AI-assisted IDE
- [The Death of Traditional Testing](https://engineering.fb.com/2026/02/11/developer-tools/the-death-of-traditional-testing-agentic-development-jit-testing-revival/) — argues agentic development has broken the traditional test cycle; JiT testing as a potential replacement model

## Code quality and memory

- [Building an agentic memory system for GitHub Copilot](https://github.blog/ai-and-ml/github-copilot/building-an-agentic-memory-system-for-github-copilot/) — how agent memory accumulates across sessions; risks of stale patterns being carried forward
- [Speed is nothing without control](https://github.blog/ai-and-ml/generative-ai/speed-is-nothing-without-control-how-to-keep-quality-high-in-the-ai-era/) — verification and human oversight as non-optional; unsupervised agents require validation
- [Diff risk score](https://engineering.fb.com/2025/08/06/developer-tools/diff-risk-score-drs-ai-risk-aware-software-development-meta/) — risk-aware code review; proactive AI-generated risk-mitigating changes
- [Feedback flywheel](https://martinfowler.com/articles/reduce-friction-ai/feedback-flywheel.html) — "what distinguishes a team that merely uses AI from one that gets better at it is not the model — it is whether the team has a way to turn each interaction into a small improvement in its shared artifacts"

## Tool design and determinism

- [Writing tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) — focused tools over broad APIs; "more tools don't always lead to better outcomes"
- [Code execution with MCP: Building more efficient agents](https://www.anthropic.com/engineering/code-execution-with-mcp) — giving agents access to a real execution environment replaces unreliable simulation with deterministic feedback
- [What Makes a Good Tool for Claude Code](https://lalitm.com/writing-tools-for-claude-code/) — tool design for the Claude Code runtime
- [Codex shell tips](https://developers.openai.com/blog/skills-shell-tips) — deterministic skills over open-ended delegation; scripted procedures with inspectable outputs
- [Using Git with coding agents](https://simonwillison.net/guides/agentic-engineering-patterns/using-git-with-coding-agents/) — Git as the external, session-independent record of decisions and progress

## Runtime references

- [Claude Code sub-agents](https://code.claude.com/docs/en/sub-agents) — Claude Code Agent tool documentation
- [GitHub Copilot subagents](https://code.visualstudio.com/docs/copilot/agents/subagents) — Copilot agent primitives in VS Code
- [Codex subagents](https://developers.openai.com/codex/subagents) — Codex sub-agent capabilities