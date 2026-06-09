import { useSession } from '../../context/SessionContext'
import { FlashcardSession } from '../FlashcardSession'
import { InfoBadge } from '../ui/InfoBadge'
import { PlayButton } from '../ui/PlayButton'

export function ReviewScreen() {
  const { state, leaveSession } = useSession()
  const mistakeCount = state.wrongQuestionsQueue.length

  if (mistakeCount === 0) {
    return (
      <div className="flex flex-col items-center gap-7 text-center">
        <div className="animate-wiggle text-7xl">🌟</div>
        <InfoBadge tone="mint">
          All caught up! No mistakes left to review — great work!
        </InfoBadge>
        <PlayButton variant="ghost" onClick={leaveSession}>
          <span aria-hidden="true">🏠</span>
          Back Home
        </PlayButton>
      </div>
    )
  }

  return (
    <FlashcardSession
      focused
      emoji="💪"
      title="Try Again Zone"
      completeTitle="Review Complete!"
      subtitle="Practice the questions you marked wrong — you've got this!"
      completeSubtitle="You worked through every mistake — keep shining!"
      emptyMessage="No review cards loaded — head back home and tap Review Mistakes."
      progressLabel="Review progress"
      completePrimaryLabel="Back Home"
      onCompletePrimary={leaveSession}
    />
  )
}
