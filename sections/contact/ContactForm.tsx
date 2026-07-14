'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white p-10 text-center shadow-sm"
      >
        <h3 className="font-display text-2xl text-charcoal">Message Sent!</h3>
        <p className="font-sans text-sm text-charcoal/70">
          Thank you, {name.split(' ')[0] || 'there'}. We&apos;ll be in touch within 1 business day.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="contact-name" className="font-sans text-xs uppercase tracking-wide text-charcoal/60">
            Full Name
          </label>
          <input
            id="contact-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-beige px-3 py-2 font-sans text-sm focus:border-rose-gold focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="contact-email" className="font-sans text-xs uppercase tracking-wide text-charcoal/60">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-beige px-3 py-2 font-sans text-sm focus:border-rose-gold focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="contact-phone" className="font-sans text-xs uppercase tracking-wide text-charcoal/60">
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg border border-beige px-3 py-2 font-sans text-sm focus:border-rose-gold focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="contact-service" className="font-sans text-xs uppercase tracking-wide text-charcoal/60">
            Service Interest
          </label>
          <input
            id="contact-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="e.g. Bridal Makeup"
            className="rounded-lg border border-beige px-3 py-2 font-sans text-sm focus:border-rose-gold focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-message" className="font-sans text-xs uppercase tracking-wide text-charcoal/60">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-lg border border-beige px-3 py-2 font-sans text-sm focus:border-rose-gold focus:outline-none"
        />
      </div>
      <Button type="submit" className="mt-2 self-start">
        Send Message
      </Button>
    </form>
  )
}
