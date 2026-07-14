import type { Metadata } from 'next'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GalleryMasonry } from '@/sections/gallery/GalleryMasonry'
import { CTABanner } from '@/components/ui/CTABanner'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse our interior, hair, makeup, bridal, and nail work.',
}

export default function GalleryPage() {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <SectionHeading eyebrow="Gallery" title="A Closer Look" description="Filter by category or click any image to explore." />
          </FadeIn>
          <div className="mt-16">
            <GalleryMasonry />
          </div>
        </div>
      </section>
      <CTABanner title="See Yourself in the Chair" description="Book an appointment and create your own before and after." />
    </>
  )
}
