import type { Metadata } from 'next'
import { Story } from '@/sections/about/Story'
import { Timeline } from '@/sections/about/Timeline'
import { TeamGrid } from '@/sections/about/TeamGrid'
import { MissionValues } from '@/sections/about/MissionValues'
import { AwardsStrip } from '@/sections/about/AwardsStrip'
import { CTABanner } from '@/components/ui/CTABanner'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story, team, and philosophy behind Lumière Salon & Spa.',
}

export default function AboutPage() {
  return (
    <>
      <Story />
      <Timeline />
      <TeamGrid />
      <MissionValues />
      <AwardsStrip />
      <CTABanner
        title="Come Experience Lumière"
        description="Book your first visit and see the difference artistry makes."
      />
    </>
  )
}
