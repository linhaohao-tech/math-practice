import type { ReactNode } from 'react'
import { DecorativeBackground } from './DecorativeBackground'

interface PageShellProps {
  children: ReactNode
  accent?: 'sky' | 'mint' | 'coral' | 'grape' | 'sunny'
  focused?: boolean
}

const accentBorders: Record<NonNullable<PageShellProps['accent']>, string> = {
  sky: 'border-sky-bright/40',
  mint: 'border-mint/40',
  coral: 'border-coral/40',
  grape: 'border-grape/40',
  sunny: 'border-sunny/50',
}

export function PageShell({ children, accent = 'sky', focused = false }: PageShellProps) {
  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        focused
          ? 'bg-gradient-to-b from-slate-50 to-white'
          : 'bg-gradient-to-br from-sky-100 via-lavender to-cream'
      }`}
    >
      {!focused && <DecorativeBackground />}
      <main className="relative z-10 mx-auto flex min-h-screen max-w-2xl items-center justify-center px-5 py-10 sm:px-8">
        <div
          className={`screen-enter w-full rounded-[2rem] border-4 bg-white/95 p-7 backdrop-blur-sm sm:p-10 ${
            focused ? 'border-slate-200 playful-shadow-sm' : accentBorders[accent]
          } ${focused ? '' : 'playful-shadow'}`}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
