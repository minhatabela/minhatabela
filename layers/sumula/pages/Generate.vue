<script setup lang="ts">
import { usePredictionsStore } from '../../predictions/application/stores/Predictions.store'
import { computed, onMounted, ref, watch } from 'vue'
import { TeamSchema } from '../../shared/schemas/Team.schema'
import { useAsyncData } from 'nuxt/app'
import type { Team } from '../../shared/entities/Team'
import { orderBy } from 'lodash'

definePageMeta({
  middleware: ['auth']
})

onMounted(() => (usePredictionsStore().syncing = false))

const { data: teams } = useAsyncData('generate/teams', () => $fetch('/api/allTeams'), {
  transform: response => TeamSchema.array().parse(response)
})

const { execute: createMatches, status } = useAsyncData(
  'generate/matches',
  () => $fetch('/api/createMatches', { method: 'POST', body: { matches: payload.value } }),
  { immediate: false }
)

const selectedTeams = ref<string[]>([])

const items = computed(() =>
  teams.value?.map(team => {
    return { label: team.name, value: team.id }
  })
)

const selectedTeamsObj = computed(() =>
  selectedTeams.value.map(teamId => findTeam(teamId)).filter(team => team)
)

const calendar = ref<Array<{ home: Team; away: Team; round: number }> | undefined>([])

const orderedCalendar = computed(() => {
  return orderBy(calendar.value, 'round', 'asc')
})

function generateChampionshipCalendar(
  teams: Team[]
): Array<{ home: Team; away: Team; round: number }> {
  const matches: Array<{ home: Team; away: Team; round: number }> = []
  const totalTeams = teams.length

  for (let i = 0; i < totalTeams; i++) {
    for (let j = i + 1; j < totalTeams; j++) {
      matches.push({
        home: teams[i],
        away: teams[j],
        round: i + j + 1
      })
    }
  }

  const firstHalf = matches.slice()
  firstHalf.forEach(match => {
    matches.push({
      home: match.away,
      away: match.home,
      round: totalTeams + firstHalf.indexOf(match) + 1
    })
  })

  return matches
}

function setupCalendar() {
  if (selectedTeamsObj.value.some(team => !team)) return
  calendar.value = generateChampionshipCalendar(
    selectedTeamsObj.value.filter((team): team is Team => team !== undefined)
  )
}

function findTeam(teamId: string): Team | undefined {
  return teams.value?.find(team => team.id === teamId)
}

watch(
  teams,
  () => {
    selectedTeams.value = teams.value?.map(team => team.id) || []
  },
  {
    deep: true
  }
)

const payload = computed(() => {
  return calendar.value?.map(match => {
    return {
      mandante: match.home.id,
      visitante: match.away.id
    }
  })
})
</script>

<template>
  <div
    v-if="calendar?.length"
    class="grid grid-cols-10 gap-2"
  >
    <UCard
      v-for="match in orderedCalendar"
      :key="match.toString()"
    >
      <div class="flex justify-between items-center">
        <img
          class="h-7 w-7"
          :src="match.home.emblem"
          alt=""
        />
        X
        <img
          class="h-7 w-7"
          :src="match.away.emblem"
          alt=""
        />
      </div>
    </UCard>
    <UButton
      class="mt-4"
      label="Salvar calendário"
      :disabled="calendar.length != 380"
      :loading="status === 'pending'"
      @click="createMatches"
    />
  </div>
  <div v-else>
    <UCheckboxGroup
      v-model="selectedTeams"
      :items="items"
      name="team"
      variant="list"
    />
    <UButton
      class="mt-4"
      label="Gerar calendário"
      @click="setupCalendar"
      :disabled="selectedTeams.length != 20"
    />
  </div>
</template>
