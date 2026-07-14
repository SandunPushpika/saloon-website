export type GalleryCategory = 'Interior' | 'Hair' | 'Makeup' | 'Bridal' | 'Nails'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: GalleryCategory
}
