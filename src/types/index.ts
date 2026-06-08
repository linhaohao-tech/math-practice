export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division'

export type View = 'SETUP' | 'PRACTICE' | 'REVIEW' | 'STATS'

export interface MathQuestion {
  id: string
  operation: Operation
  operandA: number
  operandB: number
  formattedString: string
  choices: number[]
  correctAnswer: number
  userSelectedAnswer: number | null
}

export interface OperationStats {
  correct: number
  total: number
}

export interface SessionStats {
  totalAttempted: number
  totalCorrect: number
  totalIncorrect: number
  byOperation: Record<Operation, OperationStats>
}

export interface SessionState {
  currentView: View
  sessionLength: number
  currentCardIndex: number
  questionsDeck: MathQuestion[]
  wrongQuestionsQueue: MathQuestion[]
  stats: SessionStats
}

export const INITIAL_STATS: SessionStats = {
  totalAttempted: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  byOperation: {
    addition: { correct: 0, total: 0 },
    subtraction: { correct: 0, total: 0 },
    multiplication: { correct: 0, total: 0 },
    division: { correct: 0, total: 0 },
  },
}

export const INITIAL_SESSION_STATE: SessionState = {
  currentView: 'SETUP',
  sessionLength: 10,
  currentCardIndex: 0,
  questionsDeck: [],
  wrongQuestionsQueue: [],
  stats: INITIAL_STATS,
}
