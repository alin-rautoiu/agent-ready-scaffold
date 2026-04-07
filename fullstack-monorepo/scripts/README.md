# Scripts Guide

This folder contains operational scripts used to bootstrap local environments, run maintenance workflows, and automate repository operations.

## Run Model

<!-- TODO: describe how scripts are executed in your project. e.g.:
- TypeScript scripts are executed with `tsx` through npm scripts in `package.json`.
- Shell helpers are `.sh` files.
- Validate script changes with:
  - `npm run check-scripts`
  - focused tests for touched script modules
  - `npm test` when shared helpers or script contracts changed.
-->

## Script Catalog

<!-- TODO: list the scripts in this directory. e.g.:
- `issues-workflow.ts`: Orchestrate issue workflows (backlog/execute) and artifact generation.
-->

## Shared Utilities Used By Scripts

Prefer shared modules when adding script logic that is reused:

<!-- TODO: list the shared modules available to scripts. e.g.:
- `src/shared/types.ts`: Shared script-facing types.
- `src/shared/fileSize.ts`: File-size helpers.
- `src/shared/envFile.ts`: `.env` parsing and safe upsert helpers.
-->

## How To Write New Scripts

### 1. Start with a safe CLI contract

- Expose `--help` and print concise usage examples.
- Add `--dry-run` for mutations and `--force` for explicit overrides.
- Fail fast on invalid arguments and missing prerequisites.

### 2. Keep side effects explicit

- Separate planning/validation from mutation steps.
- Log what will change before applying changes.
- Prefer idempotent operations where possible.

### 3. Reuse shared helpers

- Avoid re-implementing env parsing, file-size formatting, and common script types.
- Add shared logic under <!-- TODO: your shared utilities path, e.g.: `src/shared/` --> only when it is used in 2+ places.

### 4. Keep script modules testable

- Export pure helpers for logic that can be unit tested.
- Keep direct process/file/database side effects in thin orchestration functions.

### 5. Validate before merge

<!-- TODO: replace with your project's validation commands. e.g.:
- `npm run check-scripts`
- targeted test files for the touched script behavior
- `npm run build`
- `npm test` when script contracts or shared helpers changed.
-->

## Minimal Script Template

<!-- TODO: replace with a minimal script template for your language and runtime. e.g. (TypeScript/Node.js with tsx):
```ts
#!/usr/bin/env tsx

type ParsedArgs = {
  dryRun: boolean
  force: boolean
  help: boolean
}

function printUsage(): void {
  console.log('Usage: <run-command> <script-name> -- [--dry-run] [--force]')
}

function parseArgs(argv: string[]): ParsedArgs {
  return {
    dryRun: argv.includes('--dry-run'),
    force: argv.includes('--force'),
    help: argv.includes('--help'),
  }
}

async function main(argv: string[]): Promise<void> {
  const args = parseArgs(argv)
  if (args.help) {
    printUsage()
    return
  }

  if (args.dryRun) {
    console.log('[dry-run] No changes will be applied.')
  }

  // Validate preconditions, then run operations.
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error)
  process.exit(1)
})
```
-->

