<template>
  <UCard variant="subtle">
    <UTable :loading="status !== 'success'" :data="data?.partidas" :columns="colunas">
      <template #mandante_nome_popular-cell="{ getValue, row }">
        <UBadge class="rounded-full" variant="subtle" color="neutral" size="lg"
          :avatar="{ src: row.original.mandante.escudo }">{{
            getValue() }}</UBadge>
      </template>
      <template #visitante_nome_popular-cell="{ getValue, row }">
        <UBadge class="rounded-full" variant="subtle" color="neutral" size="lg"
          :avatar="{ src: row.original.visitante.escudo }">{{
            getValue() }}</UBadge>
      </template>
      <template #status-cell="{ getValue, row }">
        <UBadge class="rounded-full" variant="subtle" :icon="statusPartida[getValue()].icon" :color="statusPartida[getValue()].color" size="lg"
          >{{
            statusPartida[getValue()].label }}</UBadge>
      </template>
      <template #inconsistencias-cell="{ getValue, row }">
        <UButton @click="setPickedPartida(row.original)" class="rounded-full"  variant="ghost" :icon="Object.values(getValue()).length ? 'i-lucide-circle-alert' : 'i-lucide-check-circle'" :class="Object.values(getValue()).length ? 'text-yellow-700' : 'text-green-700'"  />
      </template>
      <template #data-cell="{ getValue, row }">
        {{ format(new Date(getValue().split('-')),'d MMM', { locale: ptBR} ) + ' ' + row.original.hora.substring(0, 5) }}
      </template>
      <template #actions-cell="{ row }">
        <UButton color="neutral" variant="ghost" :icon="'i-lucide-pencil'" @click="setPickedPartida(row.original)"  />
      </template>
    </UTable>
  </UCard>
  <FormEditarPartida :partida="pickedPartida" @refresh="refresh" v-model:opened="opened" />
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { IPartida, PartidaConsistencia } from '~/types/partida';
definePageMeta({
  middleware: ['auth']
})

const pickedPartida = ref()

const opened = ref(false)

const { data, status, refresh } = useLazyAsyncData('partidas', () => $fetch('/api/admin/partidas'))

const colunas: TableColumn<IPartida>[] = [
  { header: '', accessorKey: 'inconsistencias' },
  { header: '#', accessorKey: 'numero' },
  { header: 'Rodada', accessorKey: 'rodada' },
  { header: 'Data e hora', accessorKey: 'data' },
  {
    header: 'Mandante',
    accessorKey: 'mandante.nome_popular',
  },
  { header: 'Visitante', accessorKey: 'visitante.nome_popular' },
  { header: 'Gols mandante', accessorKey: 'gols_mandante' },
  { header: 'Gols visitante', accessorKey: 'gols_visitante' },
  { header: 'Sede', accessorKey: 'sede.nome_popular' },
  { header: 'Status', accessorKey: 'status' },
  { header: '', id: 'actions' },
]

const statusPartida = {
  finalizada: { label: 'Finalizada', color: 'success', icon: 'i-lucide-check-circle' },
  nao_iniciada: { label: 'Não iniciada', color: 'neutral', icon: 'i-lucide-pause' },
}

function setPickedPartida(partida: PartidaConsistencia) {
  pickedPartida.value = partida
  opened.value = true
}
</script>

<style></style>