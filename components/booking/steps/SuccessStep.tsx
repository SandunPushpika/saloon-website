'use client'

import { useBookingStore } from '@/lib/booking-store'
import { services } from '@/constants/services'
import { team } from '@/constants/team'

export function SuccessStep() {
  const serviceId = useBookingStore((s) => s.serviceId)
  const stylistId = useBookingStore((s) => s.stylistId)
  const date = useBookingStore((s) => s.date)
  const time = useBookingStore((s) => s.time)
  const details = useBookingStore((s) => s.details)

  const service = services.find((s) => s.id === serviceId)
  const stylist = team.find((member) => member.id === stylistId)
  const firstName = details.name.split(' ')[0] || 'there'

  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <h3 className="font-display text-2xl text-charcoal">You&apos;re All Set, {firstName}!</h3>
      <p className="font-sans text-sm text-charcoal/70">
        {service?.name ?? 'Your appointment'} with {stylist?.name ?? 'our team'} is booked for{' '}
        {date
          ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
          : 'your selected date'}{' '}
        at {time}.
      </p>
      <p className="font-sans text-xs text-charcoal/50">A confirmation has been sent to {details.email}.</p>
    </div>
  )
}
