import { describe, expect, it } from 'vitest'
import {
  INITIAL_SESSION_STATE,
  type MathQuestion,
  type SessionState,
} from '../types'
import { sessionReducer } from './sessionReducer'

function mockQuestion(overrides: Partial<MathQuestion> = {}): MathQuestion {
  return {
    id: 'question-1',
    operation: 'addition',
    operandA: 2,
    operandB: 3,
    formattedString: '2 + 3 = ?',
    choices: [4, 5, 6, 7],
    correctAnswer: 5,
    userSelectedAnswer: null,
    ...overrides,
  }
}

function practiceState(overrides: Partial<SessionState> = {}): SessionState {
  const card = mockQuestion()
  return {
    ...INITIAL_SESSION_STATE,
    currentView: 'PRACTICE',
    questionsDeck: [card],
    currentCardIndex: 0,
    ...overrides,
  }
}

describe('sessionReducer', () => {
  describe('START_PRACTICE', () => {
    it('builds a deck and navigates to practice', () => {
      const state = sessionReducer(INITIAL_SESSION_STATE, { type: 'START_PRACTICE' })

      expect(state.currentView).toBe('PRACTICE')
      expect(state.questionsDeck).toHaveLength(10)
      expect(state.currentCardIndex).toBe(0)
    })

    it('does nothing when no operations are selected', () => {
      const state = sessionReducer(
        { ...INITIAL_SESSION_STATE, selectedOperations: [] },
        { type: 'START_PRACTICE' },
      )

      expect(state).toEqual({
        ...INITIAL_SESSION_STATE,
        selectedOperations: [],
      })
    })
  })

  describe('SELF_ASSESS', () => {
    it('increments stats when the learner marks a correct answer', () => {
      const state = sessionReducer(practiceState(), {
        type: 'SELF_ASSESS',
        payload: 'correct',
      })

      expect(state.stats.totalAttempted).toBe(1)
      expect(state.stats.totalCorrect).toBe(1)
      expect(state.stats.totalIncorrect).toBe(0)
      expect(state.stats.byOperation.addition).toEqual({ correct: 1, total: 1 })
      expect(state.currentCardIndex).toBe(1)
    })

    it('queues mistakes during practice when marked incorrect', () => {
      const card = mockQuestion({ id: 'mistake-1' })
      const state = sessionReducer(
        practiceState({ questionsDeck: [card] }),
        { type: 'SELF_ASSESS', payload: 'incorrect' },
      )

      expect(state.stats.totalIncorrect).toBe(1)
      expect(state.wrongQuestionsQueue).toHaveLength(1)
      expect(state.wrongQuestionsQueue[0].id).toBe('mistake-1')
    })

    it('does not queue mistakes during review', () => {
      const card = mockQuestion({ id: 'review-1' })
      const state = sessionReducer(
        practiceState({
          currentView: 'REVIEW',
          wrongQuestionsQueue: [card],
          questionsDeck: [card],
        }),
        { type: 'SELF_ASSESS', payload: 'incorrect' },
      )

      expect(state.wrongQuestionsQueue).toHaveLength(1)
    })

    it('removes a mastered question from the review queue', () => {
      const card = mockQuestion({ id: 'review-1' })
      const state = sessionReducer(
        practiceState({
          currentView: 'REVIEW',
          wrongQuestionsQueue: [card],
          questionsDeck: [card],
        }),
        { type: 'SELF_ASSESS', payload: 'correct' },
      )

      expect(state.wrongQuestionsQueue).toHaveLength(0)
    })
  })

  describe('START_REVIEW', () => {
    it('loads only the mistake queue into the review deck', () => {
      const mistake = mockQuestion({
        id: 'mistake-1',
        userSelectedAnswer: 4,
      })
      const state = sessionReducer(
        {
          ...INITIAL_SESSION_STATE,
          wrongQuestionsQueue: [mistake],
        },
        { type: 'START_REVIEW' },
      )

      expect(state.currentView).toBe('REVIEW')
      expect(state.questionsDeck).toHaveLength(1)
      expect(state.questionsDeck[0].userSelectedAnswer).toBeNull()
      expect(state.currentCardIndex).toBe(0)
    })
  })

  describe('SET_VIEW', () => {
    it('clears an in-progress deck when leaving practice for setup', () => {
      const state = sessionReducer(
        practiceState({ currentCardIndex: 2 }),
        { type: 'SET_VIEW', payload: 'SETUP' },
      )

      expect(state.currentView).toBe('SETUP')
      expect(state.questionsDeck).toEqual([])
      expect(state.currentCardIndex).toBe(0)
    })

    it('keeps stats when leaving mid-session', () => {
      const afterAssess = sessionReducer(practiceState(), {
        type: 'SELF_ASSESS',
        payload: 'correct',
      })
      const state = sessionReducer(afterAssess, {
        type: 'SET_VIEW',
        payload: 'SETUP',
      })

      expect(state.stats.totalAttempted).toBe(1)
    })
  })

  describe('SELECT_ANSWER', () => {
    it('stores the selected answer on the current card', () => {
      const state = sessionReducer(practiceState(), {
        type: 'SELECT_ANSWER',
        payload: 5,
      })

      expect(state.questionsDeck[0].userSelectedAnswer).toBe(5)
    })

    it('ignores a second selection on the same card', () => {
      const once = sessionReducer(practiceState(), {
        type: 'SELECT_ANSWER',
        payload: 5,
      })
      const twice = sessionReducer(once, {
        type: 'SELECT_ANSWER',
        payload: 6,
      })

      expect(twice.questionsDeck[0].userSelectedAnswer).toBe(5)
    })
  })
})
