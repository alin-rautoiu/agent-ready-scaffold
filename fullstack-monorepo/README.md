# Fullstack Monorepo — Agent-Ready Scaffold

A monorepo scaffold pre-configured for multi-agent development workflows. Fill in the Stack table with your chosen technologies — the agent patterns work regardless of language or framework.

The rules below are specific to this fullstack web architecture. For architecture-agnostic do's and don'ts — planning, sessions, verification, requirements clarity, and more — read [`general-agentic-reference/README.md`](../general-agentic-reference/README.md) first.

## Stack

| Layer |
| --- |
| Backend |
| Database |
| Frontend |
| Data fetching |
| Styling |
| Testing |
| AI |
| Email |
| Scheduling |
| Auth |

## Folder map

| Path | Purpose |
| --- | --- |
| `.claude/` | Claude Code agent config (canonical source of truth) |
| `.github/` | GitHub Copilot config + CI/CD workflows |
| `.gemini/` | Gemini Code Assist context |
| `.codex/` | OpenAI Codex config |
| <!-- TODO: backend path, e.g.: `src/server/` --> | Backend: routes/controllers, services, DB access, middleware |
| <!-- TODO: frontend path, e.g.: `src/client/` --> | Frontend: components, pages, data fetching |
| <!-- TODO: shared path, e.g.: `src/shared/` --> | Cross-boundary types and pure logic |
| <!-- TODO: tests path, e.g.: `tests/` --> | Unit and integration tests |
| `docs/` | Runbooks, audit policies, UX decisions |
| `scripts/` | Executable utility scripts |
| `templates/` | Output templates (email, documents, etc.) |
| `knowledge/` | Long-lived extracted knowledge |
| `memories/` | Agent-writable semantic cache |

---

## Do's and Don'ts

These rules come from real experience running AI agents on a full-stack codebase. Each rule has a **Why** — the reason it matters, often from a specific failure.

---

### Technology choices

**DO** use battle-tested, well-maintained libraries for solved problems. Logging, testing, validation, authentication, task queuing — these have mature solutions in every ecosystem. Pick one and wire it in.

**DON'T** let agents implement their own solutions for solved problems. Left without a clear choice, agents will inline a hand-rolled logger, invent a micro test harness, or reimplement pagination from scratch — then move on without flagging it.

**Why:** Agents are confident when improvising. They will produce something that works in the happy path and looks reasonable in a code review, without knowing what the established ecosystem solution handles that theirs does not. You don't discover the gaps until production. Choosing a library upfront removes the decision from the agent's hands entirely.

**Further Reading:**

- [Designing delightful frontends with GPT-5.4](https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4#bringing-it-all-together-with-the-frontend-skill) — "For most web projects, starting with a familiar stack such as React and Tailwind works well. GPT-5.4 performs particularly strongly with these tools, making it easier to iterate quickly and reach polished results."
- [Harness engineering](https://openai.com/index/harness-engineering/) — on favoring "boring" technologies for composability, API stability, and representation in the training set; sometimes cheaper to have the agent reimplement functionality than work around opaque upstream behavior

---

### Testing

**DO** write tests before implementation. Enforce this through the review gate — the Reviewer checks for test coverage before approving handoff.

**DON'T** accept tests written after the implementation. They test what the code does, not what it should do.

**Why:** Left unsupervised, agents write code first and tests second, then write tests that confirm the implementation rather than the requirement. Route-only tests that skip service logic are a known failure mode. Introducing a Reviewer improved this, but only when the review gate is mandatory.

**Further Reading:**

- [Set up a test-driven development flow in VS Code](https://code.visualstudio.com/docs/copilot/guides/test-driven-development-guide) — VS Code's native TDD walkthrough; shows how plan-first, test-first development integrates with an AI-assisted IDE workflow
- [Context windows, Plan agent, and TDD](https://github.blog/developer-skills/application-development/context-windows-plan-agent-and-tdd-what-i-learned-building-a-countdown-app-with-github-copilot/#h-implementation-modular-test-driven-and-that-map) — the "Implementation: Modular, test-driven" section shows TDD in practice with a coding agent
- [Red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) — test-first is "a fantastic fit for coding agents"; confirm tests fail before implementing the code
- [LLMs are the key to mutation testing](https://engineering.fb.com/2025/09/30/security/llms-are-the-key-to-mutation-testing-and-better-compliance/) — on the distinction between tests that execute code and tests that validate behavior; mutation testing reveals whether tests "truly validate code behavior instead of just executing it"
- [The Death of Traditional Testing](https://engineering.fb.com/2026/02/11/developer-tools/the-death-of-traditional-testing-agentic-development-jit-testing-revival/) — argues that agentic development has broken the traditional test cycle; JiT testing as a potential replacement model

---

### Vertical slice first

**DO** implement one complete vertical slice before scaling out — a single resource or feature taken from request handling through service layer, persistence, and tests. Use it as the reference implementation for everything that follows.

**DON'T** scaffold the full project structure and then fill it in. Agents given an empty structure will make local decisions for each piece without the feedback of having seen the whole thing work end to end.

**Why:** A vertical slice surfaces real integration pain points early, before they are replicated across the codebase. More importantly, it gives agents a concrete model to follow. Agents working from an example produce more consistent results than agents working from a description. The first slice is the best investment you can make in the quality of everything that comes after it.

**Further Reading:**

- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — "examples are the 'pictures' worth a thousand words"; curated canonical examples outperform abstract descriptions
- [Building syntaqlite with AI](https://lalitm.com/post/building-syntaqlite-ai/) — a firsthand account of why the first month of "vibe-coding" produced "complete spaghetti" requiring a full rewrite; AI excels at implementation within understood patterns but cannot navigate unknown design space

---

### Code architecture

**DO** keep handlers thin — parse input, call a service, return the response:

```text
# Good
handler GET /resources:
  params = parse_query(request)
  if invalid: return error(400, params.error)
  result = resource_service.list(db, params)
  return ok(result)
```

**DON'T** let business logic accumulate in handler files:

```text
# Bad: filtering, sorting, and shaping all inside the handler
handler GET /resources:
  status = request.query("status")
  rows = db.select(resources)
  if status: rows = rows.where(status == status)
  rows = rows.order_by(created_at).limit(50)
  return ok(rows.map(transform))
```

**Why:** Because you don't write the code yourself, you discover pain points too late. Late abstraction is even worse than premature abstraction. Agents won't refactor unless explicitly asked, and code smell replicates itself as agents copy existing patterns when adding new routes.

**Further Reading:**

- [Harness engineering](https://openai.com/index/harness-engineering/) — "enforce invariants, not micromanaging implementations"; rigid architectural layers with structural tests prevent violations and enable high-throughput agent development without sacrificing coherence
- [Context engineering for coding agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) — well-structured codebases serve as powerful context themselves; "AI-friendly codebase design" reduces the amount of explicit instruction the agent needs to do the right thing

---

### Internationalization

**DO** wire up an i18n library from the start, even if you have no plans to translate the application. Use it for every user-visible string from the first line of UI code.

**DON'T** scatter string literals through components and then add i18n later. Retrofitting i18n into an existing codebase is mechanical, tedious, and exactly the kind of task where agents miss occurrences.

**Why:** Adding i18n after the fact means touching every file that contains user-visible text. Agents doing that work will miss strings, misidentify which strings belong in translation files, and introduce inconsistencies between what the key says and what the string actually is. Starting with i18n also forces a discipline that has unrelated benefits: consistent terminology, no ad-hoc string formatting, and a single place to audit copy.

**Further Reading:**

- [Continuous AI in practice: What developers can automate today with agentic CI](https://github.blog/ai-and-ml/generative-ai/continuous-ai-in-practice-what-developers-can-automate-today-with-agentic-ci/) — "Anyone who has worked with localized applications knows the pattern: Content changes in English, translations fall behind, and teams batch work late in the cycle (often right before a release)."
- [https://angular.dev/guide/i18n/translation-files](https://angular.dev/guide/i18n/translation-files) — Angular treats i18n as a first-class build-time concern with message extraction and translation workflows. As with automatic testing, AI makes it very easy to lay this best practice as a foundation of the codebase, instead of adding it later on, piecemeal.

---

## Agent configuration

Agent definitions live in `.claude/agents/` and are the canonical source of truth. When updating an agent, propagate the change to:

1. `.github/agents/` — GitHub Copilot (adapt tool syntax for PowerShell)
2. `.codex/skills/` — OpenAI Codex (use Codex skill format)
3. `.gemini/` — Gemini Code Assist (plain markdown context files)

See [CLAUDE.md](CLAUDE.md) for the full agent sync policy and runtime capability table.
