import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders as a button by default', () => {
    render(<Button>Book Now</Button>)
    expect(screen.getByRole('button', { name: 'Book Now' })).toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    render(<Button href="/services">View Services</Button>)
    expect(screen.getByRole('link', { name: 'View Services' })).toHaveAttribute('href', '/services')
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-charcoal')
  })
})
