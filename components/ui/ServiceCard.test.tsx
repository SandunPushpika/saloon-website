import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ServiceCard } from './ServiceCard'
import { useBookingStore } from '@/lib/booking-store'
import { services } from '@/constants/services'

describe('ServiceCard', () => {
  beforeEach(() => {
    useBookingStore.getState().close()
  })

  it('renders the service name, duration, and starting price', () => {
    const service = services[0]
    render(<ServiceCard service={service} />)
    expect(screen.getByText(service.name)).toBeInTheDocument()
    expect(screen.getByText(`${service.durationMinutes} min`)).toBeInTheDocument()
    expect(screen.getByText(`From $${service.startingPrice}`)).toBeInTheDocument()
  })

  it('opens the booking store pre-selected with this service on Book Now', async () => {
    const service = services[0]
    render(<ServiceCard service={service} />)
    await userEvent.click(screen.getByRole('button', { name: 'Book Now' }))
    expect(useBookingStore.getState().isOpen).toBe(true)
    expect(useBookingStore.getState().serviceId).toBe(service.id)
  })
})
