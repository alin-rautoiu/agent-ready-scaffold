import { Stack } from '@revealjs/react'
import { FocalSentence, SlideFrame, ThemedSlide, ThesisCard } from '../components'

const THEMES: Array<{
  id: string
  theme: string
  name: string
  description: string
  statement: string
}> = [
  {
    id: 'theme-neon-dusk',
    theme: 'theme-neon-dusk',
    name: 'Neon Dusk',
    description: 'Deep indigo with cyan and amber punctuation. Designed for evening, keynote-style talks.',
    statement: 'Evening keynote, high-contrast display type.',
  },
  {
    id: 'theme-natural-light',
    theme: 'theme-natural-light',
    name: 'Natural Light',
    description: 'Warm cream with moss accents and organic line motif. Designed for long-form, essayistic decks.',
    statement: 'Essayistic deck on warm paper.',
  },
  {
    id: 'theme-classical',
    theme: 'theme-classical',
    name: 'Classical',
    description: 'Paper background with rust accent. Designed for historical or reference-heavy content.',
    statement: 'Archival feel for historical material.',
  },
]

export function ThemeShowcaseSlides() {
  return (
    <Stack>
      {THEMES.map((entry) => (
        <ThemedSlide
          key={entry.id}
          theme={entry.theme}
          className="slide slide--theme-showcase"
          notes={`Per-slide override demo: ${entry.name}. Pass the theme prop on ThemedSlide to override the deck default.`}
        >
          <SlideFrame
            kicker="Theme"
            title={entry.name}
            keyMessage={entry.description}
            density="compact"
          >
            <ThesisCard
              kicker="Per-slide override"
              statement={entry.statement}
              footnote={`Set theme="${entry.theme}" on ThemedSlide to apply this look to a single slide.`}
            />
            <FocalSentence tone="primary">The same component set carries across themes.</FocalSentence>
          </SlideFrame>
        </ThemedSlide>
      ))}
    </Stack>
  )
}
