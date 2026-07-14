import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from './Navbar'
import { useBookingStore } from '@/lib/booking-store'
import { siteConfig } from '@/constants/siteConfig'

describe('Navbar', () => {
  beforeEach(() => {
    useBookingStore.getState().close()
  })

  it('renders the site name and all nav links', () => {
    render(<Navbar />)
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Services' }).length).toBeGreaterThan(0)
  })

  it('mobile menu is closed by default and opens on toggle', async () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()
  })

  it('clicking a Book Now button opens the booking store', async () => {
    render(<Navbar />)
    const bookButtons = screen.getAllByRole('button', { name: 'Book Now' })
    await userEvent.click(bookButtons[0])
    expect(useBookingStore.getState().isOpen).toBe(true)
  })
})
