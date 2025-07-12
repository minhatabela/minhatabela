import type { PredictedMatch } from '../../domain/entities/PredictedMatch'

export const usePredictionsStore = defineStore('predictions', () => {
  const predictions = ref<Map<string, PredictedMatch> | undefined>()
  const syncing = ref<boolean>(true)

  function setPredictions(_predictions: PredictedMatch[]) {
    const map = new Map(_predictions.map(predictionMatch => [predictionMatch.id, predictionMatch]))
    predictions.value = map
  }

  function updatePredictedMatch(match: PredictedMatch) {
    if (hasMatchPredicted(match.id)) {
      const prediction = findPrediction(match.id)
      prediction!.awayGoals = match.awayGoals
      prediction!.homeGoals = match.homeGoals
    } else {
      setPrediction(match)
    }
  }

  function getPredictions(): PredictedMatch[] {
    console.log(predictions.value)
    return predictions.value ? Array.from(predictions.value.values()) : []
  }

  function findPrediction(matchId: string): PredictedMatch | undefined {
    return predictions.value?.get(matchId)
  }

  function hasMatchPredicted(matchId: string): boolean {
    return predictions.value?.has(matchId) || false
  }

  function setPrediction(prediction: PredictedMatch) {
    if (predictions.value) {
      predictions.value.set(prediction.id, prediction)
    } else {
      predictions.value = new Map().set(prediction.id, prediction)
    }
  }

  function deletePrediction(matchId: string) {
    predictions.value?.delete(matchId)
  }

  return {
    predictions,
    setPredictions,
    updatePredictedMatch,
    getPredictions,
    findPrediction,
    hasMatchPredicted,
    setPrediction,
    syncing,
    deletePrediction
  }
})
