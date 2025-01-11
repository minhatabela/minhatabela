<script setup lang="ts">
useHead({
  title: "Simulando · minhatabela"
})

import { type Jogo } from '~/types/jogo';

const { data, partidas, clubes } = useApi()
const { columns, tabela } = useTabela()
const { jogosRodada, simulacao, simularPartida, rodada_atual } = useSimulador()

function getPlacarMandante(jogo: Jogo) {
  if (jogo.gols_mandante) {
    return jogo.gols_mandante
  } else if (simulacao.value.get(jogo.id)) {
    return simulacao.value.get(jogo.id).gols_mandante
  }

  return undefined
}

function getPlacarVisitante(jogo: Jogo) {
  console.log('placar visitante: ', jogo)
  if (jogo.gols_visitante) {
    return jogo.gols_visitante
  } else if (simulacao.value.get(jogo.id)) {
    return simulacao.value.get(jogo.id).gols_visitante
  }

  return undefined
}


</script>

<template>
  <div class="flex flex-col xl:flex-row gap-8 lg:px-0 px-8 ">
    <div>

      <ToggleSensitive label="tabela">
        <Table :columns="columns" :tabela="tabela" />
      </ToggleSensitive>

    </div>
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <button :disabled="rodada_atual === 1" @click="rodada_atual = Number(rodada_atual) - 1">
          <UIcon name="uil:angle-left" class="w-5 h-5 cursor-pointer" :class="{ 'opacity-40': rodada_atual === 1 }" />
        </button>
        <span class="font-semibold uppercase">Rodada {{ rodada_atual }}</span>
        <button type="button" :disabled="rodada_atual === 38" @click="rodada_atual = Number(rodada_atual) + 1">
          <UIcon name="uil:angle-right" class="w-5 h-5 cursor-pointer" :class="{ 'opacity-40': rodada_atual === 38 }" />
        </button>
      </div>
      <div class="grid lg:grid-cols-2 gap-4">
        <UCard v-for="jogo in jogosRodada" :key="jogo.id" class="flex items-center justify-center">
          <div class="flex w-full justify-between pb-2">
            <div class="pb-2 flex justify-between gap-2">
              <span class="text-xs text-slate-400">{{ new Date(jogo.data).toLocaleDateString('pt-BR', {
                day: '2-digit', month: 'short',
                hour: '2-digit', minute: '2-digit'
                })
                }}</span>
              <span class="text-xs text-slate-400">{{ jogo.sede.nome_popular }}</span>
            </div>
            <Options v-if="jogo.status != 'finalizada'" :partida="jogo" />
          </div>
          <!-- <div> -->
          <div class="flex gap-4 items-center justify-center">
            <UTooltip :text="jogo.mandante.nome_popular">
              <img class="w-7" :src="jogo.mandante.escudo" alt="">
            </UTooltip>
            <UInput v-if="jogo.status !== 'finalizada'" size="xl" type="number" :max="9" :min="0"
              @blur="simularPartida(jogo, jogo.mandante.id, Number($event.target.value))"
              :model-value="getPlacarMandante(jogo)" />
            <UTooltip v-else :text="simulacao.get(jogo.id) ? simulacao.get(jogo.id).gols_mandante : undefined">
              <span class="text-3xl px-4 w-20 text-center">{{ jogo.gols_mandante }}</span>
            </UTooltip>
            X
            <UInput v-if="jogo.status !== 'finalizada'" size="xl" type="number" :max="9" :min="0"
              @blur="simularPartida(jogo, jogo.visitante.id, Number($event.target.value))"
              :model-value="getPlacarVisitante(jogo)" />
            <UTooltip v-else :text="simulacao.get(jogo.id) ? simulacao.get(jogo.id).gols_visitante : undefined">
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
