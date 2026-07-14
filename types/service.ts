export type ServiceCategory = 'Hair' | 'Makeup' | 'Nails' | 'Spa'

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  description: string
  image: string
  durationMinutes: number
  startingPrice: number
}
