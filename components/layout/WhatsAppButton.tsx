import { MessageCircle } from 'lucide-react'
import { siteConfig } from '@/constants/siteConfig'

export function WhatsAppButton() {
  const message = encodeURIComponent(`Hi ${siteConfig.name}, I'd like to book an appointment.`)
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={22} />
    </a>
  )
}
