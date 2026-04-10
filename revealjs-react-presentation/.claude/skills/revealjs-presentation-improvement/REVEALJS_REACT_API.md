# @revealjs/react — API Reference

Version analysed: **0.2.1**

The wrapper is intentionally thin. It handles React lifecycle, event binding, and DOM sync automatically while exposing the full Reveal.js `RevealApi` instance when you need to go lower-level.

---

## Components

### `<Deck>`

Root component. Renders `<div class="reveal"><div class="slides">…</div></div>` and creates the Reveal instance on mount.

```tsx
<Deck
  config={deckConfig}
  plugins={[RevealHighlight, RevealNotes]}
  onReady={(deck) => console.log(deck.getConfig())}
  deckRef={deckRef}
>
  {/* Slide / Stack children */}
</Deck>
```

| Prop | Type | Notes |
|---|---|---|
| `config` | `Omit<DeckConfig, 'plugins'>` | All Reveal config options except `plugins` |
| `plugins` | `(RevealPlugin \| RevealPluginFactory)[]` | Captured at init — **cannot change after mount** |
| `deckRef` | `Ref<RevealApi \| null>` | Access Reveal instance from outside the tree |
| `onReady` | `(deck: RevealApi) => void` | Fires after `reveal.initialize()` resolves |
| `onSlideChange` | `RevealEventHandler` | Includes `indexh`, `indexv` on the event |
| `onSlideTransitionEnd` | `RevealEventHandler` | |
| `onFragmentShown` | `RevealEventHandler` | Event includes the fragment DOM element |
| `onFragmentHidden` | `RevealEventHandler` | |
| `onSync` | `RevealEventHandler` | Full deck sync completed |
| `onSlideSync` | `RevealEventHandler` | Single-slide sync completed |
| `onOverviewShown` | `RevealEventHandler` | |
| `onOverviewHidden` | `RevealEventHandler` | |
| `onPaused` | `RevealEventHandler` | Blackout activated |
| `onResumed` | `RevealEventHandler` | |
| `className` | `string` | |
| `style` | `CSSProperties` | |

**Sync behaviour:** Config is shallow-compared on each render; only changed keys call `reveal.configure()`. Structural changes (slides added/removed/reordered) trigger `deck.sync()`.

---

### `<Slide>`

Renders a `<section>` element. Prop changes to `data-*` attributes call `deck.syncSlide()` (cheap, single-slide) instead of a full deck sync.

```tsx
<Slide
  background="#1a1a1a"
  backgroundImage="url(hero.jpg)"
  transition="fade"
  autoAnimate
  notes="Speaker note text"
  className="my-slide"
>
  <h2>Title</h2>
</Slide>
```

| Prop | `data-*` attribute | Notes |
|---|---|---|
| `background` | `data-background` | URL, colour, or gradient |
| `backgroundImage` | `data-background-image` | |
| `backgroundVideo` | `data-background-video` | |
| `backgroundVideoLoop` | `data-background-video-loop` | |
| `backgroundVideoMuted` | `data-background-video-muted` | |
| `backgroundIframe` | `data-background-iframe` | |
| `backgroundColor` | `data-background-color` | |
| `backgroundGradient` | `data-background-gradient` | CSS gradient string |
| `backgroundSize` | `data-background-size` | |
| `backgroundPosition` | `data-background-position` | |
| `backgroundRepeat` | `data-background-repeat` | |
| `backgroundOpacity` | `data-background-opacity` | `0`–`1` |
| `backgroundTransition` | `data-background-transition` | `'fade'` \| `'slide'` \| … |
| `transition` | `data-transition` | `'none'` \| `'fade'` \| `'slide'` \| `'convex'` \| `'concave'` \| `'zoom'` |
| `transitionSpeed` | `data-transition-speed` | `'default'` \| `'fast'` \| `'slow'` |
| `autoAnimate` | `data-auto-animate` | Boolean |
| `autoAnimateId` | `data-auto-animate-id` | Match elements across slides |
| `autoAnimateRestart` | `data-auto-animate-restart` | Restart from a new sequence |
| `autoAnimateUnmatched` | `data-auto-animate-unmatched` | |
| `autoAnimateEasing` | `data-auto-animate-easing` | CSS easing string |
| `autoAnimateDuration` | `data-auto-animate-duration` | Seconds |
| `autoAnimateDelay` | `data-auto-animate-delay` | Seconds |
| `visibility` | `data-visibility` | `'hidden'` \| `'uncounted'` |
| `autoSlide` | `data-autoslide` | ms or `false` |
| `notes` | `data-notes` | Speaker notes string |
| `backgroundInteractive` | `data-background-interactive` | |
| `preload` | `data-preload` | |

Also accepts any raw `data-*` attribute and all standard HTML attributes for `<section>`.

---

### `<Stack>`

Groups slides into a vertical stack (Reveal's nested-section navigation). Has no reveal-specific props of its own.

```tsx
<Stack>
  <Slide>Vertical slide A</Slide>
  <Slide>Vertical slide B</Slide>
</Stack>
```

Renders:

```html
<section>
  <section>Vertical slide A</section>
  <section>Vertical slide B</section>
</section>
```

> **Not a layout utility.** `<Stack>` is purely for slide navigation structure. Use CSS (`flex`, `grid`) for visual layout within a slide.

| Prop | Type |
|---|---|
| `className` | `string` |
| `style` | `CSSProperties` |
| `children` | `ReactNode` |

---

### `<Fragment>`

Wraps content in a reveal fragment step. Two modes:

**Default** — wraps in a `<span>` (or element specified by `as`):

```tsx
<Fragment animation="fade-up" index={0}>
  First point
</Fragment>
```

**`asChild`** — merges fragment props into the single child element (Radix UI slot pattern):

```tsx
<Fragment asChild animation="highlight-red">
  <li>This list item becomes a fragment</li>
</Fragment>
```

| Prop | Type | Notes |
|---|---|---|
| `animation` | `FragmentAnimation` | See animation table below |
| `index` | `number` | Sets `data-fragment-index`; auto-assigned if omitted |
| `asChild` | `boolean` | Merge into child element instead of wrapping |
| `as` | `ElementType` | Wrapper element when `asChild` is false (default: `span`) |
| `className` | `string` | |
| `style` | `CSSProperties` | |

**Fragment animations:**

| Value | Effect |
|---|---|
| *(none)* | Fade in (default) |
| `fade-out` | Fade out |
| `fade-up` / `fade-down` / `fade-left` / `fade-right` | Directional fade in |
| `fade-in-then-out` | Fade in, then fade out on next step |
| `fade-in-then-semi-out` | Fade in, dim to 50% on next step |
| `grow` | Scale up |
| `shrink` | Scale down |
| `strike` | Strikethrough |
| `highlight-red` / `highlight-blue` / `highlight-green` | Highlight (persistent) |
| `highlight-current-red` / `-blue` / `-green` | Highlight (current step only) |

---

### `<Markdown>`

Parses a markdown string (or external file) into slides. Uses its own renderer — **does not require or use the Reveal markdown plugin.**

```tsx
<Markdown separator="---" verticalSeparator="--">
  {`
## Slide 1
Content

---

## Slide 2
Content

<!-- .slide: data-background="#111" -->
## Styled slide
  `}
</Markdown>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `children` | `string` | | Markdown source |
| `markdown` | `string` | | Alternative to `children` |
| `src` | `string` | | URL of external markdown file |
| `charset` | `string` | | Encoding for `src` |
| `separator` | `string` | `\r?\n---\r?\n` | Horizontal slide separator regex |
| `verticalSeparator` | `string \| null` | `null` | Vertical slide separator regex |
| `notesSeparator` | `string` | `^\s*notes?:` | Speaker notes separator regex |
| `elementAttributesSeparator` | `string` | `\.element\s*?(.+?)$` | Per-element attribute comment pattern |
| `slideAttributesSeparator` | `string` | `\.slide:\s*?(\S.+?)$` | Per-slide attribute comment pattern |
| `options.animateLists` | `boolean` | | Auto-add fragment animation to list items |

**Markdown attribute syntax:**

```markdown
<!-- .slide: data-background="#1a1a2e" data-transition="zoom" -->
## Slide with custom attributes

<!-- .element: class="fragment fade-up" data-fragment-index="1" -->
- This item is a fragment
```

---

### `<Code>`

Syntax-highlighted code block. **Requires the Highlight plugin** to be registered on `<Deck>`.

```tsx
import RevealHighlight from 'reveal.js/plugin/highlight'

<Deck plugins={[RevealHighlight]}>
  <Slide>
    <Code language="typescript" lineNumbers="1-5|6-10" trim>
      {`const x: number = 42`}
    </Code>
  </Slide>
</Deck>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `children` | `string` | | Code string |
| `code` | `string` | | Alternative to `children` |
| `language` | `string` | | Highlight.js language identifier |
| `trim` | `boolean` | `true` | Strip leading/trailing blank lines |
| `lineNumbers` | `boolean \| string` | | `true` = show line numbers; string = step ranges e.g. `"1-3\|5"` |
| `startFrom` | `number` | | Starting line number for display |
| `noEscape` | `boolean` | | Pass `data-noescape` to highlight plugin |
| `codeClassName` | `string` | | Class on inner `<code>` element |
| `codeStyle` | `CSSProperties` | | Style on inner `<code>` element |
| `codeProps` | `HTMLAttributes<HTMLElement>` | | Extra props on `<code>` element |
| `className` | `string` | | Class on outer `<pre>` element |
| `style` | `CSSProperties` | | Style on outer `<pre>` element |

Renders: `<pre class="code-wrapper"><code data-line-numbers="…">…</code></pre>`

---

## Imperative API — accessing the Reveal instance

### Inside the Deck tree: `useReveal()`

```tsx
import { useReveal } from '@revealjs/react'

function NavButton() {
  const deck = useReveal()  // RevealApi | null
  return <button onClick={() => deck?.next()}>Next</button>
}
```

### Outside the Deck tree: `deckRef`

```tsx
const deckRef = useRef<RevealApi | null>(null)

<Deck deckRef={deckRef}>…</Deck>

// Elsewhere:
deckRef.current?.slide(2, 0)
```

### `onReady` callback

```tsx
<Deck onReady={(deck) => {
  deck.addKeyBinding({ keyCode: 84 }, () => deck.toggleOverview())
}}>
```

### Common `RevealApi` methods

**Navigation**

| Method | Description |
|---|---|
| `slide(h, v?, f?)` | Jump to slide by index |
| `next()` / `prev()` | Forward / back |
| `left()` / `right()` / `up()` / `down()` | Directional |
| `nextFragment()` / `prevFragment()` | Fragment step |
| `navigateFragment(index?, offset?)` | Jump to fragment |

**State**

| Method | Description |
|---|---|
| `getState()` | `{indexh, indexv, indexf, paused, overview}` |
| `setState(state)` | Restore saved state |
| `getIndices(slide?)` | `{h, v, f}` for a slide |
| `getProgress()` | `0`–`1` through presentation |
| `getTotalSlides()` | Total slide count |
| `getCurrentSlide()` | Current `<section>` element |
| `isFirstSlide()` / `isLastSlide()` | |
| `availableRoutes()` | `{left, right, up, down}` |
| `availableFragments()` | `{prev, next}` |

**Config & layout**

| Method | Description |
|---|---|
| `configure(config)` | Update config (called automatically by wrapper) |
| `getConfig()` | Current config object |
| `getScale()` | Current content scale |
| `layout()` | Force layout recompute |
| `sync()` | Full deck DOM sync |
| `syncSlide(element)` | Single-slide sync |
| `syncFragments(slide)` | Reindex fragments in a slide |

**Playback & UI**

| Method | Description |
|---|---|
| `toggleOverview(override?)` | Toggle overview mode |
| `togglePause(override?)` | Blackout |
| `toggleAutoSlide(override?)` | Auto-slide |
| `toggleHelp(override?)` | Help overlay |
| `addKeyBinding(keyCode, cb)` | Custom keyboard shortcut |
| `removeKeyBinding(keyCode)` | |
| `registerKeyboardShortcut(key, description)` | Add to help overlay |

**Plugins**

| Method | Description |
|---|---|
| `getPlugin(id)` | Get plugin instance by id |
| `hasPlugin(id)` | Check if registered |
| `getPlugins()` | Map of all `id → plugin` |

**Events**

| Method | Description |
|---|---|
| `on(type, listener)` | Subscribe |
| `off(type, listener)` | Unsubscribe |
| `dispatchEvent({type, data?, bubbles?})` | Dispatch custom event |

---

## Built-in plugins (from `reveal.js/plugin/`)

| Import | ID | Notes |
|---|---|---|
| `reveal.js/plugin/highlight` | `highlight` | Required for `<Code>` component |
| `reveal.js/plugin/notes` | `notes` | Speaker notes window |
| `reveal.js/plugin/markdown` | `markdown` | Not used by wrapper's `<Markdown>` component |
| `reveal.js/plugin/search` | `search` | Slide content search |
| `reveal.js/plugin/zoom` | `zoom` | Click-to-zoom |
| `reveal.js/plugin/math` | `katex` / `mathjax3` | Math rendering |

**Important:** plugins are captured at `<Deck>` mount time. Pass all plugins upfront — they cannot be added or removed dynamically.

---

## Key config options

Full list accepted by `config` prop (all Reveal config except `plugins`):

```ts
{
  // Dimensions
  width: 1280, height: 720,
  margin: 0.06,
  minScale: 0.67, maxScale: 1.5,

  // Navigation
  hash: true,
  history: false,
  controls: true,
  progress: true,
  slideNumber: 'c/t',  // false | 'h.v' | 'h/v' | 'c' | 'c/t'
  navigationMode: 'linear',  // 'default' | 'linear' | 'grid'
  loop: false,
  keyboard: true,
  touch: true,
  overview: true,

  // Transitions
  transition: 'slide',   // 'none'|'fade'|'slide'|'convex'|'concave'|'zoom'
  transitionSpeed: 'fast',  // 'default'|'fast'|'slow'
  backgroundTransition: 'fade',

  // Fragments & auto-animate
  fragments: true,
  fragmentInURL: true,
  autoAnimate: true,
  autoAnimateDuration: 1.0,
  autoAnimateEasing: 'ease',

  // Auto-slide (ms, 0 = off)
  autoSlide: 0,
  autoSlideStoppable: true,

  // Display
  center: true,
  embedded: false,
  rtl: false,
  shuffle: false,

  // View modes
  view: null,          // null | 'print' | 'scroll'
  disableLayout: false,

  // PDF
  pdfMaxPagesPerSlide: Infinity,
  pdfSeparateFragments: true,

  // Performance
  viewDistance: 3,        // visible slide buffer
  mobileViewDistance: 2,
  preloadIframes: null,
  autoPlayMedia: null,

  // UI
  help: true,
  pause: true,
  showNotes: false,
  hideInactiveCursor: true,
  hideInactiveCursorTime: 5000,
  mouseWheel: false,
}
```

---

## Limitations vs. raw Reveal.js

| Limitation | Workaround |
|---|---|
| Plugins cannot be changed after `<Deck>` mounts | Pass all plugins upfront; remount `<Deck>` for drastic changes |
| `<Markdown>` does not use the Reveal markdown plugin | Use `<Markdown>` component as-is, or register the plugin and use raw `<section data-markdown>` |
| No React prop for custom keyboard bindings | Register in `onReady` callback via `deck.addKeyBinding()` |
| Event callbacks should be stable references | Wrap handlers in `useCallback` to avoid unnecessary unbind/rebind |
| Some config changes (e.g. `view: 'print'`) need full re-init | Remount `<Deck>` (change its `key` prop) |
| `RevealContext` only accessible inside the `<Deck>` tree | Use `deckRef` prop to access the instance from outside |
| Reordering slides triggers full `deck.sync()` (not incremental) | Batch reorders into a single render |
| `syncFragments()` requires a DOM element reference | Get it via `getCurrentSlide()` or a React ref on `<Slide>` |
