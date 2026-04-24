import { Fragment } from '@revealjs/react'
import { cloneElement } from 'react'
import type { CSSProperties, ReactNode } from 'react'

export type EnumerationItemKind = 'header' | 'cover' | 'portrait'

export type EnumerationItem = {
  src: string
  alt: string
  caption?: ReactNode
  kind?: EnumerationItemKind
}

type EnumerationStackProps = {
  items: readonly EnumerationItem[]
  offset?: number
  offsetX?: number
  offsetY?: number
  itemWidth?: number
  itemMaxHeight?: number
  itemBaseHeight?: number
  fragmented?: boolean
  initialVisibleCount?: number
  fragmentStartIndex?: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
  style?: CSSProperties
}

export function EnumerationStack({
  items,
  offset = 50,
  offsetX = 0,
  offsetY,
  itemWidth,
  itemMaxHeight,
  itemBaseHeight,
  fragmented = false,
  initialVisibleCount = 0,
  fragmentStartIndex = 0,
  orientation = 'vertical',
  className,
  style,
}: EnumerationStackProps) {
  const stackClass = [
    'enumeration-stack',
    `enumeration-stack--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const stackStyle = {
    ...style,
    ['--enumeration-count' as string]: Math.max(items.length - 1, 0),
    ['--enumeration-offset' as string]: `${offset}px`,
    ['--enumeration-offset-x' as string]: `${offsetX}px`,
    ['--enumeration-offset-y' as string]: `${offsetY ?? offset}px`,
    ...(itemWidth ? { ['--enumeration-item-width' as string]: `${itemWidth}px` } : null),
    ...(itemMaxHeight
      ? { ['--enumeration-item-max-height' as string]: `${itemMaxHeight}px` }
      : null),
    ...(itemBaseHeight
      ? { ['--enumeration-item-base-height' as string]: `${itemBaseHeight}px` }
      : null),
  } as CSSProperties

  const renderFigure = (item: EnumerationItem, index: number) => {
    const kind: EnumerationItemKind = item.kind ?? 'portrait'
    const kindClass = `enumeration-stack__item--${kind}`
    return (
      <figure
        className={`enumeration-stack__item ${kindClass}`}
        data-kind={kind}
        style={{ ['--enumeration-index' as string]: index } as CSSProperties}
      >
        {kind === 'header' && item.caption ? (
          <figcaption className="enumeration-stack__caption">{item.caption}</figcaption>
        ) : null}
        <img src={item.src} alt={item.alt} />
        {kind !== 'header' && item.caption ? (
          <figcaption className="enumeration-stack__caption">{item.caption}</figcaption>
        ) : null}
      </figure>
    )
  }

  return (
    <div className={stackClass} style={stackStyle}>
      {items.map((item, index) => {
        const figure = renderFigure(item, index)

        if (!fragmented || index < initialVisibleCount) {
          return cloneElement(figure, { key: `${item.src}-${index}` })
        }

        return (
          <Fragment
            key={`${item.src}-${index}`}
            asChild
            index={fragmentStartIndex + index - initialVisibleCount}
          >
            {figure}
          </Fragment>
        )
      })}
    </div>
  )
}
