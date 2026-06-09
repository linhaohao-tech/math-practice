import { useSession } from '../../context/SessionContext'
import { FlashcardSession } from '../FlashcardSession'

export function PracticeScreen() {
  const { leaveSession } = useSession()

  return (
    <FlashcardSession
      focused
      emoji="🃏"
      title="Practice Time!"
      completeTitle="Great Job!"
      subtitle="Pick your answer, flip the card, and tell us how you did!"
      completeSubtitle="You finished every card in this session — you are a math star!"
      emptyMessage="No cards in your deck — head back and start a practice session!"
      progressLabel="Progress"
      completePrimaryLabel="Play Again"
      onCompletePrimary={leaveSession}
    />
  )
}
