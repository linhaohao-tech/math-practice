import { useState } from 'react'
import { useSession } from '../context/SessionContext'
import { Flashcard } from './Flashcard'
import { InfoBadge } from './ui/InfoBadge'
import { LeaveConfirm } from './ui/LeaveConfirm'
import { PlayButton } from './ui/PlayButton'
import { ProgressBar } from './ui/ProgressBar'
import { ScreenHeader } from './ui/ScreenHeader'

interface FlashcardSessionProps {
  emoji: string
  title: string
  completeTitle: string
  subtitle: string
  completeSubtitle: string
  emptyMessage: string
  progressLabel?: string
  onCompletePrimary?: () => void
  completePrimaryLabel?: string
  focused?: boolean
}

export function FlashcardSession({
  emoji,
  title,
  completeTitle,
  subtitle,
  completeSubtitle,
  emptyMessage,
  progressLabel = 'Card',
  onCompletePrimary,
  completePrimaryLabel = 'Back Home',
  focused = false,
}: FlashcardSessionProps) {
  const { state, setView, selectAnswer, selfAssess, leaveSession } = useSession()
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const { questionsDeck, currentCardIndex } = state
  const isComplete =
    questionsDeck.length > 0 && currentCardIndex >= questionsDeck.length
  const currentQuestion = questionsDeck[currentCardIndex]
  const hasDeck = questionsDeck.length > 0
  const inProgress = hasDeck && !isComplete

  const handleBackHome = () => {
    if (inProgress) {
      setShowLeaveConfirm(true)
      return
    }
    leaveSession()
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {!focused && (
        <ScreenHeader
          emoji={emoji}
          title={isComplete ? completeTitle : title}
          subtitle={isComplete ? completeSubtitle : subtitle}
        />
      )}

      {focused && !isComplete && (
        <div className="w-full">
          <h1 className="font-display text-3xl font-bold text-slate-800">{title}</h1>
          {inProgress && (
            <div className="mt-4">
              <ProgressBar
                current={currentCardIndex + 1}
                total={questionsDeck.length}
                label={progressLabel}
              />
            </div>
          )}
        </div>
      )}

      {focused && isComplete && (
        <ScreenHeader
          emoji="🌟"
          title={completeTitle}
          subtitle={completeSubtitle}
        />
      )}

      {showLeaveConfirm && (
        <LeaveConfirm
          onStay={() => setShowLeaveConfirm(false)}
          onLeave={() => {
            setShowLeaveConfirm(false)
            leaveSession()
          }}
        />
      )}

      {isComplete ? (
        <div className="flex w-full flex-col items-center gap-5">
          {!focused && <div className="animate-wiggle text-7xl">🌟</div>}
          <InfoBadge tone="mint">
            You completed all {questionsDeck.length} flashcards!
          </InfoBadge>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <PlayButton
              variant="primary"
              size="lg"
              onClick={onCompletePrimary ?? leaveSession}
            >
              <span aria-hidden="true">🎮</span>
              {completePrimaryLabel}
            </PlayButton>
            <PlayButton variant="grape" size="lg" onClick={() => setView('STATS')}>
              <span aria-hidden="true">🏆</span>
              See My Stats
            </PlayButton>
          </div>
        </div>
      ) : currentQuestion ? (
        <Flashcard
          question={currentQuestion}
          onSelectAnswer={selectAnswer}
          onSelfAssessCorrect={() => selfAssess('correct')}
          onSelfAssessWrong={() => selfAssess('incorrect')}
        />
      ) : (
        <div className="flex flex-col items-center gap-5">
          <InfoBadge tone="coral">{emptyMessage}</InfoBadge>
          <PlayButton variant="ghost" onClick={leaveSession}>
            <span aria-hidden="true">🏠</span>
            Back Home
          </PlayButton>
        </div>
      )}

      {inProgress && !showLeaveConfirm && (
        <PlayButton variant="ghost" onClick={handleBackHome}>
          <span aria-hidden="true">🏠</span>
          Back Home
        </PlayButton>
      )}
    </div>
  )
}
