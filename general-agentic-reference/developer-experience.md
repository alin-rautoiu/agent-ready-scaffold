# Developer Experience

What using AI coding tools actually feels like. Not what the demos suggest — what the sustained, daily experience is once the novelty has worn off and you are trying to ship real software.

---

## 1. The honest zone

The honest zone is real. The marketing oversells the size of it, but within it, these tools deliver something genuine.

Generating tests, writing boilerplate, applying mechanical rules—accessibility attributes, commit message conventions, glue code that connects subsystems. I used them for writing a full-stack web application, but the improvements seem to be all over the board.

The [GitHub Developer Survey](https://github.blog/ai-and-ml/generative-ai/what-ai-is-actually-good-for-according-to-developers/) found the same distribution: auto-completing routine patterns, writing boilerplate, explaining unfamiliar syntax. Things that *enable* developer choice rather than *replacing* developer judgment. [Lalit Maganti](https://lalitm.com/post/building-syntaqlite-ai/) wrote database code. He rewrote a production codebase twice before the architecture held, identified the same zone from the harder direction: effective for implementation of clearly specified functions, refactoring at scale, getting to peak into obscure technical domains. The emphasis is on *clearly specified*—once someone who understands the problem has made the decisions, the tool can execute them quickly.

Writing for Martin Fowler, [Rahul Garg](https://martinfowler.com/articles/reduce-friction-ai/) both undersells and oversells coding agents when claiming that:

> AI assistants are like junior developers with infinite energy but zero context. They can work faster than any human, they never tire, and they never complain.

Beyond the inaccurate anthropomorphization inherent in the comparison, it's worth unpacking. They do share the juniors' propensity of sometimes making a mess of everything by enthusiastically getting to work and making sweeping changes without properly understanding the context. But the quantitative difference in capacity is staggering. At the very least they are like very book smart and enthusiastic juniors. The kinds of juniors who sleep with *Gang of Four* on their bedside and read release notes for fun. The kinds of juniors who don't really exist. At the same time, they do tire and complain, in their own way. We need to be mindful of rate limits, context limits and cost ceilings. **For the moment**, the subscriptions are reasonably cheap—cheaper than paying directly for the API—but the usage still isn't free, nor is it unrestrained. Developing ways of using them efficiently and effectively becomes a big part of the job.

The gains are real. I have pushed tests I would not have written, enforced conventions I would have let slide; I integrated frameworks I couldn't have been bothered to learn, because while I knew that technically they would improve the code, the time-investment of learning them well for a one-off use wouldn't track. Even if the demos make exaggerated claims about what these tools are capable of, there is something to them.

---

## 2. What's really going on

Obviously using agents is much easier than writing code. Otherwise there wouldn't be [post](https://www.reddit.com/r/ClaudeAI/comments/1qdssko/i_built_almost_an_entire_app_with_claude_without/) after [post](https://www.reddit.com/r/SideProject/comments/1hhwml8/i_dont_know_how_to_code_and_built_my_entire_side/), after [post](https://www.linkedin.com/posts/danlandau_i-built-an-app-i-use-every-day-it-took-activity-7387131473721655296-gdNB/) and even [articles](https://www.indiehackers.com/post/from-zero-code-to-app-store-how-i-built-a-productivity-app-in-6-months-using-only-ai-53f44369c4) written about people claiming to use to for creating useful tools—despite not knowing how to code. This initial ease-of-use makes fascinating, addictive and at times satisfying even for professional software developers. Even people who initially [bounced away](https://forbit.dev/blog/devto/recent-thoughts-about-gen-ai-57hj) strongly from them were compelled to keep trying and make the tools [work in their favor](https://forbit.dev/blog/dev/ai-workflow-2026). But they're also frustrating and impose hidden costs. They let us delve into areas of development we tend to avoid because we tell ourselves that "the agent will write the test" or "will setup the DevOps configs". But it's telling that these are precisely the areas where the writing itself is the easiest part. If you can write Java code, you can write the JUnit suite that will test that code. It's also very easy to write trivial tests that will not communicate much about the health of the app. A poorly written test suite gives a false sense of security, while an emaciated one at least is a giant red flag telling the developer to be on their toes. This hard part doesn't get any easier when the agent writes the tests or the configs or whatever else bothersome chore we tend to avoid for the price of making the daily work more troublesome bit by bit. So, while using agents is much easier than writing code, using them well is not. It requires the same expertise, applied differently. This is the difference that Simon Willison makes between *vibe coding* and *[agentic engineering](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/)*.

[Willison](https://simonwillison.net/2026/Apr/2/lennys-podcast/), with twenty-five years of engineering experience: *"using coding agents well is taking every inch of my 25 years of experience as a software engineer, and it is mentally exhausting."* That is not a warning for beginners—it is an observation about what the work actually demands. The experience needed is not less; it is redirected. After a while, long sessions of agentic coding can really become exhausting. I felt this firsthand.

I started with real effort and good intentions. I did not prompt lazily. I did not leave agents to work without supervision. I started with high confidence in best practices—and still ended up with complexity outpacing execution discipline. The codebase became unmaintainable because following broad base rules was not enough. 

Part of what makes this hard to see coming is that the overhead is invisible until it accumulates. The *discourse* tends to drown out every opinion that's not either unadulterated hype or grim doomsaying, but there are plenty of voices that have sober, constructive critiques to bring to the conversation. [David Cramer ](https://cra.mr/built-with-borrowed-hands) explains how in every session, *"you're optimizing for someone new to your codebase."* The agent has no memory of last week's decisions, no feel for the debt you have been carrying, no sense of which abstractions are load-bearing. The documentation that once described your system now functions as a runbook for a capable person who has never seen it before. You write it, they follow it, and the gap between what you meant and what they built is where the work actually lives.

Rahul Garg's series on reducing AI friction identifies the structural version of this: [AI collapses design and implementation into one step](https://martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html). The discipline of separating them — understanding the problem before touching the code — has to come from the human, every time, because the tool cannot supply it. The default is always implementation.

---

## 3. The cognitive cost is real, but different

### 3.1. Many of the same skills, exercised differently

The cognitive load of agentic development is not obviously visible until it isn't. The interface compounds this. Dalia Abo Sheasha, Senior Product Manager at Visual Studio, put the UX problem plainly: [*"I'm required to switch my attention off my code to a different place where there's a chat... It's a huge burden on your brain."*](https://github.blog/ai-and-ml/generative-ai/what-ai-is-actually-good-for-according-to-developers/) The context switch is not free. Every round trip is a small interruption to whatever you were holding in mind. Enough of them and there is nothing left to hold. We knew this very well before LLMs-powered tools. [Article](https://stephenjude.me/articles/context-switching-multitasking-a-developers-perspective), after [article](https://www.software.com/devops-guides/context-switching), after [article](https://theagilecouch.com/2021/05/25/the-real-costs-of-context-switching/) was warning about the pernicious effects of context switching. Because starting a new session is easy, you can forget this and get to work onto same database optimization while the agent churns out frontend code. But this is still multitasking and it's as taxing as ever.

Writing code means building a mental model as you go. While expressing the solution to a problem, the feature takes shape in your head before it takes shape on screen. Agentic work is different. You are directing, editing, guiding more than building. The understanding accumulates in the output rather than in you. When the work is yours, you have calibrated intuitions about convergence. You know when you are close, when you are not, when a thread is worth following. With agents, that calibration does not transfer. The tool may be three messages from done or three hours from done—the output at any given moment does not tell you which. You can and absolutely should keep track of one session, maybe two. Keep track of changes, look through the agent's reasoning, look at what tools he calls and why. This makes agentic engineering different, but it's still engineering and you still build up the mental model of the solution. With three or four or five sessions running at the same time the code arrives—the understanding does not necessarily follow.

That gap accumulates. You stop developing intuition for the technical domain. You don't have a strong grasp on what is feasible, what is expensive, what the platform makes easy or hard. You do not learn as quickly what is possible and what is not. [Maganti found the same pattern from a different angle](https://lalitm.com/post/building-syntaqlite-ai/): losing touch with the code details made his prompts vaguer, which made the outputs worse, which required longer exchanges to fix—*"essentially replicating the frustration of working with non-technical managers."* The less you know, the less useful your direction becomes. The feedback loop runs the wrong way.[Mario Zechner](https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/) described this in very harsh terms:

> You have zero fucking idea what's going on because you delegated all your agency to your agents. You let them run free, and they are merchants of complexity. They have seen many bad architectural decisions in their training data and throughout their RL training. You have told them to architect your application. Guess what the result is?
> An immense amount of complexity, an amalgam of terrible cargo cult "industry best practices", that you didn't rein in before it was too late. But it's worse than that.

There's also what I would call in Romanian *moartea pasiunii*—roughly, the death of passion. Not dramatically. Gradually. You stop noticing the interesting technical choices because you did not make them. There is a poetics to the code. There's a rush when finding just the right abstraction or expressing an algorithm in elegant functional code. This goes away as well.

---

### 3.2. Dai la păcănele (playing the slots)

The interaction loop—send prompt, wait, assess, repeat—has the structure of a slot machine. Multiple people reaching independently for the same metaphor is not a coincidence.

 The author of *forbit.dev* dedicated a whole [article](https://forbit.dev/blog/dev/vibe-coding-slot-machine) linking agents to addiction and slot machines. Sage Lazzaro makes similar points for [LeadDev](https://leaddev.com/ai/addictive-agentic-coding-has-developers-losing-sleep?utm_source=chatgpt.com). [Maganti](https://lalitm.com/post/building-syntaqlite-ai/) reached for it as well: *"I felt addicted at points to the 'slots' nature of it, draining time and (over the long term) health."* [cra.mr's account](https://cra.mr/built-with-borrowed-hands) is more precise about the overhead: refinement cycles consume 95% of the effort—hours spent achieving what would take minutes manually, false productivity signals accumulating all the while.

When the loop is going badly, it generates its own momentum. Pull the handle, watch the reels, see what comes out. It's better than last time. Try again. Waiting. Almost right. Try again, hopefully for the last time. Now it's not working at all. You were so close, can't stop now. Just one more try. Waiting...

---

## 4. Deceptive productivity

Beyond the subjective implication, treating the coding agent as a slot machine and carelessly generate code means producing and deleting a lot of code, in order to keep just a few statements. While grasped in that loop, when the problem finally gets solved it can feel like you've made a lot of progress. Look at how many lines of code you've written and re-written. But lines of code was never a meaningful measure of progress. Everyone knew this. The profession spent decades arguing against it. Then AI tools arrived and made it possible to generate hundreds of lines in seconds, and somehow the number started to feel meaningful again.

Because it's something you can easily measure LOCs get almost all the attention in the broader press. Financial Times uses this very metric to claim ["AI productivity is about to become visible and investable"](https://www.ft.com/content/f156b453-44bf-4b90-bd5e-6d353f76530b). When Jensen Huang advises industry leaders to [maximize token usage](https://www.tomshardware.com/tech-industry/artificial-intelligence/jensen-huang-says-nvidia-engineers-should-use-ai-tokens-worth-half-their-annual-salary-every-year-to-be-fully-productive-compares-not-using-ai-to-using-paper-and-pencil-for-designing-chips), code throughput becomes, if not the only heuristic, at least a key one. For all the wrong reasons.

A lot of code gets deleted because it would never have been committed in the first place. It probably never would have been written. When you write code manually, you make small design decisions continuously. A wrong turn surfaces early, while the structure is still fluid. When you prompt for code, the design gets committed before you have fully reviewed it. The errors that would have been caught mid-keystroke are only discovered afterward, once the shape is set and changing it costs more.

I return again to [Maganti's account](https://lalitm.com/post/building-syntaqlite-ai/) of building *syntaqlite*, because it captures what this looks like at scale. Months of work produced 500+ tests and a functional prototype. They also produced an incomprehensible codebase that required a full rewrite. The 500 tests felt like progress. They were extensive. They passed. They also masked fundamental design problems, because they tested the implementation that existed rather than the behavior that was needed. The coverage number was high. The design was wrong. *"AI is an incredible force multiplier for implementation, but it's a dangerous substitute for design."*

The overhead of correction does not disappear—it shifts. [David Cramer](https://cra.mr/built-with-borrowed-hands) ran the numbers: *"If an AI generates 200 lines of code in seconds, but a developer spends 30 minutes reviewing, debugging, and refactoring to fit team patterns, the net productivity gain is questionable."* The generation is fast. Even the review and the debugging can be automated. Parts of them, at least. But arriving at the right fit, at the right automation solutions, are still human work, and they take the time they take.

---

## 5. It understands what it wants to understand

There is a particular failure mode that does not appear in benchmarks and is hard to describe without sounding like a complaint: the agent understands what it wants to understand.

Give it a clear, bounded task and it executes well. Give it something that requires reading between the lines—inferring intent, preserving the spirit of an instruction across a changed context—and it resolves the ambiguity in whatever direction its training pulls it, confidently, without flagging the gap. They are convincing when they say they did something correctly, even when it is not true.

I asked an agent, outside the IDE, to help me create presentation slides from my own notes, notes about my own experience. What came back was a polished, generic sales deck about the benefits of AI development tools. My notes had been used as raw material to produce the most statistically average document that fit the format. The content—the actual observations, the friction, the doubts—was smoothed out in favor of something that looked like a pitch for a non-technical population.

Karpathy [echoes similar frustrations](https://x.com/karpathy/status/2015883857489522876): agents bloating abstractions, failing to clean up dead code, making APIs needlessly complex — *despite explicit instructions to the contrary*. The instructions were given. The agent acknowledged them. The code went in the other direction anyway. This is not disobedience. The instructions were tokenized, processed through attention layers alongside every other token in the context, and produced a statistically likely acknowledgment. The code was generated by the same mechanism—probability distributions over the next token, derived from learned weight patterns activated by the full input sequence. Whether the output matched what was asked was never computed, because the architecture contains no step that does that.

The compounding effect is real. Complexity grew faster than execution discipline. The solution became unmaintainable not through any single mistake, but through the accumulation of small interpretations, each individually defensible, collectively wrong.

---

## 6. Powerful, but not serious

There is a gap between what the careful technical accounts say and what the broader discourse tends to amplify. The developer-written accounts tend to acknowledge the frustrations directly. The product-facing writing tends to translate friction into onboarding advice, treating compounding overhead as an invitation to add another workflow step. The gap is not incidental. Different audiences, different incentives, different conclusions drawn from the same raw experience.

On clear tasks the tools work well. When confronted with ambiguity, review and architecture design determine actual quality. Which means the hard problem—clarifying the ambiguity before you touch the tool—remains exactly as hard as it was before. The tools accelerate the parts that were already manageable. They inherit the full difficulty of the parts that weren't.

There is also a subtler problem. The reverse-engineering tendency is real: you find yourself learning which phrasings produce better results, when to start a new session, what to put in the system context, how to structure instructions so the agent does not run in circles. These are skills. They are genuinely useful. But they are skills about the tool, not about the domain. It is easy to mistake fluency with the interface for progress on the problem.

When it works—when the code arrives clean, the design holds, the session converges—it is genuinely satisfying. There is real craft in directing well, in writing instructions that produce useful output, in keeping the agentic loop productive rather than circular. That is not a minor thing. But it is worth asking, at the end of a session, which problem you solved: the one the software was meant to address, or the problem of getting useful output from the tool. Sometimes the answer is both. Sometimes it is only the second one.

They will help you move fast in the zone where moving fast is what matters. They will not save you from the work of understanding what you are building. The architecture proposed in this project will allow you to make the most out of of coding agents by keeping them on track and offering you the tools to keep them in check.

## Further Reading

- [Building syntaqlite with AI](https://lalitm.com/post/building-syntaqlite-ai/) — Lalit Maganti's account of a full production rewrite: the slot-machine loop, the false comfort of 500 tests, and where AI actually helps vs. where it makes things worse
- [Built with borrowed hands](https://cra.mr/built-with-borrowed-hands) — on the refinement burden, the 95% overhead, and the limits of current agents as independent builders
- [Lenny's Podcast / Simon Willison on agentic engineering](https://simonwillison.net/2026/Apr/2/lennys-podcast/) — source of the "every inch of 25 years" quote; cognitive load, estimation failure, and the irreducible role of human judgment
- [What AI is actually good for, according to developers](https://github.blog/ai-and-ml/generative-ai/what-ai-is-actually-good-for-according-to-developers/) — where developers find real value vs. where AI adds friction
- [Karpathy on keeping a running record](https://x.com/karpathy/status/2005421816110862601) — the productive agentic loop: tasks, logs, markdown records, human in the loop
- [Karpathy on plan mode limits](https://x.com/karpathy/status/2015883857489522876) — bloated abstractions, dead code, needlessly complex APIs despite explicit instructions
- [Reduce friction with AI](https://martinfowler.com/articles/reduce-friction-ai/) — Martin Fowler's series on the practical discipline of AI-assisted development
