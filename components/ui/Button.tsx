import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'default' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonProps = ButtonBaseProps &
  (
    | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>)
  )

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-rose-gold text-white hover:bg-rose-gold/90',
  secondary: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory',
  ghost: 'text-charcoal hover:text-rose-gold',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-sans uppercase tracking-wider font-medium transition-colors duration-300 rounded-full'

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = 'primary', size = 'default', className, children, href, ...props }, ref) {
    const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }
)
