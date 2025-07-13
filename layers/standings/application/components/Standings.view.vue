<script setup lang="ts">
import { Standings } from '../../domain/entities/Standings'
import { TableViewEnum } from '../../domain/enums/TableView.enum'
import { StandignsHeaderFactory } from '../../domain/factories/StandingsHeader.factory'
import { StandingsMatchesFactory } from '../../domain/factories/StandingsMatches.factory'
import { TeamMap } from '../../infra/mappers/Team.map'
import { usePredictionsStore } from '~~/layers/predictions/application/stores/Predictions.store'
import { useMatchesStore } from '../stores/Matches.store'
import type { Match } from '~~/layers/shared/entities/Match'
import { TableViewOptionsFactory } from '../factories/TableViewOptions.factory'

const tableViewValue = ref()

const tableView = computed({
  get() {
    if (useSupabaseUser().value && !tableViewValue.value) return TableViewEnum.OFICIAL_SIMULADA
    if (!useSupabaseUser().value && usePredictionsStore().predictions && !tableViewValue.value)
      return TableViewEnum.SIMULADA
    if (!useSupabaseUser().value && !usePredictionsStore().predictions && !tableViewValue.value)
      return TableViewEnum.OFICIAL

    return tableViewValue.value
  },
  set(value: TableViewEnum) {
    tableViewValue.value = value
  }
})

const tableViewOptions = computed(() =>
  TableViewOptionsFactory.make(useSupabaseUser().value ? true : false)
)

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

const { width } = useWindowSize()
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-4">
      <USelect
        v-model="tableView"
        :class="width < 500 ? 'w-1/2' : 'w-[25%]'"
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
