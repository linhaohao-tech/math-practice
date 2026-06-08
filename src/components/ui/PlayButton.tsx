import type { ReactNode } from 'react'

type PlayButtonVariant = 'primary' | 'success' | 'coral' | 'grape' | 'sunny' | 'ghost'

interface PlayButtonProps {
  children: ReactNode
  onClick: () => void
  variant?: PlayButtonVariant
  size?: 'md' | 'lg'
  disabled?: boolean
  className?: string
}

const variantStyles: Record<PlayButtonVariant, string> = {
  primary:
    'bg-gradient-to-b from-sky-bright to-sky-deep text-white border-sky-deep/30 hover:brightness-105',
  success:
    'bg-gradient-to-b from-mint to-mint-deep text-white border-mint-deep/30 hover:brightness-105',
  coral:
    'bg-gradient-to-b from-coral to-coral-deep text-white border-coral-deep/30 hover:brightness-105',
  grape:
    'bg-gradient-to-b from-grape to-grape-deep text-white border-grape-deep/30 hover:brightness-105',
  sunny:
    'bg-gradient-to-b from-sunny to-sunny-deep text-amber-900 border-sunny-deep/30 hover:brightness-105',
  ghost:
    'bg-white text-slate-700 border-slate-200 hover:bg-slate-50',
}

const sizeStyles = {
  md: 'px-5 py-3 text-base',
  lg: 'px-7 py-4 text-lg',
}

export function PlayButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: PlayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`btn-press playful-shadow-sm inline-flex items-center justify-center gap-2 rounded-2xl border-2 font-display font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  )
}
