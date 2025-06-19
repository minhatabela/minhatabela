<script setup lang="ts">
onMounted(() => {
  execute()
})

const { jogosRodada, rodada_navegavel, syncing, execute } = useSimulador()


</script>

<template>
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
</template>