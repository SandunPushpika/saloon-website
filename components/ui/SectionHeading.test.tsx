import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionHeading } from './SectionHeading'

describe('SectionHeading', () => {
  it('renders the title as a level-2 heading', () => {
    render(<SectionHeading title="Our Services" />)
    expect(screen.getByRole('heading', { level: 2, name: 'Our Services' })).toBeInTheDocument()
  })

  it('renders the eyebrow badge when provided', () => {
    render(<SectionHeading eyebrow="What We Offer" title="Our Services" />)
    expect(screen.getByText('What We Offer')).toBeInTheDocument()
  })

  it('omits the eyebrow badge when not provided', () => {
    render(<SectionHeading title="Our Services" />)
    expect(screen.queryByText('What We Offer')).not.toBeInTheDocument()
  })

  it('renders the description when provided', () => {
    render(<SectionHeading title="Our Services" description="Crafted for you" />)
    expect(screen.getByText('Crafted for you')).toBeInTheDocument()
  })
})
