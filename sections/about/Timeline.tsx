import { timeline } from '@/constants/about'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'

export function Timeline() {
  return (
    <section className="bg-beige/20 py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Our Journey" title="Milestones" />
        </FadeIn>
        <div className="mt-16 flex flex-col gap-10 border-l border-rose-gold/30 pl-8">
          {timeline.map((entry, index) => (
            <FadeIn key={entry.year} delay={index * 0.05} className="relative">
              <span className="absolute -left-[41px] top-1 h-3 w-3 rounded-full bg-rose-gold" />
              <p className="font-display text-2xl text-rose-gold">{entry.year}</p>
              <p className="mt-1 font-sans text-lg text-charcoal">{entry.title}</p>
              <p className="mt-1 font-sans text-sm text-charcoal/70">{entry.description}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
