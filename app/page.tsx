import { Hero } from '@/sections/Hero'
import { ServicesPreview } from '@/sections/ServicesPreview'
import { WhyChooseUs } from '@/sections/WhyChooseUs'
import { PressStrip } from '@/sections/PressStrip'
import { FeaturedStylists } from '@/sections/FeaturedStylists'
import { TestimonialsMarquee } from '@/sections/TestimonialsMarquee'
import { BeforeAfterGallery } from '@/sections/BeforeAfterGallery'
import { PricingHighlights } from '@/sections/PricingHighlights'
import { InstagramPreview } from '@/sections/InstagramPreview'
import { BookingCTA } from '@/sections/BookingCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyChooseUs />
      <PressStrip />
      <FeaturedStylists />
      <TestimonialsMarquee />
      <BeforeAfterGallery />
      <PricingHighlights />
      <InstagramPreview />
      <BookingCTA />
    </>
  )
}
