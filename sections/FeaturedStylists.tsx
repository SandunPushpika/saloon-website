import { team } from '@/constants/team'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TeamCard } from '@/components/ui/TeamCard'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger } from '@/components/motion/Stagger'
import { StaggerItem } from '@/components/motion/StaggerItem'

const featured = team.slice(0, 4)

export function FeaturedStylists() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Meet The Team" title="Featured Stylists" />
        </FadeIn>
        <Stagger className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {featured.map((member) => (
            <StaggerItem key={member.id}>
              <TeamCard member={member} />
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn className="mt-12 flex justify-center">
          <Button href="/about" variant="secondary">
            Meet The Full Team
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
