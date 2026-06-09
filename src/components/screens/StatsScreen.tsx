import { useSession } from '../../context/SessionContext'
import type { Operation } from '../../types'
import { accuracyPercent } from '../../utils/stats'
import { InfoBadge } from '../ui/InfoBadge'
import { PlayButton } from '../ui/PlayButton'
import { ScreenHeader } from '../ui/ScreenHeader'

const OPERATION_DISPLAY: {
  operation: Operation
  symbol: string
  label: string
  color: string
  barColor: string
}[] = [
  {
    operation: 'addition',
    symbol: '+',
    label: 'Addition',
    color: 'border-sky-200 bg-sky-50 text-sky-deep',
    barColor: 'bg-sky-bright',
  },
  {
    operation: 'subtraction',
    symbol: '−',
    label: 'Subtraction',
    color: 'border-rose-200 bg-rose-50 text-coral-deep',
    barColor: 'bg-coral',
  },
  {
    operation: 'multiplication',
    symbol: '×',
    label: 'Multiplication',
    color: 'border-violet-200 bg-violet-50 text-grape-deep',
    barColor: 'bg-grape',
  },
  {
    operation: 'division',
    symbol: '÷',
    label: 'Division',
    color: 'border-emerald-200 bg-emerald-50 text-mint-deep',
    barColor: 'bg-mint',
  },
]

export function StatsScreen() {
  const { state, setView } = useSession()
  const { stats } = state
  const hasAttempts = stats.totalAttempted > 0
  const accuracy = accuracyPercent(stats.totalCorrect, stats.totalAttempted)

  return (
    <div className="flex flex-col items-center gap-7 text-center">
      <ScreenHeader
        emoji="🏆"
        title="Session Report"
        subtitle="A clear snapshot of this practice session — stats reset when you reload the page."
      />

      <p className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-left text-sm font-semibold text-slate-600">
        <span className="font-bold text-slate-800">For parents & teachers:</span>{' '}
        Review accuracy by operation below to spot which skills need more practice.
      </p>

      {!hasAttempts ? (
        <InfoBadge tone="sunny">
          🎮 No stats yet — play a round and your scores will show up here!
        </InfoBadge>
      ) : (
        <>
          <section className="w-full text-left">
            <h2 className="mb-1 font-display text-xl font-bold text-slate-800">
              Total Attempted
            </h2>
            <p className="mb-3 text-sm font-medium text-slate-500">
              Number of flashcards the learner self-assessed
            </p>
            <div className="rounded-2xl border-2 border-sky-200 bg-gradient-to-b from-sky-50 to-white p-6 playful-shadow-sm">
              <span className="text-4xl">🎯</span>
              <p className="mt-2 font-display text-5xl font-bold text-slate-800">
                {stats.totalAttempted}
              </p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-slate-500">
                cards answered
              </p>
            </div>
          </section>

          <section className="w-full text-left">
            <h2 className="mb-1 font-display text-xl font-bold text-slate-800">
              Accuracy Ratio
            </h2>
            <p className="mb-3 text-sm font-medium text-slate-500">
              Correct answers compared to questions still being learned
            </p>
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 playful-shadow-sm">
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="font-display text-4xl font-bold text-mint-deep">
                  {accuracy}%
                </span>
                <span className="text-lg font-semibold text-slate-500">session accuracy</span>
              </div>

              <div className="flex h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-mint transition-all duration-500"
                  style={{ width: `${accuracy}%` }}
                  title={`${stats.totalCorrect} correct`}
                />
                <div
                  className="bg-coral/70 transition-all duration-500"
                  style={{ width: `${100 - accuracy}%` }}
                  title={`${stats.totalIncorrect} still learning`}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
                  <p className="text-2xl">✅</p>
                  <p className="font-display text-3xl font-bold text-emerald-800">
                    {stats.totalCorrect}
                  </p>
                  <p className="text-sm font-bold text-emerald-700">Correct</p>
                </div>
                <div className="rounded-xl border-2 border-rose-200 bg-rose-50 px-4 py-3 text-center">
                  <p className="text-2xl">🌱</p>
                  <p className="font-display text-3xl font-bold text-rose-800">
                    {stats.totalIncorrect}
                  </p>
                  <p className="text-sm font-bold text-rose-700">Still Learning</p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full text-left">
            <h2 className="mb-1 font-display text-xl font-bold text-slate-800">
              Operational Performance
            </h2>
            <p className="mb-3 text-sm font-medium text-slate-500">
              Accuracy broken down by math operation
            </p>
            <div className="grid w-full gap-3">
              {OPERATION_DISPLAY.map((op) => {
                const opStats = stats.byOperation[op.operation]
                const opAccuracy = accuracyPercent(opStats.correct, opStats.total)

                return (
                  <div
                    key={op.operation}
                    className={`rounded-2xl border-2 p-4 playful-shadow-sm ${op.color}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/70 font-display text-2xl font-bold">
                          {op.symbol}
                        </span>
                        <div>
                          <p className="font-display text-lg font-bold">{op.label}</p>
                          <p className="text-sm font-semibold opacity-80">
                            {opStats.total === 0
                              ? 'Not practiced yet'
                              : `${opStats.correct} correct out of ${opStats.total} attempts`}
                          </p>
                        </div>
                      </div>
                      <p className="shrink-0 font-display text-3xl font-bold">
                        {opStats.total === 0 ? '—' : `${opAccuracy}%`}
                      </p>
                    </div>

                    {opStats.total > 0 && (
                      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/60">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${op.barColor}`}
                          style={{ width: `${opAccuracy}%` }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        </>
      )}

      <p className="text-xs font-medium text-slate-400">
        Stats are saved only for this browser session and clear on reload.
      </p>

      <PlayButton variant="ghost" onClick={() => setView('SETUP')}>
        <span aria-hidden="true">🏠</span>
        Back Home
      </PlayButton>
    </div>
  )
}
