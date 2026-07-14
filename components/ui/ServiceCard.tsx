'use client'

import Image from 'next/image'
import { Clock } from 'lucide-react'
import type { Service } from '@/types/service'
import { Button } from './Button'
import { useBookingStore } from '@/lib/booking-store'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const openBooking = useBookingStore((s) => s.open)

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl text-charcoal">{service.name}</h3>
        <p className="flex-1 font-sans text-sm text-charcoal/70">{service.description}</p>
        <div className="flex items-center justify-between font-sans text-sm text-charcoal/60">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {service.durationMinutes} min
          </span>
          <span className="text-rose-gold">From ${service.startingPrice}</span>
        </div>
        <Button onClick={() => openBooking(service.id)} className="mt-2 w-full">
          Book Now
        </Button>
      </div>
    </div>
  )
}
