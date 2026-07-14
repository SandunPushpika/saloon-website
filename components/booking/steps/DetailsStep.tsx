'use client'

import { useState, type FormEvent } from 'react'
import { useBookingStore } from '@/lib/booking-store'

export function DetailsStep() {
  const details = useBookingStore((s) => s.details)
  const setDetails = useBookingStore((s) => s.setDetails)
  const setStep = useBookingStore((s) => s.setStep)
  const [name, setName] = useState(details.name)
  const [email, setEmail] = useState(details.email)
  const [phone, setPhone] = useState(details.phone)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setDetails({ name, email, phone })
    setStep('success')
  }

  return (
    <form id="booking-details-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="font-display text-2xl text-charcoal">Your Details</h3>
      <div className="flex flex-col gap-1">
        <label htmlFor="booking-name" className="font-sans text-xs uppercase tracking-wide text-charcoal/60">
          Full Name
        </label>
        <input
          id="booking-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-beige px-3 py-2 font-sans text-sm focus:border-rose-gold focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="booking-email" className="font-sans text-xs uppercase tracking-wide text-charcoal/60">
          Email
        </label>
        <input
          id="booking-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-beige px-3 py-2 font-sans text-sm focus:border-rose-gold focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="booking-phone" className="font-sans text-xs uppercase tracking-wide text-charcoal/60">
          Phone
        </label>
        <input
          id="booking-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-lg border border-beige px-3 py-2 font-sans text-sm focus:border-rose-gold focus:outline-none"
        />
      </div>
    </form>
  )
}
