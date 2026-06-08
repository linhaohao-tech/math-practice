import type { MathQuestion, Operation } from '../types'
import { pickRandom } from './random'
import { generateQuestion } from './generators'

export function buildDeck(
  operations: Operation[],
  sessionLength: number,
): MathQuestion[] {
  if (operations.length === 0 || sessionLength <= 0) {
    return []
  }

  return Array.from({ length: sessionLength }, () => {
    const operation = pickRandom(operations)
    return generateQuestion(operation)
  })
}
