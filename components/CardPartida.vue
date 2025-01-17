<template>
  <UCard class="flex items-center justify-center">
    <div class="flex w-full justify-between pb-2">
      <div class="pb-2 flex justify-between gap-2">
        <span class="text-xs text-slate-400">{{ new Date(partida.data).toLocaleDateString('pt-BR', {
          day: '2-digit', month: 'short',
          hour: '2-digit', minute: '2-digit'
        })
          }}</span>
        <span class="text-xs text-slate-400">{{ partida.sede.nome_popular }}</span>
      </div>
      <Options v-if="partida.status != 'finalizada'" :partida="partida" />
    </div>
    <!-- <div> -->
    <div class="flex gap-4 items-center justify-center">
      <UTooltip :text="partida.mandante.nome_popular">
        <img class="w-7" :src="partida.mandante.escudo" alt="">
      </UTooltip>
      <UInput v-if="partida.status !== 'finalizada'" size="xl" type="number" :max="9" :min="0"
        @blur="simularPartida(partida, partida.mandante.id, Number($event.target.value))"
        :model-value="getPlacarMandante(partida)" />
      <UTooltip v-else :text="simulacao.get(partida.id) ? simulacao.get(partida.id).gols_mandante : undefined">
        <span class="text-3xl px-4 w-20 text-center">{{ partida.gols_mandante }}</span>
      </UTooltip>
      X
      <UInput v-if="partida.status !== 'finalizada'" size="xl" type="number" :max="9" :min="0"
        @blur="simularPartida(partida, partida.visitante.id, Number($event.target.value))"
        :model-value="getPlacarVisitante(partida)" />
      <UTooltip v-else :text="simulacao.get(partida.id) ? simulacao.get(partida.id).gols_visitante : undefined">
        <span class="text-3xl px-4 w-20 text-center">{{ partida.gols_visitante }}</span>
      </UTooltip>

      <UTooltip :text="partida.visitante.nome_popular">
        <img class="w-7" :src="partida.visitante.escudo" alt="">
      </UTooltip>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
import { type Jogo } from '~/types/jogo';

const { simulacao, simularPartida } = useSimulador()

interface Props {
  partida: Jogo
}

defineProps<Props>()

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

<style></style>