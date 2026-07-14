import Image from 'next/image'
import { galleryItems } from '@/constants/gallery'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'
import { siteConfig } from '@/constants/siteConfig'

const instagramItems = galleryItems.slice(6, 12)

export function InstagramPreview() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="@lumieresalon" title="Follow Our Journey" />
        </FadeIn>
        <div className="mt-16 grid grid-cols-3 gap-3 md:grid-cols-6">
          {instagramItems.map((item) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="200px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
        <FadeIn className="mt-12 flex justify-center">
          <Button href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" variant="secondary">
            Follow Us
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
