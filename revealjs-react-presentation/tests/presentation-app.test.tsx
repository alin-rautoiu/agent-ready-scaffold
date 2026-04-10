import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PresentationApp } from '../src/client/presentation/PresentationApp'
import { slideManifest } from '../src/client/presentation/slides'

vi.mock('@revealjs/react', async () => {
  const React = await import('react')

  return {
    Deck: ({ children }: { children: React.ReactNode }) => <div data-testid="deck">{children}</div>,
    Slide: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <section className={className}>{children}</section>
    ),
    Stack: ({ children }: { children: React.ReactNode }) => <div data-testid="stack">{children}</div>,
    Fragment: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Code: ({ children }: { children: string }) => <pre>{children}</pre>,
  }
})

vi.mock('reveal.js/plugin/highlight', () => ({
  default: { id: 'highlight' },
}))

vi.mock('reveal.js/plugin/notes', () => ({
  default: { id: 'notes' },
}))

describe('PresentationApp', () => {
  it('renders the starter deck without throwing', () => {
    render(<PresentationApp />)

    expect(screen.getByTestId('deck')).toBeTruthy()
    expect(screen.getByText('Build a clear story before you add content.')).toBeTruthy()
  })

  it('keeps the expected starter slide manifest shape', () => {
    expect(slideManifest.map((entry) => entry.id)).toEqual([
      'title',
      'agenda',
      'fragments',
      'vertical-stack',
      'code',
      'media',
      'closing',
    ])
  })
})
