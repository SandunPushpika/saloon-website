import { team } from '@/constants/team'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TeamCard } from '@/components/ui/TeamCard'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger } from '@/components/motion/Stagger'
import { StaggerItem } from '@/components/motion/StaggerItem'

export function TeamGrid() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Our Team" title="The Artists Behind Lumière" />
        </FadeIn>
        <Stagger className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {team.map((member) => (
            <StaggerItem key={member.id}>
              <TeamCard member={member} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
