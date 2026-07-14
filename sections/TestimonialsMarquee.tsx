'use client'

import { motion } from 'framer-motion'
import { testimonials } from '@/constants/testimonials'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'

const marqueeItems = testimonials.slice(0, 6)

export function TestimonialsMarquee() {
  return (
    <section className="overflow-hidden bg-beige/20 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Testimonials" title="Loved By Our Clients" />
        </FadeIn>
      </div>
      <div className="relative mt-16">
        <motion.div
          className="flex w-max gap-6 px-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {[...marqueeItems, ...marqueeItems].map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} className="w-80 shrink-0" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
