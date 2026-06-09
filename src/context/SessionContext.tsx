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
import { sessionReducer, type SessionAction } from './sessionReducer'

interface SessionContextValue {
  state: SessionState
  dispatch: Dispatch<SessionAction>
  setView: (view: View) => void
  resetSession: () => void
  toggleOperation: (operation: Operation) => void
  setSessionLength: (length: number) => void
  startPractice: () => boolean
  selectAnswer: (answer: number) => void
  selfAssess: (result: 'correct' | 'incorrect') => void
  startReview: () => boolean
  leaveSession: () => void
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
  const selfAssess = (result: 'correct' | 'incorrect') =>
    dispatch({ type: 'SELF_ASSESS', payload: result })
  const startReview = () => {
    if (state.wrongQuestionsQueue.length === 0) return false
    dispatch({ type: 'START_REVIEW' })
    return true
  }
  const leaveSession = () => dispatch({ type: 'SET_VIEW', payload: 'SETUP' })

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
        selfAssess,
        startReview,
        leaveSession,
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
