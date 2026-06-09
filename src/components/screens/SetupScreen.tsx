import { useState } from 'react'
import { useSession } from '../../context/SessionContext'
import type { Operation } from '../../types'
import { InfoBadge } from '../ui/InfoBadge'
import { PlayButton } from '../ui/PlayButton'
import { ScreenHeader } from '../ui/ScreenHeader'

const SESSION_LENGTHS = [10, 20, 50] as const

const OPERATION_OPTIONS: {
  operation: Operation
  symbol: string
  label: string
  activeColor: string
  idleColor: string
}[] = [
  {
    operation: 'addition',
    symbol: '+',
    label: 'Add',
    activeColor: 'border-sky-deep bg-gradient-to-b from-sky-bright/40 to-sky-deep/25 ring-4 ring-sky-bright/40',
    idleColor: 'border-sky-100 bg-gradient-to-b from-sky-bright/20 to-sky-deep/10 hover:border-sky-bright/50',
  },
  {
    operation: 'subtraction',
    symbol: '−',
    label: 'Subtract',
    activeColor: 'border-coral-deep bg-gradient-to-b from-coral/40 to-coral-deep/25 ring-4 ring-coral/40',
    idleColor: 'border-rose-100 bg-gradient-to-b from-coral/20 to-coral-deep/10 hover:border-coral/50',
  },
  {
    operation: 'multiplication',
    symbol: '×',
    label: 'Multiply',
    activeColor: 'border-grape-deep bg-gradient-to-b from-grape/40 to-grape-deep/25 ring-4 ring-grape/40',
    idleColor: 'border-violet-100 bg-gradient-to-b from-grape/20 to-grape-deep/10 hover:border-grape/50',
  },
  {
    operation: 'division',
    symbol: '÷',
    label: 'Divide',
    activeColor: 'border-mint-deep bg-gradient-to-b from-mint/40 to-mint-deep/25 ring-4 ring-mint/40',
    idleColor: 'border-emerald-100 bg-gradient-to-b from-mint/20 to-mint-deep/10 hover:border-mint/50',
  },
]

export function SetupScreen() {
  const { state, setView, toggleOperation, setSessionLength, startPractice, startReview } =
    useSession()
  const [showValidationError, setShowValidationError] = useState(false)

  const hasMistakes = state.wrongQuestionsQueue.length > 0
  const hasSessionActivity = state.stats.totalAttempted > 0

  const handleStartPractice = () => {
    const started = startPractice()
    if (!started) {
      setShowValidationError(true)
      return
    }
    setShowValidationError(false)
  }

  const handleToggleOperation = (operation: Operation) => {
    toggleOperation(operation)
    if (showValidationError) setShowValidationError(false)
  }

  return (
    <div className="flex flex-col items-center gap-7 text-center">
      <ScreenHeader
        emoji="🧮"
        title="Math Adventure!"
        subtitle="Pick your math superpowers and jump into fun flashcard practice!"
      />

      {hasSessionActivity && (
        <InfoBadge tone="sky">
          📊 This session: {state.stats.totalAttempted} cards played
          {hasMistakes && ` · ${state.wrongQuestionsQueue.length} to review`}
        </InfoBadge>
      )}

      <section className="w-full">
        <h2 className="mb-3 font-display text-lg font-bold text-slate-700">
          Choose Operations
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {OPERATION_OPTIONS.map((op) => {
            const isActive = state.selectedOperations.includes(op.operation)
            return (
              <button
                key={op.operation}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleToggleOperation(op.operation)}
                className={`btn-press flex flex-col items-center gap-1 rounded-2xl border-2 px-3 py-4 transition-all duration-200 playful-shadow-sm ${
                  isActive ? op.activeColor : op.idleColor
                }`}
              >
                <span className="font-display text-4xl font-bold text-slate-800">
                  {op.symbol}
                </span>
                <span className="text-sm font-bold uppercase tracking-wide text-slate-600">
                  {op.label}
                </span>
                {isActive && (
                  <span className="text-xs font-bold text-slate-500">✓ Selected</span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <section className="w-full">
        <h2 className="mb-3 font-display text-lg font-bold text-slate-700">
          How Many Cards?
        </h2>
        <div className="flex justify-center gap-3">
          {SESSION_LENGTHS.map((length) => {
            const isActive = state.sessionLength === length
            return (
              <button
                key={length}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSessionLength(length)}
                className={`btn-press min-w-[4.5rem] rounded-2xl border-2 px-5 py-3 font-display text-xl font-bold transition-all duration-200 ${
                  isActive
                    ? 'border-sunny-deep bg-gradient-to-b from-sunny to-sunny-deep/80 text-amber-900 ring-4 ring-sunny/50 playful-shadow-sm'
                    : 'border-amber-100 bg-white text-slate-600 hover:border-sunny/60'
                }`}
              >
                {length}
              </button>
            )
          })}
        </div>
      </section>

      {showValidationError && (
        <InfoBadge tone="coral">
          ⚠️ Pick at least one operation before you start!
        </InfoBadge>
      )}

      <nav className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <PlayButton variant="primary" size="lg" onClick={handleStartPractice}>
          <span aria-hidden="true">🎮</span>
          Start Practicing
        </PlayButton>
        <PlayButton
          variant="coral"
          size="lg"
          disabled={!hasMistakes}
          onClick={() => startReview()}
        >
          <span aria-hidden="true">🔁</span>
          Review Mistakes
          {hasMistakes && (
            <span className="rounded-full bg-white/30 px-2 py-0.5 text-sm">
              {state.wrongQuestionsQueue.length}
            </span>
          )}
        </PlayButton>
        <PlayButton variant="grape" size="lg" onClick={() => setView('STATS')}>
          <span aria-hidden="true">🏆</span>
          My Stats
        </PlayButton>
      </nav>

      {!hasMistakes && (
        <p className="text-sm font-semibold text-slate-500">
          Review Mistakes unlocks after you practice and mark questions wrong.
        </p>
      )}
    </div>
  )
}
