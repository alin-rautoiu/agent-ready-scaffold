import { Deck } from '@revealjs/react'
import { useEffect, useState } from 'react'
import RevealHighlight from 'reveal.js/plugin/highlight'
import RevealNotes from 'reveal.js/plugin/notes'
import { DeckThemeContext } from './components'
import { slideManifest } from './slides'

const DESKTOP_CONFIG = {
  width: 1280,
  height: 720,
  margin: 0.06,
  minScale: 0.65,
  maxScale: 1.5,
}

const NARROW_CONFIG = {
  width: 430,
  height: 860,
  margin: 0.04,
  minScale: 0.32,
  maxScale: 1.4,
}

type PresentationAppProps = {
  theme?: string
}

export function PresentationApp({ theme = 'theme-neon-dusk' }: PresentationAppProps = {}) {
  const [isNarrowViewport, setIsNarrowViewport] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 960px), (max-height: 720px)')
    const syncViewport = () => setIsNarrowViewport(mediaQuery.matches)

    syncViewport()
    mediaQuery.addEventListener('change', syncViewport)

    return () => mediaQuery.removeEventListener('change', syncViewport)
  }, [])

  const sizeConfig = isNarrowViewport ? NARROW_CONFIG : DESKTOP_CONFIG

  return (
    <DeckThemeContext.Provider value={theme}>
      <Deck
        config={{
          hash: true,
          controls: true,
          progress: true,
          center: false,
          navigationMode: 'linear',
          transition: 'slide',
          transitionSpeed: 'fast',
          backgroundTransition: 'fade',
          slideNumber: 'c/t',
          autoAnimate: false,
          ...sizeConfig,
        }}
        plugins={[RevealHighlight, RevealNotes]}
      >
        {slideManifest.map((entry) => (
          <entry.render key={entry.id} />
        ))}
      </Deck>
    </DeckThemeContext.Provider>
  )
}
