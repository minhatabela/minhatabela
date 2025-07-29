<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { useMatchesStore } from '../stores/Matches.store'
import { HomeAwayEnum } from '../enums/HomeAway.enum'

const items = ref<TabsItem[]>([
  {
    label: 'Tudo',
    icon: 'i-lucide-circle',
    value: HomeAwayEnum.ALL
  },
  {
    label: 'Casa',
    icon: 'i-lucide-house',
    value: HomeAwayEnum.HOME
  },
  {
    label: 'Fora',
    icon: 'i-lucide-plane',
    value: HomeAwayEnum.AWAY
  }
])
</script>

<template>
  <UPopover>
    <UButton
      icon="i-lucide-filter"
      variant="ghost"
    />

    <template #content>
      <UTabs
        v-model="useMatchesStore().homeAwayFilter"
        :items="items"
        class="w-full"
      />
    </template>
  </UPopover>
</template>
