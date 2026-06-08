import { useSession } from '../../context/SessionContext'
import { InfoBadge } from '../ui/InfoBadge'
import { PlayButton } from '../ui/PlayButton'
import { ScreenHeader } from '../ui/ScreenHeader'

export function ReviewScreen() {
  const { state, setView } = useSession()
  const mistakeCount = state.wrongQuestionsQueue.length
  const hasMistakes = mistakeCount > 0

  return (
    <div className="flex flex-col items-center gap-7 text-center">
      <ScreenHeader
        emoji="💪"
        title="Try Again Zone"
        subtitle="No worries — every superstar learns from tricky questions!"
      />

      <div
        className={`flex w-full max-w-sm flex-col items-center gap-2 rounded-3xl border-4 p-8 playful-shadow-sm ${
          hasMistakes
            ? 'border-coral/40 bg-gradient-to-b from-rose-50 to-white'
            : 'border-mint/40 bg-gradient-to-b from-emerald-50 to-white'
        }`}
      >
        <span className="text-6xl">{hasMistakes ? '📝' : '🌟'}</span>
        <p className="font-display text-5xl font-bold text-slate-800">
          {mistakeCount}
        </p>
        <p className="text-lg font-bold text-slate-600">
          {hasMistakes
            ? `question${mistakeCount === 1 ? '' : 's'} to practice again`
            : 'No mistakes yet — keep it up!'}
        </p>
      </div>

      <InfoBadge tone={hasMistakes ? 'coral' : 'mint'}>
        {hasMistakes
          ? '🔁 Review mode will let you practice just these questions!'
          : '🎉 You are doing amazing — play more to build your streak!'}
      </InfoBadge>

      <PlayButton variant="ghost" onClick={() => setView('SETUP')}>
        <span aria-hidden="true">🏠</span>
        Back Home
      </PlayButton>
    </div>
  )
}
