import { useSession } from '../../context/SessionContext'
import { Flashcard } from '../Flashcard'
import { InfoBadge } from '../ui/InfoBadge'
import { PlayButton } from '../ui/PlayButton'
import { ScreenHeader } from '../ui/ScreenHeader'

export function PracticeScreen() {
  const { state, setView, selectAnswer, advanceCard } = useSession()
  const { questionsDeck, currentCardIndex } = state
  const isComplete =
    questionsDeck.length > 0 && currentCardIndex >= questionsDeck.length
  const currentQuestion = questionsDeck[currentCardIndex]
  const hasDeck = questionsDeck.length > 0

  return (
    <div className="flex flex-col items-center gap-7 text-center">
      <ScreenHeader
        emoji="🃏"
        title={isComplete ? 'Great Job!' : 'Practice Time!'}
        subtitle={
          isComplete
            ? 'You finished every card in this session — you are a math star!'
            : 'Pick your answer, flip the card, and tell us how you did!'
        }
      />

      {isComplete ? (
        <div className="flex w-full flex-col items-center gap-5">
          <div className="animate-wiggle text-7xl">🌟</div>
          <InfoBadge tone="mint">
            You completed all {questionsDeck.length} flashcards!
          </InfoBadge>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <PlayButton variant="primary" size="lg" onClick={() => setView('SETUP')}>
              <span aria-hidden="true">🎮</span>
              Play Again
            </PlayButton>
            <PlayButton variant="grape" size="lg" onClick={() => setView('STATS')}>
              <span aria-hidden="true">🏆</span>
              See My Stats
            </PlayButton>
          </div>
        </div>
      ) : currentQuestion ? (
        <>
          <Flashcard
            question={currentQuestion}
            onSelectAnswer={selectAnswer}
            onSelfAssess={advanceCard}
          />
          <InfoBadge tone="sky">
            Card {currentCardIndex + 1} of {questionsDeck.length}
          </InfoBadge>
        </>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <InfoBadge tone="coral">
            No cards in your deck — head back and start a practice session!
          </InfoBadge>
          <PlayButton variant="ghost" onClick={() => setView('SETUP')}>
            <span aria-hidden="true">🏠</span>
            Back Home
          </PlayButton>
        </div>
      )}

      {hasDeck && !isComplete && (
        <PlayButton variant="ghost" onClick={() => setView('SETUP')}>
          <span aria-hidden="true">🏠</span>
          Back Home
        </PlayButton>
      )}
    </div>
  )
}
