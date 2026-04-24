import { Slide } from '@revealjs/react'
import type { ComponentProps } from 'react'
import { useDeckTheme } from './DeckThemeContext'

type SlideProps = ComponentProps<typeof Slide>

type ThemedSlideProps = SlideProps & {
  theme?: string
}

export function ThemedSlide({ theme, className, ...rest }: ThemedSlideProps) {
  const defaultTheme = useDeckTheme()
  const resolved = theme ?? defaultTheme
  const classes = [className, resolved].filter(Boolean).join(' ')
  return <Slide className={classes || undefined} {...rest} />
}
