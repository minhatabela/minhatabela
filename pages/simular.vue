<script setup lang="ts">
useHead({
  title: "Simulando · minhatabela"
})

const { componentToPng } = useHtmlToImage()
const { columns, tabela } = useTabela()
const { jogosRodada, rodada_atual, syncing, getAllSimulacoes } = useSimulador()

const arte = ref()

const rodada = ref(rodada_atual)

onMounted(async () => {
  await getAllSimulacoes()
})
</script>

<template>
  <div v-show="false">
    <!-- <ArteRodada :rodada="rodada_atual" ref="arte" /> -->
  </div>
  <div class="flex flex-col xl:flex-row gap-8 lg:px-0 px-8 justify-between">
    <div>

      <ToggleSensitive label="tabela">
        <Table :columns="columns" :tabela="tabela" />
      </ToggleSensitive>

    </div>
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <UIcon name="i-ion-sync" class="w-4 h-4 text-green-400"
          :class="{ 'animate-spin  text-black dark:text-white': syncing }" />
        <UButton @click="componentToPng(arte, rodada)" size="xs" variant="ghost" color="purple"
          icon="i-ic-round-download" label="baixar simulação" />
      </div>
      <div class="flex items-center justify-between">
        <button :disabled="rodada === 1" @click="rodada = Number(rodada) - 1">
          <UIcon name="uil:angle-left" class="w-5 h-5 cursor-pointer" :class="{ 'opacity-40': rodada === 1 }" />
        </button>
        <span class="font-semibold uppercase">Rodada {{ rodada }}</span>
        <button type="button" :disabled="rodada === 38" @click="rodada = Number(rodada) + 1">
          <UIcon name="uil:angle-right" class="w-5 h-5 cursor-pointer" :class="{ 'opacity-40': rodada === 38 }" />
        </button>
      </div>
      <div class="grid lg:grid-cols-2 gap-4">
        <CardPartida v-for="partida in jogosRodada" :key="partida.id" :partida="partida" />
      </div>
    </div>
  </div>
</template>

<style>
html,
body {
  font-family: 'DM Sans', sans-serif;
}

td {
  @apply !py-2
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
input[type=number] {
  @apply w-20
}
</style>
