<script setup lang="ts">
import { format } from 'date-fns'

interface ObjetoPartida {
  numero: number
  mandante: {
    escudo: string
    nome_popular: string
  }
  visitante: {
    escudo: string
    nome_popular: string
  }
}

interface DadoOficial {
  data: Date | undefined
  hora: Date | undefined
}

defineProps<{
  objetoPartida: ObjetoPartida
  dadoOficial: DadoOficial
}>()

const emit = defineEmits(['corrigir'])

const opened = defineModel('opened', {
  type: Boolean,
  default: false
})

</script>

<template>
  <USlideover v-model:open="opened" class="rounded-lg">
    <template #header>
      <div class="flex flex-col w-full gap-4">
        <UBadge color="neutral" class="mb-2 w-fit">Partida {{ objetoPartida?.numero }}</UBadge>
        <h3 class="text-xl text-bold">Corrigir dados da partida</h3>
        <div class="flex items-center justify-center w-full gap-4 mt-10">
          <img class="h-16 w-16" :src="objetoPartida?.mandante.escudo" :alt="objetoPartida?.mandante.nome_popular">
          x
          <img class="h-16 w-16" :src="objetoPartida?.visitante.escudo" :alt="objetoPartida?.visitante.nome_popular">
        </div>
      </div>
    </template>
    <template #body>
      <p>Novas data e hora</p>
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
    </template>
    <template #footer>
      <div class="flex justify-end">
        <UButton @click="emit('corrigir')">Corrigir</UButton>
      </div>
    </template>
  </USlideover>


</template>