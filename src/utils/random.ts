export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function pickRandom<T>(items: T[]): T {
  return items[randomInt(0, items.length - 1)]
}

export function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
