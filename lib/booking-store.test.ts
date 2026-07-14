import { describe, it, expect, beforeEach } from 'vitest'
import { useBookingStore } from './booking-store'

describe('useBookingStore', () => {
  beforeEach(() => {
    useBookingStore.getState().close()
  })

  it('starts closed on the service step', () => {
    const state = useBookingStore.getState()
    expect(state.isOpen).toBe(false)
    expect(state.step).toBe('service')
  })

  it('open() with no service starts on the service step', () => {
    useBookingStore.getState().open()
    const state = useBookingStore.getState()
    expect(state.isOpen).toBe(true)
    expect(state.step).toBe('service')
    expect(state.serviceId).toBeNull()
  })

  it('open(serviceId) pre-selects the service and jumps to the stylist step', () => {
    useBookingStore.getState().open('hair-cut')
    const state = useBookingStore.getState()
    expect(state.isOpen).toBe(true)
    expect(state.serviceId).toBe('hair-cut')
    expect(state.step).toBe('stylist')
  })

  it('close() sets isOpen to false without resetting selections', () => {
    useBookingStore.getState().open('hair-cut')
    useBookingStore.getState().setStylistId('theo-bianchi')
    useBookingStore.getState().close()
    const state = useBookingStore.getState()
    expect(state.isOpen).toBe(false)
    expect(state.stylistId).toBe('theo-bianchi')
  })

  it('setStep updates the current step', () => {
    useBookingStore.getState().setStep('datetime')
    expect(useBookingStore.getState().step).toBe('datetime')
  })

  it('setDateTime updates both date and time', () => {
    useBookingStore.getState().setDateTime('2026-08-01', '10:00 AM')
    const state = useBookingStore.getState()
    expect(state.date).toBe('2026-08-01')
    expect(state.time).toBe('10:00 AM')
  })

  it('setDetails updates the contact details', () => {
    useBookingStore.getState().setDetails({ name: 'Jane Doe', email: 'jane@example.com', phone: '555-1234' })
    expect(useBookingStore.getState().details).toEqual({ name: 'Jane Doe', email: 'jane@example.com', phone: '555-1234' })
  })

  it('a fresh open() resets prior selections', () => {
    useBookingStore.getState().open('hair-cut')
    useBookingStore.getState().setStylistId('theo-bianchi')
    useBookingStore.getState().setDetails({ name: 'Jane', email: 'j@e.com', phone: '1' })
    useBookingStore.getState().open('facial')
    const state = useBookingStore.getState()
    expect(state.serviceId).toBe('facial')
    expect(state.stylistId).toBeNull()
    expect(state.details).toEqual({ name: '', email: '', phone: '' })
  })
})
