'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useBookingStore } from '@/lib/booking-store'
import { siteConfig } from '@/constants/siteConfig'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const openBooking = useBookingStore((s) => s.open)

  return (
    <section ref={ref} className="relative flex h-screen items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1920&q=80"
          alt="Lumière Salon & Spa interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs uppercase tracking-[0.3em] text-ivory/80"
        >
          {siteConfig.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl font-display text-5xl text-ivory md:text-7xl"
        >
          {siteConfig.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl font-sans text-ivory/80"
        >
          {siteConfig.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" onClick={() => openBooking()}>
            Book Appointment
          </Button>
          <Button
            size="lg"
            variant="secondary"
            href="/services"
            className="border-ivory text-ivory hover:bg-ivory hover:text-charcoal"
          >
            Explore Services
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
