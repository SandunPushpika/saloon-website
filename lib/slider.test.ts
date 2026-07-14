import { describe, it, expect } from 'vitest'
import { clampPercent } from './slider'

describe('clampPercent', () => {
  it('returns 50 when the pointer is at the horizontal midpoint', () => {
    expect(clampPercent(150, 0, 300)).toBe(50)
  })

  it('clamps to 0 when the pointer is left of the container', () => {
    expect(clampPercent(-50, 0, 300)).toBe(0)
  })

  it('clamps to 100 when the pointer is right of the container', () => {
    expect(clampPercent(500, 0, 300)).toBe(100)
  })

  it('returns 0 when the container has zero width', () => {
    expect(clampPercent(100, 0, 0)).toBe(0)
  })

  it('accounts for a non-zero container offset', () => {
    expect(clampPercent(175, 100, 300)).toBe(25)
  })
})
