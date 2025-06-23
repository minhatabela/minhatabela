import type { PredictedMatch } from '../../domain/entities/PredictedMatch'

export const usePredictionsStore = defineStore('predictions', () => {
  const predictions = ref<Map<string, PredictedMatch> | undefined>()

  function setPredictions(_predictions: PredictedMatch[]) {
    const map = new Map(_predictions.map(predictionMatch => [predictionMatch.id, predictionMatch]))
    predictions.value = map
  }

  function updatePredictedMatch(match: PredictedMatch) {
    if(hasMatchPredicted(match.id)) {
      const prediction = findPrediction(match.id)
      prediction!.awayGoals = match.awayGoals
      prediction!.homeGoals = match.homeGoals
      console.log('ja tem', prediction)
    } else {
      setPrediction(match)
      console.log('ja criado', match)
    }
  }

  function getPredictions(): PredictedMatch[] {
    return predictions.value ? Array.from(predictions.value.values()) : []
  }

  function findPrediction(matchId: string): PredictedMatch | undefined {
    return predictions.value?.get(matchId)
  }

  function hasMatchPredicted(matchId: string): boolean {
    return predictions.value!.has(matchId)
  }

  function setPrediction(prediction: PredictedMatch) {
    predictions.value!.set(prediction.id, prediction)
  }

  return {
    predictions,
    setPredictions,
    updatePredictedMatch,
    getPredictions,
    findPrediction,
    hasMatchPredicted,
    setPrediction
  }
})
