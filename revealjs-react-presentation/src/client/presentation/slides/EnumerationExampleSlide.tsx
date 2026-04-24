import abstractGrid from '../assets/abstract-grid.svg'
import placeholderPortrait from '../assets/portrait-placeholder.svg'
import { EnumerationStack, SlideFrame, ThemedSlide } from '../components'

const stackItems = [
  {
    src: placeholderPortrait,
    alt: 'Placeholder portrait one',
    caption: 'First exhibit',
    kind: 'portrait' as const,
  },
  {
    src: abstractGrid,
    alt: 'Abstract grid illustration',
    caption: 'Second exhibit',
    kind: 'cover' as const,
  },
  {
    src: placeholderPortrait,
    alt: 'Placeholder portrait two',
    caption: 'Third exhibit',
    kind: 'portrait' as const,
  },
]

export function EnumerationExampleSlide() {
  return (
    <ThemedSlide
      className="slide slide--media"
      notes="EnumerationStack reveals a sequence of exhibits, demoting earlier items as new ones appear."
    >
      <SlideFrame
        kicker="Enumeration"
        title="Reveal exhibits one at a time without rearranging the frame."
        keyMessage="EnumerationStack keeps the group anchored in place; revealed items move forward while earlier ones recede."
        density="compact"
      >
        <div className="card-grid card-grid--two card-grid--media">
          <div className="card card--visual">
            <EnumerationStack
              items={stackItems}
              orientation="vertical"
              offsetY={54}
              itemWidth={240}
              itemBaseHeight={180}
              fragmented
              initialVisibleCount={1}
            />
          </div>
          <div className="card">
            <h3>When to reach for it</h3>
            <ul>
              <li>A list of people, publications, or artifacts introduced in sequence.</li>
              <li>A set of exhibits where earlier items remain visible as context.</li>
              <li>
                Any time a gallery-style enumeration would otherwise need its own hand-rolled layout.
              </li>
            </ul>
            <p>
              Replace placeholder assets with verified media before delivery and document provenance
              alongside the source.
            </p>
          </div>
        </div>
      </SlideFrame>
    </ThemedSlide>
  )
}
