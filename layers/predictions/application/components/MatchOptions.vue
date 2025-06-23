<script lang="ts" setup>
import type { Match } from '~~/layers/shared/entities/Match'
import { usePredictionsStore } from '../stores/Predictions.store'

const { match } = defineProps<{
  match: Match
}>()

const emit = defineEmits<{
  (event: 'assingAwayWin'): void
  (event: 'assingHomeWin'): void
  (event: 'declareDraw'): void
  (event: 'clearPrediction'): void
}>()

const confirm = ref(false)

const predictedMatch = computed(() => usePredictionsStore().findPrediction(match.id))

const popoverMode = computed(() => {
  const { width } = useWindowSize()

  return width.value < 767 ? 'click' : 'hover'
})

function clearPrediction() {
  emit('clearPrediction')
  confirm.value = false
}
</script>

<template>
  <div>
    <UPopover :mode="popoverMode">
      <Icon name="mage:dots" class="cursor-pointer" />
      <template #content>
        <div class="flex flex-col">
          <span @click="emit('assingHomeWin')"
            class="px-4 flex gap-2 items-center py-2 dark:hover:bg-slate-700 hover:bg-slate-100 cursor-pointer">
            <img class="h-6 w-6" :src="match.homeTeam.emblem" alt="" />
            {{ match.homeTeam.name }} vence</span>
          <span @click="emit('assingAwayWin')"
            class="px-4 flex gap-2 items-center py-2 hover:dark:bg-slate-700 hover:bg-slate-100 cursor-pointer">
            <img class="h-6 w-6" :src="match.awayTeam.emblem" alt="" />
            {{ match.awayTeam.name }} vence</span>
          <span @click="emit('declareDraw')"
            class="px-4 flex gap-2 items-center py-2 dark:hover:bg-slate-700 hover:bg-slate-100 cursor-pointer">
            <Icon size="1.5rem" name="simple-line-icons:minus" />
            Empate
          </span>
          <USeparator v-if="predictedMatch" class="py-1" />
          <span @click="confirm = true" v-if="!confirm && predictedMatch"
            class="px-4 flex gap-2 items-center py-2 dark:hover:bg-slate-700 hover:bg-slate-100 cursor-pointer text-red-500">
            <Icon size="1.5rem" name="mynaui:trash" />

            Limpar simulação
          </span>
          <span @click="clearPrediction" v-if="confirm"
            class="px-4 flex gap-2 items-center py-2 dark:hover:bg-slate-700 hover:bg-slate-100 cursor-pointer text-amber-500">
            <Icon size="1.5rem" name="iconamoon:attention-circle-fill" />

            Confirmar
          </span>
        </div>
      </template>
    </UPopover>
  </div>
</template>
