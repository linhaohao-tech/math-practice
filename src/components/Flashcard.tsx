import { useEffect, useState } from 'react'
import type { MathQuestion } from '../types'
import { PlayButton } from './ui/PlayButton'

interface FlashcardProps {
  question: MathQuestion
  onSelectAnswer: (answer: number) => void
  onSelfAssessCorrect: () => void
  onSelfAssessWrong: () => void
}

export function Flashcard({
  question,
  onSelectAnswer,
  onSelfAssessCorrect,
  onSelfAssessWrong,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const isLocked = question.userSelectedAnswer !== null
  const wasCorrect = question.userSelectedAnswer === question.correctAnswer

  useEffect(() => {
    setIsFlipped(false)
  }, [question.id])

  const handleChoiceClick = (choice: number) => {
    if (isLocked) return
    onSelectAnswer(choice)
    setIsFlipped(true)
  }

  const handleSelfAssess = (callback: () => void) => {
    setIsFlipped(false)
    window.setTimeout(callback, 600)
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flashcard-scene w-full">
        <div className={`flashcard-inner playful-shadow-sm ${isFlipped ? 'flashcard-flipped' : ''}`}>
          <div className="flashcard-face flashcard-front">
            <p className="font-display text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
              {question.formattedString}
            </p>
            <div className="mt-8 grid w-full grid-cols-2 gap-3">
              {question.choices.map((choice, index) => {
                const isSelected = question.userSelectedAnswer === choice
                return (
                  <button
                    key={`${choice}-${index}`}
                    type="button"
                    disabled={isLocked && !isSelected}
                    onClick={() => handleChoiceClick(choice)}
                    className={`btn-press rounded-2xl border-2 py-4 font-display text-2xl font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sky-bright ${
                      isSelected
                        ? 'border-sky-deep bg-sky-bright/30 text-sky-deep ring-4 ring-sky-bright/40'
                        : isLocked
                          ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
                          : 'border-sky-100 bg-white text-sky-deep hover:border-sky-bright hover:bg-sky-50'
                    }`}
                  >
                    {choice}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flashcard-face flashcard-back">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
              The answer is
            </p>
            <p className="mt-2 font-display text-6xl font-bold text-slate-800">
              {question.correctAnswer}
            </p>

            <div
              className={`mt-6 rounded-2xl border-2 px-5 py-3 text-base font-bold transition-colors duration-300 sm:text-lg ${
                wasCorrect
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-rose-200 bg-rose-50 text-rose-800'
              }`}
            >
              {wasCorrect ? (
                <span>🎉 Awesome! {question.userSelectedAnswer} is correct!</span>
              ) : (
                <span>
                  💪 Nice try! The answer is {question.correctAnswer} — you&apos;re
                  learning!
                </span>
              )}
            </div>

            <p className="mt-6 max-w-xs text-base font-semibold text-slate-600">
              How did you do on this one?
            </p>

            <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row">
              <PlayButton
                variant="success"
                size="lg"
                className="flex-1"
                onClick={() => handleSelfAssess(onSelfAssessCorrect)}
              >
                <span aria-hidden="true">✅</span>
                I Got It Right
              </PlayButton>
              <PlayButton
                variant="coral"
                size="lg"
                className="flex-1"
                onClick={() => handleSelfAssess(onSelfAssessWrong)}
              >
                <span aria-hidden="true">🌱</span>
                I Got It Wrong
              </PlayButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
