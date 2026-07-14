import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BeforeAfterSlider } from './BeforeAfterSlider'

describe('BeforeAfterSlider', () => {
  it('renders both before and after labels and images', () => {
    render(
      <BeforeAfterSlider
        beforeSrc="https://images.unsplash.com/photo-before"
        afterSrc="https://images.unsplash.com/photo-after"
      />
    )
    expect(screen.getByText('Before')).toBeInTheDocument()
    expect(screen.getByText('After')).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('starts at the midpoint of the slider', () => {
    render(
      <BeforeAfterSlider
        beforeSrc="https://images.unsplash.com/photo-before"
        afterSrc="https://images.unsplash.com/photo-after"
      />
    )
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50')
  })
})
