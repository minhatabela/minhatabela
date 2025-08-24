import type { Match } from '../../../shared/entities/Match'

export class PeakRoundMatchesFactory {
  static make(matches: Match[], peakRound?: number): Match[] {
    if (!peakRound) return matches
    return matches.filter(match => match.round.value <= peakRound)
  }
}
