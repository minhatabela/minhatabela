import type { StandingPositon } from '../dtos/StandingPosition.dto'

export interface IStandings {
  getStandings(): StandingPositon[]
}
