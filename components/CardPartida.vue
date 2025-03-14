<template>
  <UCard class="flex items-center justify-center ">
    <div class="flex w-full justify-between pb-2">
      <div class="pb-2 flex justify-between gap-2">
        <span class="text-xs text-slate-400">{{ data }}</span>
        <span class="text-xs text-slate-400">{{ partida.hora?.substring(0, 5) }}</span>
        <span class="text-xs text-slate-400">{{ sede }}</span>
      </div>
      <Options v-if="partida.status != 'finalizada'" :partida="partida" />
    </div>
    <!-- <div> -->
    <div class="flex gap-4 items-center justify-center">
      <UTooltip :text="partida.mandante.nome_popular">
        <img class="w-7" :src="partida.mandante.escudo" alt="">
      </UTooltip>
      <UInput v-if="partida.status !== 'finalizada'" size="xl" type="number" :max="9" :min="0"
        @blur="placarMandante = Number($event.target.value)" :model-value="placarMandante" />
      <UTooltip v-else :text="simulacao.get(partida.id) ? simulacao.get(partida.id).gols_mandante : undefined">
        <span class="text-3xl px-4 w-20 text-center">{{ partida.gols_mandante }}</span>
      </UTooltip>
      X
      <UInput v-if="partida.status !== 'finalizada'" size="xl" type="number" :max="9" :min="0"
        @blur="placarVisitante = Number($event.target.value)" :model-value="placarVisitante" />
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
import { format } from 'date-fns';
import type { Tables } from '~/types/database.types';
import { type Jogo } from '~/types/jogo';

const { simulacao, salvarSimulacao } = useSimulador()

interface Props {
  partida: Jogo
}

const props = defineProps<Props>()

const data = computed(() => {
  return props.partida.data ? format(new Date(props.partida.data.split("-")), "d MMM") : 'A definir'
})


const sede = computed(() => {

  return props.partida.sede ? props.partida.sede.nome_popular : 'A definir'
})

const placarVisitante = computed({
  get() {
    if (props.partida.status === 'finalizada') {
      return props.partida.gols_visitante
    } else {
      return simulacao.value.get(props.partida.id)?.gols_visitante
    }
  },
  async set(value: number) {
    const schema = {
      partida: props.partida.id,
      gols_mandante: placarMandante.value,
      gols_visitante: value
    } as Tables<'simulacao'>

    await salvarSimulacao(schema)
  }
})


const placarMandante = computed({
  get() {
    if (props.partida.status === 'finalizada') {
      return props.partida.gols_mandante
    } else {
      return simulacao.value.get(props.partida.id)?.gols_mandante
    }
  },
  async set(value: number) {

    const schema = {
      partida: props.partida.id,
      gols_mandante: value,
      gols_visitante: placarVisitante.value
    } as Tables<'simulacao'>

    await salvarSimulacao(schema)
  }
})


</script>

<style></style>