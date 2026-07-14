'use client'

import { team } from '@/constants/team'
import { useBookingStore } from '@/lib/booking-store'
import { cn } from '@/lib/utils'

export function StylistStep() {
  const stylistId = useBookingStore((s) => s.stylistId)
  const setStylistId = useBookingStore((s) => s.setStylistId)
  const setStep = useBookingStore((s) => s.setStep)

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-2xl text-charcoal">Choose a Stylist</h3>
      <div className="grid max-h-80 gap-3 overflow-y-auto pr-1">
        {team.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => {
              setStylistId(member.id)
              setStep('datetime')
            }}
            className={cn(
              'flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors',
              stylistId === member.id ? 'border-rose-gold bg-rose-gold/10' : 'border-beige hover:border-rose-gold'
            )}
          >
            <span>
              <span className="block font-sans text-sm font-medium text-charcoal">{member.name}</span>
              <span className="block font-sans text-xs text-charcoal/60">{member.role}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
