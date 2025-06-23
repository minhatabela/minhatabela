<template>
  <div
    ref="arte"
    class="w-full h-full p-12 flex flex-col justify-between gap-10 items-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-500 via-purple-500 to-blue-600 rounded-2xl"
  >
    <div class="flex flex-col items-center gap-2">
      <h1 class="text-7xl font-black">minhatabela</h1>
      <h2 class="text-5xl font-bold">Brasileirão 2025</h2>
      <h3 class="text-3xl font-semibold">Rodada {{ round }}</h3>
    </div>
    <div
      class="grid grid-cols-2 gap-16"
      :class="{ '!grid-cols-1': partidasRodada.length === 1 }"
    >
      <div
        v-for="partida in partidasRodada"
        :key="partida.id"
        class="flex items-center justify-center gap-4 rounded-tl-xl rounded-br-xl border-4 border-white px-6 py-4"
      >
        <img
          class="h-20 w-20"
          :src="partida.homeTeam.emblem"
          alt=""
        />
        <p class="font-black text-7xl">
          {{ getPrediction(partida.id)?.homeGoals }} x
          {{ getPrediction(partida.id)?.awayGoals }}
        </p>
        <img
          class="h-20 w-20"
          :src="partida.awayTeam.emblem"
          alt=""
        />
      </div>
    </div>
    <div class="p-2 w-full text-center text-xl">
      minhatabela.com | {{ new Date().getFullYear() }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePredictionsStore } from '~~/layers/predictions/application/stores/Predictions.store';
import { useMatchesStore } from '~~/layers/standings/application/stores/Matches.store';

const arte = ref()
defineExpose(arte)
const { round } = defineProps<{
  round: number
}>()


const partidasRodada = computed(() => useMatchesStore().getRoundMatches())

function getPrediction(matchId: string) {
  return usePredictionsStore().findPrediction(matchId)
}
</script>

<style></style>
