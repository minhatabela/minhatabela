<script setup lang="ts">
onMounted(() => {
  execute()
})

useHead({
  title: 'Simulando'
})

const { jogosRodada, rodada_navegavel, syncing, simulacao, execute } = useSimulador()

</script>

<template>
  <div class="flex flex-col xl:flex-row gap-16 lg:px-0 px-8 justify-between">
    <StandingsView />
    <div class="flex w-full flex-col gap-4">
      <div class="flex justify-between items-center">
        <Syncing :syncing="syncing" />
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
