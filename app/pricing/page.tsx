import type { Metadata } from 'next'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PricingList } from '@/sections/pricing/PricingList'
import { CTABanner } from '@/components/ui/CTABanner'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent starting prices for every hair, makeup, nail, and spa service.',
}

export default function PricingPage() {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Pricing"
              title="Simple, Transparent Pricing"
              description="All prices are starting rates — your stylist will confirm final pricing based on hair length, density, or complexity."
            />
          </FadeIn>
          <div className="mt-16">
            <PricingList />
          </div>
        </div>
      </section>
      <CTABanner title="Ready to Book?" description="Reserve your spot with any of our specialists today." />
    </>
  )
}
