import type { ReactNode } from 'react'

type ThesisCardProps = {
  kicker?: ReactNode
  statement: ReactNode
  footnote?: ReactNode
}

export function ThesisCard({ kicker, statement, footnote }: ThesisCardProps) {
  return (
    <article className="thesis-card">
      {kicker ? <p className="thesis-card__kicker">{kicker}</p> : null}
      <p className="thesis-card__statement">{statement}</p>
      {footnote ? <p className="thesis-card__footnote">{footnote}</p> : null}
    </article>
  )
}
