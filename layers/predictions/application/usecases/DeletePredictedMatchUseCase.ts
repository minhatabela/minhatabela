export class DeletePredictedMatchUseCase {
  async execute(predictionId: string): Promise<void> {
    await $fetch(`/api/deletePrediction?predictionId=${predictionId}`, {
      method: 'DELETE'
    })
  }
}
