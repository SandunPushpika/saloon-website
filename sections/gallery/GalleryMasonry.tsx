'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { galleryItems } from '@/constants/gallery'
import type { GalleryCategory, GalleryItem } from '@/types/gallery'
import { cn } from '@/lib/utils'

const CATEGORIES: Array<GalleryCategory | 'All'> = ['All', 'Interior', 'Hair', 'Makeup', 'Bridal', 'Nails']

export function GalleryMasonry() {
  const [filter, setFilter] = useState<GalleryCategory | 'All'>('All')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const filtered = filter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === filter)

  useEffect(() => {
    if (activeIndex === null) return
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        setActiveIndex((i) => (i === null ? i : (i + 1) % filtered.length))
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex, filtered.length])

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setFilter(cat)
              setActiveIndex(null)
            }}
            className={cn(
              'rounded-full px-5 py-2 font-sans text-sm uppercase tracking-wide transition-colors',
              filter === cat ? 'bg-rose-gold text-white' : 'bg-beige/30 text-charcoal hover:bg-beige/60'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-12 columns-2 gap-4 md:columns-3">
        {filtered.map((item, index) => (
          <GalleryThumbnail key={item.id} item={item} height={index % 3 === 0 ? 500 : 320} onClick={() => setActiveIndex(index)} />
        ))}
      </div>

      <Dialog.Root open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-charcoal/90" />
          <Dialog.Content className="fixed inset-4 z-[71] flex items-center justify-center focus:outline-none md:inset-12">
            <Dialog.Title className="sr-only">Gallery image</Dialog.Title>
            {activeIndex !== null && (
              <div className="relative h-full w-full max-w-4xl">
                <Image
                  src={filtered[activeIndex].src}
                  alt={filtered[activeIndex].alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            )}
            <Dialog.Close aria-label="Close" className="absolute right-4 top-4 text-ivory hover:text-rose-gold">
              <X size={28} />
            </Dialog.Close>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => setActiveIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory hover:text-rose-gold"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => setActiveIndex((i) => (i === null ? i : (i + 1) % filtered.length))}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory hover:text-rose-gold"
            >
              <ChevronRight size={32} />
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

interface GalleryThumbnailProps {
  item: GalleryItem
  height: number
  onClick: () => void
}

function GalleryThumbnail({ item, height, onClick }: GalleryThumbnailProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mb-4 block w-full overflow-hidden rounded-xl break-inside-avoid bg-beige/30"
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={400}
        height={height}
        sizes="(min-width: 768px) 33vw, 50vw"
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-auto w-full object-cover transition-all duration-500 group-hover:scale-105',
          loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        )}
      />
      <span className="absolute inset-0 bg-charcoal/0 transition-colors group-hover:bg-charcoal/20" />
    </button>
  )
}
