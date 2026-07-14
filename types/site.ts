export interface BusinessHours {
  day: string
  hours: string
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  phone: string
  email: string
  address: string
  whatsappNumber: string
  hours: BusinessHours[]
  social: {
    instagram: string
    facebook: string
  }
}
