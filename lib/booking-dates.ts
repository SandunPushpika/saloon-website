export interface BookableDay {
  iso: string
  label: string
  dayNumber: string
}

export function getUpcomingDays(count: number, from: Date = new Date()): BookableDay[] {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(from)
    date.setDate(date.getDate() + i + 1)
    return {
      iso: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    }
  })
}

export const TIME_SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM']
