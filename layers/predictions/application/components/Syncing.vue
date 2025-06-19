<script setup lang="ts">
defineProps<{
  syncing: boolean
}>()
</script>

<template>
  <UIcon
    name="i-ion-sync"
    class="w-4 h-4 text-green-400"
    :class="{ 'animate-spin  text-black dark:text-white': syncing }"
  />
</template>
