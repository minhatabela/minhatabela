<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { useLazyAsyncData } from 'nuxt/app'
import { onMounted, ref } from 'vue'
import type { Match } from '../../shared/entities/Match'
import { usePredictionsStore } from '../../predictions/application/stores/Predictions.store'
import { MatchMap } from '../../standings/infra/mappers/Match.map'

onMounted(() => (usePredictionsStore().syncing = false))

definePageMeta({
  middleware: ['auth']
})

const pickedPartida = ref()

const opened = ref(false)

const { data, status, refresh } = useLazyAsyncData(
  'partidas-admin',
  () => $fetch('/api/seasonMatches'),
  {
    transform: response => (response as any[])?.map(team => new MatchMap().mapTo(team))
  }
)

const colunas: TableColumn<Match>[] = [
  { header: 'Rodada', accessorKey: 'round.value' },
  { header: 'Data e hora', accessorKey: 'realizationDateTime' },
  {
    header: 'Mandante',
    accessorKey: 'homeTeam.name'
  },
  { header: 'Gols mandante', accessorKey: 'homeGoals' },
  { header: 'Gols visitante', accessorKey: 'awayGoals' },
  { header: 'Visitante', accessorKey: 'awayTeam.name' },
  { header: 'Sede', accessorKey: 'vanue.name' },
  { header: 'Status', accessorKey: 'status' },
  { header: '', id: 'actions' }
]

function setPickedPartida(partida: Match) {
  pickedPartida.value = partida
  opened.value = true
}
</script>

<template>
  <div>
    <UCard variant="subtle">
      <UTable
        :loading="status !== 'success'"
        :data="data"
        :columns="colunas"
      >
        <template #mandante_nome_popular-cell="{ getValue, row }">
          <TeamBadge
            :name="getValue()"
            :emblem="row.original.mandante.escudo"
          />
        </template>
        <template #visitante_nome_popular-cell="{ getValue, row }">
          <div class="flex justify-end">
            <TeamBadge
              :name="getValue()"
              :emblem="row.original.visitante.escudo"
            />
          </div>
        </template>
        <template #status-cell="{ row }">
          <UBadge
            class="rounded-full"
            variant="subtle"
            :icon="row.original.status.icon"
            :color="row.original.status.color"
            size="lg"
            >{{ row.original.status.label }}</UBadge
          >
        </template>
        <template #inconsistencias-cell="{ getValue, row }">
          <UButton
            class="rounded-full"
            variant="ghost"
            :icon="
              Object.values(getValue()).length ? 'i-lucide-circle-alert' : 'i-lucide-check-circle'
            "
            :class="Object.values(getValue()).length ? 'text-yellow-700' : 'text-green-700'"
            @click="setPickedPartida(row.original)"
          />
        </template>
        <template #actions-cell="{ row }">
          <UButton
            color="neutral"
            variant="ghost"
            :icon="'i-lucide-pencil'"
            @click="setPickedPartida(row.original)"
          />
        </template>
      </UTable>
    </UCard>
    <FormEditarPartida
      v-model:opened="opened"
      :partida="pickedPartida"
      @refresh="refresh"
    />
  </div>
</template>
<style></style>
