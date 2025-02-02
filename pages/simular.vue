<script setup lang="ts">

useHead({
  title: "Simulando · minhatabela"
})



const { componentToPng } = useHtmlToImage()
const { columns, tabela } = useTabela()
const { jogosRodada, rodada_atual, syncing, getAllSimulacoes, simulacao } = useSimulador()

const arte = ref()

const empty = computed(() => {
  return simulacao.value.size === 0
})

onMounted(async () => {
  await getAllSimulacoes()
})
</script>

<template>
  <div v-show="false">
    <ArteRodada :rodada="rodada_atual" ref="arte" />
  </div>
  <div class="flex flex-col xl:flex-row gap-16 lg:px-0 px-8 justify-between">
    <div class="w-full">

      <ToggleSensitive v-if="tabela.length" label="tabela">
        <Table :columns="columns" :tabela="tabela" />
      </ToggleSensitive>
      <USkeleton v-else class="w-full h-full" />

    </div>
    <div class="flex w-full flex-col gap-4">
      <div class="flex justify-between items-center">
        <UIcon name="i-ion-sync" class="w-4 h-4 text-green-400" :class="{ 'animate-spin text-white': syncing }" />
        <UButton :disabled="empty" @click="componentToPng(arte, rodada_atual)" size="xs" variant="ghost" color="purple"
          icon="i-ic-round-download" label="baixar simulação" />
      </div>
      <div class="flex w-full items-center justify-between">
        <button :disabled="rodada_atual === 1" @click="rodada_atual = Number(rodada_atual) - 1">
          <UIcon name="uil:angle-left" class="w-5 h-5 cursor-pointer" :class="{ 'opacity-40': rodada_atual === 1 }" />
        </button>
        <span class="font-semibold uppercase">Rodada {{ rodada_atual }}</span>
        <button type="button" :disabled="rodada_atual === 38" @click="rodada_atual = Number(rodada_atual) + 1">
          <UIcon name="uil:angle-right" class="w-5 h-5 cursor-pointer" :class="{ 'opacity-40': rodada_atual === 38 }" />
        </button>
      </div>
      <div v-if="jogosRodada.length" class="grid lg:grid-cols-2 gap-4">
        <CardPartida v-for="partida in jogosRodada" :key="partida.id" :partida="partida" />
      </div>
      <div v-else class="grid lg:grid-cols-2 gap-4">
        <USkeleton class="w-full h-24" v-for="i in 10" :key="i" />
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
*/ input[type=number] {
  @apply w-20
}
</style>
