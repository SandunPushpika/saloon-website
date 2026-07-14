import { SectionHeading } from '@/components/ui/SectionHeading'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'
import { FadeIn } from '@/components/motion/FadeIn'

const examples = [
  {
    id: 'color',
    title: 'Color Transformation',
    before: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&q=80',
  },
  {
    id: 'cut',
    title: 'Cut & Blowout',
    before: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80',
  },
  {
    id: 'facial',
    title: 'Facial Refresh',
    before: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1541823709867-1b206113eafd?auto=format&fit=crop&q=80',
  },
]

export function BeforeAfterGallery() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Real Results" title="Before & After" />
        </FadeIn>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {examples.map((example, index) => (
            <FadeIn key={example.id} delay={index * 0.1} className="flex flex-col gap-3">
              <BeforeAfterSlider beforeSrc={example.before} afterSrc={example.after} />
              <p className="text-center font-sans text-sm text-charcoal/70">{example.title}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
