<script setup lang="ts">
import type { Match } from '~~/layers/shared/entities/Match'
import { Standings } from '../../domain/entities/Standings'
import { TableViewEnum } from '../../domain/enums/TableView.enum'
import { StandignsHeaderFactory } from '../../domain/factories/StandingsHeader.factory'
import { StandingsMatchesFactory } from '../../domain/factories/StandingsMatches.factory'
import { MatchMap } from '../../infra/mappers/Match.map'
import { PredictionMap } from '../../infra/mappers/Prediction.map'
import { TeamMap } from '../../infra/mappers/Team.map'
import { usePredictionsStore } from '~~/layers/predictions/application/stores/Predictions.store'

const tableView = ref(TableViewEnum.OFICIAL_SIMULADA)

const tableViewOptions = [
  { label: 'Oficial Simulada', value: TableViewEnum.OFICIAL_SIMULADA },
  { label: 'Simulada', value: TableViewEnum.SIMULADA },
  { label: 'Oficial', value: TableViewEnum.OFICIAL }
]

const [sensitive, toggle] = useToggle()

const { data: matches } = useAsyncData('standings/matches', () => $fetch('/api/partidas'), {
  transform: response => response?.map(match => new MatchMap().mapTo(match)),
  default: () => [] as Match[]
})

const { data: teams } = useAsyncData('standings/teams', () => $fetch('/api/clubes'), {
  transform: response => response?.map(team => new TeamMap().mapTo(team))
})

const predictions = computed(() => usePredictionsStore().predictions)

const standingsMatches = computed(() =>
  StandingsMatchesFactory.make(tableView.value, matches.value!, predictions.value!)
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
        :items="tableViewOptions"
        v-model="tableView"
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
