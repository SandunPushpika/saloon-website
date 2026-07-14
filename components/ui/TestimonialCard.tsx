import Image from 'next/image'
import { Quote } from 'lucide-react'
import type { Testimonial } from '@/types/testimonial'
import { StarRating } from './StarRating'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <figure className={cn('flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm', className)}>
      <Quote className="text-rose-gold/40" size={28} />
      <StarRating rating={testimonial.rating} />
      <blockquote className="flex-1 font-sans text-sm text-charcoal/80">&ldquo;{testimonial.quote}&rdquo;</blockquote>
      <figcaption className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image src={testimonial.image} alt={testimonial.name} fill sizes="40px" className="object-cover" />
        </div>
        <span className="font-sans text-sm font-medium text-charcoal">{testimonial.name}</span>
      </figcaption>
    </figure>
  )
}
