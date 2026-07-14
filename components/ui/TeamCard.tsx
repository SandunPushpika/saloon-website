import Image from 'next/image'
import type { TeamMember } from '@/types/team'

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-56 w-full max-w-[220px] overflow-hidden rounded-2xl">
        <Image src={member.image} alt={member.name} fill sizes="220px" className="object-cover" />
      </div>
      <div>
        <p className="font-display text-lg text-charcoal">{member.name}</p>
        <p className="font-sans text-sm text-rose-gold">{member.role}</p>
        <p className="font-sans text-xs text-charcoal/60">{member.specialty}</p>
      </div>
    </div>
  )
}
