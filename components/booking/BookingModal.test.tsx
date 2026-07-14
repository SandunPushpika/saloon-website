import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookingModal } from './BookingModal'
import { useBookingStore } from '@/lib/booking-store'
import { services } from '@/constants/services'
import { team } from '@/constants/team'

describe('BookingModal', () => {
  beforeEach(() => {
    useBookingStore.setState({
      isOpen: false,
      step: 'service',
      serviceId: null,
      stylistId: null,
      date: null,
      time: null,
      details: { name: '', email: '', phone: '' },
    })
  })

  it('renders nothing when closed', () => {
    render(<BookingModal />)
    expect(screen.queryByText('Book an Appointment')).not.toBeInTheDocument()
  })

  it('walks through the full flow from service selection to a success confirmation', async () => {
    const user = userEvent.setup()
    render(<BookingModal />)
    useBookingStore.getState().open()

    expect(await screen.findByText('Choose a Service')).toBeInTheDocument()
    await user.click(screen.getByText(services[0].name))

    expect(await screen.findByText('Choose a Stylist')).toBeInTheDocument()
    await user.click(screen.getByText(team[0].name))

    expect(await screen.findByText('Pick a Date')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()

    const days = useBookingStore.getState()
    expect(days.step).toBe('datetime')
    // Pick the first available day and time slot rendered in the step.
    const dateTimeButtons = screen.getAllByRole('button').filter((btn) => btn.className.includes('shrink-0'))
    await user.click(dateTimeButtons[0])
    await user.click(screen.getByRole('button', { name: '9:00 AM' }))

    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(await screen.findByText('Your Details')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Full Name'), 'Jane Doe')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Phone'), '555-1234')
    await user.click(screen.getByRole('button', { name: 'Confirm Booking' }))

    expect(await screen.findByText(/you're all set, jane/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Done' }))
    expect(useBookingStore.getState().isOpen).toBe(false)
  })

  it('the Back button returns to the previous step', async () => {
    const user = userEvent.setup()
    render(<BookingModal />)
    useBookingStore.getState().open(services[0].id)

    expect(await screen.findByText('Choose a Stylist')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(await screen.findByText('Choose a Service')).toBeInTheDocument()
  })
})
