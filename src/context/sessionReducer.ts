import {
  INITIAL_SESSION_STATE,
  type Operation,
  type SessionState,
  type View,
} from '../types'
import { buildDeck } from '../utils'

export type SessionAction =
  | { type: 'SET_VIEW'; payload: View }
  | { type: 'RESET_SESSION' }
  | { type: 'SET_SESSION_LENGTH'; payload: number }
  | { type: 'SET_QUESTIONS_DECK'; payload: SessionState['questionsDeck'] }
  | { type: 'TOGGLE_OPERATION'; payload: Operation }
  | { type: 'START_PRACTICE' }
  | { type: 'SELECT_ANSWER'; payload: number }
  | { type: 'SELF_ASSESS'; payload: 'correct' | 'incorrect' }
  | { type: 'START_REVIEW' }

export function sessionReducer(
  state: SessionState,
  action: SessionAction,
): SessionState {
  switch (action.type) {
    case 'SET_VIEW': {
      const leavingSession =
        action.payload === 'SETUP' &&
        (state.currentView === 'PRACTICE' || state.currentView === 'REVIEW')

      return {
        ...state,
        currentView: action.payload,
        ...(leavingSession ? { questionsDeck: [], currentCardIndex: 0 } : {}),
      }
    }
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
    case 'SELF_ASSESS': {
      const index = state.currentCardIndex
      const card = state.questionsDeck[index]
      if (!card) return state

      const isCorrect = action.payload === 'correct'
      const { operation } = card
      const operationStats = state.stats.byOperation[operation]

      const stats = {
        ...state.stats,
        totalAttempted: state.stats.totalAttempted + 1,
        totalCorrect: state.stats.totalCorrect + (isCorrect ? 1 : 0),
        totalIncorrect: state.stats.totalIncorrect + (isCorrect ? 0 : 1),
        byOperation: {
          ...state.stats.byOperation,
          [operation]: {
            correct: operationStats.correct + (isCorrect ? 1 : 0),
            total: operationStats.total + 1,
          },
        },
      }

      let wrongQuestionsQueue = state.wrongQuestionsQueue

      if (!isCorrect && state.currentView === 'PRACTICE') {
        wrongQuestionsQueue = [...wrongQuestionsQueue, { ...card }]
      } else if (isCorrect && state.currentView === 'REVIEW') {
        const queueIndex = wrongQuestionsQueue.findIndex((q) => q.id === card.id)
        if (queueIndex >= 0) {
          wrongQuestionsQueue = [
            ...wrongQuestionsQueue.slice(0, queueIndex),
            ...wrongQuestionsQueue.slice(queueIndex + 1),
          ]
        }
      }

      return {
        ...state,
        stats,
        wrongQuestionsQueue,
        currentCardIndex: state.currentCardIndex + 1,
      }
    }
    case 'START_REVIEW': {
      if (state.wrongQuestionsQueue.length === 0) return state

      const questionsDeck = state.wrongQuestionsQueue.map((question) => ({
        ...question,
        userSelectedAnswer: null,
      }))

      return {
        ...state,
        questionsDeck,
        currentCardIndex: 0,
        currentView: 'REVIEW',
      }
    }
    default:
      return state
  }
}
