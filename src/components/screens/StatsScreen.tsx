import { useSession } from '../../context/SessionContext'
import { InfoBadge } from '../ui/InfoBadge'
import { PlayButton } from '../ui/PlayButton'
import { ScreenHeader } from '../ui/ScreenHeader'

export function StatsScreen() {
  const { state, setView } = useSession()
  const { stats } = state

  const statCards = [
    {
      label: 'Cards Played',
      value: stats.totalAttempted,
      emoji: '🎯',
      color: 'from-sky-50 to-white border-sky-200 text-sky-deep',
    },
    {
      label: 'Got It Right',
      value: stats.totalCorrect,
      emoji: '✅',
      color: 'from-emerald-50 to-white border-emerald-200 text-mint-deep',
    },
    {
      label: 'Still Learning',
      value: stats.totalIncorrect,
      emoji: '🌱',
      color: 'from-rose-50 to-white border-rose-200 text-coral-deep',
    },
  ]

  return (
    <div className="flex flex-col items-center gap-7 text-center">
      <ScreenHeader
        emoji="🏆"
        title="Your Scoreboard"
        subtitle="See how much you've learned this session — every try makes you stronger!"
      />

      <div className="grid w-full gap-4 sm:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 bg-gradient-to-b p-5 playful-shadow-sm ${card.color}`}
          >
            <span className="text-3xl">{card.emoji}</span>
            <span className="font-display text-4xl font-bold">{card.value}</span>
            <span className="text-sm font-bold uppercase tracking-wide opacity-80">
              {card.label}
            </span>
          </div>
        ))}
      </div>

      <InfoBadge tone="grape">
        📊 Soon you'll see scores for +, −, ×, and ÷ all in one place!
      </InfoBadge>

      <PlayButton variant="ghost" onClick={() => setView('SETUP')}>
        <span aria-hidden="true">🏠</span>
        Back Home
      </PlayButton>
    </div>
  )
}
