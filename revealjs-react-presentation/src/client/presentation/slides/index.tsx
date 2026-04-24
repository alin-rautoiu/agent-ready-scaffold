import type { ComponentType, ReactNode } from 'react'
import { AgendaSlide } from './AgendaSlide'
import { ClosingSlide } from './ClosingSlide'
import { CodeExampleSlide } from './CodeExampleSlide'
import { EnumerationExampleSlide } from './EnumerationExampleSlide'
import { FragmentExampleSlide } from './FragmentExampleSlide'
import { StackExampleSlides } from './StackExampleSlides'
import { ThemeShowcaseSlides } from './ThemeShowcaseSlides'
import { ThesisExampleSlide } from './ThesisExampleSlide'
import { TitleSlide } from './TitleSlide'

export type SlideModule = {
  id: string
  render: ComponentType
}

export const slideManifest: SlideModule[] = [
  { id: 'title', render: TitleSlide },
  { id: 'agenda', render: AgendaSlide },
  { id: 'fragments', render: FragmentExampleSlide },
  { id: 'vertical-stack', render: StackExampleSlides },
  { id: 'code', render: CodeExampleSlide },
  { id: 'enumeration', render: EnumerationExampleSlide },
  { id: 'thesis', render: ThesisExampleSlide },
  { id: 'themes', render: ThemeShowcaseSlides },
  { id: 'closing', render: ClosingSlide },
]

export function renderSlideModules(modules: SlideModule[]): ReactNode[] {
  return modules.map((entry) => <entry.render key={entry.id} />)
}
