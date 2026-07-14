import { services } from '@/constants/services'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'

const previewServices = services.slice(0, 6)

export function ServicesPreview() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Services"
            title="Crafted For You"
            description="From precision cuts to bridal artistry, every service is tailored to you."
          />
        </FadeIn>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {previewServices.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.05}>
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-12 flex justify-center">
          <Button href="/services" variant="secondary">
            View All Services
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
