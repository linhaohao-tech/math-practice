interface ScreenHeaderProps {
  emoji: string
  title: string
  subtitle: string
}

export function ScreenHeader({ emoji, title, subtitle }: ScreenHeaderProps) {
  return (
    <header className="mb-2 text-center">
      <div className="animate-wiggle mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sunny/30 via-sky-bright/20 to-grape/20 text-5xl">
        {emoji}
      </div>
      <h1 className="font-display text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-lg font-medium leading-relaxed text-slate-600">
        {subtitle}
      </p>
    </header>
  )
}
