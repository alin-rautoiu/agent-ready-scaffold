import type { ReactNode } from 'react'

type SlideFrameProps = {
  title: string
  kicker?: string
  keyMessage: string
  headerAddon?: ReactNode
  density?: 'default' | 'compact'
  className?: string
  children: ReactNode
}

export function SlideFrame({
  title,
  kicker,
  keyMessage,
  headerAddon,
  density = 'default',
  className,
  children,
}: SlideFrameProps) {
  const classes = [
    'slide-frame',
    density === 'compact' ? 'slide-frame--compact' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <header className="slide-frame__header">
        {kicker ? <p className="slide-frame__kicker">{kicker}</p> : null}
        <h2>{title}</h2>
        {headerAddon ? <div className="slide-frame__addon">{headerAddon}</div> : null}
        <p className="slide-frame__message">{keyMessage}</p>
      </header>
      <div className="slide-frame__body">{children}</div>
    </div>
  )
}
