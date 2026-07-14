import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  className?: string
}

export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <div className={cn('flex gap-0.5 text-rose-gold', className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} fill={i < rating ? 'currentColor' : 'none'} />
      ))}
    </div>
  )
}
