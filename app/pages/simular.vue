<script setup lang="ts">
import { usePredictionsStore } from '~~/layers/predictions/application/stores/Predictions.store'
import { PredictionMap } from '~~/layers/standings/infra/mappers/Prediction.map'

useHead({
  title: 'Simulando'
})

const { data: predictions, status } = useAsyncData(
  'standings/predictions',
  () => $fetch('/api/predictions'),
  {
    transform: response => response?.map(prediction => new PredictionMap().mapTo(prediction)),
    default: () => []
  }
)

watch(status, value => {
  if (value === 'success') {
    usePredictionsStore().setPredictions(predictions.value!)
  }
})
</script>

<template>
  <div class="flex flex-col xl:flex-row gap-16 lg:px-0 px-8 justify-between">
    <StandingsView />
    <PredictionsView />
  </div>
</template>

<style>
@reference "../../public/main.css";

html,
body {
  font-family: 'DM Sans', sans-serif;
}

td {
  @apply !py-2;
}

input[type='number'] {
  @apply w-20;
}
</style>
