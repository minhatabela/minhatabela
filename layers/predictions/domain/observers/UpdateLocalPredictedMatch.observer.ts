import { usePredictionsStore } from "../../application/stores/Predictions.store";
import type { PredictedMatch } from "../entities/PredictedMatch";
import type { IPredictedMatchObserver } from "../ports/IPreditedMatchObserver.interface";

export class UpdateLocalPredictedMatchObserver implements IPredictedMatchObserver {
  execute(match: PredictedMatch): void {
    usePredictionsStore().updatePredictedMatch(match)
  }
  
}