<script setup lang="ts">
import { Standings } from '../../domain/entities/Standings'
import { TableViewEnum } from '../../domain/enums/TableView.enum'
import { StandignsHeaderFactory } from '../../domain/factories/StandingsHeader.factory'
import { StandingsMatchesFactory } from '../../domain/factories/StandingsMatches.factory'
import { TeamSchema } from '../../../shared/schemas/Team.schema'
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
  transform: response => TeamSchema.array().parse(response)
})

const predictions = computed(() => usePredictionsStore().getPredictions())

const matches = computed(() => useMatchesStore().matches)

const standingsMatches = computed(() =>
  StandingsMatchesFactory.make(tableView.value, matches.value as Match[], predictions.value!)
)

const standings = computed(() =>
  teams.value && standingsMatches.value
    ? new Standings(
        standingsMatches.value!,
        teams.value!,
        useMatchesStore().standingsFilter
      ).getStandings()
    : []
)

const columns = StandignsHeaderFactory.make()

const { width } = useWindowSize()
</script>

<template>
  <div class="w-full">
    <div class="flex gap-4 items-center mb-4">
      <div class="w-full flex items-center gap-4">
        <USelect
          v-model="tableView"
          :class="width < 500 ? 'w-1/2' : 'w-[25%]'"
          :items="tableViewOptions"
        />
        <UButton
          size="md"
          variant="ghost"
          color="primary"
          :icon="sensitive ? 'i-lucide-eye' : 'i-lucide-eye-off'"
          @click="toggle()"
        />
      </div>

      <StandingsFilterView />
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
