import type { MathQuestion, Operation } from '../types'
import { buildChoices } from './choices'
import { randomInt } from './random'

interface QuestionDraft {
  operation: Operation
  operandA: number
  operandB: number
  formattedString: string
  correctAnswer: number
}

function createQuestion(draft: QuestionDraft): MathQuestion {
  return {
    ...draft,
    id: crypto.randomUUID(),
    choices: buildChoices(draft.correctAnswer),
    userSelectedAnswer: null,
  }
}

export function generateAdditionQuestion(): MathQuestion {
  const operandA = randomInt(1, 99)
  const operandB = randomInt(1, 100 - operandA)
  const correctAnswer = operandA + operandB

  return createQuestion({
    operation: 'addition',
    operandA,
    operandB,
    formattedString: `${operandA} + ${operandB} = ?`,
    correctAnswer,
  })
}

export function generateSubtractionQuestion(): MathQuestion {
  const operandA = randomInt(0, 100)
  const operandB = randomInt(0, operandA)
  const correctAnswer = operandA - operandB

  return createQuestion({
    operation: 'subtraction',
    operandA,
    operandB,
    formattedString: `${operandA} − ${operandB} = ?`,
    correctAnswer,
  })
}

export function generateMultiplicationQuestion(): MathQuestion {
  const operandA = randomInt(1, 12)
  const operandB = randomInt(1, 12)
  const correctAnswer = operandA * operandB

  return createQuestion({
    operation: 'multiplication',
    operandA,
    operandB,
    formattedString: `${operandA} × ${operandB} = ?`,
    correctAnswer,
  })
}

export function generateDivisionQuestion(): MathQuestion {
  const operandB = randomInt(1, 12)
  const quotient = randomInt(1, 12)
  const operandA = operandB * quotient

  return createQuestion({
    operation: 'division',
    operandA,
    operandB,
    formattedString: `${operandA} ÷ ${operandB} = ?`,
    correctAnswer: quotient,
  })
}

const generators: Record<Operation, () => MathQuestion> = {
  addition: generateAdditionQuestion,
  subtraction: generateSubtractionQuestion,
  multiplication: generateMultiplicationQuestion,
  division: generateDivisionQuestion,
}

export function generateQuestion(operation: Operation): MathQuestion {
  return generators[operation]()
}
