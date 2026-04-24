import { Fragment } from '@revealjs/react'
import { Citation, Emph, ListItemWithSubs, SlideHead, ThemedSlide } from '../components'

export function AgendaSlide() {
  return (
    <ThemedSlide className="slide slide--context" notes="Explain the deck shape and how authors should add or split slides.">
      <div className="slide-frame">
        <SlideHead
          icon="scope"
          title="A starter deck should teach the workflow."
          subtitle="The first version should explain how to extend the deck, not just what it says."
        />
        <p className="slide-frame__message">
          Use the first deck as a reference implementation for pacing, layout, and evidence hygiene.
        </p>
        <div className="slide-frame__body card-grid card-grid--two">
          <div className="card">
            <h3>What this scaffold includes</h3>
            <ul>
              <li>Ordered slide manifest under <code>slides/index.tsx</code></li>
              <li>
                Shared <Emph tone="primary">frame component</Emph> for consistent slide structure
              </li>
              <li>Export path for print-to-PDF delivery</li>
              <li>
                Agent docs and reusable authoring skills
                <Citation author="Scaffold" year="2026" locator="§agents" />
              </li>
            </ul>
          </div>
          <div className="card">
            <h3>What authors should replace first</h3>
            <ul>
              <Fragment asChild>
                <li>Deck title, audience, and speaker notes</li>
              </Fragment>
              <Fragment asChild>
                <li>
                  <Emph tone="accent">Theme variables</Emph> and visual language
                </li>
              </Fragment>
              <Fragment asChild>
                <li>Slide modules that do not fit the talk</li>
              </Fragment>
              <Fragment asChild>
                <li>Placeholder assets with verified visuals</li>
              </Fragment>
              <ListItemWithSubs label="Then expand the deck intentionally">
                <li>Split sections into vertical stacks only when the story needs multiple beats.</li>
                <li>Introduce custom components only after a pattern repeats.</li>
              </ListItemWithSubs>
            </ul>
          </div>
        </div>
      </div>
    </ThemedSlide>
  )
}
