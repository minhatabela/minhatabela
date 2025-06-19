<script setup lang="ts">
onMounted(() => {
  execute()
})

useHead({
  title: 'Simulando'
})

const { componentToPng } = useHtmlToImage()
const { jogosRodada, rodada_navegavel, syncing, simulacao, execute } = useSimulador()

const arte = ref()

const empty = computed(() => {
  const jogosRodadaIds = jogosRodada.value.map(m => m.id)
  const idsSimulacao = Array.from(simulacao.value?.keys()) || []

  return !jogosRodadaIds.some(partidaId => idsSimulacao.includes(partidaId))
})
</script>

<template>
  <div v-show="false">
    <ArteRodada
      :rodada="rodada_navegavel"
      ref="arte"
    />
  </div>
  <div class="flex flex-col xl:flex-row gap-16 lg:px-0 px-8 justify-between">
    <StandingsView />
    <div class="flex w-full flex-col gap-4">
      <div class="flex justify-between items-center">
        <UIcon
          name="i-ion-sync"
          class="w-4 h-4 text-green-400"
          :class="{ 'animate-spin  text-black dark:text-white': syncing }"
        />
        <UButton
          :disabled="empty"
          @click="componentToPng(arte, rodada_navegavel)"
          size="xs"
          variant="ghost"
          color="primary"
          icon="i-ic-round-download"
          label="baixar simulação da rodada"
        />
      </div>
      <RoundPagination v-model="rodada_navegavel" />
      <div
        v-if="jogosRodada.length"
        class="grid lg:grid-cols-2 gap-4"
      >
        <CardPartida
          v-for="partida in jogosRodada"
          :key="partida.id"
          :partida="partida"
        />
      </div>
      <div
        v-else
        class="grid lg:grid-cols-2 gap-4"
      >
        <USkeleton
          class="w-full h-24"
          v-for="i in 10"
          :key="i"
        />
      </div>
    </div>
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

/* Chrome, Safari, Edge, Opera */
/*input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

*/
/* Firefox */
/*input[type=number] {
  -moz-appearance: textfield;
}
*/
input[type='number'] {
  @apply w-20;
}
</style>
