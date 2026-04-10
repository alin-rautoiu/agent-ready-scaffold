import { Fragment, Slide } from '@revealjs/react'
import { ListItemWithSubs, SlideHead } from '../components'

export function AgendaSlide() {
  return (
    <Slide className="slide slide--context" notes="Explain the deck shape and how authors should add or split slides.">
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
          <section className="card">
            <h3>What this scaffold includes</h3>
            <ul>
              <li>Ordered slide manifest under <code>slides/index.tsx</code></li>
              <li>Shared frame component for consistent slide structure</li>
              <li>Export path for print-to-PDF delivery</li>
              <li>Agent docs and reusable authoring skills</li>
            </ul>
          </section>
          <section className="card">
            <h3>What authors should replace first</h3>
            <ul>
              <Fragment asChild>
                <li>Deck title, audience, and speaker notes</li>
              </Fragment>
              <Fragment asChild>
                <li>Theme variables and visual language</li>
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
          </section>
        </div>
      </div>
    </Slide>
  )
}
