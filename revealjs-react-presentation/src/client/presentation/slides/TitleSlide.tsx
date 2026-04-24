import { DeckShell, Emph, ThemedSlide } from '../components'

export function TitleSlide() {
  return (
    <ThemedSlide className="slide slide--hero" notes="Introduce the deck purpose, audience, and the promise of the scaffold.">
      <DeckShell
        eyebrow="RevealJS React Scaffold"
        title="Build a clear story before you add content."
        subtitle={
          <>
            This starter deck demonstrates the authoring pattern, not a finished talk.{' '}
            <Emph tone="primary">Replace the copy</Emph>, keep the structure, and grow the slides
            from the manifest.
          </>
        }
        subtitleSecondary="Every component on display here is safe to copy, rename, or remove."
      >
        <div className="hero-strip">
          <span>Vite + React + TypeScript</span>
          <span>@revealjs/react wrapper</span>
          <span>PDF export flow included</span>
        </div>
      </DeckShell>
    </ThemedSlide>
  )
}
