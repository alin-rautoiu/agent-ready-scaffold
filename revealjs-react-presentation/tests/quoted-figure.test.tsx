import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { QuotedFigure } from '../src/client/presentation/components/QuotedFigure'

vi.mock('@revealjs/react', async () => {
  const React = await import('react')

  return {
    Fragment: ({
      children,
      asChild,
      index,
    }: {
      children: React.ReactElement
      asChild?: boolean
      index?: number
    }) => {
      if (asChild) {
        const child = React.Children.only(children) as React.ReactElement<{
          className?: string
          'data-fragment-index'?: number
        }>
        const className = [child.props.className, 'fragment'].filter(Boolean).join(' ')

        return React.cloneElement(child, {
          className,
          'data-fragment-index': index,
        })
      }

      return <div className="fragment" data-fragment-index={index}>{children}</div>
    },
  }
})

describe('QuotedFigure', () => {
  it('renders a static quote with attribution', () => {
    render(
      <QuotedFigure
        quote="A reusable component should preserve the pattern and relax the hardcoded specifics."
        speaker="Research lead"
        source="Deck system notes"
        speakerReveal="static"
      />,
    )

    expect(screen.getByText(/reusable component/i)).toBeTruthy()
    expect(screen.getByText('Research lead')).toBeTruthy()
    expect(screen.getByText('Deck system notes')).toBeTruthy()
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('wraps the speaker plate in a fragment when requested', () => {
    render(
      <QuotedFigure
        quote="Show the evidence first, then reveal the attribution."
        speaker="Workshop facilitator"
        speakerFragmentIndex={2}
      />,
    )

    const attribution = screen.getByText('Workshop facilitator').closest('figcaption')

    expect(attribution?.getAttribute('data-fragment-index')).toBe('2')
    expect(attribution?.classList.contains('fragment')).toBe(true)
  })

  it('matches portrait reveal timing to the speaker by default', () => {
    render(
      <QuotedFigure
        quote="Fragments should stage the identity, not hide the claim."
        speaker="Design reviewer"
        speakerFragmentIndex={3}
        portraitSrc="/portrait.svg"
        portraitAlt="Abstract portrait placeholder"
      />,
    )

    const portrait = screen.getByRole('img', { name: 'Abstract portrait placeholder' }).parentElement

    expect(portrait?.getAttribute('data-fragment-index')).toBe('3')
    expect(portrait?.classList.contains('fragment')).toBe(true)
  })

  it('suppresses the arrow automatically when no portrait is provided', () => {
    const { container } = render(
      <QuotedFigure
        quote="The arrow should disappear when there is no speaker portrait to point toward."
        speaker="Author"
        speakerReveal="static"
      />,
    )

    expect(container.querySelector('.quoted-figure__arrow')).toBeNull()
  })

  it('applies the configured portrait side modifier', () => {
    const { container } = render(
      <QuotedFigure
        quote="Portrait placement should remain configurable."
        speaker="System"
        portraitSrc="/portrait.svg"
        portraitAlt="Left aligned portrait"
        portraitSide="left"
        speakerReveal="static"
        portraitReveal="static"
      />,
    )

    expect(
      container.querySelector('.quoted-figure')?.classList.contains('quoted-figure--portrait-left'),
    ).toBe(true)
  })
})
