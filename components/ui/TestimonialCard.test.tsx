import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestimonialCard } from './TestimonialCard'
import { testimonials } from '@/constants/testimonials'

describe('TestimonialCard', () => {
  it('renders the quote, name, and rating', () => {
    const testimonial = testimonials[0]
    render(<TestimonialCard testimonial={testimonial} />)
    expect(screen.getByText(`“${testimonial.quote}”`)).toBeInTheDocument()
    expect(screen.getByText(testimonial.name)).toBeInTheDocument()
    expect(screen.getByLabelText(`${testimonial.rating} out of 5 stars`)).toBeInTheDocument()
  })
})
