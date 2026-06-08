import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import {
  INITIAL_SESSION_STATE,
  type SessionState,
  type View,
} from '../types'

type SessionAction =
  | { type: 'SET_VIEW'; payload: View }
  | { type: 'RESET_SESSION' }
  | { type: 'SET_SESSION_LENGTH'; payload: number }
  | { type: 'SET_QUESTIONS_DECK'; payload: SessionState['questionsDeck'] }

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload }
    case 'RESET_SESSION':
      return {
        ...INITIAL_SESSION_STATE,
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
    default:
      return state
  }
}

interface SessionContextValue {
  state: SessionState
  dispatch: Dispatch<SessionAction>
  setView: (view: View) => void
  resetSession: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, INITIAL_SESSION_STATE)

  const setView = (view: View) => dispatch({ type: 'SET_VIEW', payload: view })
  const resetSession = () => dispatch({ type: 'RESET_SESSION' })

  return (
    <SessionContext.Provider value={{ state, dispatch, setView, resetSession }}>
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
