---
name: ux-audit-navigation-reliability
description: Navigation reliability rules, authentication recovery, and known failure signatures for Playwright-based UX audits.
---

# Navigation Reliability Rules

Use these rules on every route transition to avoid drift or false positives:

1. For authenticated pages, navigate only with the app's authenticated route format (<!-- TODO: e.g.: hash URLs like `http://<host>/#dashboard`, or path URLs like `http://<host>/dashboard` -->).
2. For public pages, navigate with path URLs (<!-- TODO: e.g.: `http://<host>/join?token=<real-token>` -->).
3. After each `goto`, validate route state in the same browser session with:

   ```bash
   playwright-cli -s=audit eval "({ href: location.href, hash: location.hash, path: location.pathname })"
   ```

   For public pages, use the same command shape with `-s=public`. For authenticated pages, URL or hash changes alone are not enough. Confirm either the auth check endpoint returns 200 in the audit session or the snapshot shows protected UI signals such as navigation, metrics, or a logout control.

4. If the resulting URL does not match the intended target:
   1. Retry `goto` once.
   2. Run `playwright-cli snapshot --filename=snapshot-nav-failed-<page>.yaml`.
   3. Record as a blocked route finding and continue with the next page.
5. If auth was dropped unexpectedly (login screen appears on an authenticated route), rerun the admin-login skill in the same `-s=audit` session and retry that route once.

## Authentication Recovery

Use this recovery path only when app reachability and health checks are healthy but authenticated setup is failing.

1. Treat repeated `401 Invalid credentials` responses from the login endpoint as an auth setup failure, not as proof that the app is down.
2. Do not treat the presence of a temporary admin row in the database, or a protected-route redirect by itself, as proof of an authenticated session.
3. If the admin-login skill succeeds, immediately verify the session in `-s=audit` with both:
   - The auth check endpoint returning 200 and an authenticated user payload
   - One protected snapshot that shows protected UI, not the login form
4. If admin-login fails or the login endpoint keeps returning 401 while health checks are still good, stop retrying the temporary-admin path. Use a repo-local recovery path with short steps:
   1. If database upsert is needed, or repeated auth setup appears to fail from shell quoting (especially hashed password characters), choose the runtime-specific path before continuing:
      - If Docker is active or Docker DB upsert is required, read and apply the project's docker-db-upsert skill (<!-- TODO: e.g.: `.claude/skills/admin-login/docker-db-upsert.md` -->).
      - If Docker is not active, use the host-runtime path in the admin-login skill (<!-- TODO: e.g.: `.claude/skills/admin-login/SKILL.md` -->).
   2. Re-run the login endpoint in `-s=audit`, then checkpoint with exactly one verification (auth check endpoint or one protected snapshot).
   3. Read the live auth secret from the local runtime environment.
   4. Read a real admin row ID from the live app database (<!-- TODO: e.g.: the local SQLite file at `<data-path>` or via the project's DB CLI -->).
   5. Create a short temporary script in a workspace temp location (<!-- TODO: e.g.: `.playwright-cli/auth-recovery.<ext>` -->) that signs a minimal session payload with the auth secret.
   6. Run that script to print one valid session token value.
   7. Inject that cookie or header into the `-s=audit` Playwright session, reload once, then re-check the auth endpoint and capture one protected snapshot before continuing.
   8. Delete the temporary recovery script when finished.
5. Prefer short, verifiable commands during recovery. After each auth-changing action, run one checkpoint only: either the auth check endpoint or a protected snapshot. Avoid long inline shell pipelines, nested quoting, or noisy one-liners when a short temp script or one short command is clearer.
6. Assume the simplest local runtime for this repo first: when local Docker is using a bind-mounted data path, treat host and app container as sharing the same live data unless direct evidence shows otherwise. Do not branch into container-vs-host troubleshooting unless verification proves they differ.

## Known Navigation Failure Signatures

Use these signatures to classify failures quickly and recover consistently:

1. **Login redirect loop on authenticated routes**
   - Signal: URL or hash is missing the target route and the page shows login controls.
   - Action: rerun admin-login skill, verify auth with the auth check endpoint plus protected UI evidence, retry target route once.
2. **SPA shell loaded but wrong route remains**
   - Signal: page renders app chrome/nav, but the URL does not match expected route after `goto`.
   - Action: retry `goto` once, then capture `snapshot-nav-failed-<page>.yaml` and continue.
3. **Public token route bounced to default page**
   - Signal: public URL loses token or lands on an unexpected page.
   - Action: regenerate a fresh token, retry public route once, then record blocked route finding if still failing.
4. **Blank or half-rendered page after navigation**
   - Signal: `document.readyState` is `complete` but expected headings/controls are missing in snapshot.
   - Action: perform one hard reload via `playwright-cli goto <same-url>`, then re-check route and snapshot.
5. **Intermittent navigation timeout**
   - Signal: navigation command fails transiently while app is otherwise reachable.
   - Action: retry once after a short pause by running any lightweight eval, then continue; if repeated, mark blocked route.
