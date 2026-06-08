import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import {
  INITIAL_SESSION_STATE,
  type Operation,
  type SessionState,
  type View,
} from '../types'
import { buildDeck } from '../utils'

type SessionAction =
  | { type: 'SET_VIEW'; payload: View }
  | { type: 'RESET_SESSION' }
  | { type: 'SET_SESSION_LENGTH'; payload: number }
  | { type: 'SET_QUESTIONS_DECK'; payload: SessionState['questionsDeck'] }
  | { type: 'TOGGLE_OPERATION'; payload: Operation }
  | { type: 'START_PRACTICE' }
  | { type: 'SELECT_ANSWER'; payload: number }
  | { type: 'ADVANCE_CARD' }

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload }
    case 'RESET_SESSION':
      return {
        ...INITIAL_SESSION_STATE,
        selectedOperations: state.selectedOperations,
        sessionLength: state.sessionLength,
        wrongQuestionsQueue: state.wrongQuestionsQueue,
        stats: state.stats,
      }
    case 'SET_SESSION_LENGTH':
      return { ...state, sessionLength: action.payload }
    case 'SET_QUESTIONS_DECK':
      return {
        ...state,
        questionsDeck: action.payload,
        currentCardIndex: 0,
      }
    case 'TOGGLE_OPERATION': {
      const isSelected = state.selectedOperations.includes(action.payload)
      const selectedOperations = isSelected
        ? state.selectedOperations.filter((op) => op !== action.payload)
        : [...state.selectedOperations, action.payload]
      return { ...state, selectedOperations }
    }
    case 'START_PRACTICE': {
      if (state.selectedOperations.length === 0) return state
      return {
        ...state,
        questionsDeck: buildDeck(state.selectedOperations, state.sessionLength),
        currentCardIndex: 0,
        currentView: 'PRACTICE',
      }
    }
    case 'SELECT_ANSWER': {
      const index = state.currentCardIndex
      const card = state.questionsDeck[index]
      if (!card || card.userSelectedAnswer !== null) return state

      const questionsDeck = state.questionsDeck.map((question, i) =>
        i === index ? { ...question, userSelectedAnswer: action.payload } : question,
      )
      return { ...state, questionsDeck }
    }
    case 'ADVANCE_CARD':
      return {
        ...state,
        currentCardIndex: state.currentCardIndex + 1,
      }
    default:
      return state
  }
}

interface SessionContextValue {
  state: SessionState
  dispatch: Dispatch<SessionAction>
  setView: (view: View) => void
  resetSession: () => void
  toggleOperation: (operation: Operation) => void
  setSessionLength: (length: number) => void
  startPractice: () => boolean
  selectAnswer: (answer: number) => void
  advanceCard: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, INITIAL_SESSION_STATE)

  const setView = (view: View) => dispatch({ type: 'SET_VIEW', payload: view })
  const resetSession = () => dispatch({ type: 'RESET_SESSION' })
  const toggleOperation = (operation: Operation) =>
    dispatch({ type: 'TOGGLE_OPERATION', payload: operation })
  const setSessionLength = (length: number) =>
    dispatch({ type: 'SET_SESSION_LENGTH', payload: length })
  const startPractice = () => {
    if (state.selectedOperations.length === 0) return false
    dispatch({ type: 'START_PRACTICE' })
    return true
  }
  const selectAnswer = (answer: number) =>
    dispatch({ type: 'SELECT_ANSWER', payload: answer })
  const advanceCard = () => dispatch({ type: 'ADVANCE_CARD' })

  return (
    <SessionContext.Provider
      value={{
        state,
        dispatch,
        setView,
        resetSession,
        toggleOperation,
        setSessionLength,
        startPractice,
        selectAnswer,
        advanceCard,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
