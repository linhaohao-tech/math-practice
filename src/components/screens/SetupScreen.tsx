import { useSession } from '../../context/SessionContext'
import { InfoBadge } from '../ui/InfoBadge'
import { PlayButton } from '../ui/PlayButton'
import { ScreenHeader } from '../ui/ScreenHeader'

const operationPreviews = [
  { symbol: '+', label: 'Add', color: 'from-sky-bright/30 to-sky-deep/20 text-sky-deep' },
  { symbol: '−', label: 'Subtract', color: 'from-coral/30 to-coral-deep/20 text-coral-deep' },
  { symbol: '×', label: 'Multiply', color: 'from-grape/30 to-grape-deep/20 text-grape-deep' },
  { symbol: '÷', label: 'Divide', color: 'from-mint/30 to-mint-deep/20 text-mint-deep' },
]

export function SetupScreen() {
  const { setView } = useSession()

  return (
    <div className="flex flex-col items-center gap-7 text-center">
      <ScreenHeader
        emoji="🧮"
        title="Math Adventure!"
        subtitle="Pick your math superpowers and jump into fun flashcard practice!"
      />

      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {operationPreviews.map((op) => (
          <div
            key={op.symbol}
            className={`flex flex-col items-center gap-1 rounded-2xl border-2 border-white bg-gradient-to-b ${op.color} px-3 py-4 playful-shadow-sm`}
          >
            <span className="font-display text-4xl font-bold">{op.symbol}</span>
            <span className="text-sm font-bold uppercase tracking-wide opacity-80">
              {op.label}
            </span>
          </div>
        ))}
      </div>

      <InfoBadge tone="sunny">
        🚀 Coming soon: pick operations & how many cards you want to play!
      </InfoBadge>

      <nav className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <PlayButton variant="primary" size="lg" onClick={() => setView('PRACTICE')}>
          <span aria-hidden="true">🎮</span>
          Start Practicing
        </PlayButton>
        <PlayButton variant="coral" size="lg" onClick={() => setView('REVIEW')}>
          <span aria-hidden="true">🔁</span>
          Review Mistakes
        </PlayButton>
        <PlayButton variant="grape" size="lg" onClick={() => setView('STATS')}>
          <span aria-hidden="true">🏆</span>
          My Stats
        </PlayButton>
      </nav>
    </div>
  )
}
