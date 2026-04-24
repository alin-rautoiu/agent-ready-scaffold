import type { ReactNode } from 'react'

type CitationProps = {
  author: ReactNode
  year: ReactNode
  locator?: ReactNode
}

export function Citation({ author, year, locator }: CitationProps) {
  return (
    <span className="citation">
      <span className="citation__author">{author}</span>
      <span className="citation__year">{year}</span>
      {locator ? <span className="citation__locator">{locator}</span> : null}
    </span>
  )
}
