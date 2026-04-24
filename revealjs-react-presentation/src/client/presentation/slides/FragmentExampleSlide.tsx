import { Fragment } from '@revealjs/react'
import type { CSSProperties } from 'react'
import placeholderPortrait from '../assets/portrait-placeholder.svg'
import { Emph, FocalSentence, QuotedFigure, SlideFrame, ThemedSlide } from '../components'

export function FragmentExampleSlide() {
  return (
    <ThemedSlide
      className="slide slide--example"
      notes="Fragments should pace an argument. Reveal the attribution after the audience has read the quote, and land a focal sentence at the end."
    >
      <SlideFrame
        kicker="Fragments"
        title="Reveal the speaker after the audience has read the quote."
        keyMessage="Use fragments to stage attribution, not to obscure the core claim."
      >
        <div className="quoted-figure-showcase">
          <div className="card">
            <h3>Static attribution</h3>
            <QuotedFigure
              className="quoted-figure--safe"
              quote="A scaffold should keep the visual pattern reusable while removing the project-specific baggage."
              speaker="Scaffold guideline"
              source="Presentation authoring notes"
              speakerReveal="static"
              portraitSrc={placeholderPortrait}
              portraitAlt="Abstract placeholder portrait"
              portraitReveal="static"
              style={
                {
                  '--quoted-figure-portrait-size': '8rem',
                } as CSSProperties
              }
            />
          </div>
          <div className="card card--accent">
            <h3>Progressive attribution</h3>
            <QuotedFigure
              className="quoted-figure--safe"
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
                  '--quoted-figure-portrait-size': '8rem',
                  '--quoted-figure-plate-bg': 'var(--accent-cool)',
                  '--quoted-figure-plate-fg': '#08131e',
                } as CSSProperties
              }
            />
          </div>
        </div>
        <Fragment asChild>
          <FocalSentence tone="primary">
            Pacing is <Emph tone="primary">the point</Emph>, not decoration.
          </FocalSentence>
        </Fragment>
      </SlideFrame>
    </ThemedSlide>
  )
}
