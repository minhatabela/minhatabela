import type { PredictedMatch } from "../domain/entities/PredictedMatch";

export class UpdatePredictedMatchUseCase {
  async execute(match: PredictedMatch): Promise<void> {
    await $fetch('/api/predictedMatch', {
      method: 'PUT',
      body: match
    })
  }
}