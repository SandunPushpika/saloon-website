import { describe, it, expect } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ServiceFilterGrid } from './ServiceFilterGrid'
import { services } from '@/constants/services'

describe('ServiceFilterGrid', () => {
  it('shows all services by default', () => {
    render(<ServiceFilterGrid />)
    const panel = within(screen.getByRole('tabpanel'))
    services.forEach((service) => {
      expect(panel.getByRole('heading', { name: service.name })).toBeInTheDocument()
    })
  })

  it('filters to only Nails services when the Nails tab is selected', async () => {
    render(<ServiceFilterGrid />)
    await userEvent.click(screen.getByRole('tab', { name: 'Nails' }))

    const nailsServices = services.filter((service) => service.category === 'Nails')
    const otherServices = services.filter((service) => service.category !== 'Nails')
    const panel = within(screen.getByRole('tabpanel'))

    for (const service of nailsServices) {
      expect(panel.getByRole('heading', { name: service.name })).toBeInTheDocument()
    }
    await waitFor(() => {
      for (const service of otherServices) {
        expect(panel.queryByRole('heading', { name: service.name })).not.toBeInTheDocument()
      }
    })
  })
})
