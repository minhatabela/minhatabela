<template>

  <Title>Consistencia Admin </Title>

  <section class="px-4 flex flex-col gap-12">
    <article>
      <h1 class="text-2xl font-bold">Consistência de dados</h1>
      <p class="text-slate-400">Verifique se os dados do minhatabela estão atualizados com dados oficiais.</p>
    </article>
    <main>
      <h2 class="text-xl font-semibold pb-2">Rodada {{ rodada }}</h2>
      <UTabs :items="items" v-model="tabIndex" />
      <div class="grid grid-cols-3 gap-4 my-6">
        <CardChange v-for="item in Object.keys(groupByPartida)" :key="item" :item="groupByPartida[item]"
          @setNumeroPartida="partida = $event" />
      </div>
      <div class="flex justify-center">
        <UPagination v-model="rodada" :page-count="1" :total="6" />
      </div>
    </main>

  </section>
  <USlideover v-model="opened" class="rounded-lg">
    <UCard class="h-full" v-if="objetoPartida">
      <template #header>
        <UBadge color="neutral" class="mb-2">Partida 1</UBadge>
        <h3 class="text-xl text-bold">Corrigir dados da partida</h3>
        <div class="flex items-center justify-center gap-4 mt-10">
          <img class="h-16 w-16" :src="objetoPartida.mandante.escudo" :alt="objetoPartida.mandante.nome_popular">
          x
          <img class="h-16 w-16" :src="objetoPartida.visitante.escudo" :alt="objetoPartida.visitante.nome_popular">
        </div>
      </template>

      <p>Data e hora</p>
      <div class="flex gap-4">
        <UPopover v-if="dadoOficial.data" :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(dadoOficial.data, 'd MMM, yyy')" />
          <template #content="{ close }">
            <DatePicker v-model="dadoOficial.data" is-required @close="close" />
          </template>
        </UPopover>
        <UPopover v-if="dadoOficial.hora" :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-clock" :label="format(dadoOficial.hora, 'HH:mm')" />
          <template #content="{ close }">
            <DatePicker mode="time" v-model="dadoOficial.data" is-required @close="close" />
          </template>
        </UPopover>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <UButton @click="aceitarCorrecao">Corrigir</UButton>
        </div>
      </template>
    </UCard>
  </USlideover>
</template>

<script lang="ts" setup>

definePageMeta({
  middleware: ['auth']
})

import { format } from 'date-fns'
import type { Jogo } from '~/types/jogo'
const client = useSupabaseClient()
const toast = useToast()



const partida = ref(undefined)
const opened = ref(false)

const dadoOficial = ref({
  data: undefined,
  hora: undefined
})

watch(partida, (value) => {
  if (value) {
    opened.value = true


    const strHora = groupByPartida.value[value].find(f => f.path[1] === 'hora')?.value.trim().split(":").map(Number)
    const hora = new Date(new Date(new Date().setHours(strHora[0])).setMinutes(strHora[1]))

    dadoOficial.value.data = new Date(groupByPartida.value[value].find(f => f.path[1] === 'data')?.value.trim().split("/").reverse()) || undefined
    dadoOficial.value.hora = hora


  } else {
    opened.value = false
  }
})

watch(opened, (value) => {
  if (!value) {
    partida.value = undefined
  }
})

const objetoPartida = computed(() => {
  return partidas?.value?.find((ptd: Jogo) => ptd.numero === Number(partida.value))
})

async function aceitarCorrecao() {
  const { data, error } = await client.from('partida').update({
    data: dadoOficial.value.data?.toISOString(),
    hora: format(dadoOficial.value.hora, "HH:mm")
  }).eq('id', objetoPartida.value.id)

  if (error) {
    toast.add({
      title: "Deu ruim!",
      description: "Moiô ao tentar atualizar partida :(",
      icon: "i-ic-baseline-thumb-down",
      color: "error"
    })

  } else {
    toast.add({
      title: "Boa!",
      description: "Partida atualizada com sucesso!",
      icon: "i-ic-baseline-thumb-up",
      color: 'success'
    })
    refresh()
    opened.value = false

  }
}

const index = {
  'CREATE': 0,
  'REMOVE': 1,
  'CHANGE': 2,
}

const reverseIndex = {
  0: 'CREATE',
  1: 'REMOVE',
  2: 'CHANGE',
}

const selectedType = computed(() => {
  return reverseIndex[tabIndex.value] || 'CREATE'
})



const tabIndex = ref(0)
const rodada = ref(1)

const urlPartida = computed(() => `/api/partidas?rodada=${rodada.value}`)
const { data: partidas } = useAsyncData('partidas', () => $fetch(urlPartida.value), { watch: [rodada] })
const url = computed(() => `/api/consistencia/${rodada.value}`)
const { data: consistencia, status, clear, error, refresh } = useAsyncData('consistencia', () => $fetch(url.value), { watch: [rodada] })

watch(status, () => {
  if (status.value === 'success') {
    if (group.value.CREATE) tabIndex.value = index.CREATE
    else if (group.value.REMOVE) tabIndex.value = index.REMOVE
    else tabIndex.value = index.CHANGE
  }
})

const group = computed(() => {
  return useGroupBy(consistencia.value || [], 'type')
})

const groupByPartida = computed(() => {
  return useGroupBy(group.value[selectedType.value] || [], 'path.0')
})

const items = [{
  label: 'Criar',
  icon: 'i-mingcute-add-fill',
  disabled: !group.value.CREATE,
  content: 'Os dados a seguir precisam ser criados na base do minhatabela',
}, {
  label: 'Remover',
  icon: 'i-gg-remove',
  disabled: !group.value.REMOVE,
  content: 'Os dados a seguir precisam ser removidos da base do minhatabela',
}, {
  label: 'Alterar',
  icon: 'i-ic-baseline-edit',
  disabled: !group.value.CHANGE,
  content: 'Os dados a seguir precisam ser alterados na base do minhatabela',
}]
</script>

<style></style>