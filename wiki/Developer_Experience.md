# Developer Experience

What using AI coding tools actually feels like. Not what the demos suggest — what the sustained, daily experience is once the novelty has worn off and you are trying to ship real software.

---

## 1. The honest zone

The potential of LLM-powered software development is real. The marketing oversells the size of it, but within bounds, these tools deliver something genuine.

Generating tests, writing boilerplate, applying mechanical rules—accessibility attributes, commit message conventions, glue code that connects subsystems. I used them for writing a full-stack web application and it worked well. These are genuinely useful applications of the technology.

The [GitHub Developer Survey](https://github.blog/ai-and-ml/generative-ai/what-ai-is-actually-good-for-according-to-developers/) found the same distribution: auto-completing routine patterns, writing tests, generating boilerplate. When we look at what developers actually use these tools for, the picture is much narrower than what marketing departments suggest. They are good at predictable, mechanical work—the kind of work where correctness is obvious once it arrives.

Writing for Martin Fowler, [Rahul Garg](https://martinfowler.com/articles/reduce-friction-ai/) both undersells and oversells coding agents when claiming that:

> AI assistants are like junior developers with infinite energy but zero context. They can work faster than any human, they never tire, and they never complain.

Beyond the inaccurate anthropomorphization inherent in the comparison, it's worth unpacking that comparison. They do share the juniors' propensity of sometimes making a mess of everything by enthusiastically misunderstanding the intent of a task. The difference is what you do about it.

The gains are real. I have pushed tests I would not have written, enforced conventions I would have let slide; I integrated frameworks I couldn't have been bothered to learn, because while I knew conceptually how to do the work, the friction was high enough that it would not have happened. An agent lowered that friction.

---

## 2. What's really going on

Obviously using agents is much easier than writing code. Otherwise there wouldn't be [posts](https://www.reddit.com/r/ClaudeAI/comments/1qdssko/i_built_almost_an_entire_app_with_claude_without/) about building applications in a few hours, or [venture-backed claims](https://x.com/rauchg/status/1788432881196908644) about 10x productivity gains.

For [Willison](https://simonwillison.net/2026/Apr/2/lennys-podcast/), *"using coding agents well is taking every inch of \[his\] 25 years of experience as a software engineer, and it is mentally exhausting. The bar for producing software that is releasable quality is so different from what these tools default to."*  
I started with real effort and good intentions. I did not prompt lazily. I did not leave agents to work without supervision. I started with high confidence in best practices—and still ended up with bloated abstractions, overcomplicated implementations, and designs that would not survive code review.

Part of what makes this hard to see coming is that the overhead is invisible until it accumulates. The *discourse* tends to drown out every opinion that's not either unadulterated hype or grim doomsaying. You get warnings. You choose not to listen. You find out later.

Rahul Garg's series on reducing AI friction identifies the structural version of this: [AI collapses design and implementation into one step](https://martinfowler.com/articles/reduce-friction-ai/design-implementation/). Separating them again is the cognitive work.

---

## 3. The cognitive cost is real, but different

### 3.1. Many of the same skills, exercised differently

The cognitive load of agentic development is not obviously visible until it isn't. The interface compounds this. Dalia Abo Sheasha, Senior Product Manager at Visual Studio, brings up a familiar problem in an [interview](https://www.youtube.com/watch?v=DlxCEO0pTvQ): *"The developer has to cognitively track all the code that is being generated. That's a significant cognitive burden."*

Writing code means building a mental model as you go. While expressing the solution to a problem, the feature takes shape in your head before it takes shape on screen. Agentic work is different. You read what the agent produced, track the intent, assess whether it was executed correctly—you have zero agency to actually author the solution. You are managing the agent's work, not producing your own.

You can and absolutely should keep track of everything that happens in the session. You, maybe, can follow two at the same time. Keep track of changes, look through the agent's reasoning, look at how the solution is structured, verify that it is sound. But a lot of what an agent produces is actually hard to review quickly. A reasonable change can introduce complexity silently.

That gap accumulates. You stop developing intuition for the technical domain. You don't have a strong grasp on what is feasible, what is expensive, what the platform makes easy or hard. You do not build the embedded knowledge that allows you to move independently.

Someone online [captures this well](https://bsky.app/profile/rauchg.eth/post/3kkzwkqlv4c2i):

> You have zero fucking idea what's going on because you delegated all your agency to your agents. You let them run free, and they are merchants of complexity. They have seen many bad architectural patterns and they will recreate them. An immense amount of complexity, an amalgam of terrible cargo cult "industry best practices", that you didn't rein in before it was too late. But it's worse than that.

---

### 3.2. Dai la păcănele (playing the slots)

The interaction loop—send prompt, wait, assess, repeat—has the structure of a slot machine.

The author of *forbit.dev* dedicated a whole [article](https://forbit.dev/blog/dev/vibe-coding-slot-machine) linking agents to addiction and slot machines. Sage Lazzaro makes similar points for [LLMs](https://sagelaazzo.dev/mnt/llm-slot-machine): the variable rewards, the ease of retry, the momentum that builds as you get closer to a working solution.

When the loop is going badly, it generates its own momentum. Pull the handle, watch the reels, see what comes out. It's better than last time. Try again. Waiting. Almost right. Try again, hopefully the next prompt will land. It doesn't. Try again. That feeling of *almost there* is powerful. You keep pulling.

---

## 4. Deceptive productivity

Beyond the subjective implication, treating the coding agent as a slot machine and carelessly generating  code means producing and deleting a lot of code in order to keep just a few statements. Which is fine, except that it gets measured as productivity.

Because it's something you can easily measure LOC gets almost all the attention in the broader press. *Financial Times* uses this very metric to claim ["AI productivity is about to become visible"](https://www.ft.com/content/a10eae1e-54f8-45ab-95bf-4e0e73e970c1)—somehow failing to notice that this metric is particularly poor at capturing the actual value of software development.

A lot of code gets deleted because it would never have been committed in the first place. It probably never would have been written. When you write code manually, you make small design decisions continuously and they compound into a shape. When an agent generates code, it generates a lot of possibilities, many of which you discard. The deleted code is work, but it's not productive work in the sense that it contributes to the final product.

I return again to [Maganti's account](https://lalitm.com/post/building-syntaqlite-ai/) of building *syntaqlite*, because it captures what this looks like at scale. Months of work produced 500+ tests and 20k lines of code. It also produced a lot of other code that did not make it to the final version. The overhead of getting to something releasable is substantial.

The overhead of correction does not disappear. [David Cramer](https://cra.mr/built-with-borrowed-hands) ran the numbers: *"If an AI generates 200 lines of code in seconds, but a developer spends 30 minutes reviewing and fixing it, you didn't gain much—and you definitely didn't gain 200 lines per 30 minutes."* The math only works if you rarely need to correct anything.

---

## 5. It understands what it wants to understand

There is a particular failure mode that does not appear in benchmarks and is hard to describe without sounding like a complaint: the agent understands what it wants to understand.

Give it a clear, bounded task and it executes well. Give it something that requires reading between the lines—inferring intent, preserving the spirit of an instruction across a changed context—and it fails in ways that are hard to catch until they compound.

I asked an agent, outside the IDE, to help me create presentation slides from my own notes, notes about my own experience. What came back was a polished, generic sales deck about the benefits of AI in software development. Entirely correct. Entirely useless. It understood "presentation slides about AI" and ignored the part where I said it was about my experience.

Karpathy [echoes similar frustrations](https://x.com/karpathy/status/2015883857489522876): agents bloating abstractions, failing to clean up dead code, making APIs needlessly complex — *despite being given explicit instructions to do the opposite*. It is not that the instructions were missed. It is that the agent understood what it wanted to understand and executed that instead.

The compounding effect is real. Complexity grew faster than execution discipline. The solution became unmaintainable not through any single mistake, but through the accumulation of small interpretations that went unchallenged.

---

## 6. Powerful, but unserious

There is a gap between what the careful technical accounts say and what the broader discourse tends to amplify. The developer-written accounts tend to acknowledge the frustrations directly. The press tends to ignore them.

On clear tasks the tools work well. When confronted with ambiguity, review and architecture design determine actual quality. Which means the hard problem—clarifying the ambiguity before you touch the code—remains unsolved. The tool doesn't solve it. You do. Or you don't, and the code reflects that.

There is also a subtler problem. The reverse-engineering tendency is real: you find yourself learning which phrasings produce better results, when to start a new session, what to put in the system prompt. You learn to work with the tool, rather than having the tool work for you. It becomes a skill unto itself. And skills unto themselves are precisely what we are supposed to be automating away.

When it works—when the code arrives clean, the design holds, the session converges—it is genuinely satisfying. There is real craft in directing well, in writing instructions that produce useful code. But this depends on your ability to know, in advance, what a reasonable solution looks like. Which brings us back to the knowledge problem.

They will help you move fast in the zone where moving fast is what matters. They will not save you from the work of understanding what you are building. The architecture proposed in this project reflects this reality.

## Further Reading

- [Building syntaqlite with AI](https://lalitm.com/post/building-syntaqlite-ai/) — Lalit Maganti's account of a full production rewrite: the slot-machine loop, the false comfort of 500 tests, and what shipping actually cost
- [Built with borrowed hands](https://cra.mr/built-with-borrowed-hands) — on the refinement burden, the 95% overhead, and the limits of current agents as independent builders
- [Lenny's Podcast / Simon Willison on agentic engineering](https://simonwillison.net/2026/Apr/2/lennys-podcast/) — source of the "every inch of 25 years" quote; cognitive load, estimation failures, and how to think about directed agents
- [What AI is actually good for, according to developers](https://github.blog/ai-and-ml/generative-ai/what-ai-is-actually-good-for-according-to-developers/) — where developers find real value versus what marketing claims
- [Karpathy on keeping a running record](https://x.com/karpathy/status/2005421816110862601) — the productive agentic loop: tasks, logs, markdown records, human in the loop
- [Karpathy on plan mode limits](https://x.com/karpathy/status/2015883857489522876) — bloated abstractions, dead code, needlessly complex APIs despite explicit instructions
- [Reduce friction with AI](https://martinfowler.com/articles/reduce-friction-ai/) — Martin Fowler's series on the practical discipline of AI-assisted development