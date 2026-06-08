export function DecorativeBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -left-16 top-16 h-40 w-40 rounded-full bg-sunny/30 blur-2xl" />
      <div className="absolute -right-10 top-32 h-52 w-52 rounded-full bg-sky-bright/25 blur-3xl" />
      <div className="absolute bottom-20 left-1/4 h-48 w-48 rounded-full bg-grape/20 blur-3xl" />
      <div className="absolute -bottom-10 right-1/4 h-44 w-44 rounded-full bg-mint/25 blur-2xl" />

      <span className="animate-float absolute left-[8%] top-[18%] text-4xl opacity-70">
        ⭐
      </span>
      <span className="animate-float-slow absolute right-[12%] top-[22%] text-3xl opacity-60">
        ✨
      </span>
      <span className="animate-wiggle absolute bottom-[28%] left-[14%] text-3xl opacity-50">
        🔢
      </span>
      <span className="animate-float absolute bottom-[18%] right-[10%] text-4xl opacity-60">
        🎯
      </span>
      <span className="animate-float-slow absolute left-[42%] top-[8%] text-2xl opacity-40">
        ➕
      </span>
      <span className="animate-wiggle absolute right-[38%] bottom-[10%] text-2xl opacity-40">
        🌈
      </span>
    </div>
  )
}
