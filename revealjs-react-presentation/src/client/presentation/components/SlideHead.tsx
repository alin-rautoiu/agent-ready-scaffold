import type { ReactNode } from 'react'

export type IconName =
  | 'scope'
  | 'workflow'
  | 'start'
  | 'code'
  | 'tests'
  | 'guide'
  | 'agents'
  | 'failure'
  | 'lessons'
  | 'models'
  | 'services'
  | 'questions'
  | 'done'

type SlideIconAsset = {
  glyph: string
  sectionLabel: string
}

const SLIDE_ICON_ASSETS: Record<IconName, SlideIconAsset> = {
  scope: {
    glyph: 'M3 7h18M3 12h18M3 17h18',
    sectionLabel: 'Context',
  },
  workflow: {
    glyph: 'M4 6h16v4H4zM4 14h7v4H4zM13 14h7v4h-7z',
    sectionLabel: 'Context',
  },
  start: {
    glyph: 'M12 3l7 4v10l-7 4-7-4V7z',
    sectionLabel: 'Context',
  },
  code: {
    glyph: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 6l-4 12',
    sectionLabel: 'Failure Modes',
  },
  tests: {
    glyph: 'M9 4h6M10 4v5l-4 9h12l-4-9V4M9 14h6',
    sectionLabel: 'Failure Modes',
  },
  guide: {
    glyph: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h6',
    sectionLabel: 'Operating Lessons',
  },
  agents: {
    glyph: 'M12 3v3M5 9h14v10H5zM9 13h.01M15 13h.01M9 17h6',
    sectionLabel: 'Operating Lessons',
  },
  failure: {
    glyph: 'M12 4l8 15H4zM12 10v3M12 16h.01',
    sectionLabel: 'Failure Modes',
  },
  lessons: {
    glyph: 'M12 3a6 6 0 0 1 6 6c0 2-1 3.5-2.6 4.6V16h-6v-2.4C7.8 12.5 6.8 11 6.8 9A6 6 0 0 1 12 3zM9 19h6',
    sectionLabel: 'Operating Lessons',
  },
  models: {
    glyph: 'M4 8l8-4 8 4-8 4-8-4zM4 13l8 4 8-4',
    sectionLabel: 'Field Notes',
  },
  services: {
    glyph: 'M12 4a3 3 0 0 1 3 3v1h2a2 2 0 0 1 2 2v6H5v-6a2 2 0 0 1 2-2h2V7a3 3 0 0 1 3-3z',
    sectionLabel: 'Field Notes',
  },
  questions: {
    glyph: 'M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.8.7-1.7 1.1-1.7 2.2M12 17h.01',
    sectionLabel: 'Open Questions',
  },
  done: {
    glyph: 'M5 12l4 4 10-10',
    sectionLabel: 'Operating Lessons',
  },
}

function getSectionLabel(icon: IconName) {
  return SLIDE_ICON_ASSETS[icon]?.sectionLabel ?? 'Section'
}

function SlideIcon({ asset }: { asset: SlideIconAsset }) {
  return (
    <svg className="slide-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" />
      <path d={asset.glyph} />
    </svg>
  )
}

type SlideHeadProps = {
  icon: IconName
  title: string
  subtitle?: string
  subtitleNode?: ReactNode
  sectionLabel?: string
}

export function SlideHead({
  icon,
  title,
  subtitle,
  subtitleNode,
  sectionLabel,
}: SlideHeadProps) {
  const asset = SLIDE_ICON_ASSETS[icon]

  return (
    <div className="slide-head">
      <div className="slide-head-meta">
        <SlideIcon asset={asset} />
        <span className="slide-section-label">{sectionLabel ?? getSectionLabel(icon)}</span>
      </div>
      <div className="slide-head-copy">
        <h2>{title}</h2>
        {subtitleNode ? (
          <div className="slide-subtitle">{subtitleNode}</div>
        ) : subtitle ? (
          <p className="slide-subtitle">{subtitle}</p>
        ) : null}
      </div>
    </div>
  )
}
