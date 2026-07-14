import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCounter } from './StatCounter'

describe('StatCounter', () => {
  it('renders starting at 0 with the suffix before entering view', () => {
    render(<StatCounter target={250} suffix="+" />)
    expect(screen.getByText('0+')).toBeInTheDocument()
  })
})
