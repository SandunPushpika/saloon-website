'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { InstagramIcon, FacebookIcon } from '@/components/ui/icons'
import { navLinks } from '@/constants/nav'
import { siteConfig } from '@/constants/siteConfig'
import { galleryItems } from '@/constants/gallery'

const instagramPreviewItems = galleryItems.slice(0, 6)

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl">{siteConfig.name}</p>
            <p className="mt-3 max-w-xs font-sans text-sm text-ivory/70">{siteConfig.description}</p>
            <div className="mt-6 flex gap-4">
              <a
                href={siteConfig.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/70 transition-colors hover:text-rose-gold"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={siteConfig.social.facebook}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/70 transition-colors hover:text-rose-gold"
              >
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-ivory/50">Navigate</p>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-ivory/80 hover:text-rose-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-ivory/50">Visit Us</p>
            <address className="mt-4 flex flex-col gap-2 font-sans text-sm not-italic text-ivory/80">
              <span>{siteConfig.address}</span>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-rose-gold">
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-rose-gold">
                {siteConfig.email}
              </a>
            </address>
            <ul className="mt-4 flex flex-col gap-1 font-sans text-sm text-ivory/70">
              {siteConfig.hours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-4">
                  <span>{entry.day}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-ivory/50">Newsletter</p>
            <p className="mt-4 font-sans text-sm text-ivory/70">
              Subscribe for seasonal offers and styling inspiration.
            </p>
            {subscribed ? (
              <p className="mt-4 font-sans text-sm text-rose-gold">You&apos;re subscribed — thank you!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email"
                  className="w-full rounded-full bg-ivory/10 px-4 py-2 font-sans text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:ring-1 focus:ring-rose-gold"
                />
                <button
                  type="submit"
                  className="rounded-full bg-rose-gold px-4 py-2 font-sans text-sm uppercase tracking-wider text-white hover:bg-rose-gold/90"
                >
                  Join
                </button>
              </form>
            )}

            <p className="mt-8 font-sans text-xs uppercase tracking-widest text-ivory/50">Follow Us</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {instagramPreviewItems.map((item) => (
                <div key={item.id} className="relative aspect-square overflow-hidden rounded-md">
                  <Image src={item.src} alt={item.alt} fill sizes="80px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-ivory/10 pt-6 font-sans text-xs text-ivory/50">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
