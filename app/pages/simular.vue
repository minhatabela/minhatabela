<script setup lang="ts">
import { usePredictionsStore } from '~~/layers/predictions/application/stores/Predictions.store'
import type { Match } from '~~/layers/shared/entities/Match'
import { useMatchesStore } from '~~/layers/standings/application/stores/Matches.store'
import { PredictionMap } from '~~/layers/standings/infra/mappers/Prediction.map'
import { MatchSchema } from '../../layers/shared/schemas/Match.schema'

useHead({
  title: 'Simulando'
})

const { data: predictions, status: predictionsStatus } = useAsyncData(
  'standings/predictions',
  () => $fetch('/api/predictions'),
  {
    transform: response => response?.map(prediction => new PredictionMap().mapTo(prediction)),
    default: () => []
  }
)

watch(predictionsStatus, value => {
  if (value === 'success') {
    usePredictionsStore().setPredictions(predictions.value!)
    usePredictionsStore().syncing = false
  }
})

const { data: matches, status: matchesStatus } = useAsyncData(
  'standings/matches',
  () => $fetch('/api/partidas'),
  {
    transform: response => response?.map(match => MatchSchema.parse(match)),
    default: () => [] as Match[]
  }
)

watch(matchesStatus, value => {
  if (value === 'success') {
    useMatchesStore().setMatches(matches.value!)
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
@reference "~/assets/css/main.css";

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
