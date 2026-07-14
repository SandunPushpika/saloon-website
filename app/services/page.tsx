import type { Metadata } from 'next'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceFilterGrid } from '@/sections/services/ServiceFilterGrid'
import { CTABanner } from '@/components/ui/CTABanner'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore hair, makeup, nail, and spa services at Lumière Salon & Spa.',
}

export default function ServicesPage() {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Services"
              title="Every Detail, Considered"
              description="Filter by category to find exactly what you're looking for."
            />
          </FadeIn>
          <div className="mt-16">
            <ServiceFilterGrid />
          </div>
        </div>
      </section>
      <CTABanner
        title="Not Sure Where To Start?"
        description="Book a consultation and we'll help you choose the perfect service."
      />
    </>
  )
}
