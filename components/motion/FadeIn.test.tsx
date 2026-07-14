import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FadeIn } from './FadeIn'

describe('FadeIn', () => {
  it('renders its children', () => {
    render(<FadeIn>Hello</FadeIn>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies a custom className to the wrapper', () => {
    render(<FadeIn className="test-class">Content</FadeIn>)
    expect(screen.getByText('Content')).toHaveClass('test-class')
  })
})
