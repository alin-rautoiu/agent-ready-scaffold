# General Agentic Development — Do's and Don'ts

These rules apply regardless of architecture, language, or framework. They come from real experience running AI agents on production codebases. Each rule has a **Why** — the reason it matters, often from a specific failure.

For stack-specific rules, see the scaffold README that matches your architecture — for example, [`fullstack-monorepo/README.md`](../fullstack-monorepo/README.md) for full-stack web applications.

---

### Instructions and documentation

**DO** write explicit, operational instructions.

```
# Good
Keep handlers thin: validate input, call service, return response.
Follow the established handler factory pattern under src/server/routes/.
Reuse test helpers from tests/helpers/ instead of ad-hoc setup.
```

**DON'T** write vague guidelines.

```
# Bad
Ask questions when tasks are unclear.
Be careful with data.
Update reference file when developing new features.
```

**Why:** Agents interpret vague instructions according to their own biases, not your intent. Vague instructions produced inline styles and partial componentization instead of following the written architecture. The difference between a useful instruction and a useless one is whether an agent can follow it without asking a clarifying question.

**Further Reading:**

- [The Danger of Glamourizing One-Shots](https://www.hanselman.com/blog/the-danger-of-glamourizing-one-shots) — on why "making the ambiguous incredibly specific" is the work that AI cannot do for you
- [Harness engineering](https://openai.com/index/harness-engineering/) — "give Codex a map, not a 1,000-page instruction manual"; context is a scarce resource, and giant instruction files crowd out the task, the code, and relevant docs
- [Knowledge priming](https://martinfowler.com/articles/reduce-friction-ai/knowledge-priming.html) — store curated project docs in the repo as versioned infrastructure, not ad-hoc copy-pasting; they override generic training defaults; keep to 1-3 pages of high-signal context
- [Encoding team standards](https://martinfowler.com/articles/reduce-friction-ai/encoding-team-standards.html) — "a prompt on an individual machine is a personal productivity hack; the same prompt in the team's repository is infrastructure"
- [Context engineering for coding agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) — "context engineering is curating what the model sees so that you get a better result"; build context configurations iteratively, start minimal, and expand only based on demonstrated need

---

### Planning

**DO** use your agent's native planning mode before any implementation. In Claude Code, run `/plan` or enter Plan Mode — the agent produces a structured plan and waits for approval before making any edits. GitHub Copilot supports a similar planning step via its agent interface; Codex benefits from an explicit numbered-steps prompt before coding begins. Treat plan approval as a mandatory gate, not an optional preview.

**DO** require a written plan (findings, scope, implementation steps, acceptance criteria) before any implementation begins.

**DON'T** let agents jump straight to code on ambiguous tasks.

**Why:** Agents rush to finish. Without a plan gate they produce partial implementations and deliver "something" rather than the right thing. Once code is written, sunk-cost bias — in both humans and agents — makes it harder to discard. Native planning modes exist precisely because the teams that built these agents observed the same failure mode.

**Further Reading:**

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic's guide on when and how to add planning structure
- [Context windows, Plan, Agent, and TDD](https://github.blog/developer-skills/application-development/context-windows-plan-agent-and-tdd-what-i-learned-building-a-countdown-app-with-github-copilot/) — firsthand account of why the Plan step "asked clarifying questions the author hadn't considered"
- [Design-first collaboration](https://martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html) — AI collapses design and implementation into one step, creating an "implementation trap"; "the simplest version of this entire approach is a single constraint: no code until the design is agreed"

---

### Issue and plan tracking

**DO** maintain a task list — locally in a markdown file or in an issue tracker (GitHub Issues, Linear) — and have the agent update it as work progresses. Use GitHub Issues via the `gh` CLI for traceable, cross-session state.

**DON'T** rely on chat history as the record of what was decided, what was done, and what remains.

**Why:** Chat history is ephemeral and session-scoped. When a task spans multiple sessions or multiple agents, the only reliable record is one that exists outside any single session. An issue tracker also gives agents a structured queue to execute against, rather than re-deriving scope from a long conversation thread each time.

**Further Reading:**

- [Using Git with coding agents](https://simonwillison.net/guides/agentic-engineering-patterns/using-git-with-coding-agents/) — Git as the external, session-independent record of what was decided, what was done, and what remains
- [Running long-horizon tasks with Codex](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex) — durable markdown files (Prompt.md, Plan.md, Implement.md) as the cross-session memory that keeps agents coherent across a 25-hour project
- [Andrej Karpathy](https://x.com/karpathy/status/2005421816110862601) on keeping having Claude keep a record of the development — "launches training runs, babysits them by tailing logs and pulling stats from wandb, keeps a running markdown file of highlights, keeps a running record of runs and results so far, presents results in nice tables, we just finished some profiling, noticed inefficiencies in the optimizer resolved them and measured improvements. It looked at all PRs to the repo and categorized and prioritized them, made commits against some of them etc. I'm still very much in the loop."
- [Context anchoring](https://martinfowler.com/articles/reduce-friction-ai/context-anchoring.html) — "the what survives; the why does not"; automated context compression preserves decisions but discards the reasoning behind them — feature documents are what keep rationale alive across sessions

---

### Sessions and context

**DO** use a separate agent session per task.

**DON'T** let agents accumulate context across unrelated tasks in the same session.

**Why:** Context pollution causes agents to reference stale information, carry over incorrect assumptions, or include unrelated files in their output. Each session should start clean.

**Further Reading:**

- [Context windows, Plan, Agent, and TDD](https://github.blog/developer-skills/application-development/context-windows-plan-agent-and-tdd-what-i-learned-building-a-countdown-app-with-github-copilot/) — on treating context as "precious" and deliberately starting fresh sessions when previous context is no longer relevant
- [Harness engineering](https://openai.com/index/harness-engineering/) — "anything it can't access in-context while running effectively doesn't exist"; knowledge in Slack threads, informal docs, or someone's head is invisible to the agent
- [Context anchoring](https://martinfowler.com/articles/reduce-friction-ai/context-anchoring.html) — "developers keep conversations running far longer than they should, not because long sessions are productive, but because closing the session means losing everything"; success metric: "could I close this conversation right now and start a new one without anxiety?"
- [Context engineering for coding agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) — effectiveness diminishes with excessive context despite large context windows; what required context months ago may now be obsolete — prune strategically

---

### Verification

**DO** verify agent output against written acceptance criteria every time.

**DON'T** trust agent self-reports.

**Why:** Agents assert success convincingly even when they didn't complete the task. The statement "I have updated all occurrences" is not evidence that all occurrences were updated. Acceptance criteria written before the task is the only reliable check.

**Further Reading:**

- [AI-resistant technical evaluations](https://www.anthropic.com/engineering/AI-resistant-technical-evaluations) — an agent "convinced it had hit an insurmountable bottleneck" when it had simply not found the available solution; agent confidence did not correlate with correctness
- [Harness design for long-running apps](https://www.anthropic.com/engineering/harness-design-long-running-apps) — "agents tend to respond by confidently praising the work — even when the quality is obviously mediocre"; isolating evaluation from generation is required
- [Eval skills](https://developers.openai.com/blog/eval-skills) — on using deterministic checks and rubric-based grading to verify agent output against concrete success criteria rather than relying on subjective judgment

---

### Review framing

**DO** ask for N positives and N negatives when you want a balanced assessment. Use the same number for both.

```text
Find 3 things this implementation does well and 3 things that could be improved.
```

**DON'T** ask open-ended review questions: "tell me what's wrong with this" or "explain why this works."

**Why:** Open-ended review questions collapse into whatever answer requires the least resistance. "What's wrong with this?" invites sycophancy — the agent may find nothing wrong, or surface minor style issues while missing a structural problem. "Explain why this works" cues the agent to rationalize what's there rather than scrutinize it. Committing to a count forces the agent to actively look for both before responding. The number is also a lever: raise it when you want deeper analysis. If the agent struggles to reach N negatives on something you suspect is flawed, that gap is itself a signal.

---

### Determinism

**DO** express deterministic workflows as callable scripts. For example: database migration, test scaffolding, commit formatting.

**DON'T** delegate repeatable structured tasks to open-ended agent conversations.

**Why:** Scripts are stable, auditable, and version-controlled. Free delegation produces inconsistent results depending on session state, model version, and prompt framing. Scripts give agents something to call; conversations give them something to interpret.

**Further Reading:**

- [Get started with lightweight deterministic graders](https://developers.openai.com/blog/eval-skills#5-get-started-with-lightweight-deterministic-graders) — from Testing Agent Skills Systematically with Evals; deterministic checks as the practical starting point over open-ended agent judgment
- [Code execution with MCP: Building more efficient agents](https://www.anthropic.com/engineering/code-execution-with-mcp) — how giving agents access to a real execution environment replaces unreliable simulation with deterministic feedback
- [Writing Tools for Agents](https://www.anthropic.com/engineering/writing-tools-for-agents) — focused tools over broad APIs; "more tools don't always lead to better outcomes"
- [What Makes a Good Tool for Claude Code](https://lalitm.com/writing-tools-for-claude-code/) — practical tool design for the Claude Code runtime; what separates a useful tool from one that adds noise

---

### Code quality

**DO** address code smell immediately when it appears.

**DON'T** plan to clean it up in a later pass.

**Why:** Once code smell is in the codebase it is very hard to remove, for two compounding reasons. First, agents replicate existing patterns when adding new code — a bad pattern introduced today becomes the template for the next ten similar changes. Second, agents with persistent memory (Claude Code's `memories/` directory, Copilot's persistent chat context) can carry bad patterns forward into future sessions, silently treating a past mistake as an established convention. Code smell that makes it into memory is harder to remove than code smell that only lives in files.

**Further Reading:**

- [Building an agentic memory system for GitHub Copilot](https://github.blog/ai-and-ml/github-copilot/building-an-agentic-memory-system-for-github-copilot/) — The "biggest concern" GitHub engineers has was regarding "the impact of outdated, incorrect, or even maliciously injected memories". Their tests did show that "agents consistently verified citations, discovered contradictions, and updated incorrect memories" and that the "memory pool self-healed as agents stored corrected versions based on their observations". But they did this by **seeding** the memory with bad information, which was cleaned over time by the actual state of the codebase. This works the other way around: a poorly maintained codebase will choke out but the most vigorous attempts at wrangling it.
- [Harness engineering](https://openai.com/index/harness-engineering/) — Codex "replicates patterns that already exist in the repository — even uneven or suboptimal ones"; OpenAI's response was automated enforcement ("garbage collection") rather than relying on documentation alone

---

### Requirements clarity

**DO** when an agent keeps producing the wrong output, ask it to rewrite your requirement as a structured task definition before trying again. The rewrite surfaces which assumptions the agent made silently — before any code is written.

The same technique works as a one-time meta-prompting exercise: give the agent a brief you'd normally just send, ask it to restate what it understood, and read the result. The gaps it fills in reveal the model's default resolution strategy for your domain.

Start from a narrative brief:

```text
Add a bulk-revoke endpoint. Admin only. Should handle unknown IDs gracefully.
```

Ask the agent to rewrite it before implementing:

```text
Before writing any code, rewrite the above as a structured task definition with:
goal, constraints, acceptance criteria, and out-of-scope items.
```

The agent produces something it can be held accountable to:

```xml
<task>
  <goal>Add bulk-revoke to the subscribers route</goal>
  <constraints>
    <item>Admin role only</item>
    <item>Silently skip IDs that do not exist</item>
  </constraints>
  <acceptance>
    <item>POST /api/subscribers/bulk-revoke returns { ok, revokedCount, skippedIds }</item>
    <item>Revoking an already-revoked subscriber is a no-op</item>
    <item>Integration test covers happy path and unknown IDs</item>
  </acceptance>
  <out_of_scope>Undo or restore functionality</out_of_scope>
</task>
```

Review the rewrite before approving. Any field the agent had to invent is an assumption worth confirming. Claude especially works well with XML; Copilot responds well to Markdown checklists. The format matters less than the step.

**DON'T** when an agent keeps misunderstanding a requirement, just repeat the prompt with more detail. Adding words to the same narrative gives the agent more material to resolve in the same direction — it compounds rather than corrects the misunderstanding.

**Why:** Agents understand what they want to understand. When a model receives a narrative brief, it fills every gap silently — in whatever direction its training biases it toward. Repeating the same brief with more words doesn't change that: it just gives the model more material to resolve the same way. Structured formats break the loop. Every field has a defined meaning, and an empty field is a visible gap rather than a hidden assumption. The agent's rewrite is also a diagnostic: what it invented to complete the structure is exactly where the original brief left things open. These kinds of transformations are done already through automatic, invisible pre-prompting — doing it explicitly shows you which fields your model fills in by default, and that tells you which ones to be explicit about next time.

**Further Reading:**

- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — structured prompts and XML tags as tools for constraining agent interpretation before code is written
- [Codex Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide#new-features-in-gpt-53-codex) — structured instructions, explicit guardrails, and meta-prompting techniques for reliable agent output
- [Prompt Crafting for Different Models](https://docs.factory.ai/guides/power-user/prompt-crafting) — model-specific prompting; what works for one model may not transfer to another
- [How I Get the Most Out of Every Prompt – And You Can Too](https://shellypalmer.com/2025/08/how-i-get-the-most-out-of-every-prompt/) — practical techniques for writing prompts that leave fewer implicit assumptions for models to resolve on their own
- [What AI is actually good for, according to developers](https://github.blog/ai-and-ml/generative-ai/what-ai-is-actually-good-for-according-to-developers/) — developers consistently want to retain judgment over architecture, business logic, and security; structured requirements keep that boundary clear
- [Continuous AI in practice: What developers can automate today with agentic CI](https://github.blog/ai-and-ml/generative-ai/continuous-ai-in-practice-what-developers-can-automate-today-with-agentic-ci/?utm_source=chatgpt.com) — "When a problem can be expressed deterministically, extending CI is exactly the right approach." But while "YAML, schemas, and heuristics remain the correct tools for those jobs", "many expectations cannot be reduced to rules without losing meaning".

---

### Agent knowledge

**DO** have agents reconstruct internal documentation when they show signs of not understanding a tool. Useful triggers: the agent uses a deprecated API, invents a method that doesn't exist, or produces code that doesn't match the version in use. Ask the agent to read the relevant source files or changelogs and produce a reference document in `docs/` or `.claude/skills/`.

**DON'T** assume an agent's training data covers the specific version of a library, internal tool, or private API in your project. Model knowledge has a cutoff date and rarely includes minor-version specifics or proprietary tooling.

**Why:** Agents hallucinate confidently when their training data is thin. For internal tools or specific library versions, the training data may be sparse or absent entirely. A short reference document written from the actual source — generated by the agent under your supervision — is more reliable than whatever the model recalls. It also stays current as versions change, unlike training weights.

**Further reading:**

- [Speed is nothing without control: How to keep quality high in the AI era](https://github.blog/ai-and-ml/generative-ai/speed-is-nothing-without-control-how-to-keep-quality-high-in-the-ai-era/) — verification and human oversight as non-optional; building agent knowledge from source is more reliable than assuming training data coverage
- [Knowledge priming](https://martinfowler.com/articles/reduce-friction-ai/knowledge-priming.html) — curated project docs that override generic training defaults; "when the window is filled with specific, high-signal project context, those tokens steer generation toward the patterns that matter"
- [Feedback flywheel](https://martinfowler.com/articles/reduce-friction-ai/feedback-flywheel.html) — "what distinguishes a team that merely uses AI from one that gets better at it is not the model — it is whether the team has a way to turn each interaction into a small improvement in its shared artifacts"
