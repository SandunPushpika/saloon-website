import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Stagger } from './Stagger'

describe('Stagger', () => {
  it('renders its children', () => {
    render(<Stagger>Hello</Stagger>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies a custom className to the wrapper', () => {
    render(<Stagger className="test-class">Content</Stagger>)
    expect(screen.getByText('Content')).toHaveClass('test-class')
  })
})
