import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StaggerItem } from './StaggerItem'

describe('StaggerItem', () => {
  it('renders its children', () => {
    render(<StaggerItem>Hello</StaggerItem>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies a custom className', () => {
    render(<StaggerItem className="test-class">Content</StaggerItem>)
    expect(screen.getByText('Content')).toHaveClass('test-class')
  })
})
