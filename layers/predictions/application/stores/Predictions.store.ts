import type { PredictedMatch } from '../../domain/entities/PredictedMatch'

export const usePredictionsStore = defineStore('predictions', () => {
  const predictions = ref<Map<string, PredictedMatch>>()

  function setPredictions(_predictions: PredictedMatch[]) {
    const map = new Map(_predictions.map(predictionMatch => [predictionMatch.id, predictionMatch]))
    predictions.value = map
  }

  function updatePredictedMatch(match: PredictedMatch) {
    const prediction = predictions.value?.get(match.predictedMatchId)
    prediction?.setScore(match.homeGoals!, match.awayGoals!)
  }

  function getPredictions(): PredictedMatch[] {
    return Array.from(predictions.value!.values())
  }

  function findPrediction(matchId: string): PredictedMatch | undefined {
    return predictions.value?.get(matchId)
  }

  return {
    predictions,
    setPredictions,
    updatePredictedMatch,
    getPredictions,
    findPrediction
  }
})
