import { Fragment } from '@revealjs/react'
import type { CSSProperties, ReactElement, ReactNode } from 'react'

export type QuotedFigureProps = {
  quote: ReactNode
  speaker?: ReactNode
  source?: ReactNode
  portraitSrc?: string
  portraitAlt?: string
  portraitSide?: 'right' | 'left'
  showArrow?: boolean
  quoteReveal?: 'static' | 'fragment'
  quoteFragmentIndex?: number
  speakerReveal?: 'static' | 'fragment'
  portraitReveal?: 'static' | 'fragment' | 'match-speaker'
  speakerFragmentIndex?: number
  portraitFragmentIndex?: number
  className?: string
  style?: CSSProperties
}

type FragmentMode = 'static' | 'fragment'

function withOptionalFragment(
  node: ReactElement,
  mode: FragmentMode,
  index?: number,
) {
  if (mode === 'static') {
    return node
  }

  return (
    <Fragment asChild index={index}>
      {node}
    </Fragment>
  )
}

export function QuotedFigure({
  quote,
  speaker,
  source,
  portraitSrc,
  portraitAlt = '',
  portraitSide = 'right',
  showArrow = false,
  quoteReveal = 'static',
  quoteFragmentIndex,
  speakerReveal = 'fragment',
  portraitReveal = 'match-speaker',
  speakerFragmentIndex,
  portraitFragmentIndex,
  className,
  style,
}: QuotedFigureProps) {
  const hasAttribution = Boolean(speaker) || Boolean(source)
  const resolvedPortraitReveal: FragmentMode =
    portraitReveal === 'match-speaker'
      ? speakerReveal === 'fragment'
        ? 'fragment'
        : 'static'
      : portraitReveal
  const resolvedPortraitIndex =
    portraitReveal === 'match-speaker' ? speakerFragmentIndex : portraitFragmentIndex

  const figureClassName = [
    'quoted-figure',
    portraitSrc ? `quoted-figure--portrait-${portraitSide}` : 'quoted-figure--no-portrait',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <figure className={figureClassName} style={style}>
      <div className='quoted-figure__portrait-wrapper'>
      {withOptionalFragment(
        <blockquote className="quoted-figure__quote">
          <div className="quoted-figure__quote-body">{quote}</div>
        </blockquote>,
        quoteReveal,
        quoteFragmentIndex,
      )}
      
      {hasAttribution
        ? withOptionalFragment(
            <figcaption className="quoted-figure__caption">
              {speaker ? <span className="quoted-figure__speaker">{speaker}</span> : null}
              {source ? <cite className="quoted-figure__source">{source}</cite> : null}
            </figcaption>,
            speakerReveal,
            speakerFragmentIndex,
          )
        : null}
      </div>

      {showArrow ? <div className="quoted-figure__arrow" aria-hidden="true" /> : null}


      {portraitSrc
        ? withOptionalFragment(
            <div
              className="quoted-figure__portrait"
              aria-hidden={portraitAlt ? undefined : true}
            >
              <img src={portraitSrc} alt={portraitAlt} />
            </div>,
            resolvedPortraitReveal,
            resolvedPortraitIndex,
          )
        : null}
    </figure>
  )
}
