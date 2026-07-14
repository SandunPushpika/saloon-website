import Image from 'next/image'
import { team } from '@/constants/team'
import { siteConfig } from '@/constants/siteConfig'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'

const founder = team[0]

export function Story() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
        <FadeIn>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image
              src={founder.image}
              alt={founder.name}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1} className="flex flex-col gap-4">
          <SectionHeading eyebrow="Our Story" title={`Founded By ${founder.name}`} align="left" />
          <p className="font-sans text-charcoal/70">
            {siteConfig.name} began as a single-chair studio built on a simple idea: beauty care deserves the same
            unhurried attention as any fine craft. Over a decade later, that founding philosophy still shapes every
            appointment.
          </p>
          <p className="font-sans text-charcoal/70">
            Today, {founder.name} leads a team of {team.length} specialists across hair, makeup, nails, and
            grooming, each trained to listen first and create second.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
