---
name: ux-audit
description: Comprehensive UX audit suite for reviewing information hierarchy, navigation, forms, dashboards, and honest UX patterns. Invoke this skill before any UX audit or design review.
---

# UX Audit Skill

This skill provides a comprehensive suite of checklists and guidelines for performing UX audits across various parts of the application.

## How to use this skill

When this skill is activated, you have access to a set of specialized audit checklists in the `references/` directory. Depending on the component or page you are auditing, consult the relevant reference file:

- **Dashboards & Data Tables**: See `references/dashboard.md` and `references/filters.md`
- **Forms & Multi-step Flows**: See `references/forms.md`
- **Navigation & Menus**: See `references/navigation.md` and `references/navigation-reliability.md`
- **Overlays & Popovers**: See `references/overlays.md`
- **Microcopy & Writing**: See `references/microcopy.md`
- **Honest UX & Transparency**: See `references/honest-ux.md`
- **Sticky Elements**: See `references/sticky.md`
- **Content Authoring**: See `references/edition-authoring.md`

## Audit Process

1. **Identify the Scope**: Determine which pages or components are being audited.
2. **Select Checklists**: Open the relevant markdown files from the `references/` folder.
3. **Perform Checks**: Evaluate the implementation against the criteria in the checklists.
4. **Report Findings**: Categorize findings by severity (Critical, Major, Minor, Info) as defined in the reference files.
5. **Propose Fixes**: Provide actionable recommendations for each identified issue, following the "Correct Patterns" described in the references.

---

## When to invoke this skill

Invoke this skill before starting any UX audit, UI review, or when implementing new features that require adherence to established UX standards.
