'use client'

import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { services } from '@/constants/services'
import type { ServiceCategory } from '@/types/service'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { cn } from '@/lib/utils'

const CATEGORIES: Array<ServiceCategory | 'All'> = ['All', 'Hair', 'Makeup', 'Nails', 'Spa']

export function ServiceFilterGrid() {
  const [category, setCategory] = useState<ServiceCategory | 'All'>('All')
  const filtered = category === 'All' ? services : services.filter((service) => service.category === category)

  return (
    <Tabs.Root value={category} onValueChange={(value) => setCategory(value as ServiceCategory | 'All')}>
      <Tabs.List className="flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <Tabs.Trigger
            key={cat}
            value={cat}
            className={cn(
              'rounded-full px-5 py-2 font-sans text-sm uppercase tracking-wide transition-colors',
              category === cat ? 'bg-rose-gold text-white' : 'bg-beige/30 text-charcoal hover:bg-beige/60'
            )}
          >
            {cat}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value={category} className="mt-12">
        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Tabs.Content>
    </Tabs.Root>
  )
}
