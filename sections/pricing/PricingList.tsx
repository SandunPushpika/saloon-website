import { services } from '@/constants/services'
import type { ServiceCategory } from '@/types/service'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger } from '@/components/motion/Stagger'
import { StaggerItem } from '@/components/motion/StaggerItem'

const CATEGORIES: ServiceCategory[] = ['Hair', 'Makeup', 'Nails', 'Spa']

export function PricingList() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      {CATEGORIES.map((category, categoryIndex) => {
        const categoryServices = services.filter((service) => service.category === category)
        return (
          <FadeIn key={category} delay={categoryIndex * 0.1} className="rounded-2xl bg-white p-8 shadow-sm">
            <SectionHeading title={category} align="left" />
            <Stagger className="mt-6 flex flex-col divide-y divide-beige/50">
              {categoryServices.map((service) => (
                <StaggerItem key={service.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-sans text-sm font-medium text-charcoal">{service.name}</p>
                    <p className="font-sans text-xs text-charcoal/50">{service.durationMinutes} min</p>
                  </div>
                  <p className="font-display text-lg text-rose-gold">From ${service.startingPrice}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeIn>
        )
      })}
    </div>
  )
}
