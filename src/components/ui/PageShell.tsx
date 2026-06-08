import type { ReactNode } from 'react'
import { DecorativeBackground } from './DecorativeBackground'

interface PageShellProps {
  children: ReactNode
  accent?: 'sky' | 'mint' | 'coral' | 'grape' | 'sunny'
}

const accentBorders: Record<NonNullable<PageShellProps['accent']>, string> = {
  sky: 'border-sky-bright/40',
  mint: 'border-mint/40',
  coral: 'border-coral/40',
  grape: 'border-grape/40',
  sunny: 'border-sunny/50',
}

export function PageShell({ children, accent = 'sky' }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-lavender to-cream">
      <DecorativeBackground />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-2xl items-center justify-center px-5 py-10 sm:px-8">
        <div
          className={`animate-pop-in w-full rounded-[2rem] border-4 bg-white/90 p-7 backdrop-blur-sm sm:p-10 ${accentBorders[accent]} playful-shadow`}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
