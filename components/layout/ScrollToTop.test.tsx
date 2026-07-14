import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ScrollToTop } from './ScrollToTop'

describe('ScrollToTop', () => {
  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  it('is not rendered before scrolling past the threshold', () => {
    render(<ScrollToTop />)
    expect(screen.queryByRole('button', { name: 'Scroll to top' })).not.toBeInTheDocument()
  })

  it('appears after scrolling past the threshold', () => {
    render(<ScrollToTop />)
    Object.defineProperty(window, 'scrollY', { value: 500, configurable: true })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(screen.getByRole('button', { name: 'Scroll to top' })).toBeInTheDocument()
  })
})
