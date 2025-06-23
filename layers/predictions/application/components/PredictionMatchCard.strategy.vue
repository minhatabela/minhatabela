<script lang="ts" setup>
import type { Match } from '~~/layers/shared/entities/Match'
import { usePredictionsStore } from '../stores/Predictions.store'
import { PredictedMatch } from '../../domain/entities/PredictedMatch'
import { UpdateLocalPredictedMatchObserver } from '../../domain/observers/UpdateLocalPredictedMatch.observer'
import { UpdatePredictedMatchUseCase } from '../usecases/UpdatePredictedMatchUseCase'
import { UpdateRemotePredictedMatchObserver } from '../../domain/observers/UpdateRemotePredictedMatch.observer'

const { match } = defineProps<{
  match: Match
}>()

const newPrediction = computed(
  () =>
    new PredictedMatch(
      match.id,
      match.round,
      match.number,
      match.date,
      match.time,
      match.homeTeam,
      match.awayTeam,
      match.vanue
    )
)

newPrediction.value.addObserver(new UpdateLocalPredictedMatchObserver())

const updatePredictedMatchUseCase = new UpdatePredictedMatchUseCase()
newPrediction.value.addObserver(new UpdateRemotePredictedMatchObserver(updatePredictedMatchUseCase))

const predictedMatch = computed(
  () => usePredictionsStore().findPrediction(match.id) || newPrediction.value
)

const homeScore = ref<number>()
const awayScore = ref<number>()

const homeGoals = computed({
  get() {
    return homeScore.value || predictedMatch.value.homeGoals
  },
  set(goals: number) {
    homeScore.value = goals
    predictedMatch.value.setScore(goals, awayGoals.value!)
  }
})

const awayGoals = computed({
  get() {
    return awayScore.value || predictedMatch.value.awayGoals
  },
  set(goals: number) {
    awayScore.value = goals
    predictedMatch.value.setScore(homeGoals.value!, goals)
  }
})

function setHomeScore(event: FocusEvent) {
  const value = Math.abs(Number((event.target as HTMLInputElement)?.value))
  homeGoals.value = value
}

function setAwayScore(event: FocusEvent) {
  const value = Math.abs(Number((event.target as HTMLInputElement)?.value))
  awayGoals.value = value
}
</script>

<template>
  <UCard
    variant="subtle"
    class="flex items-center justify-center"
  >
    <div class="flex w-full justify-between pb-2">
      <div class="pb-2 flex justify-between gap-2">
        <span class="text-xs text-slate-400">{{ match.date.formattedDate }}</span>
        <span class="text-xs text-slate-400">{{ match.time.formattedValue }}</span>
        <span class="text-xs text-slate-400">{{ match.vanue?.getValue }}</span>
      </div>
      <MatchOptions :match="match" />
    </div>
    <div class="flex gap-4 items-center justify-center mt-3">
      <UTooltip :text="match.homeTeam.name">
        <img
          class="w-7"
          :src="match.homeTeam.emblem"
          alt=""
        >
      </UTooltip>
      <UInput
        size="xl"
        type="number"
        :max="9"
        :min="0"
        :model-value="homeGoals"
        @blur="setHomeScore"
      />
      X
      <UInput
        size="xl"
        type="number"
        :max="9"
        :min="0"
        :model-value="awayGoals"
        @blur="setAwayScore"
      />
      <UTooltip :text="match.awayTeam.name">
        <img
          class="w-7"
          :src="match.awayTeam.emblem"
          alt=""
        >
      </UTooltip>
    </div>
  </UCard>
</template>
