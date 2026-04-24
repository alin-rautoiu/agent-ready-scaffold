import { Fragment } from '@revealjs/react'
import type { ReactNode } from 'react'

type DimGroupProps = {
  children: ReactNode
  dimAt: number
}

export function DimGroup({ children, dimAt }: DimGroupProps) {
  return (
    <>
      <div className="dim-group">{children}</div>
      <Fragment asChild index={dimAt}>
        <span className="dim-group-trigger" aria-hidden="true" />
      </Fragment>
    </>
  )
}
