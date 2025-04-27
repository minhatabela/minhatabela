<script setup lang="ts">

import { type PartidaConsistencia } from '~/types/partida';
import type { ISede } from '~/types/sede';

interface FormEditarPartidaProps {
  partida: PartidaConsistencia,
}

const props = defineProps<FormEditarPartidaProps>()

const { sedes, refreshSedes } = useApi()

const opened = defineModel('opened', {
  type: Boolean,
  default: false
})

const sedesDrodpwn = computed(() => {
  return sedes.value.map((sede: ISede) => {
    return {
      label: sede.nome_popular,
      value: sede.id
    }
  })
})

const hasInconsistentGoals = computed(() => {
  return !!props.partida.inconsistencias.gols_mandante || !!props.partida.inconsistencias.gols_visitante
})

const hasInconsistentSede = computed(() => {
  return !!props.partida.inconsistencias.sede
})

const hasInconsistentDateTime = computed(() => {
  return !!props.partida.inconsistencias.data || !!props.partida.inconsistencias.hora
})

const hasIconsistentSedeInDB = computed(() => {
  return sedes.value.find((sede: ISede) => sede.key?.toString() === props.partida.inconsistencias.sede?.toString())
})

const { execute: cerateSede, status } = useAsyncData('createSede', async () => {

  const [nome_popular, cidade, estado] = props.partida.inconsistencias.sede!.split('-')

  const { error, data }  = await useSupabaseClient().from('sede').insert({
    nome_popular: nome_popular.trim(),
    cidade: cidade.trim(),
    key: props.partida.inconsistencias.sede,
  })

  if (error) {
    toast.add({
      title: 'Erro ao criar sede',
      description: 'Ocorreu um erro ao criar a sede.',
      color: 'error',
      icon: 'i-lucide-alert',
    })
  }

  
  return data
  

}, {immediate: false})

const toast = useToast()
watch(status, (newStatus) => {
  if (newStatus === 'success') {
    refreshSedes()
  }
})

</script>

<template>
  <USlideover v-model:open="opened" class="rounded-lg">
    <template #header>
      <h1 class="text-lg font-semibold">Editar partida</h1>
    </template>

    <template #body>
      <div class="flex flex-col gap-4">
        <div>
          <h2 class="text-2xl mb-3">Clubes</h2>
          <div class="flex gap-2 w-full items-center justify-between">
            <div class="flex gap-2 items-center">
              <img class="h-10" :src="partida.mandante.escudo!" size="lg" />
              {{ partida.mandante.nome_popular }}
            </div>
            <UIcon class="text-2xl" name="i-lucide-x" />
            <div class="flex gap-2 items-center">
              {{ partida.visitante.nome_popular }}
              <img class="h-10" :src="partida.visitante.escudo!" size="lg" />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-center justify-between text-2xl">
            <h2 class="text-2xl">Gols</h2>
            <UBadge v-if="hasInconsistentGoals" trailingIcon="i-lucide-replace" class="rounded-full" color="warning"
              variant="subtle"
              :label="`Resultado oficial: ${Number(partida.inconsistencias.gols_mandante)} x ${Number(partida.inconsistencias.gols_visitante)}`" />
          </div>
          <div class="flex gap-4">
            <label class="flex flex-col gap-2 w-full">
              Gols mandante
              <UInput v-model="partida.gols_mandante" type="number" />
            </label>
            <label class="flex flex-col gap-2 w-full text-end">
              Gols visitante
              <UInput v-model="partida.gols_visitante" type="number" />
            </label>
          </div>
        </div>
        <div class="flex gap-2 items-center justify-between text-2xl">
          <h2 class="text-2xl">Sede</h2>
          <UBadge v-if="hasInconsistentSede && !hasIconsistentSedeInDB" trailingIcon="i-lucide-plus"
          @click="cerateSede"
            class="rounded-full cursor-pointer" :class="{'animate-pulse': status === 'pending'}" color="info" variant="subtle" :label="`Criar sede ${partida.inconsistencias.sede}`" />
          <UBadge v-else-if="hasInconsistentSede && hasIconsistentSedeInDB" trailingIcon="i-lucide-replace"
            class="rounded-full cursor-pointer" color="warning" variant="subtle"
            :label="`Sede oficial: ${partida.inconsistencias.sede}`" />
        </div>
        <label class="flex flex-col gap-2 w-full">
          Sede
          <USelect v-model="partida.sede.id" :items="sedesDrodpwn" placeholder="Selecione a sede" />
        </label>
        <div class="flex gap-2 items-center justify-between text-2xl">
          <h2>Data e hora</h2>
          <UBadge v-if="hasInconsistentDateTime" trailingIcon="i-lucide-replace" class="rounded-full" color="warning"
            variant="subtle"
            :label="`Date e hora oficiais: ${partida.inconsistencias.data} ${partida.inconsistencias.hora}`" />

        </div>
        <div class="flex gap-4">
          <label class="flex flex-col gap-2 w-3/2">
            Data
            <UInput v-model="partida.data" type="date" placeholder="Selecione a data" />
          </label>
          <label class="flex flex-col gap-2">
            Hora
            <UInput v-model="partida.hora" type="time" placeholder="Selecione a data" />
          </label>
        </div>
      </div>

    </template>

    <template #footer>
      <UButton variant="ghost" @click="opened = false">Fechar</UButton>
    </template>
  </USlideover>
</template>