import type { Variants } from 'framer-motion'

export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}
