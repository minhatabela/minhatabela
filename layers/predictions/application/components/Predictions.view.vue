<script setup lang="ts">
import { useMatchesStore } from '~~/layers/standings/application/stores/Matches.store'

const roundMatches = computed(() => useMatchesStore().getRoundMatches())
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <RoundPagination v-model="useMatchesStore().currentRound!" />
    <div
      v-if="roundMatches.length"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2"
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
        v-for="i in 10"
        :key="i"
        class="w-full h-24"
      />
    </div>
  </div>
</template>
