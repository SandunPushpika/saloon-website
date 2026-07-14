import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders its text', () => {
    render(<Badge>Featured</Badge>)
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('applies a custom className', () => {
    render(<Badge className="test-class">Featured</Badge>)
    expect(screen.getByText('Featured')).toHaveClass('test-class')
  })
})
