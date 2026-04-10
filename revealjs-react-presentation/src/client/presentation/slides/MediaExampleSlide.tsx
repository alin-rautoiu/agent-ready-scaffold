import { Slide } from '@revealjs/react'
import placeholderVisual from '../assets/abstract-grid.svg'
import { SlideFrame } from '../components'

export function MediaExampleSlide() {
  return (
    <Slide
      className="slide slide--media"
      notes="Placeholder visuals should be replaced by verified assets before final delivery."
    >
      <SlideFrame
        kicker="Media"
        title="Use scaffold-safe assets until the talk has real evidence."
        keyMessage="Placeholder visuals are acceptable in the scaffold, but production decks should import verified media and document provenance."
      >
        <div className="card-grid card-grid--two card-grid--media">
          <figure className="card card--visual">
            <img src={placeholderVisual} alt="Abstract placeholder grid illustration" />
          </figure>
          <section className="card">
            <h3>Asset hygiene</h3>
            <ul>
              <li>Store reusable visuals under <code>src/client/presentation/assets/</code>.</li>
              <li>Remove generated or anecdotal screenshots from the scaffold.</li>
              <li>Keep one source-of-truth note for provenance when assets back claims.</li>
            </ul>
          </section>
        </div>
      </SlideFrame>
    </Slide>
  )
}
