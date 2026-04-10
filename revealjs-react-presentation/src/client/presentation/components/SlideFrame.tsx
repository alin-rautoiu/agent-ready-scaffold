import type { ReactNode } from 'react'

type SlideFrameProps = {
  title: string
  kicker?: string
  keyMessage: string
  className?: string
  children: ReactNode
}

export function SlideFrame({
  title,
  kicker,
  keyMessage,
  className,
  children,
}: SlideFrameProps) {
  return (
    <div className={`slide-frame${className ? ` ${className}` : ''}`}>
      <header className="slide-frame__header">
        {kicker ? <p className="slide-frame__kicker">{kicker}</p> : null}
        <h2>{title}</h2>
        <p className="slide-frame__message">{keyMessage}</p>
      </header>
      <div className="slide-frame__body">{children}</div>
    </div>
  )
}
