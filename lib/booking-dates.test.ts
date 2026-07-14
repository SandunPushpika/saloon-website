import { describe, it, expect } from 'vitest'
import { getUpcomingDays, TIME_SLOTS } from './booking-dates'

describe('getUpcomingDays', () => {
  it('returns the requested number of days, starting tomorrow', () => {
    const days = getUpcomingDays(14, new Date('2026-07-13T00:00:00Z'))
    expect(days).toHaveLength(14)
    expect(days[0].iso).toBe('2026-07-14')
    expect(days[13].iso).toBe('2026-07-27')
  })

  it('each day has a weekday label and a day/month label', () => {
    const [first] = getUpcomingDays(1, new Date('2026-07-13T00:00:00Z'))
    expect(first.label).toMatch(/[A-Za-z]+/)
    expect(first.dayNumber).toMatch(/\d+/)
  })
})

describe('TIME_SLOTS', () => {
  it('provides a non-empty list of time slot strings', () => {
    expect(TIME_SLOTS.length).toBeGreaterThan(0)
  })
})
