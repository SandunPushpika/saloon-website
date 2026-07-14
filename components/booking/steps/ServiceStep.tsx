'use client'

import { services } from '@/constants/services'
import { useBookingStore } from '@/lib/booking-store'
import { cn } from '@/lib/utils'

export function ServiceStep() {
  const serviceId = useBookingStore((s) => s.serviceId)
  const setServiceId = useBookingStore((s) => s.setServiceId)
  const setStep = useBookingStore((s) => s.setStep)

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-2xl text-charcoal">Choose a Service</h3>
      <div className="grid max-h-80 gap-3 overflow-y-auto pr-1">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => {
              setServiceId(service.id)
              setStep('stylist')
            }}
            className={cn(
              'flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors',
              serviceId === service.id ? 'border-rose-gold bg-rose-gold/10' : 'border-beige hover:border-rose-gold'
            )}
          >
            <span>
              <span className="block font-sans text-sm font-medium text-charcoal">{service.name}</span>
              <span className="block font-sans text-xs text-charcoal/60">{service.durationMinutes} min</span>
            </span>
            <span className="font-sans text-sm text-rose-gold">From ${service.startingPrice}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
