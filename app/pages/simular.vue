<script setup lang="ts">
useHead({
  title: 'Simulando'
})
</script>

<template>
  <div class="flex flex-col xl:flex-row gap-16 lg:px-0 px-8 justify-between">
    <StandingsView />
    <PredictionsView />
  </div>
</template>

<style>
@reference "../../public/main.css";

html,
body {
  font-family: 'DM Sans', sans-serif;
}

td {
  @apply !py-2;
}

input[type='number'] {
  @apply w-20;
}
</style>
