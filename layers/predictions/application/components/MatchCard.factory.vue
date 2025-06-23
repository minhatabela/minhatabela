<script setup lang="ts">
import type { Match } from '~~/layers/shared/entities/Match';

const { match } = defineProps<{
  match: Match
}>()

</script>

<template>
  <OfficialResultMatchCardStrategy v-if="match.isFinished" :match="match" />
  <PredictionMatchCardStrategy v-else :match="match" />
</template>