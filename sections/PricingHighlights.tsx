import { services } from '@/constants/services'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger } from '@/components/motion/Stagger'
import { StaggerItem } from '@/components/motion/StaggerItem'

const highlightIds = ['hair-cut', 'bridal-makeup', 'nail-care']
const highlights = highlightIds.map((id) => services.find((service) => service.id === id)!)

export function PricingHighlights() {
  return (
    <section className="bg-beige/20 py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Pricing" title="Investment In Yourself" />
        </FadeIn>
        <Stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((service) => (
            <StaggerItem
              key={service.id}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <p className="font-display text-lg text-charcoal">{service.name}</p>
              <p className="font-display text-3xl text-rose-gold">${service.startingPrice}</p>
              <p className="font-sans text-xs uppercase tracking-wide text-charcoal/50">Starting Price</p>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn className="mt-12 flex justify-center">
          <Button href="/pricing" variant="secondary">
            View Full Pricing
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
