import { useSession } from '../../context/SessionContext'
import { InfoBadge } from '../ui/InfoBadge'
import { PlayButton } from '../ui/PlayButton'
import { ScreenHeader } from '../ui/ScreenHeader'

export function PracticeScreen() {
  const { setView } = useSession()

  return (
    <div className="flex flex-col items-center gap-7 text-center">
      <ScreenHeader
        emoji="🃏"
        title="Practice Time!"
        subtitle="Flip the card, pick your answer, and see how awesome you are!"
      />

      <div className="relative w-full max-w-xs">
        <div className="playful-shadow rotate-1 rounded-3xl border-4 border-sky-bright/30 bg-gradient-to-br from-white to-sky-50 p-8">
          <p className="font-display text-5xl font-bold text-slate-800">7 + 5 = ?</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {['10', '12', '13', '11'].map((choice) => (
              <div
                key={choice}
                className="rounded-xl border-2 border-sky-100 bg-white py-3 font-display text-xl font-bold text-sky-deep"
              >
                {choice}
              </div>
            ))}
          </div>
        </div>
        <span className="absolute -right-3 -top-3 animate-wiggle text-3xl">✨</span>
      </div>

      <InfoBadge tone="sky">
        🃏 Flashcard flip magic is on the way — get ready to play!
      </InfoBadge>

      <PlayButton variant="ghost" onClick={() => setView('SETUP')}>
        <span aria-hidden="true">🏠</span>
        Back Home
      </PlayButton>
    </div>
  )
}
