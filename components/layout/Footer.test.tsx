import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Footer } from './Footer'
import { siteConfig } from '@/constants/siteConfig'

describe('Footer', () => {
  it('renders the site name, address, and hours', () => {
    render(<Footer />)
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument()
    expect(screen.getByText(siteConfig.address)).toBeInTheDocument()
  })

  it('shows a success message after subscribing to the newsletter', async () => {
    render(<Footer />)
    await userEvent.type(screen.getByLabelText('Email address'), 'test@example.com')
    await userEvent.click(screen.getByRole('button', { name: 'Join' }))
    expect(screen.getByText(/you're subscribed/i)).toBeInTheDocument()
  })
})
