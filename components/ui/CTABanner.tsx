'use client'

import { Button } from './Button'
import { useBookingStore } from '@/lib/booking-store'

interface CTABannerProps {
  title: string
  description?: string
}

export function CTABanner({ title, description }: CTABannerProps) {
  const openBooking = useBookingStore((s) => s.open)

  return (
    <section className="bg-charcoal">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center">
        <h2 className="font-display text-3xl text-ivory md:text-4xl">{title}</h2>
        {description && <p className="max-w-xl font-sans text-ivory/70">{description}</p>}
        <Button onClick={() => openBooking()} size="lg">
          Book Your Appointment
        </Button>
      </div>
    </section>
  )
}
