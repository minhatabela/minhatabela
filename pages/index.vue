<script setup lang="ts">

const { columns } = useSimulador()

const { data, execute } = useAsyncData(
  'jogos',
  () => $fetch(
    'https://api.gcn.ge.globo.com/api/simuladores/estado-campeonato/campeonato-brasileiro/campeonato-brasileiro-2024/', {
    method: 'GET'
  })
)

onBeforeMount(async () => {
  await execute()
})

// const { equipes, jogos, sedes, rodada_atual } = toRefs(data.value || { equipes: {}, rodada_atual: 0, sedes: {}, jogos: {} }) 

import type { Jogo } from '~/types/jogo';
import { filtraEmpates, filtraVitorias, golsContra, golsPro } from '../utils/tabela';

const jogosRodada = computed<Jogo[]>(() => {
  return Object.values(data?.value?.jogos || {}).filter(jogo => jogo.rodada === data?.value?.rodada_atual)
})

const tabela = computed(() => {
  return useOrderBy(statsByEquipe.value, ['pontos', 'vitorias', 'diferenca_gols', 'gols_pro'], ['desc', 'desc', 'desc', 'desc'])
})

const statsByEquipe = computed(() => {
  return Object.keys(data?.value?.equipes || {}).map(Number).map(equipeId => calculaStatsEquipe(equipeId))
})

function calculaStatsEquipe(equipe_id: number) {
  const jogos_equipe = filtraJogosEquipe(equipe_id)

  const vitorias = filtraVitorias(jogos_equipe, equipe_id)

  const empates = filtraEmpates(jogos_equipe, equipe_id)

  return {
    gols_pro: golsPro(jogos_equipe, equipe_id),
    gols_contra: golsContra(jogos_equipe, equipe_id),
    vitorias: vitorias.length,
    empates: empates.length,
    derrotas: Math.abs((vitorias.length + empates.length) - jogos_equipe.length),
    pontos: vitorias.length * 3 + empates.length,
    diferenca_gols: golsPro(jogos_equipe, equipe_id) - golsContra(jogos_equipe, equipe_id),
    equipe: data?.value?.equipes[equipe_id].nome_popular,
    partidas: jogos_equipe.length,
    clube_url: data?.value?.equipes[equipe_id].escudo.svg,
  }

}

function filtraJogosEquipe(equipe_id: number): Jogo[] {
  const contemEquipe = (jogo: Jogo) => jogo.equipe_mandante.id === equipe_id || jogo.equipe_visitante.id === equipe_id
  return Object.values(data?.value?.jogos || {}).filter(contemEquipe)//.filter(jogo => jogo.is_finalizado)
}



function badgeColor(position: number) {
  if (position >= 1 && position <= 6) return 'green'  // libertadores
  if (position >= 7 && position <= 8) return 'orange' // pré libertadores
  if (position >= 9 && position <= 14) return 'blue'  // sudamericana
  if (position >= 15 && position <= 16) return 'white'
  if (position >= 17 && position <= 20) return 'red'  // rebaixamento
}

</script>

<template>
  <Suspense>

    <div class="flex flex-col xl:flex-row gap-8 lg:px-0 px-8 justify-center">
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
          <UCard v-for="jogo in jogosRodada" :key="jogo.id">
            <div>
              <div class="flex gap-4 items-center justify-center">
                <!-- <span>{{ jogo.equipe_mandante.sigla }}</span> -->
                <img class="w-7" :src="jogo.equipe_mandante.escudo.svg" alt="">
                <UInput size="xl" type="number" :max="9" :min="0" v-model.number="jogo.placar_oficial_mandante" />
                X
                <UInput size="xl" type="number" :max="9" :min="0" v-model.number="jogo.placar_oficial_visitante" />
                <img class="w-7" :src="jogo.equipe_visitante.escudo.svg" alt="">
                <!-- <span>{{ jogo.equipe_visitante.sigla }}</span> -->
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </Suspense>
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
