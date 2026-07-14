'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const STORAGE_KEY = 'lumiere-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === null) {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    window.localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-x-4 bottom-4 z-50 flex flex-col items-center justify-between gap-4 rounded-2xl bg-charcoal px-6 py-4 text-ivory shadow-xl sm:flex-row sm:inset-x-6 sm:bottom-6"
        >
          <p className="font-sans text-sm text-ivory/80">
            We use cookies to improve your browsing experience. By continuing, you agree to our use of cookies.
          </p>
          <Button variant="primary" size="default" onClick={dismiss} className="shrink-0">
            Got it
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
