import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StarRating } from './StarRating'

describe('StarRating', () => {
  it('exposes the rating via an accessible label', () => {
    render(<StarRating rating={4} />)
    expect(screen.getByLabelText('4 out of 5 stars')).toBeInTheDocument()
  })

  it('always renders 5 stars regardless of rating', () => {
    const { container } = render(<StarRating rating={3} />)
    expect(container.querySelectorAll('svg')).toHaveLength(5)
  })
})
