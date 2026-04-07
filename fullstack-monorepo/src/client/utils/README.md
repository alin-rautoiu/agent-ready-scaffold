# src/client/utils/

Pure client-side utility functions. No UI framework dependencies, no data fetching, no side effects.

## What goes here

Small, stateless helpers used across the frontend:

- Date formatting for display
- String truncation or transformation
- Client-side validation helpers
- Local storage helpers

## Rules

**Do** keep functions here pure — same input, same output, no state mutation.

**Don't** add functions that use framework hooks or browser APIs with side effects. Those belong in `hooks/` or `context/`.

**Don't** add functions that are only used in one component. Utilities earn their place here when a second unrelated file needs them.
