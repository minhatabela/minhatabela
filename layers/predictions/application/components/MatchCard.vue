<script lang="ts" setup>
import type { Tables } from '../../../../types/database.types'
import type { Match } from '~~/layers/shared/entities/Match'
import { usePredictionsStore } from '../stores/Predictions.store'

const { salvarSimulacao, removerSimulacao } = useSimulador()

const { match } = defineProps<{
  match: Match
}>()

const predictedMatch = computed(() => usePredictionsStore().findPrediction(match.id))

const placarVisitante = computed({
  get() {
    if (match.isFinished) {
      return match.awayGoals
    } else {
      return predictedMatch.value?.awayGoals
    }
  },
  async set(value: number) {
    const schema = {
      partida: match.id,
      gols_mandante: placarMandante.value,
      gols_visitante: value
    } as Tables<'simulacao'>

    await salvarSimulacao(schema)
  }
})

const placarMandante = computed({
  get() {
    if (match.isFinished) {
      return match.homeGoals
    } else {
      return predictedMatch.value?.homeGoals
    }
  },
  async set(value: number) {
    const schema = {
      partida: match.id,
      gols_mandante: value,
      gols_visitante: placarVisitante.value
    } as Tables<'simulacao'>

    await salvarSimulacao(schema)
  }
})

async function atribuirVitoriaSimplesMandante() {
  // if ($posthog) $posthog().capture('simulador:simular-atalho')
  await salvarSimulacao({
    id: predictedMatch.value?.id || undefined,
    partida: match.id,
    gols_mandante: 1,
    gols_visitante: 0
  })
}

async function atribuirVitoriaSimplesVisitante() {
  // if ($posthog) $posthog().capture('simulador:simular-atalho')
  await salvarSimulacao({
    id: predictedMatch.value?.id || undefined,
    partida: match.id,
    gols_mandante: 0,
    gols_visitante: 1
  })
}

async function decretarEmpateSimples() {
  // if ($posthog) $posthog().capture('simulador:simular-atalho')
  await salvarSimulacao({
    id: predictedMatch.value?.id || undefined,
    partida: match.id,
    gols_mandante: 0,
    gols_visitante: 0
  })
}

async function limparSimulacao(partidaId: string) {
  // if ($posthog) $posthog().capture('simulador:limpar-simulacao')
  await removerSimulacao(partidaId)
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
        <span class="text-xs text-slate-400">{{ match.time.value }}</span>
        <span class="text-xs text-slate-400">{{ match.vanue?.getValue }}</span>
      </div>
      <MatchOptions
        v-if="!match.isFinished"
        :match="match"
      />
    </div>
    <!-- <div> -->
    <div class="flex gap-4 items-center justify-center">
      <UTooltip :text="match.homeTeam.name">
        <img
          class="w-7"
          :src="match.homeTeam.emblem"
          alt=""
        />
      </UTooltip>
      <UInput
        v-if="!match.isFinished"
        size="xl"
        type="number"
        :max="9"
        :min="0"
        @blur="placarMandante = Number(Math.abs($event.target!.value))"
        :model-value="placarMandante"
      />
      <UTooltip
        v-else
        :text="predictedMatch!.homeGoals?.toString()"
      >
        <span class="text-3xl px-4 w-20 text-center">{{ match.homeGoals }}</span>
      </UTooltip>
      X
      <UInput
        v-if="!match.isFinished"
        size="xl"
        type="number"
        :max="9"
        :min="0"
        @blur="placarVisitante = Number(Math.abs($event.target!.value))"
        :model-value="placarVisitante"
      />
      <UTooltip
        v-else
        :text="predictedMatch!.homeGoals?.toString()"
      >
        <span class="text-3xl px-4 w-20 text-center">{{ match.awayGoals }}</span>
      </UTooltip>

      <UTooltip :text="match.awayTeam.name">
        <img
          class="w-7"
          :src="match.awayTeam.emblem"
          alt=""
        />
      </UTooltip>
    </div>
  </UCard>
</template>
