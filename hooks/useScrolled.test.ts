import { describe, it, expect, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrolled } from './useScrolled'

describe('useScrolled', () => {
  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  it('returns false when scrollY is below the threshold', () => {
    const { result } = renderHook(() => useScrolled(10))
    expect(result.current).toBe(false)
  })

  it('returns true once scrollY exceeds the threshold after a scroll event', () => {
    const { result } = renderHook(() => useScrolled(10))
    Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)
  })
})
