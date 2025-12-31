<script setup lang="ts">
defineProps<{
  name: string
  emblem: string
  reverse?: boolean
}>()
</script>

<template>
  <UBadge
    class="rounded-full"
    :class="{ 'flex flex-row-reverse': reverse }"
    variant="subtle"
    color="neutral"
    size="lg"
    :avatar="{ src: emblem }"
    >{{ name }}</UBadge
  >
</template>
