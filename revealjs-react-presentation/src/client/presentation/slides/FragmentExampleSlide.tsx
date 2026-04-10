import { Slide } from '@revealjs/react'
import type { CSSProperties } from 'react'
import placeholderPortrait from '../assets/portrait-placeholder.svg'
import { QuotedFigure, SlideFrame } from '../components'

export function FragmentExampleSlide() {
  return (
    <Slide
      className="slide slide--example"
      notes="Fragments should pace an argument. Reveal the attribution after the audience has read the quote."
    >
      <SlideFrame
        kicker="Fragments"
        title="Reveal the speaker after the audience has read the quote."
        keyMessage="Use fragments to stage attribution, not to obscure the core claim."
      >
        <div className="quoted-figure-showcase">
          <section className="card">
            <h3>Static attribution</h3>
            <QuotedFigure
              quote="A scaffold should keep the visual pattern reusable while removing the project-specific baggage."
              speaker="Scaffold guideline"
              source="Presentation authoring notes"
              speakerReveal="static"
              portraitSrc={placeholderPortrait}
              portraitAlt="Abstract placeholder portrait"
              portraitReveal="static"
              style={
                {
                  '--quoted-figure-portrait-size': '9.5rem',
                } as CSSProperties
              }
            />
          </section>
          <section className="card card--accent">
            <h3>Progressive attribution</h3>
            <QuotedFigure
              quote={
                <>
                  Hold back the attribution until the audience has absorbed the quote. The identity
                  should land as emphasis, not as a prerequisite for reading.
                </>
              }
              speaker={
                <>
                  Reveal step one <span className="quoted-figure-inline-tag">Fragmented speaker card</span>
                </>
              }
              source="RevealJS scaffold demo"
              portraitSrc={placeholderPortrait}
              portraitAlt="Abstract placeholder portrait"
              speakerFragmentIndex={1}
              portraitReveal="match-speaker"
              style={
                {
                  '--quoted-figure-portrait-size': '10rem',
                  '--quoted-figure-accent': 'var(--accent-cool)',
                  '--quoted-figure-glow': 'rgba(108, 227, 255, 0.8)',
                } as CSSProperties
              }
            />
          </section>
        </div>
      </SlideFrame>
    </Slide>
  )
}
