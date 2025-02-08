<template>
  <div ref="arte"
    class=" w-full h-full p-12 flex flex-col justify-between gap-10 items-center bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-500 via-purple-500 to-blue-600 rounded-2xl">
    <div class="flex flex-col items-center gap-2">
      <h1 class="text-7xl font-black">minhatabela</h1>
      <h2 class="text-5xl font-bold">Brasileirão 2025</h2>
      <h3 class="text-3xl font-semibold">Rodada {{ rodada }}</h3>
    </div>
    <!-- <div class="flex flex-wrap gap-16 justify-center"> -->
    <div class="grid grid-cols-2 gap-16" :class="{ '!grid-cols-1': partidasRodada.length === 1 }">
      <div v-for="partida in partidasRodada" :key="partida.id"
        class="flex items-center justify-center gap-4 rounded-tl-xl rounded-br-xl border-4 border-white px-6 py-4">
        <img class="h-20 w-20" :src="partida.mandante.escudo" alt="">
        <p class="font-black text-7xl">
          {{ simulacao.get(partida.id)?.gols_mandante }} x {{ simulacao.get(partida.id)?.gols_visitante }}
        </p>
        <img class="h-20 w-20" :src="partida.visitante.escudo" alt="">
      </div>

    </div>
    <div class="p-2 w-full text-center text-xl">minhatabela.com | {{ new Date().getFullYear() }}</div>
  </div>
</template>

<script lang="ts" setup>
const arte = ref()
defineExpose(arte)
const props = defineProps({ rodada: { type: Number, required: true } })

const { partidas } = useApi()

const { simulacao } = useSimulador()

const partidasRodada = computed(() => {
  return partidas.value?.filter(partida => partida.rodada === props.rodada)
})
</script>

<style></style>