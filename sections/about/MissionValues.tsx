import { values } from '@/constants/about'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger } from '@/components/motion/Stagger'
import { StaggerItem } from '@/components/motion/StaggerItem'

export function MissionValues() {
  return (
    <section className="bg-beige/20 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Philosophy"
            title="What We Stand For"
            description="Four principles guide every decision we make, from the products we stock to the way we welcome you in."
          />
        </FadeIn>
        <Stagger className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <StaggerItem key={value.id} className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <p className="font-display text-xl text-charcoal">{value.title}</p>
              <p className="mt-2 font-sans text-sm text-charcoal/70">{value.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
