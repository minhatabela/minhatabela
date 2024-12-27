<script setup lang="ts">
useHead({
  title: "Simulando · minhatabela"
})

import { type Jogo } from '~/types/jogo';

import { badgeColor } from "../utils/tabela";
const { data, partidas, clubes } = useApi()
const { columns, tabela } = useTabela()
const { jogosRodada, simulacao, updatePlacarSimuladoMandante, updatePlacarSimuladoVisitante } = useSimulador()

function getPlacarMandante(jogo: Jogo) {
  if (jogo.gols_mandante) {
    return jogo.gols_mandante
  } else if (simulacao.value.get(jogo.id)) {
    return simulacao.value.get(jogo.id)[jogo.mandante.id]
  }

  return undefined
}

function getPlacarVisitante(jogo: Jogo) {
  console.log('placar visitante: ', jogo)
  if (jogo.gols_visitante) {
    return jogo.gols_visitante
  } else if (simulacao.value.get(jogo.id)) {
    return simulacao.value.get(jogo.id)[jogo.visitante.id]
  }

  return undefined
}


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
        <button :disabled="data.rodada_atual === 1" @click="data.rodada_atual = Number(data.rodada_atual) - 1">
          <UIcon name="uil:angle-left" class="w-5 h-5 cursor-pointer"
            :class="{ 'opacity-40': data.rodada_atual === 1 }" />
        </button>
        <span class="font-semibold uppercase">Rodada {{ data.rodada_atual }}</span>
        <button type="button" :disabled="data.rodada_atual === 38"
          @click="data.rodada_atual = Number(data.rodada_atual) + 1">
          <UIcon name="uil:angle-right" class="w-5 h-5 cursor-pointer"
            :class="{ 'opacity-40': data.rodada_atual === 38 }" />
        </button>
      </div>
      <div class="grid lg:grid-cols-2 gap-4">
        <UCard v-for="jogo in jogosRodada" :key="jogo.id" class="p-2 flex items-center justify-center">
          <!-- <div> -->
          <div class="flex gap-4 items-center justify-center">
            <UTooltip :text="jogo.mandante.nome_popular">
              <img class="w-7" :src="jogo.mandante.escudo" alt="">
            </UTooltip>
            <UInput v-if="jogo.status === 'nao_iniciada'" size="xl" type="number" :max="9" :min="0"
              @blur="updatePlacarSimuladoMandante(jogo.id, jogo.mandante.id, Number($event.target.value))"
              :model-value="getPlacarMandante(jogo)" />
            <UTooltip v-else :text="getPlacarMandante(jogo)">
              <span class="text-3xl px-4 w-20 text-center">{{ jogo.gols_mandante }}</span>
            </UTooltip>
            X
            <UInput v-if="jogo.status === 'nao_iniciada'" size="xl" type="number" :max="9" :min="0"
              @blur="updatePlacarSimuladoVisitante(jogo.id, jogo.visitante.id, Number($event.target.value))"
              :model-value="getPlacarVisitante(jogo)" />
            <UTooltip v-else :text="getPlacarVisitante(jogo)">
              <span class="text-3xl px-4 w-20 text-center">{{ jogo.gols_visitante }}</span>
            </UTooltip>

            <UTooltip :text="jogo.visitante.nome_popular">
              <img class="w-7" :src="jogo.visitante.escudo" alt="">
            </UTooltip>
          </div>
          <!-- </div> -->
          <!-- <div v-show="simulacao.get(jogo.id)" class="flex justify-center py-2">
            Placar simulado {{ simulacao.get(jogo.id)?.placarSimuladoMandante || 0 }} x {{
            simulacao.get(jogo.id)?.placarSimuladoVisitante || 0 }}
          </div> -->
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
