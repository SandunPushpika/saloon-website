import { testimonials } from '@/constants/testimonials'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { FadeIn } from '@/components/motion/FadeIn'

export function TestimonialsGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <FadeIn key={testimonial.id} delay={(index % 3) * 0.05}>
          <TestimonialCard testimonial={testimonial} />
        </FadeIn>
      ))}
    </div>
  )
}
