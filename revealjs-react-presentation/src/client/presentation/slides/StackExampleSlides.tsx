import { Fragment, Slide, Stack } from '@revealjs/react'
import { NarrativeBand, SlideFrame, SlideHead } from '../components'

export function StackExampleSlides() {
  return (
    <Stack>
      <Slide className="slide slide--example" notes="Vertical stacks work well for before and after states and multi-part examples.">
        <div className="slide-frame">
          <SlideHead
            icon="workflow"
            title="Use nested slides when one section needs multiple beats."
            subtitleNode={<NarrativeBand steps={['Setup', 'Compare', 'Land']} active={0} />}
          />
          <p className="slide-frame__message">
            A vertical stack keeps related slides grouped without flattening the whole deck.
          </p>
          <div className="slide-frame__body card-grid card-grid--two">
            <section className="card">
              <h3>Good candidates</h3>
              <ul>
                <li>Problem, approach, and result</li>
                <li>Prompt, revision, and final output</li>
                <li>Baseline, variant, and decision</li>
              </ul>
            </section>
            <section className="card">
              <h3>Authoring note</h3>
              <p>
                Keep the grouping explicit in the slide manifest. One module can return a whole <code>Stack</code>{' '}
                when the subsection belongs together.
              </p>
            </section>
          </div>
        </div>
      </Slide>

      <Slide className="slide slide--example" notes="Use the second step to show the shape changing, not to repeat the same slide.">
        <SlideFrame
          kicker="Vertical Stack"
          title="The second step should advance the story."
          keyMessage="Use each vertical child to change state, evidence, or decision."
        >
          <div className="card-grid card-grid--three">
            <section className="card">
              <h3>Step 1</h3>
              <p>Set up the constraint.</p>
            </section>
            <section className="card">
              <h3>Step 2</h3>
              <p>Show the intervention.</p>
            </section>
            <section className="card card--accent">
              <h3>Step 3</h3>
              <p>Land the takeaway.</p>
            </section>
          </div>
          <div className="timeline">
            <Fragment asChild>
              <span>Constraint</span>
            </Fragment>
            <Fragment asChild>
              <span>Intervention</span>
            </Fragment>
            <Fragment asChild>
              <span>Outcome</span>
            </Fragment>
          </div>
        </SlideFrame>
      </Slide>
    </Stack>
  )
}
