<script setup lang="ts">
import { usePredictionsStore } from '~~/layers/predictions/application/stores/Predictions.store'
</script>

<template>
  <TransitionGroup name="list">
    <UIcon
      v-if="usePredictionsStore().syncing"
      :key="1"
      name="i-lucide-refresh-ccw"
      class="animate-spin"
    />
    <UIcon
      v-else
      :key="2"
      name="i-lucide-cloud-check"
      mode="svg"
      class="text-success"
    />
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
