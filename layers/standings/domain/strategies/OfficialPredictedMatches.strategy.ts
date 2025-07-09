import type { Match } from '~~/layers/shared/entities/Match'

export class OfficialPredictedMatchesStrategy {
  constructor(
    private readonly officialMatches: Match[],
    private readonly predictedMatches: Match[] = []
  ) {}

  private getFinishedOfficialMatches(): Match[] {
    return this.officialMatches.filter(
      match => isDefined(match.homeGoals) && isDefined(match.awayGoals)
    )
  }

  private getFinishedOfficialMatchesIds(): string[] {
    return this.getFinishedOfficialMatches().map(match => match.id)
  }

  private getNotFinishedPredictedMatches(): Match[] {
    return this.predictedMatches.filter(
      match => !this.getFinishedOfficialMatchesIds().includes(match.id)
    )
  }

  getMatches(): Match[] {
    const mixedMatches = [
      ...this.getFinishedOfficialMatches(),
      ...this.getNotFinishedPredictedMatches()
    ]

    return mixedMatches
  }
}
