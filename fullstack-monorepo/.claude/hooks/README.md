# .claude/hooks/

Hook definitions for Claude Code. Hooks are shell commands that execute automatically in response to tool-call events (e.g., before a file is written, after a bash command runs).

## What goes here

Shell scripts or command strings triggered by Claude Code lifecycle events. Configured via `.claude/settings.json` under the `hooks` key.

Common hook events:

| Event | When it fires |
| --- | --- |
| `PreToolUse` | Before any tool call executes |
| `PostToolUse` | After any tool call completes |
| `Stop` | When the agent finishes its turn |

## Rules

**Do** keep hook logic thin. Hooks should call a script in `scripts/`, not contain multi-line logic inline.

```json
// Good
{ "command": "bash scripts/lint-staged.sh" }

// Bad
{ "command": "npx eslint $(git diff --name-only --cached | grep .ts | tr '\n' ' ') && ..." }
```

**Do** use hooks for cross-cutting safety checks: commit message linting, staged file validation, test gating before handoff.

**Don't** use hooks to implement features. A hook that does more than check or log is probably doing something that belongs in a script or agent.

**Don't** create hooks that block normal development flow. Hooks that fail on every save will be disabled or ignored.

## Example: pre-commit safety check

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "bash scripts/check-no-debug.sh" }]
      }
    ]
  }
}
```
