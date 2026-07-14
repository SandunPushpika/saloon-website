import type { TimelineEntry, ValueItem, Award } from '@/types/about'

export const timeline: TimelineEntry[] = [
  {
    year: '2014',
    title: 'Lumière Opens Its Doors',
    description: 'Amara Chen opens a single-chair studio with a simple promise: unhurried, artful beauty care.',
  },
  {
    year: '2017',
    title: 'First Industry Award',
    description: 'Recognized as "Best Boutique Salon" by the regional stylists guild, drawing a wider clientele.',
  },
  {
    year: '2020',
    title: 'The Studio Expands',
    description: 'Lumière moves into its current Rosewood Avenue location, adding a dedicated spa and bridal suite.',
  },
  {
    year: '2023',
    title: 'A Growing Family of Artists',
    description: 'The team grows to seven specialists across hair, makeup, nails, and grooming.',
  },
  {
    year: '2026',
    title: 'Today',
    description: 'Lumière continues to serve the community with the same care as day one, one guest at a time.',
  },
]

export const values: ValueItem[] = [
  {
    id: 'craftsmanship',
    title: 'Craftsmanship',
    description: 'Every cut, color, and finish is treated as a considered piece of work, never rushed.',
  },
  {
    id: 'care',
    title: 'Client Care',
    description: 'We listen first. Your comfort and your vision guide every appointment from start to finish.',
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description: 'We favor low-waste, cruelty-free product lines and recycle color and foil materials where we can.',
  },
  {
    id: 'inclusivity',
    title: 'Inclusivity',
    description: 'Every hair type, skin tone, and identity is welcomed and celebrated in our chairs.',
  },
]

export const awards: Award[] = [
  { id: 'boutique-salon', title: 'Best Boutique Salon — Regional Stylists Guild', year: '2017' },
  { id: 'bridal-team', title: 'Top Bridal Beauty Team — City Wedding Awards', year: '2021' },
  { id: 'client-choice', title: "Client's Choice Award — Salon Excellence Awards", year: '2023' },
  { id: 'sustainable-salon', title: 'Certified Sustainable Salon — Green Beauty Alliance', year: '2025' },
]
