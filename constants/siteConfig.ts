import type { SiteConfig } from '@/types/site'

export const siteConfig: SiteConfig = {
  name: 'Lumière Salon & Spa',
  tagline: 'Where Beauty Meets Artistry',
  description:
    'A premium salon and spa offering hair, makeup, nails, and spa treatments crafted with precision and care.',
  phone: '+1 (555) 018-2947',
  email: 'hello@lumieresalon.com',
  address: '128 Rosewood Avenue, Suite 3, Portland, OR 97201',
  whatsappNumber: '15550182947',
  hours: [
    { day: 'Monday', hours: 'Closed' },
    { day: 'Tuesday – Friday', hours: '9:00 AM – 7:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 6:00 PM' },
    { day: 'Sunday', hours: '10:00 AM – 4:00 PM' },
  ],
  social: {
    instagram: 'https://instagram.com/lumieresalon',
    facebook: 'https://facebook.com/lumieresalon',
  },
}
