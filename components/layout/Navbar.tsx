'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScrolled } from '@/hooks/useScrolled'
import { useBookingStore } from '@/lib/booking-store'
import { navLinks } from '@/constants/nav'
import { siteConfig } from '@/constants/siteConfig'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const scrolled = useScrolled(20)
  const [mobileOpen, setMobileOpen] = useState(false)
  const openBooking = useBookingStore((state) => state.open)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || mobileOpen ? 'bg-ivory/95 shadow-sm backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="font-display text-xl text-charcoal">
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-sm uppercase tracking-wider text-charcoal transition-colors hover:text-rose-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button onClick={() => openBooking()}>Book Now</Button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="text-charcoal lg:hidden"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-ivory lg:hidden"
          >
            <ul className="flex flex-col gap-6 px-6 py-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-2xl text-charcoal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  onClick={() => {
                    setMobileOpen(false)
                    openBooking()
                  }}
                  className="w-full"
                >
                  Book Now
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
