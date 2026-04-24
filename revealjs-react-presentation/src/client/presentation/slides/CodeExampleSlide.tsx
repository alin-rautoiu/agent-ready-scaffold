import { Code } from '@revealjs/react'
import { EvidenceNote, SlideFrame, ThemedSlide } from '../components'

const AUTHORING_SNIPPET = `import type { SlideModule } from './slides'
import { TitleSlide } from './TitleSlide'
import { AgendaSlide } from './AgendaSlide'

export const slideManifest: SlideModule[] = [
  { id: 'title', render: TitleSlide },
  { id: 'agenda', render: AgendaSlide },
]`

export function CodeExampleSlide() {
  return (
    <ThemedSlide className="slide slide--code" notes="Explain that the manifest is the stable entry contract for authors.">
      <SlideFrame
        kicker="Code"
        title="Keep the manifest simple and explicit."
        keyMessage="The deck root owns Reveal configuration; the manifest owns ordering."
      >
        <div className="card-grid card-grid--two">
          <div className="card card--wide">
            <h3>Ordered slide manifest</h3>
            <Code language="tsx" trim lineNumbers="1-2|4-5|7-10">
              {AUTHORING_SNIPPET}
            </Code>
            <EvidenceNote
              label="Template"
              variant="note"
              primary="Ordered deck contract"
              secondary="src/client/presentation/slides/index.tsx"
            />
          </div>
          <div className="card">
            <h3>Why this pattern scales</h3>
            <ul>
              <li>Authors can reorder slides without touching Reveal config.</li>
              <li>Shared shell components keep spacing and hierarchy consistent.</li>
              <li>Tests can smoke-check the manifest without booting a whole export flow.</li>
            </ul>
          </div>
        </div>
      </SlideFrame>
    </ThemedSlide>
  )
}
