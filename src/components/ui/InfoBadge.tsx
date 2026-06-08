import type { ReactNode } from 'react'

type InfoBadgeTone = 'sky' | 'mint' | 'coral' | 'grape' | 'sunny'

interface InfoBadgeProps {
  children: ReactNode
  tone?: InfoBadgeTone
}

const toneStyles: Record<InfoBadgeTone, string> = {
  sky: 'bg-sky-50 text-sky-800 border-sky-200',
  mint: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  coral: 'bg-rose-50 text-rose-800 border-rose-200',
  grape: 'bg-violet-50 text-violet-800 border-violet-200',
  sunny: 'bg-amber-50 text-amber-800 border-amber-200',
}

export function InfoBadge({ children, tone = 'sky' }: InfoBadgeProps) {
  return (
    <p
      className={`rounded-2xl border-2 px-5 py-3 text-base font-semibold ${toneStyles[tone]}`}
    >
      {children}
    </p>
  )
}
