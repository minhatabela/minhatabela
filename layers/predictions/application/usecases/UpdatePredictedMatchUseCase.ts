import type { PredictedMatch } from '../../domain/entities/PredictedMatch'

export class UpdatePredictedMatchUseCase {
  async execute(match: PredictedMatch): Promise<void> {
    console.log(match)
    await $fetch('/api/predictedMatch', {
      method: 'POST',
      body: { match }
    })
  }
}
