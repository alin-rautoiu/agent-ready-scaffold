# Orchestrator → Implementation Lead → Code Review

For anything other than toys, quick throwaway tools or features inside a mature codebase, plan mode is not enough. As Andrej Karpathy [says](https://x.com/karpathy/status/2015883857489522876):

> Things get better in plan mode, but there is some need for a lightweight inline plan mode. They also really like to overcomplicate code and APIs, they bloat abstractions, they don't clean up dead code after themselves, etc. They will implement an inefficient, bloated, brittle construction over 1000 lines of code and it's up to you to be like "umm couldn't you just do this instead?" and they will be like "of course!" and immediately cut it down to 100 lines. They still sometimes change/remove comments and code they don't like or don't sufficiently understand as side effects, even if it is orthogonal to the task at hand. All of this happens despite a few simple attempts to fix it via instructions in CLAUDE.md.

These three agents form the core execution loop. Understanding where each one's responsibility ends is as important as understanding what each one does.

Inspired by:

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic's canonical guide on orchestrator/evaluator patterns and the compounding cost of unchecked agent errors
- [Harness design for long-running apps](https://www.anthropic.com/engineering/harness-design-long-running-apps) — why evaluation must be separated from generation; agents consistently praise their own mediocre output
- [Subagents](https://simonwillison.net/guides/agentic-engineering-patterns/subagents/) — role specialization for context preservation; reviewer, debugger, and explorer as distinct agents
- [How coding agents work](https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/) — LLM as a stateless function, tool loops, system prompt mechanics
- [GitHub Copilot subagents](https://code.visualstudio.com/docs/copilot/agents/subagents) — Copilot agent primitives and sub-agent invocation in VS Code
- [Codex subagents](https://developers.openai.com/codex/subagents) — Codex sub-agent capabilities and invocation patterns
- [Claude Code sub-agents](https://code.claude.com/docs/en/sub-agents) — Claude Code Agent tool documentation
- [Run multiple agents at once with Fleet](https://github.blog/ai-and-ml/github-copilot/run-multiple-agents-at-once-with-fleet-in-copilot-cli/) — parallel agent execution patterns and work distribution
- [Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) — Anthropic's practical experience building multi-agent research systems; agent coordination at scale

## Document role

This document explains the rationale behind the three-agent loop. The executable instructions live in the agent files in `.claude/agents/`. When the two conflict, the agent files take precedence — this document explains *why*, not *what to do*.

## The flow

```
Orchestrator
  │
  ├─► reads the plan, picks the next task
  │
  ├─► spawns Implementation Lead
  │       │
  │       ├─ writes tests first (when testable in isolation)
  │       ├─ implements incrementally
  │       ├─ runs full test suite
  │       └─ returns a structured handoff:
  │              outcome, files changed, test summary,
  │              risk areas, deferred items, open questions
  │
  ├─► spawns Code Review (when the task warrants it)
  │       │
  │       └─ reads the diff and handoff
  │          returns severity-ranked findings:
  │              BLOCK  — must fix before merge
  │              RECORD — file as issue, proceed
  │              DISCARD — acknowledged, no action
  │
  └─► applies triage policy to findings
        BLOCK  → sends task back to Implementation Lead
        RECORD → creates an issue, moves to next task
        DISCARD → moves to next task
```

## Why the separation matters

**The Orchestrator does not write code.** Its job is to keep the plan moving and apply triage policy consistently. An orchestrator that starts fixing things it just reviewed is no longer managing the plan — it's improvising, and it will make implementation decisions without the context the Implementer had.

**The Implementation Lead does not invoke Code Review.** Review is a gate controlled by the Orchestrator, not a step the Implementer decides to run. If the Implementer could invoke its own reviewer, it would either skip it when confident (exactly when review matters most) or use it to rubber-stamp its own output. See [harness design for long-running apps](https://www.anthropic.com/engineering/harness-design-long-running-apps): "agents tend to respond by confidently praising the work — even when the quality is obviously mediocre."

**Code Review does not triage.** It returns findings with severity ratings and stops there. Triage — deciding what to act on, defer, or discard — is the Orchestrator's job. A reviewer that starts deciding what to fix next has absorbed the Orchestrator's role and broken the feedback loop.

## The handoff packet

The Implementation Lead's handoff is the connective tissue of the loop. It must include:

| Field | Purpose |
| --- | --- |
| Outcome | What was done in one sentence |
| Done criteria | Whether each acceptance criterion was met |
| Files changed | Exact list, used by Code Review to scope its diff |
| Test summary | Pass/fail counts, any skipped tests and why |
| Risk risk areas | Areas of the diff the Implementer is least confident about |
| Deferred items | Things explicitly left out of scope |
| Open questions | Ambiguities discovered during implementation |

A handoff without risk areas and deferred items is incomplete. These fields are where the Implementer admits uncertainty — which is exactly the signal the Code Reviewer needs to focus on.

## When to invoke Code Review

Code Review is not run after every task. The Orchestrator invokes it when:

- The diff touches shared infrastructure (middleware, DB helpers, auth)
- The task was ambiguous and the Implementer flagged open questions
- The handoff lists risk areas
- The change is large or crosses multiple layers

Routine tasks with small, well-scoped diffs and a clean test run do not need a full review pass.

---

## Why this loop saves time and tokens

It looks expensive. Three agents, structured handoffs, a triage policy. In the first few tasks, it is slower than telling a single agent to "just do it."

The investment pays back through one mechanism: **it stops errors from compounding.**

Without the loop, a flawed pattern introduced in task 3 gets silently copied into tasks 4 through 12 as agents use existing code as their reference. You discover the problem at task 13. You now fix one task plus undo and redo every task that built on top of it. With a review gate, the pattern is caught at task 3 and fixed once. Anthropic's [building effective agents](https://www.anthropic.com/engineering/building-effective-agents) frames it this way: "the potential for compounding errors" is the primary cost of autonomous agents without checkpoints.

The same logic applies to planning. Tokens spent on a plan are far cheaper than tokens spent implementing the wrong thing, discovering it is wrong, and implementing it again. A planning phase that gets thrown away because the requirements changed is insurance that paid out as soon as it revealed the ambiguity.

Handoffs also compress context. Without structured handoffs, each new session reconstructs its understanding of the project from conversation history or by re-reading the codebase. A structured handoff—outcome, files changed, test summary, risk areas, deferred items, open questions—transfers only what the next agent needs. Context windows stay manageable across long multi-session work.

The break-even point depends on project size. On a single-task fix, there is no break-even so the overhead is real and the savings are zero. On a feature that spans five tasks, you will likely break even on the first error the review gate catches. On a multi-week project worked across many sessions, the loop is not overhead, it is the structure that makes the project tractable at all.

## How long before this becomes superseded by new models?

Chain-of-thought prompting, extended thinking, and task decomposition are improvements that operate **within a single inference pass**. They make a model reason more carefully on the way to one output. The loop operates **across multiple inference passes, across separate contexts, over time.** This is a difference of kind, not scale, and it is why better models improve the loop rather than replacing it.

Reasoning improvements reduce errors *per token*. The loop reduces error *propagation across a sequence of tasks*. A model that reasons perfectly in each individual step can still produce a codebase that accumulates bad patterns across thirty tasks if there is no cross-task check. These are orthogonal problems.

The structural principle of external review also remains load-bearing regardless of model quality. The reviewer catches things the Implementer will not. Not because the model is bad, but because it reads the diff from outside the context in which it was written. It does not carry the assumptions the Implementer made, does not know which shortcuts felt justified, does not share the same blind spots. That epistemic gap is architectural. It does not close as training improves. If anything, the review gate matters more as models become more capable, because the mistakes that remain become subtler and harder to spot by reading the output. Even Anthropic admits, in the [harness design guide](https://www.anthropic.com/engineering/harness-design-long-running-apps), that isolating evaluation from generation is "far more tractable than making a generator critical of its own work."

What does change as models improve is where you can relax the loop. When a model gains a reliable native planning step, you can simplify the Orchestrator. When self-review improves, you can raise the threshold for invoking Code Review. These are calibrations, not replacements.

**Handwriting the loop will eventually become unnecessary. But its replacement will not be invisible.**

Coding agents are powered by Large **Languange** Models. The textual nature of these tools is foundational to them. When Anthropic engineers debug Claude bugs, they [debug](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues) the predicted next-tokens and their probabilities. Chain-of-thought was absorbed silently into models. Users did not need to understand it or make decisions about it, since it just made outputs better. Orchestration loops will not be absorbed the same way. For the short and medium term, complex workflows will remain defined in skill and agent files. This is the way the frontier AI labs work themselves. For example, when GPT-5.4 launched, the [frontend skill](https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4#bringing-it-all-together-with-the-frontend-skill) was included as an editable text file to be used as any other skill authored by users of OpenAI. The same goes for Anthropic's [Frontend Design Plugin](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/README.md). The OpenAI engineers observed that as they built more complex apps, "files shouldn't be treated as secondary inputs", rather that they ["can unlock new interactions"](https://developers.openai.com/blog/15-lessons-building-chatgpt-apps).

On a broader time horizon, the concepts encoded in orchestration loops, such as role separation, plan gates, structured handoffs, triage policy, will be built into future tooling as explicit, configurable, visible features. Platforms will expose them as settings. IDEs will surface them as workflow steps. Models will be trained to expect them as scaffolding. We see this with tools like [Chat Debug View](https://code.visualstudio.com/docs/copilot/chat/chat-debug-view), which formalizes the existing prompting workflows.  

That means the decisions you are making right now by designing the loop manually—when to invoke review, what the handoff must contain, what triage means, where session boundaries go—are the same decisions you will be asked to make when you configure those future tools. The vocabulary will change. The underlying tradeoffs will not. Understanding the loop now is not work you will throw away. It is preparation for evaluating and configuring a more capable version of the same thing. See also [The era of AI as text is over — execution is the new interface](https://github.blog/ai-and-ml/github-copilot/the-era-of-ai-as-text-is-over-execution-is-the-new-interface/):

> The shift from "AI as text" to "AI as execution" is architectural. Agentic workflows are programmable planning and execution loops that operate under constraints, integrate with real systems, and adapt at runtime.
> The GitHub Copilot SDK makes those execution capabilities accessible as a programmable layer. Teams can focus on defining what their software should accomplish, rather than rebuilding how orchestration works every time they introduce AI.
