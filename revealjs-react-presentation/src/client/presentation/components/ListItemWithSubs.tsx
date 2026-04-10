import type { ReactNode } from 'react'

type ListItemWithSubsProps = {
  label: ReactNode
  children: ReactNode
}

export function ListItemWithSubs({ label, children }: ListItemWithSubsProps) {
  return (
    <>
      <li className="list-item-parent">{label}</li>
      <li className="list-item-subs">
        <ul>{children}</ul>
      </li>
    </>
  )
}
