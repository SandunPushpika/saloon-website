'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useBookingStore, type BookingStep } from '@/lib/booking-store'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { ServiceStep } from './steps/ServiceStep'
import { StylistStep } from './steps/StylistStep'
import { DateTimeStep } from './steps/DateTimeStep'
import { DetailsStep } from './steps/DetailsStep'
import { SuccessStep } from './steps/SuccessStep'

const STEP_ORDER: BookingStep[] = ['service', 'stylist', 'datetime', 'details']

export function BookingModal() {
  const isOpen = useBookingStore((s) => s.isOpen)
  const step = useBookingStore((s) => s.step)
  const date = useBookingStore((s) => s.date)
  const time = useBookingStore((s) => s.time)
  const close = useBookingStore((s) => s.close)
  const setStep = useBookingStore((s) => s.setStep)

  const stepIndex = STEP_ORDER.indexOf(step)

  function goBack() {
    if (stepIndex > 0) setStep(STEP_ORDER[stepIndex - 1])
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-charcoal/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-ivory p-6 shadow-2xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-xl text-charcoal">Book an Appointment</Dialog.Title>
            <Dialog.Close aria-label="Close" className="text-charcoal/60 hover:text-charcoal">
              <X size={20} />
            </Dialog.Close>
          </div>

          {step !== 'success' && (
            <div className="mt-4 flex gap-2">
              {STEP_ORDER.map((s, i) => (
                <div key={s} className={cn('h-1 flex-1 rounded-full', i <= stepIndex ? 'bg-rose-gold' : 'bg-beige')} />
              ))}
            </div>
          )}

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                {step === 'service' && <ServiceStep />}
                {step === 'stylist' && <StylistStep />}
                {step === 'datetime' && <DateTimeStep />}
                {step === 'details' && <DetailsStep />}
                {step === 'success' && <SuccessStep />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {stepIndex > 0 && step !== 'success' ? (
              <button
                type="button"
                onClick={goBack}
                className="font-sans text-sm text-charcoal/60 hover:text-charcoal"
              >
                Back
              </button>
            ) : (
              <span />
            )}

            {step === 'datetime' && (
              <Button onClick={() => setStep('details')} disabled={!date || !time}>
                Next
              </Button>
            )}
            {step === 'details' && (
              <Button type="submit" form="booking-details-form">
                Confirm Booking
              </Button>
            )}
            {step === 'success' && <Button onClick={() => close()}>Done</Button>}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
