import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges plain class name strings', () => {
    expect(cn('px-2 py-1', 'text-white')).toBe('px-2 py-1 text-white')
  })

  it('resolves conflicting tailwind classes, last one wins', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('drops falsy conditional classes', () => {
    expect(cn('base', false && 'hidden', true && 'block')).toBe('base block')
  })
})
