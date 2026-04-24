import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import type { EmphTone } from './Emph'

type FocalSentenceProps = {
  children: ReactNode
  as?: ElementType
  tone?: EmphTone
  className?: string
} & HTMLAttributes<HTMLElement>

export function FocalSentence({
  children,
  as,
  tone = 'primary',
  className,
  ...rest
}: FocalSentenceProps) {
  const Tag = (as ?? 'p') as ElementType
  const classes = ['focal-sentence', `focal-sentence--${tone}`, className]
    .filter(Boolean)
    .join(' ')
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
