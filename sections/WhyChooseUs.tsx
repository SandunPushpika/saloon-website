import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatCounter } from '@/components/ui/StatCounter'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger } from '@/components/motion/Stagger'
import { StaggerItem } from '@/components/motion/StaggerItem'

const stats = [
  { target: 12, suffix: '+', label: 'Years of Experience' },
  { target: 8500, suffix: '+', label: 'Happy Clients' },
  { target: 4, suffix: '', label: 'Industry Awards' },
  { target: 7, suffix: '', label: 'Expert Stylists' },
]

export function WhyChooseUs() {
  return (
    <section className="bg-beige/20 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Why Choose Us" title="Artistry You Can Trust" />
        </FadeIn>
        <Stagger className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <StatCounter
                target={stat.target}
                suffix={stat.suffix}
                className="font-display text-4xl text-rose-gold md:text-5xl"
              />
              <p className="font-sans text-sm text-charcoal/70">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
