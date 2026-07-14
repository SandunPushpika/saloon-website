import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { siteConfig } from '@/constants/siteConfig'
import { InstagramIcon, FacebookIcon } from '@/components/ui/icons'

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 shrink-0 text-rose-gold" size={20} />
          <p className="font-sans text-sm text-charcoal/80">{siteConfig.address}</p>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 shrink-0 text-rose-gold" size={20} />
          <a href={`tel:${siteConfig.phone}`} className="font-sans text-sm text-charcoal/80 hover:text-rose-gold">
            {siteConfig.phone}
          </a>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 shrink-0 text-rose-gold" size={20} />
          <a href={`mailto:${siteConfig.email}`} className="font-sans text-sm text-charcoal/80 hover:text-rose-gold">
            {siteConfig.email}
          </a>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2">
          <Clock className="text-rose-gold" size={20} />
          <p className="font-display text-lg text-charcoal">Opening Hours</p>
        </div>
        <ul className="mt-4 flex flex-col gap-1 font-sans text-sm text-charcoal/70">
          {siteConfig.hours.map((entry) => (
            <li key={entry.day} className="flex justify-between gap-4">
              <span>{entry.day}</span>
              <span>{entry.hours}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-beige/40 text-charcoal transition-colors hover:bg-rose-gold hover:text-white"
        >
          <InstagramIcon size={20} />
        </a>
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-beige/40 text-charcoal transition-colors hover:bg-rose-gold hover:text-white"
        >
          <FacebookIcon size={20} />
        </a>
      </div>

      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-beige/40">
        <p className="px-6 text-center font-sans text-sm text-charcoal/50">Map placeholder — {siteConfig.address}</p>
      </div>
    </div>
  )
}
