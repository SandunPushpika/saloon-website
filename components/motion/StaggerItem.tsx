'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  )
}
