'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { clampPercent } from '@/lib/slider'
import { cn } from '@/lib/utils'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  function updatePosition(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setPosition(clampPercent(clientX, rect.left, rect.width))
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl', className)}
      onMouseMove={(e) => e.buttons === 1 && updatePosition(e.clientX)}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
    >
      <Image src={afterSrc} alt={afterLabel} fill sizes="600px" className="object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={beforeSrc} alt={beforeLabel} fill sizes="600px" className="object-cover" />
      </div>
      <div
        role="slider"
        aria-label="Comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="absolute inset-y-0 w-0.5 cursor-ew-resize bg-ivory"
        style={{ left: `${position}%` }}
        onMouseDown={(e) => {
          e.preventDefault()
          const handleMove = (ev: MouseEvent) => updatePosition(ev.clientX)
          const handleUp = () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseup', handleUp)
          }
          window.addEventListener('mousemove', handleMove)
          window.addEventListener('mouseup', handleUp)
        }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-xs text-charcoal shadow-md">
          ↔
        </div>
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 font-sans text-xs uppercase tracking-wide text-ivory">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 font-sans text-xs uppercase tracking-wide text-ivory">
        {afterLabel}
      </span>
    </div>
  )
}
