<script setup lang="ts">
import { usePredictionsStore } from '~~/layers/predictions/application/stores/Predictions.store'
import type { Match } from '~~/layers/shared/entities/Match'
import { useMatchesStore } from '~~/layers/standings/application/stores/Matches.store'
import { MatchSchema } from '../../layers/shared/schemas/Match.schema'
import { PredictionSchema } from '../../layers/shared/schemas/Prediction.schema'

useHead({
  title: 'Simulando'
})

const {
  data: predictions,
  status: predictionsStatus,
  execute: getPredictions
} = useAsyncData('standings/predictions', () => $fetch('/api/predictions'), {
  transform: response => PredictionSchema.array().parse(response),
  default: () => [],
  immediate: false
})

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
    transform: response => MatchSchema.array().parse(response),
    default: () => [] as Match[]
  }
)

watch(matchesStatus, value => {
  if (value === 'success') {
    useMatchesStore().setMatches(matches.value!)
  }
})

onMounted(() => {
  if (useSupabaseUser().value) getPredictions()
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
