'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatCounterProps {
  target: number
  suffix?: string
  durationMs?: number
  className?: string
}

export function StatCounter({ target, suffix = '', durationMs = 1200, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const steps = 30
    const stepDuration = durationMs / steps
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep += 1
      setValue(Math.round((currentStep / steps) * target))
      if (currentStep >= steps) clearInterval(interval)
    }, stepDuration)
    return () => clearInterval(interval)
  }, [inView, target, durationMs])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
