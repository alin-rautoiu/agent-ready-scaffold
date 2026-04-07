# src/client/i18n/

Translation files and i18n type definitions. Every user-visible string in the application is keyed here.

## What goes here

<!-- TODO: list what belongs in this directory for your i18n setup. e.g.:
- One locale file per supported language (e.g. `en.ts`, `ro.ts`)
- A `types.ts` file that types the full set of translation keys
- The i18n context/provider if it lives client-side
-->

## Rules

**Do** add every new user-visible string to all locale files at the time it is introduced. A key missing from one locale falls back visibly or throws at runtime.

<!-- TODO: name your i18n helper and context. e.g.:
**Do** use the `t()` helper from `I18nContext` for all user-visible text, including error messages, empty states, and button labels — not just page headings.
-->

**Don't** hardcode display strings in components. Even if you have no plans to translate the application, a single authoritative place for copy enforces consistent terminology and makes future changes (rewording, rebranding) a one-file edit.

**Don't** use the same key for strings that happen to look the same but mean different things in context. Two identical English strings may require different translations.
