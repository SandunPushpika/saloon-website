'use client'

import { motion } from 'framer-motion'

const press = ['THE STYLE JOURNAL', 'MODERN BEAUTY CO.', 'CITY LIVING MAG', 'ARTISAN QUARTERLY', 'THE DAILY EDIT']

export function PressStrip() {
  return (
    <section className="overflow-hidden border-y border-beige/40 bg-ivory py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center font-sans text-xs uppercase tracking-widest text-charcoal/40">As Featured In</p>
        <motion.div
          className="mt-6 flex w-max gap-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        >
          {[...press, ...press].map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="whitespace-nowrap font-display text-lg text-charcoal/30 transition-colors hover:text-charcoal/60"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
