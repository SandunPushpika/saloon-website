'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'

interface StaggerProps {
  children: React.ReactNode
  className?: string
}

export function Stagger({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}
