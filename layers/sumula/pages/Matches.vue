<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { useLazyAsyncData } from 'nuxt/app'
import { computed, onMounted, provide, ref } from 'vue'
import type { Match } from '../../shared/entities/Match'
import { usePredictionsStore } from '../../predictions/application/stores/Predictions.store'
import { MatchSchema } from '../../shared/schemas/Match.schema'
import { MatchesViewModel } from '../viewmodels/Matches.viewmodel'
import { TeamSchema } from '../../shared/schemas/Team.schema'

onMounted(() => (usePredictionsStore().syncing = false))

definePageMeta({
  middleware: ['auth']
})

const vm = new MatchesViewModel()
provide('matches-view-model', vm)

const opened = ref(false)

const { data, status, refresh } = useLazyAsyncData(
  'partidas-admin',
  () => $fetch('/api/seasonMatches'),
  {
    transform: response => MatchSchema.array().parse(response)
  }
)

const { data: teams } = useLazyAsyncData('generate/teams', () => $fetch('/api/allTeams'), {
  transform: response => TeamSchema.array().parse(response)
})

const items = computed(() =>
  teams.value?.map(team => {
    return { label: team.name, value: team.id }
  })
)

const colunas: TableColumn<Match>[] = [
  { header: 'Rodada', accessorKey: 'round' },
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
  vm.selectedMatch.value = partida
  opened.value = true
}

const homeTeam = ref()

const filteredMatches = computed(() => {
  if (!homeTeam.value) return data.value

  return data.value?.filter(match => match.homeTeam.id === homeTeam.value)
})
</script>

<template>
  <div>
    <USelectMenu
      v-model="homeTeam"
      value-key="value"
      :items="items"
      placeholder="Selecione o mandante"
      clear
      class="mb-4"
    />
    <UCard variant="subtle">
      <UTable
        :loading="status !== 'success'"
        :data="filteredMatches"
        :columns="colunas"
      >
        <template #homeTeam_name-cell="{ getValue, row }">
          <div class="flex justify-end">
            <TeamBadge
              reverse
              :name="getValue()"
              :emblem="row.original.homeTeam.emblem"
            />
          </div>
        </template>
        <template #awayTeam_name-cell="{ getValue, row }">
          <div class="flex justify-start">
            <TeamBadge
              :name="getValue()"
              :emblem="row.original.awayTeam.emblem"
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
      @refresh="refresh"
    />
  </div>
</template>
<style></style>
