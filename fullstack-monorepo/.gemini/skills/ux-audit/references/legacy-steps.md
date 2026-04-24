---
name: ux-audit-legacy-steps
description: Step-by-step Playwright-based UX audit workflow (legacy). Use Strategic Phases from the main ux-audit agent instead.
---

# Legacy UX Audit Steps (0-9)

> **Note:** This workflow is superseded by the Strategic Phases (0-6) in the main UX Audit agent. Use these steps only when you need the granular Playwright command sequences for a full automated audit.

## Step 0 - Setup

0. **Preflight website reachability and router sanity:**
   ```bash
   playwright-cli -s=audit goto <!-- TODO: e.g.: http://localhost:3000/ -->
   playwright-cli -s=audit eval "({ href: location.href, readyState: document.readyState, title: document.title })"
   ```
   If this fails, retry once. If it still fails, STOP and ask the user to start or expose the app before proceeding.

   If reachability succeeds, verify API health before doing any auth recovery work:
   ```bash
   <!-- TODO: Use the project's health check command. e.g. for a Node.js app:
   node -e "fetch('<base-url>/api/health').then(async (r) => console.log(JSON.stringify({ status: r.status, body: await r.text() }))).catch((error) => { console.error(error.message); process.exit(1); })"
   -->
   ```

1. **Authenticate using the project's admin-login skill:**
   ```
   <!-- TODO: Read the project's admin-login skill. e.g.: "Read .claude/skills/admin-login/SKILL.md" -->
   ```
   Follow every step in that skill to log in and save auth state in the named `-s=audit` session. Do not enforce a standalone password requirement here; use whatever auth prerequisites are defined by the admin-login skill.

   Immediately verify that authentication actually worked before proceeding:
   ```bash
   playwright-cli -s=audit eval "fetch('<!-- TODO: e.g.: /api/auth/me -->', { credentials: 'include' }).then(async (r) => ({ status: r.status, body: await r.text() }))"
   playwright-cli -s=audit goto <!-- TODO: e.g.: http://localhost:3000/#dashboard -->
   playwright-cli -s=audit snapshot --filename=snapshot-dashboard-auth-check.yaml
   ```

   If the auth endpoint returns 401 repeatedly while the health checks above remain healthy, follow the Authentication Recovery policy in `.claude/skills/ux-audit/navigation-reliability.md`.

2. Fetch the three supplemental reference URLs for any additional criteria not covered by the skills:
   - `https://www.nngroup.com/articles/ten-usability-heuristics/`
   - `https://webaim.org/standards/wcag/checklist`
   - `https://www.nngroup.com/articles/mobile-ux/`

3. Ensure the `ux` label exists in the repo:
   1. List labels with `gh label list` and check whether `ux` is already present.
   2. If missing, create it with `gh label create "ux" --color "0075ca" --description "User experience finding"`.

4. Read the **navigation skill** now (used for every page):
   ```
   Read .claude/skills/ux-audit/navigation.md
   ```

5. Read the **microcopy skill** now (used for every page):
   ```
   Read .claude/skills/ux-audit/microcopy.md
   ```

6. Build TodoWrite list: one item per row in the Audit Scope table, plus "Keyboard spot-check", "Loading/empty state check", "Collate findings", "File issues".

---

## Step 1 - Login page audit baseline

Evaluate the Login page itself in the separate `-s=public` session so you keep an unauthenticated baseline distinct from the authenticated `-s=audit` session:

```bash
playwright-cli -s=public open <!-- TODO: e.g.: http://localhost:3000/ -->
playwright-cli -s=public snapshot --filename=snapshot-login-desktop.yaml
playwright-cli -s=public screenshot --filename=screenshot-login-desktop.png
```

Evaluate it against `forms` and `microcopy` skills:
```
Read .claude/skills/ux-audit/forms.md
```

Then continue with the authenticated `-s=audit` session established in Step 0:
```bash
playwright-cli -s=audit goto <!-- TODO: e.g.: http://localhost:3000/#dashboard -->
playwright-cli -s=audit eval "Promise.all([fetch('<!-- TODO: e.g.: /api/auth/me -->', { credentials: 'include' }).then(async (r) => ({ status: r.status, body: await r.text() })), Promise.resolve({ href: location.href, hash: location.hash })]).then(([auth, route]) => ({ auth, route }))"
playwright-cli -s=audit snapshot --filename=snapshot-dashboard-after-login.yaml
```

Use this first protected snapshot plus the auth endpoint check as the source of truth for a valid authenticated session. Do not re-run login unless auth is actually lost.

---

## Step 2 - Desktop audit (1280x800)

For **each authenticated page** in the app:

```bash
playwright-cli -s=audit resize 1280 800
playwright-cli -s=audit goto <!-- TODO: e.g.: http://localhost:3000/#<route> -->
playwright-cli -s=audit eval "({ href: location.href, hash: location.hash })"
playwright-cli -s=audit snapshot --filename=snapshot-desktop-<page-name>.yaml
playwright-cli -s=audit screenshot --filename=screenshot-desktop-<page-name>.png
```

**Before evaluating, read the skills listed for this page in the Audit Scope table.** Example:
```
Read .claude/skills/ux-audit/dashboard.md
Read .claude/skills/ux-audit/overlays.md
Read .claude/skills/ux-audit/honest-ux.md
```

Then apply every checklist item from those skills plus the Core Best Practices. Record every failure.

<!-- TODO: Document any special-case pages that require extra navigation steps.
e.g.: "For a detail/editor page: navigate to the list, extract a real record ID from the ARIA tree, then navigate to the detail route. If no records exist, create one via the API first."
-->

Mark the page todo complete after evaluation.

---

## Step 3 - Mobile audit (375x812)

```bash
playwright-cli -s=audit resize 375 812
```

Read the navigation skill again for mobile-specific checks (only needed once for the sidebar mobile pattern):
```
Read .claude/skills/ux-audit/navigation.md
```

For each page, repeat the snapshot + screenshot + evaluation from Step 2 with mobile filenames:
```bash
playwright-cli -s=audit goto <!-- TODO: e.g.: http://localhost:3000/#<route> -->
playwright-cli -s=audit eval "({ href: location.href, hash: location.hash })"
playwright-cli -s=audit snapshot --filename=snapshot-mobile-<page-name>.yaml
playwright-cli -s=audit screenshot --filename=screenshot-mobile-<page-name>.png
```

Mobile-specific checks for every page:
- Horizontal scroll:
  ```bash
  playwright-cli -s=audit eval "document.documentElement.scrollWidth > document.documentElement.clientWidth"
  ```
- Touch target sizes are visible from the ARIA tree — flag any control with no discernible size context
- No content truncated to the point of being unusable
- Typography: body text legible (eval computed font-size if uncertain)

---

## Step 4 — Public pages audit (isolated session)

<!-- TODO: Describe how to obtain tokens or state needed to access public pages. e.g.:
"Get a real invite token while still authenticated by navigating to the relevant admin page and extracting the token from the resulting UI link or table."
-->

**Audit public pages in an isolated session:**
```bash
playwright-cli -s=public open <!-- TODO: e.g.: http://localhost:3000/join?token=<real-token> -->
playwright-cli -s=public resize 1280 800
playwright-cli -s=public eval "({ href: location.href, path: location.pathname })"
playwright-cli -s=public snapshot --filename=snapshot-desktop-<public-page>.yaml
playwright-cli -s=public screenshot --filename=screenshot-desktop-<public-page>.png
playwright-cli -s=public resize 375 812
playwright-cli -s=public goto <!-- TODO: e.g.: http://localhost:3000/<public-route> -->
playwright-cli -s=public eval "({ href: location.href, path: location.pathname })"
playwright-cli -s=public snapshot --filename=snapshot-mobile-<public-page>.yaml
playwright-cli -s=public screenshot --filename=screenshot-mobile-<public-page>.png
playwright-cli -s=public close
```

Apply `forms`, `honest-ux`, and `microcopy` skills to public-facing pages. Apply `forms` and `microcopy` to Login (already done in Step 1 — check mobile Login separately here).

Read the honest-ux skill if not already loaded:
```
Read .claude/skills/ux-audit/honest-ux.md
```

---

## Step 5 — Keyboard navigation spot-check

For the most interaction-heavy pages (<!-- TODO: list the 2-3 most complex pages in this app -->):

```bash
playwright-cli -s=audit resize 1280 800
playwright-cli -s=audit goto <!-- TODO: e.g.: http://localhost:3000/#<page> -->
playwright-cli -s=audit snapshot --filename=snapshot-kbd-<page>-start.yaml
```

Tab through 20+ elements, checking focus after each:
```bash
playwright-cli -s=audit press Tab
playwright-cli -s=audit eval "document.activeElement.outerHTML"
```

Also test:
- Open any modal/dialog with `Enter` or `Space`, then close with `Escape` — does focus return to the trigger?
- Navigate any dropdown with arrow keys
- Any element where `activeElement` returns `<body>` after Tab is a focus skip or trap — flag it

Read the `overlays` skill before this step if not already loaded:
```
Read .claude/skills/ux-audit/overlays.md
```

---

## Step 6 — Loading and empty state check

For each data-fetching page, check for loading and empty state handling in source:

```bash
<!-- TODO: adapt to the project's source layout and file extension. e.g.:
rg -n -i "loading|skeleton|spinner|isLoading" <frontend-path>/pages/<PageName>.<ext>
rg -n -i "length\s*===\s*0|\.length\s*==\s*0|No.*found|empty|isEmpty" <frontend-path>/pages/<PageName>.<ext>
-->
```

Flag pages where loading state or empty state is absent as a finding against the `dashboard` skill criteria.

---

## Step 7 — Collate and deduplicate

Before filing issues:
- Group findings by pattern (one issue per pattern, list all affected pages in body)
- Assign severity per the definitions above
- Confirm every finding cites the specific skill and checklist item it violates
- Discard any finding without concrete evidence in a snapshot, screenshot, eval result, or source grep

---

## Step 8 — File GitHub issues

For each distinct finding, use the issue format from `.claude/skills/repo-patterns/SKILL.md`.

Add `## Skill Reference` with the skill file and checklist item (e.g., `overlays.md - icon buttons must have aria-label`).

Save the body to `issues/review/ux-issue-body.md`, then run:

```bash
gh issue create --title "[Bug][UX][<severity>] <Page> - <concise finding title>" --label "bug" --label "ux" --label "<severity>" --body-file issues/review/ux-issue-body.md
```

If accessibility-related, add `--label "accessibility"`.

Overwrite the same file for each new issue body, then create the next issue. Report each created issue URL immediately.

---

## Step 9 — Cleanup and summary

```bash
playwright-cli -s=audit close
playwright-cli -s=public close
```

Print summary table:

| Severity | Count |
|---|---|
| Critical | N |
| Major | N |
| Minor | N |
| **Total** | N |

List all filed issue URLs grouped by severity. Call out the top 3 highest-impact issues.
