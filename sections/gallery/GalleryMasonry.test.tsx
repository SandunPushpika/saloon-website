import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GalleryMasonry } from './GalleryMasonry'
import { galleryItems } from '@/constants/gallery'

describe('GalleryMasonry', () => {
  it('renders all gallery images by default', () => {
    render(<GalleryMasonry />)
    expect(screen.getAllByRole('img')).toHaveLength(galleryItems.length)
  })

  it('filters the grid to a single category', async () => {
    render(<GalleryMasonry />)
    await userEvent.click(screen.getByRole('button', { name: 'Nails' }))
    const nailsCount = galleryItems.filter((item) => item.category === 'Nails').length
    expect(screen.getAllByRole('img')).toHaveLength(nailsCount)
  })

  it('opens the lightbox with the clicked image and navigates with the next button', async () => {
    render(<GalleryMasonry />)
    await userEvent.click(screen.getByRole('button', { name: 'Nails' }))
    const nailsItems = galleryItems.filter((item) => item.category === 'Nails')

    const galleryButtons = screen.getAllByRole('img').map((img) => img.closest('button')!)
    await userEvent.click(galleryButtons[0])

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByAltText(nailsItems[0].alt)).toBeInTheDocument()

    await userEvent.click(within(dialog).getByRole('button', { name: 'Next image' }))
    expect(within(dialog).getByAltText(nailsItems[1].alt)).toBeInTheDocument()
  })

  it('navigates with arrow keys and closes on the close button', async () => {
    render(<GalleryMasonry />)
    const galleryButtons = screen.getAllByRole('img').map((img) => img.closest('button')!)
    await userEvent.click(galleryButtons[0])

    const dialog = screen.getByRole('dialog')
    const firstAlt = within(dialog).getAllByRole('img')[0].getAttribute('alt')

    await userEvent.keyboard('{ArrowRight}')
    const secondAlt = within(dialog).getAllByRole('img')[0].getAttribute('alt')
    expect(secondAlt).not.toBe(firstAlt)

    await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
