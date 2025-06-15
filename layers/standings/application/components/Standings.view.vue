<script setup lang="ts">
import { Standings } from '../../domain/entities/Standings'
import { TableViewEnum } from '../../domain/enums/TableView.enum'
import { StandignsHeaderFactory } from '../../domain/factories/StandingsHeader.factory'
import { MatchMap } from '../../infra/mappers/Match.map'
import { TeamMap } from '../../infra/mappers/Team.map'

const tableView = ref(TableViewEnum.OFICIAL_SIMULADA)

const tableViewOptions = [
  { label: 'Oficial Simulada', value: TableViewEnum.OFICIAL_SIMULADA },
  { label: 'Simulada', value: TableViewEnum.SIMULADA },
  { label: 'Oficial', value: TableViewEnum.OFICIAL }
]

const [sensitive, toggle] = useToggle()

const { data: matches } = await useAsyncData('standings/matches', () => $fetch('/api/partidas'), {
  transform: response => response?.map(match => new MatchMap().mapTo(match))
})

const { data: teams } = await useAsyncData('standings/teams', () => $fetch('/api/clubes'), {
  transform: response => response?.map(team => new TeamMap().mapTo(team))
})

const standings = computed(() => new Standings(matches.value!, teams.value!).getStandings())

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
