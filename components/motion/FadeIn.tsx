'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
