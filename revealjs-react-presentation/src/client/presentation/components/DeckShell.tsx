import type { ReactNode } from 'react'

type DeckShellProps = {
  eyebrow: string
  title: string
  subtitle: string
  children?: ReactNode
}

export function DeckShell({ eyebrow, title, subtitle, children }: DeckShellProps) {
  return (
    <div className="deck-shell">
      <p className="deck-shell__eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="deck-shell__subtitle">{subtitle}</p>
      {children ? <div className="deck-shell__meta">{children}</div> : null}
    </div>
  )
}
