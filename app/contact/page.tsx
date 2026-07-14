import type { Metadata } from 'next'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from '@/sections/contact/ContactForm'
import { ContactInfo } from '@/sections/contact/ContactInfo'
import { FAQAccordion } from '@/sections/contact/FAQAccordion'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Lumière Salon & Spa — address, hours, and contact form.',
}

export default function ContactPage() {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Contact"
              title="Let's Talk"
              description="Questions, special requests, or ready to book? Reach out any way that's easiest for you."
            />
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <FadeIn>
              <ContactForm />
            </FadeIn>
            <FadeIn delay={0.1}>
              <ContactInfo />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-beige/20 py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeIn>
            <SectionHeading eyebrow="FAQ" title="Common Questions" />
          </FadeIn>
          <div className="mt-16">
            <FAQAccordion />
          </div>
        </div>
      </section>
    </>
  )
}
