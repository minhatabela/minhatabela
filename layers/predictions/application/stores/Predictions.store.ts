import type { PredictedMatch } from '../../domain/entities/PredictedMatch'

export const usePredictionsStore = defineStore('predictions', () => {
  const predictions = ref<Map<string, PredictedMatch>>()

  function setPredictions(_predictions: PredictedMatch[]) {
    const map = new Map(_predictions.map(prediction => [prediction.predictedMatchId, prediction]))
    predictions.value = map
  }

  function updatePredictedMatch(match: PredictedMatch) {
    const prediction = predictions.value?.get(match.predictedMatchId)
    prediction?.setScore(match.homeGoals!, match.awayGoals!)
  }

  return {
    predictions,
    setPredictions,
    updatePredictedMatch
  }
})
