import type { ReactNode } from 'react'

export type EmphTone = 'primary' | 'accent' | 'muted'

type EmphProps = {
  children: ReactNode
  tone?: EmphTone
}

export function Emph({ children, tone = 'primary' }: EmphProps) {
  return <span className={`emph emph--${tone}`}>{children}</span>
}
