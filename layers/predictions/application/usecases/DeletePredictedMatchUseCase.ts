export class DeletePredictedMatchUseCase {
  async execute(predictionId: string): Promise<void> {
    await $fetch(`/api/deletePrediction`, {
      method: 'DELETE',
      body: { id: predictionId }
    })
  }
}
