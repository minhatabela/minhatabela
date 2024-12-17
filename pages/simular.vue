<script setup lang="ts">
useHead({
  title: "Simulando · minhatabela"
})

import { badgeColor } from "../utils/tabela";
const { columns, data, jogosRodada, tabela } = useSimulador()


</script>

<template>
  <div class="flex flex-col xl:flex-row gap-8 lg:px-0 px-8 ">
    <div>
      <UCard>
        <UTable :columns="columns" :rows="tabela">
          <template #posicao-data="{ row }">
            <UBadge :color="badgeColor(tabela.indexOf(row) + 1)" :ui="{ rounded: 'rounded-full' }"
              :label="tabela.indexOf(row) + 1" />
          </template>
          <template #equipe-data="{ row }">
            <div class="flex gap-2 items-center">
              <img style="width: 20px;" :src="row.clube_url" alt="">
              <span class="font-bold">{{ row.equipe }}</span>
            </div>
          </template>
          <template #pontos-data="{ row }">
            <span class="font-bold">{{ row.pontos }}</span>
          </template>
        </UTable>
      </UCard>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <button :disabled="data.rodada_atual === 1" @click="data.rodada_atual = data.rodada_atual - 1">
          <UIcon name="uil:angle-left" class="w-5 h-5 cursor-pointer"
            :class="{ 'opacity-40': data.rodada_atual === 1 }" />
        </button>
        <span class="font-semibold uppercase">Rodada {{ data.rodada_atual }}</span>
        <button type="button" :disabled="data.rodada_atual === 38" @click="data.rodada_atual = data.rodada_atual + 1">
          <UIcon name="uil:angle-right" class="w-5 h-5 cursor-pointer"
            :class="{ 'opacity-40': data.rodada_atual === 38 }" />
        </button>
      </div>
      <div class="grid lg:grid-cols-2 gap-4">
        <UCard v-for="jogo in jogosRodada" :key="jogo.id" class="p-2">
          <div>
            <div class="flex gap-4 items-center justify-center">
              <img class="w-7" :src="jogo.equipe_mandante.escudo.svg" alt="">
              <UInput size="xl" type="number" :max="9" :min="0" :model-value="jogo.placar_oficial_mandante" />
              X
              <UInput size="xl" type="number" :max="9" :min="0" :model-value="jogo.placar_oficial_visitante" />
              <img class="w-7" :src="jogo.equipe_visitante.escudo.svg" alt="">
            </div>
          </div>
        </UCard>
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
