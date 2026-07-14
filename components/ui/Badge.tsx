import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-beige/60 px-4 py-1.5 text-xs font-sans uppercase tracking-widest text-charcoal',
        className
      )}
    >
      {children}
    </span>
  )
}
