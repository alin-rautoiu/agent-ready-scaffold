import { Fragment } from '@revealjs/react'
import { Emph, FocalSentence, SlideFrame, ThemedSlide } from '../components'

export function ClosingSlide() {
  return (
    <ThemedSlide className="slide slide--closing" notes="Close by pointing authors to the docs and export command.">
      <SlideFrame
        kicker="Close"
        title="Next step: replace the story, not the structure."
        keyMessage="Start with the docs, edit the manifest, run the smoke test, and export a draft PDF before polishing visuals."
      >
        <div className="card-grid card-grid--two">
          <div className="card">
            <h3>Recommended workflow</h3>
            <ol>
              <li>Update deck metadata and title slide.</li>
              <li>Replace placeholder slides with real content modules.</li>
              <li>Verify notes, layout, and PDF export before final styling.</li>
            </ol>
          </div>
          <div className="card card--accent">
            <h3>Commands</h3>
            <p>
              <code>npm run dev</code>
            </p>
            <p>
              <code>npm run test</code>
            </p>
            <p>
              <code>npm run export:pdf</code>
            </p>
          </div>
        </div>
        <Fragment asChild>
          <FocalSentence tone="primary">
            Ship the <Emph tone="primary">shape</Emph> first — the polish comes after.
          </FocalSentence>
        </Fragment>
      </SlideFrame>
    </ThemedSlide>
  )
}
