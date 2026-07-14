import type { Metadata } from 'next'
import { TestimonialsMarquee } from '@/sections/TestimonialsMarquee'
import { TestimonialsGrid } from '@/sections/testimonials/TestimonialsGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CTABanner } from '@/components/ui/CTABanner'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read what our clients say about Lumière Salon & Spa.',
}

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsMarquee />
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <SectionHeading eyebrow="All Reviews" title="Every Story Matters" />
          </FadeIn>
          <div className="mt-16">
            <TestimonialsGrid />
          </div>
        </div>
      </section>
      <CTABanner title="Write Your Own Story" description="Book your appointment and become our next favorite review." />
    </>
  )
}
