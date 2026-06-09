import { describe, expect, it } from 'vitest'
import { accuracyPercent } from './stats'

describe('accuracyPercent', () => {
  it('returns 0 when total is 0', () => {
    expect(accuracyPercent(0, 0)).toBe(0)
    expect(accuracyPercent(5, 0)).toBe(0)
  })

  it('rounds to the nearest whole percent', () => {
    expect(accuracyPercent(1, 3)).toBe(33)
    expect(accuracyPercent(2, 3)).toBe(67)
    expect(accuracyPercent(7, 10)).toBe(70)
  })

  it('returns 100 for a perfect score', () => {
    expect(accuracyPercent(10, 10)).toBe(100)
  })
})
