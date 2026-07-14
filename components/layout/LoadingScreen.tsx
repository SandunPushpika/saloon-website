'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { siteConfig } from '@/constants/siteConfig'

const STORAGE_KEY = 'lumiere-loading-shown'

export function LoadingScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return
    setVisible(true)
    window.sessionStorage.setItem(STORAGE_KEY, 'true')
    const timeout = setTimeout(() => setVisible(false), 1200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl text-charcoal"
          >
            {siteConfig.name}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
