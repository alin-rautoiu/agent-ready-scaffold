# .github/workflows/

GitHub Actions CI/CD pipeline definitions.

## What goes here

YAML workflow files that define automated pipelines: test runs, build checks, deployment steps, and release automation.

## Rules

**Do** treat these files as protected. A broken workflow affects every contributor and every deployment.

**Don't** let agents modify workflow files without explicit user authorization. This applies even to agents that have write access to the repository. If an agent needs to suggest a change, it should create a GitHub issue or PR — not edit the file directly.

**Do** pin action versions to a commit SHA rather than a mutable tag (e.g., `actions/checkout@v4` → `actions/checkout@abc1234`). Mutable tags can be silently replaced.

**Do** keep sensitive values in GitHub Secrets, not hardcoded in workflow files. Agents should never write secret values into workflow YAML.

## Current workflows

Add a short description of each workflow file here as they are created. Example:

| File | Trigger | Purpose |
| --- | --- | --- |
| `ci.yml` | Push to main, PRs | Run tests and type check |
| `deploy.yml` | Push to main | Deploy to production |
