import { describe, expect, it } from 'vitest'
import {
  generateAdditionQuestion,
  generateDivisionQuestion,
  generateMultiplicationQuestion,
  generateQuestion,
  generateSubtractionQuestion,
} from './generators'

const SAMPLE_SIZE = 50

describe('generateAdditionQuestion', () => {
  it('produces valid addition questions across many samples', () => {
    for (let i = 0; i < SAMPLE_SIZE; i++) {
      const q = generateAdditionQuestion()

      expect(q.operation).toBe('addition')
      expect(q.operandA).toBeGreaterThan(0)
      expect(q.operandB).toBeGreaterThan(0)
      expect(q.operandA + q.operandB).toBeLessThanOrEqual(100)
      expect(q.correctAnswer).toBe(q.operandA + q.operandB)
      expect(q.formattedString).toBe(`${q.operandA} + ${q.operandB} = ?`)
      expect(q.choices).toHaveLength(4)
      expect(q.choices).toContain(q.correctAnswer)
      expect(q.userSelectedAnswer).toBeNull()
    }
  })
})

describe('generateSubtractionQuestion', () => {
  it('produces non-negative results with operandA <= 100', () => {
    for (let i = 0; i < SAMPLE_SIZE; i++) {
      const q = generateSubtractionQuestion()

      expect(q.operation).toBe('subtraction')
      expect(q.operandA).toBeLessThanOrEqual(100)
      expect(q.operandB).toBeLessThanOrEqual(q.operandA)
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0)
      expect(q.correctAnswer).toBe(q.operandA - q.operandB)
      expect(q.choices).toContain(q.correctAnswer)
    }
  })
})

describe('generateMultiplicationQuestion', () => {
  it('produces factors within 12 x 12', () => {
    for (let i = 0; i < SAMPLE_SIZE; i++) {
      const q = generateMultiplicationQuestion()

      expect(q.operation).toBe('multiplication')
      expect(q.operandA).toBeGreaterThanOrEqual(1)
      expect(q.operandA).toBeLessThanOrEqual(12)
      expect(q.operandB).toBeGreaterThanOrEqual(1)
      expect(q.operandB).toBeLessThanOrEqual(12)
      expect(q.correctAnswer).toBe(q.operandA * q.operandB)
      expect(q.choices).toContain(q.correctAnswer)
    }
  })
})

describe('generateDivisionQuestion', () => {
  it('produces whole-number division with no remainder', () => {
    for (let i = 0; i < SAMPLE_SIZE; i++) {
      const q = generateDivisionQuestion()

      expect(q.operation).toBe('division')
      expect(q.operandB).toBeGreaterThanOrEqual(1)
      expect(q.operandA % q.operandB).toBe(0)
      expect(q.correctAnswer).toBe(q.operandA / q.operandB)
      expect(q.operandA).toBe(q.operandB * q.correctAnswer)
      expect(q.choices).toContain(q.correctAnswer)
    }
  })
})

describe('generateQuestion', () => {
  it('dispatches to the correct generator by operation', () => {
    expect(generateQuestion('addition').operation).toBe('addition')
    expect(generateQuestion('subtraction').operation).toBe('subtraction')
    expect(generateQuestion('multiplication').operation).toBe('multiplication')
    expect(generateQuestion('division').operation).toBe('division')
  })
})
