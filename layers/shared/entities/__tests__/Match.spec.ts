import { describe, expect, it } from 'vitest'
import { Match } from '../Match'
import { MatchNumber } from '../../values/MatchNumber'
import { MatchDate } from '../../values/MatchDate'
import { MatchTime } from '../../values/MatchTime'
import { Team } from '../Team'
import { Round } from '../../values/Round'

describe('Unit tests for Match class', () => {
  const match = new Match(
    'oi',
    new Round(13),
    new MatchNumber(125),
    new MatchDate('2025-07-12'),
    new MatchTime('16:00:00'),
    new Team('', '', ''),
    new Team('', '', '')
  )

  it('should match be this week', () => {
    const sevenDaysAhead = new Date(new Date().setDate(new Date().getDate() + 7))

    expect(match.date.dateValue! > new Date()).toBeTruthy()
    expect(match.date.dateValue! < sevenDaysAhead).toBeTruthy()
    expect(match.isThisWeek).toBeTruthy()
  })
})
