<script setup lang="ts"></script>

<template>
  <UPopover
    :content="{
      align: 'start',
      side: 'bottom',
      sideOffset: 10
    }"
  >
    <UButton
      icon="i-lucide-filter"
      variant="ghost"
    />

    <template #content>
      <FilterVisitorCTA v-if="!useSupabaseUser().value" />
      <StandingsFilter v-else />
    </template>
  </UPopover>
</template>
