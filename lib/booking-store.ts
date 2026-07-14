import { create } from 'zustand'

export type BookingStep = 'service' | 'stylist' | 'datetime' | 'details' | 'success'

export interface BookingDetails {
  name: string
  email: string
  phone: string
}

interface BookingState {
  isOpen: boolean
  step: BookingStep
  serviceId: string | null
  stylistId: string | null
  date: string | null
  time: string | null
  details: BookingDetails
  open: (serviceId?: string) => void
  close: () => void
  setStep: (step: BookingStep) => void
  setServiceId: (serviceId: string) => void
  setStylistId: (stylistId: string) => void
  setDateTime: (date: string, time: string) => void
  setDetails: (details: BookingDetails) => void
}

const initialState = {
  isOpen: false,
  step: 'service' as BookingStep,
  serviceId: null,
  stylistId: null,
  date: null,
  time: null,
  details: { name: '', email: '', phone: '' },
}

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  open: (serviceId) =>
    set({
      ...initialState,
      isOpen: true,
      serviceId: serviceId ?? null,
      step: serviceId ? 'stylist' : 'service',
    }),
  close: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),
  setServiceId: (serviceId) => set({ serviceId }),
  setStylistId: (stylistId) => set({ stylistId }),
  setDateTime: (date, time) => set({ date, time }),
  setDetails: (details) => set({ details }),
}))
