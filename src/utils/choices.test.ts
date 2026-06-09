import { describe, expect, it } from 'vitest'
import { buildChoices } from './choices'

describe('buildChoices', () => {
  it('returns 4 unique choices including the correct answer', () => {
    for (let i = 0; i < 30; i++) {
      const correctAnswer = 12
      const choices = buildChoices(correctAnswer)

      expect(choices).toHaveLength(4)
      expect(new Set(choices).size).toBe(4)
      expect(choices).toContain(correctAnswer)
    }
  })

  it('never includes negative distractors', () => {
    const choices = buildChoices(2)
    expect(choices.every((c) => c >= 0)).toBe(true)
  })
})
