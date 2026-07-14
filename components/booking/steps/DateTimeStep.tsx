'use client'

import { useBookingStore } from '@/lib/booking-store'
import { getUpcomingDays, TIME_SLOTS } from '@/lib/booking-dates'
import { cn } from '@/lib/utils'

export function DateTimeStep() {
  const date = useBookingStore((s) => s.date)
  const time = useBookingStore((s) => s.time)
  const setDateTime = useBookingStore((s) => s.setDateTime)
  const days = getUpcomingDays(14)

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-display text-2xl text-charcoal">Pick a Date</h3>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {days.map((day) => (
            <button
              key={day.iso}
              type="button"
              onClick={() => setDateTime(day.iso, time ?? '')}
              className={cn(
                'flex shrink-0 flex-col items-center rounded-xl border px-3 py-2 text-center',
                date === day.iso ? 'border-rose-gold bg-rose-gold/10' : 'border-beige hover:border-rose-gold'
              )}
            >
              <span className="font-sans text-xs uppercase text-charcoal/60">{day.label}</span>
              <span className="font-sans text-sm text-charcoal">{day.dayNumber}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl text-charcoal">Pick a Time</h3>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setDateTime(date ?? '', slot)}
              className={cn(
                'rounded-xl border px-3 py-2 font-sans text-sm',
                time === slot ? 'border-rose-gold bg-rose-gold/10' : 'border-beige hover:border-rose-gold'
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
