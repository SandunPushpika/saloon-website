import { cn } from '@/lib/utils'
import { Badge } from './Badge'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2 className="font-display text-4xl text-charcoal md:text-5xl lg:text-6xl">{title}</h2>
      {description && <p className="max-w-2xl font-sans text-base text-charcoal/70 md:text-lg">{description}</p>}
    </div>
  )
}
