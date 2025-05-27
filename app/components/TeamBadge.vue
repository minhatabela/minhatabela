<script setup lang="ts">
defineProps<{
  name: string,
  emblem: string
}>()
</script>

<template>
  <UBadge class="rounded-full" variant="subtle" color="neutral" size="lg" :avatar="{ src: emblem }">{{ name }}</UBadge>
</template>