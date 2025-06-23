<script setup lang="ts">
import { useMatchesStore } from '~~/layers/standings/application/stores/Matches.store'

const round = computed(() => useMatchesStore().currentRound)

const roundMatches = computed(() => useMatchesStore().getRoundMatches())

</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex justify-between items-center">
      <!-- <Syncing :syncing="syncing" /> -->
    </div>
    <RoundPagination v-model="round" />
    <div
      v-if="roundMatches.length"
      class="grid grid-cols-2 gap-4 sm:grid-cols-1"
    >
      <MatchCardFactory
        v-for="match in roundMatches"
        :key="match.id"
        :match="match"
      />
    </div>
    <div
      v-else
      class="grid lg:grid-cols-2 gap-4"
    >
      <USkeleton
        class="w-full h-24"
        v-for="i in 10"
        :key="i"
      />
    </div>
  </div>
</template>
