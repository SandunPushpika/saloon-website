import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestimonialsGrid } from './TestimonialsGrid'
import { testimonials } from '@/constants/testimonials'

describe('TestimonialsGrid', () => {
  it('renders every testimonial', () => {
    render(<TestimonialsGrid />)
    testimonials.forEach((testimonial) => {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument()
    })
  })
})
