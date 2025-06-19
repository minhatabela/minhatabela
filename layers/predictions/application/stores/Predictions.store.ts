import type { Match } from '~~/layers/shared/entities/Match'

export const usePredictionsStore = defineStore('predictions', () => {
  const predictions = ref<Match[]>()

  function setPredictions(_predictions: Match[]) {
    predictions.value = _predictions
  }

  return {
    predictions,
    setPredictions
  }
})
