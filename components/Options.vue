<template>
  <div>
    <UPopover mode="hover">
        <Icon name="mage:dots" class="cursor-pointer"  />
      <template #content>
        <div class="flex flex-col">
          <span @click="atribuirVitoriaSimplesMandante"
            class="px-4 flex gap-2 items-center py-2 dark:hover:bg-slate-700 hover:bg-slate-100 cursor-pointer">
            <img class="h-6 w-6" :src="partida.mandante.escudo" alt="">
            {{
            partida.mandante.nome_popular }} vence</span>
          <span @click="atribuirVitoriaSimplesVisitante"
            class="px-4 flex gap-2 items-center py-2 hover:dark:bg-slate-700 hover:bg-slate-100 cursor-pointer">
            <img class="h-6 w-6" :src="partida.visitante.escudo" alt="">
            {{
            partida.visitante.nome_popular }} vence</span>
          <span @click="decretarEmpateSimples"
            class="px-4 flex gap-2 items-center py-2 dark:hover:bg-slate-700 hover:bg-slate-100 cursor-pointer">
            <Icon size="1.5rem" name="simple-line-icons:minus" />
            Empate
          </span>
          <USeparator v-if="partida.status != 'finalizada' && simulacao.get(partida.id)" class="py-1" />
          <span @click="confirm = true" v-if="partida.status != 'finalizada' && !confirm && simulacao.get(partida.id)"
            class="px-4 flex gap-2 items-center py-2 dark:hover:bg-slate-700 hover:bg-slate-100 cursor-pointer text-red-500">
            <Icon size="1.5rem" name="mynaui:trash" />

            Limpar
            simulação
          </span>
          <span @click="limparSimulacao(partida.id)" v-if="partida.status != 'finalizada' && confirm"
            class="px-4 flex gap-2 items-center py-2 dark:hover:bg-slate-700 hover:bg-slate-100 cursor-pointer text-amber-500">
            <Icon size="1.5rem" name="iconamoon:attention-circle-fill" />

            Confirmar
          </span>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<script lang="ts" setup>

import { type Partida } from '../types/partida';

const { simulacao, salvarSimulacao, removerSimulacao } = useSimulador()

const confirm = ref(false)

interface Props {
  partida: Partida
}
const props = defineProps<Props>()

async function atribuirVitoriaSimplesMandante() {
  await salvarSimulacao({
    id: simulacao.value.get(props.partida.id)?.id || undefined,
    partida: props.partida.id,
    gols_mandante: 1,
    gols_visitante: 0
  });
}

async function atribuirVitoriaSimplesVisitante() {
  await salvarSimulacao({
    id: simulacao.value.get(props.partida.id)?.id || undefined,
    partida: props.partida.id,
    gols_mandante: 0,
    gols_visitante: 1
  });
}

async function decretarEmpateSimples() {
  await salvarSimulacao({
    id: simulacao.value.get(props.partida.id)?.id || undefined,
    partida: props.partida.id,
    gols_mandante: 0,
    gols_visitante: 0
  });
}

async function limparSimulacao(partidaId: string) {
  await removerSimulacao(partidaId)
  confirm.value = false
}


</script>

<style scoped></style>