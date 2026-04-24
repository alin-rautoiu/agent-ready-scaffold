import { Fragment } from '@revealjs/react'
import { Emph, FocalSentence, SlideFrame, ThemedSlide, ThesisCard } from '../components'

export function ThesisExampleSlide() {
  return (
    <ThemedSlide
      className="slide slide--thesis"
      notes="Use a thesis card when the slide is the argument itself, not evidence for it. A focal sentence can extend the claim without crowding the card."
    >
      <SlideFrame
        kicker="Thesis"
        title="Let the slide be the claim."
        keyMessage="A thesis card is a commitment: one statement the rest of the talk must defend or refute."
        density="compact"
      >
        <ThesisCard
          kicker="Thesis"
          statement={
            <>
              Your deck earns attention when the structure is visible{' '}
              <Emph tone="primary">before</Emph> the argument is read.
            </>
          }
          footnote="Pair the thesis with the shape of the argument: setup, evidence, landing."
        />
        <Fragment asChild>
          <FocalSentence tone="primary">
            Then the content has to <Emph tone="accent">earn its own room</Emph>.
          </FocalSentence>
        </Fragment>
      </SlideFrame>
    </ThemedSlide>
  )
}
