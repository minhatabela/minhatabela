import type { PredictedMatch } from "../entities/PredictedMatch";

export interface IPredictedMatchObserver {
  execute(match: PredictedMatch): void
}