import { Award as AwardIcon } from 'lucide-react'
import { awards } from '@/constants/about'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger } from '@/components/motion/Stagger'
import { StaggerItem } from '@/components/motion/StaggerItem'

export function AwardsStrip() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Recognition" title="Awards & Honors" />
        </FadeIn>
        <Stagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {awards.map((award) => (
            <StaggerItem key={award.id} className="flex items-center gap-4 rounded-xl border border-beige p-5">
              <AwardIcon className="shrink-0 text-rose-gold" size={28} />
              <div>
                <p className="font-sans text-sm text-charcoal">{award.title}</p>
                <p className="font-sans text-xs text-charcoal/50">{award.year}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
