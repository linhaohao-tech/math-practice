import { shuffle } from './random'

export function buildChoices(correctAnswer: number): number[] {
  const distractors = new Set<number>()
  const offsets = [1, -1, 2, -2, 3, -3, 5, -5, 10, -10]

  for (const offset of offsets) {
    if (distractors.size >= 3) break
    const candidate = correctAnswer + offset
    if (candidate >= 0 && candidate !== correctAnswer) {
      distractors.add(candidate)
    }
  }

  let fallback = 0
  while (distractors.size < 3) {
    if (fallback !== correctAnswer && fallback >= 0) {
      distractors.add(fallback)
    }
    fallback++
  }

  return shuffle([correctAnswer, ...distractors])
}
