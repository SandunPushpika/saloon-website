import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TeamCard } from './TeamCard'
import { team } from '@/constants/team'

describe('TeamCard', () => {
  it('renders the member name, role, and specialty', () => {
    const member = team[0]
    render(<TeamCard member={member} />)
    expect(screen.getByText(member.name)).toBeInTheDocument()
    expect(screen.getByText(member.role)).toBeInTheDocument()
    expect(screen.getByText(member.specialty)).toBeInTheDocument()
  })
})
