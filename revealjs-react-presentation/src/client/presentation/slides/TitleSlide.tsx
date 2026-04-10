import { Slide } from '@revealjs/react'
import { DeckShell } from '../components'

export function TitleSlide() {
  return (
    <Slide className="slide slide--hero" notes="Introduce the deck purpose, audience, and the promise of the scaffold.">
      <DeckShell
        eyebrow="RevealJS React Scaffold"
        title="Build a clear story before you add content."
        subtitle="This starter deck demonstrates the authoring pattern, not a finished talk. Replace the copy, keep the structure, and grow the slides from the manifest."
      >
        <div className="hero-strip">
          <span>Vite + React + TypeScript</span>
          <span>@revealjs/react wrapper</span>
          <span>PDF export flow included</span>
        </div>
      </DeckShell>
    </Slide>
  )
}
