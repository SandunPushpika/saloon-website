import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CookieConsent } from './CookieConsent'

describe('CookieConsent', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows the banner on first visit', () => {
    render(<CookieConsent />)
    expect(screen.getByText(/we use cookies/i)).toBeInTheDocument()
  })

  it('hides the banner and persists the choice after dismissing', async () => {
    render(<CookieConsent />)
    await userEvent.click(screen.getByRole('button', { name: 'Got it' }))
    expect(window.localStorage.getItem('lumiere-cookie-consent')).toBe('accepted')
    await waitFor(() => expect(screen.queryByText(/we use cookies/i)).not.toBeInTheDocument())
  })

  it('does not show the banner on a repeat visit', () => {
    window.localStorage.setItem('lumiere-cookie-consent', 'accepted')
    render(<CookieConsent />)
    expect(screen.queryByText(/we use cookies/i)).not.toBeInTheDocument()
  })
})
