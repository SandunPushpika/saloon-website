import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { PricingList } from './PricingList'
import { services } from '@/constants/services'

const CATEGORIES = ['Hair', 'Makeup', 'Nails', 'Spa'] as const

describe('PricingList', () => {
  it('renders a card per category containing exactly that category’s services with prices', () => {
    render(<PricingList />)

    CATEGORIES.forEach((category) => {
      const heading = screen.getByRole('heading', { name: category })
      const card = heading.closest('.rounded-2xl') as HTMLElement
      const categoryServices = services.filter((service) => service.category === category)

      categoryServices.forEach((service) => {
        expect(within(card).getByText(service.name, { selector: 'p' })).toBeInTheDocument()
        expect(within(card).getByText(`From $${service.startingPrice}`)).toBeInTheDocument()
      })
    })
  })
})
