# <!-- TODO: Presentation title --> - Design Document

## 1. Executive Summary

<!-- TODO: Describe the presentation in 3-5 sentences.
- What the deck is about
- Who it is for
- What decisions, insights, or actions it should drive
- What evidence types it uses -->

---

## 2. Architecture Overview

### 2.1 Toolchain

- Framework: React
- Build tool: Vite
- Language: TypeScript
- Presentation runtime: `@revealjs/react`
- Reveal plugins enabled by default: highlight, notes
- Export workflow: build -> local preview -> `?print-pdf` -> headless browser PDF

### 2.2 Source Tree

```text
src/main.tsx
src/client/presentation/
  PresentationApp.tsx
  components/
  slides/
  theme/
  assets/
tests/
scripts/
```

### 2.3 Authoring contract

- `PresentationApp.tsx` is the only deck root and Reveal config owner.
- `slides/index.tsx` is the ordered slide manifest.
- Each slide is a React module.
- Shared shell API:
  - `title`
  - `kicker`
  - `keyMessage`
  - optional `className`

---

## 3. Deck Composition

### 3.1 Narrative shape

<!-- TODO: Describe the narrative shape.
e.g.: opening context, problem framing, evidence section, recommendation, closing -->

### 3.2 Slide patterns

- Title / opener
- Agenda or narrative framing
- Fragment-driven explanation
- Vertical stack for multi-part sections
- Code example
- Media example
- Closing / next steps

### 3.3 Speaker notes policy

<!-- TODO: Define how detailed notes should be and which slides require them. -->

---

## 4. Theme and Visual System

### 4.1 Theme direction

<!-- TODO: Describe the intended visual language.
e.g.: editorial, technical, warm, formal, minimal, diagram-heavy -->

### 4.2 Styling rules

- Theme tokens live in `src/client/presentation/theme/presentation.css`.
- Shared layout rules should be extended before adding slide-specific CSS.
- Placeholder theme values may be replaced, but the CSS variable pattern should remain.

### 4.3 Asset policy

- Scaffold ships with placeholder visuals only.
- Real assets should be stored in `src/client/presentation/assets/`.
- <!-- TODO: Define the provenance file or note format for production assets. -->

---

## 5. Export and Delivery

### 5.1 Local authoring

```bash
npm run dev
```

### 5.2 Validation

```bash
npm run typecheck
npm run test
```

### 5.3 PDF export

```bash
npm run export:pdf
```

- Default output path: `exports/presentation.pdf`
- <!-- TODO: Describe the primary delivery target. -->
- If Chromium is unavailable locally, run `npm run setup:browsers`.

---

## 6. Testing Strategy

- Smoke test deck mount safety
- Smoke test manifest integrity
- Validate production build
- Validate PDF export after structural or styling changes
- <!-- TODO: Add any project-specific review gates, such as accessibility checks or speaker rehearsal review. -->
