import { describe, expect, it } from 'vitest'
import { buildDeck } from './deckBuilder'

describe('buildDeck', () => {
  it('returns an empty deck when no operations are selected', () => {
    expect(buildDeck([], 10)).toEqual([])
  })

  it('returns an empty deck when session length is zero', () => {
    expect(buildDeck(['addition'], 0)).toEqual([])
  })

  it('builds a deck of the requested length', () => {
    const deck = buildDeck(['addition', 'multiplication'], 15)
    expect(deck).toHaveLength(15)
  })

  it('only generates questions from selected operations', () => {
    const deck = buildDeck(['subtraction'], 20)
    expect(deck.every((q) => q.operation === 'subtraction')).toBe(true)
  })

  it('assigns unique ids to each question', () => {
    const deck = buildDeck(['addition'], 10)
    const ids = deck.map((q) => q.id)
    expect(new Set(ids).size).toBe(10)
  })
})
