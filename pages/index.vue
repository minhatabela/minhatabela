<script setup lang="ts">

const { data } = await useAsyncData(
  'jogos',
  () => $fetch(
    'https://api.gcn.ge.globo.com/api/simuladores/estado-campeonato/campeonato-brasileiro/campeonato-brasileiro-2024/', {
    method: 'GET'
  })
)

const { equipes, jogos, sedes } = data.value

const tabela = computed(() => {
  return useOrderBy(Object.keys(equipes).map(Number).map(calculaStatsEquipe), ['pontos', 'vitorias', 'diferenca_gols', 'gols_pro'], ['desc', 'desc', 'desc', 'desc'])
})

function calculaStatsEquipe(equipe_id: number) {
  const jogos_equipe = filtraJogosEquipe(equipe_id)

  const gols_pro_mandante = jogos_equipe
    .filter(jogo => jogo.equipe_mandante.id === equipe_id)
    .map(jogo => jogo.placar_oficial_mandante)
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)

  const gols_contra_mandante = jogos_equipe
    .filter(jogo => jogo.equipe_mandante.id === equipe_id)
    .map(jogo => jogo.placar_oficial_visitante)
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)

  const gols_pro_visitante = jogos_equipe
    .filter(jogo => jogo.equipe_visitante.id === equipe_id)
    .map(jogo => jogo.placar_oficial_visitante)
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)

  const gols_contra_visitante = jogos_equipe
    .filter(jogo => jogo.equipe_visitante.id === equipe_id)
    .map(jogo => jogo.placar_oficial_mandante)
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)

  const vitorias = jogos_equipe
    .filter(jogo => jogo.vencedor_jogo === equipe_id)

  const empates = jogos_equipe
    .filter(jogo => jogo.empate)

  return {
    gols_pro: gols_pro_mandante + gols_pro_visitante,
    gols_contra: gols_contra_mandante + gols_contra_visitante,
    vitorias: vitorias.length,
    empates: empates.length,
    derrotas: Math.abs((vitorias.length + empates.length) - jogos_equipe.length),
    pontos: vitorias.length * 3 + empates.length,
    diferenca_gols: (gols_pro_mandante + gols_pro_visitante) - (gols_contra_mandante + gols_contra_visitante),
    equipe: equipes[equipe_id].nome_popular,
    partidas: jogos_equipe.length,
    clube_url: equipes[equipe_id].escudo.svg,
  }

}

function filtraJogosEquipe(equipe_id: number) {
  const contemEquipe = (jogo) => jogo.equipe_mandante.id === equipe_id || jogo.equipe_visitante.id === equipe_id
  return Object.values(jogos || {}).filter(contemEquipe)//.filter(jogo => jogo.is_finalizado)
}

const columns: { key: string, label: string }[] = [
  {
    label: '#',
    key: 'posicao'
  },
  {
    label: 'Clube',
    key: 'equipe'
  },
  {
    label: 'PTS',
    key: 'pontos'
  },
  {
    label: 'V',
    key: 'vitorias'
  },
  {
    label: 'E',
    key: 'empates'
  },
  {
    label: 'D',
    key: 'derrotas'
  },
  {
    label: 'P',
    key: 'partidas'
  },
  {
    label: 'GP',
    key: 'gols_pro'
  },
  {
    label: 'GC',
    key: 'gols_contra'
  },
  {
    label: 'Diff',
    key: 'diferenca_gols'
  }
]

function badgeColor(position: number) {
  if (position >= 1 && position <= 6) return 'green'  // libertadores
  if (position >= 7 && position <= 8) return 'orange' // pré libertadores
  if (position >= 9 && position <= 14) return 'blue'  // sudamericana
  if (position >= 15 && position <= 16) return 'white' 
  if (position >= 17 && position <= 20) return 'red'  // rebaixamento
}

</script>

<template>
  <div class="max-w-3xl">
    <UCard>
      <UTable :columns="columns" :rows="tabela">
        <template #posicao-data="{ row }">
          <UBadge :color="badgeColor(tabela.indexOf(row) + 1)" :ui="{ rounded: 'rounded-full' }"
            :label="tabela.indexOf(row) + 1" />
        </template>
        <template #equipe-data="{ row }">
          <div style="display: flex; gap: 8px; ">
            <img style="width: 20px;" :src="row.clube_url" alt="">
            {{ row.equipe }}
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<style>
td {
  @apply !py-2
}
</style>
