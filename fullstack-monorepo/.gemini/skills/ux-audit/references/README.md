# .claude/skills/ux-audit/

Tiered UX audit skill files loaded by the UX Audit agent based on what is being audited. Skills are not all loaded at once — the agent selects which tiers are relevant before each audit.

## Tier structure

| Tier | Skills | When to load |
| --- | --- | --- |
| Baseline | `UI_DECISION_GUIDE.md` | Every audit |
| Tier 1 | `dashboard.md`, `filters.md` | Data tables, filter views, real-time updates |
| Tier 2 | `forms.md`, `edition-authoring.md`, `microcopy.md` | Forms, multi-step flows, send-readiness, labels |
| Tier 3 | `overlays.md`, `sticky.md`, `navigation.md`, `honest-ux.md` | Icons/dialogs, sticky elements, nav, consent flows |

## What goes here

Each file documents audit criteria for one UI pattern category. A good audit skill file includes:

- What to look for (checklist format)
- Severity definitions for common failures
- Examples of passing vs failing states
- How the pattern interacts with other patterns

## Rules

**Do** load only the tiers relevant to the pages being audited. Loading all skills at once inflates context and produces findings for patterns that are not present.

**Do** read `UI_DECISION_GUIDE.md` before any page-level audit. It sets the decision-first framework that all other skills operate within.

**Don't** modify these files to match the current application state. Skill files describe general patterns; application-specific context goes in `docs/`.

**Don't** create a new skill file for a single page. Skills describe recurring patterns across multiple pages. If only one page has an issue, document it in `docs/` instead.

## Audit workflow

1. Run discovery gate (15 min) — identify pages in scope, viewports, and authentication requirements
2. Read baseline + applicable tier skills before any page-level work
3. Apply severity definitions from the skill file, not ad-hoc judgements
4. Stop auditing a pattern once it is confirmed across 2–3 pages — do not file duplicates
