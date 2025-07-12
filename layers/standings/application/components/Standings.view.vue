<script setup lang="ts">
import { Standings } from '../../domain/entities/Standings'
import { TableViewEnum } from '../../domain/enums/TableView.enum'
import { StandignsHeaderFactory } from '../../domain/factories/StandingsHeader.factory'
import { StandingsMatchesFactory } from '../../domain/factories/StandingsMatches.factory'
import { TeamMap } from '../../infra/mappers/Team.map'
import { usePredictionsStore } from '~~/layers/predictions/application/stores/Predictions.store'
import { useMatchesStore } from '../stores/Matches.store'
import type { Match } from '~~/layers/shared/entities/Match'

const tableView = ref(useSupabaseUser() ? TableViewEnum.OFICIAL_SIMULADA : TableViewEnum.SIMULADA)

const tableViewOptions = [
  {
    label: 'Oficial Simulada',
    value: TableViewEnum.OFICIAL_SIMULADA,
    disabled: true,
    icon: 'i-lucide-lock-keyhole'
  },
  { label: 'Simulada', value: TableViewEnum.SIMULADA },
  { label: 'Oficial', value: TableViewEnum.OFICIAL }
]

const [sensitive, toggle] = useToggle()

const { data: teams } = useAsyncData('standings/teams', () => $fetch('/api/clubes'), {
  transform: response => response?.map(team => new TeamMap().mapTo(team))
})

const predictions = computed(() => usePredictionsStore().getPredictions())

const matches = computed(() => useMatchesStore().matches)

const standingsMatches = computed(() =>
  StandingsMatchesFactory.make(tableView.value, matches.value as Match[], predictions.value!)
)

const standings = computed(() =>
  teams.value && standingsMatches.value
    ? new Standings(standingsMatches.value!, teams.value!).getStandings()
    : []
)

const columns = StandignsHeaderFactory.make()
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-4">
      <USelect
        v-model="tableView"
        :items="tableViewOptions"
      />
      <UButton
        size="xs"
        variant="ghost"
        color="primary"
        :label="`${sensitive ? 'ver' : 'ocultar'} tabela`"
        :icon="sensitive ? 'i-carbon-view-filled' : 'i-carbon-view-off-filled'"
        @click="toggle()"
      />
    </div>
    <Table
      v-if="standings.length"
      :columns="columns"
      :standings="standings"
      :sensitive="sensitive"
    />
    <USkeleton
      v-else
      class="w-full h-full"
    />
  </div>
</template>
